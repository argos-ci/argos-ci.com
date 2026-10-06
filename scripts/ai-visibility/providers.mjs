/**
 * Provider adapters for the AI visibility tracker. Each adapter builds the
 * request for a mode, calls the API with global fetch, and normalizes the
 * answer to { model, text, citations, sources, searches, stop, usage }.
 *
 * Modes: `search` turns web search on; `memory` sends no tools, so the answer
 * comes from training data alone.
 *
 * Request and response shapes were checked against the official docs on
 * 2026-10-04:
 * - Anthropic Messages API with the web search server tool:
 *   https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool
 * - OpenAI Responses API with the web_search tool:
 *   https://developers.openai.com/api/docs/guides/tools-web-search
 */
import { setTimeout as sleep } from "node:timers/promises";

export const MODES = ["search", "memory"];

const TIMEOUT_MS = 180_000;
const ATTEMPTS = 3;
const RETRY_STATUSES = new Set([408, 409, 429, 500, 502, 503, 504, 529]);

async function postJson(url, headers, body) {
  for (let attempt = 1; ; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (error) {
      if (attempt === ATTEMPTS) throw error;
      await sleep(2000 * attempt);
      continue;
    }
    if (response.ok) return response.json();
    const detail = (await response.text()).slice(0, 300);
    if (attempt === ATTEMPTS || !RETRY_STATUSES.has(response.status)) {
      throw new Error(`HTTP ${response.status} ${detail}`);
    }
    const retryAfter = Number(response.headers.get("retry-after")) * 1000;
    await sleep(Math.min(retryAfter > 0 ? retryAfter : 4000 * attempt, 60_000));
  }
}

/* Anthropic ---------------------------------------------------------------- */

/** Cap on pause_turn continuations of one long search turn. */
const MAX_CONTINUATIONS = 3;

function anthropicRequest(prompt, mode, model) {
  return {
    url: "https://api.anthropic.com/v1/messages",
    body: {
      model,
      max_tokens: 16_000,
      messages: [{ role: "user", content: prompt }],
      ...(mode === "search" && {
        tools: [
          {
            // Needs Claude 4.6 or later; older models take web_search_20250305.
            type: "web_search_20260209",
            name: "web_search",
            max_uses: 5,
            // Search directly instead of through dynamic filtering (code
            // execution), so every result and citation block lands in the
            // response in the documented shape.
            allowed_callers: ["direct"],
          },
        ],
      }),
    },
  };
}

async function askAnthropic({ prompt, mode, model, key }) {
  const { url, body } = anthropicRequest(prompt, mode, model);
  const headers = { "x-api-key": key, "anthropic-version": "2023-06-01" };
  const content = [];
  const usage = { inputTokens: 0, outputTokens: 0 };
  let searches = 0;
  let response;
  for (let turn = 0; turn <= MAX_CONTINUATIONS; turn += 1) {
    // A long search turn can stop with pause_turn: sending the partial
    // assistant turn back unchanged makes the API resume it.
    const messages =
      turn === 0
        ? body.messages
        : [...body.messages, { role: "assistant", content: [...content] }];
    response = await postJson(url, headers, { ...body, messages });
    content.push(...response.content);
    const u = response.usage ?? {};
    usage.inputTokens +=
      (u.input_tokens ?? 0) +
      (u.cache_creation_input_tokens ?? 0) +
      (u.cache_read_input_tokens ?? 0);
    usage.outputTokens += u.output_tokens ?? 0;
    searches += u.server_tool_use?.web_search_requests ?? 0;
    if (response.stop_reason !== "pause_turn") break;
  }

  // Citations split one paragraph into several text blocks; a tool call in
  // between starts a new paragraph.
  let text = "";
  let gap = false;
  const citations = [];
  const sources = [];
  for (const block of content) {
    if (block.type === "text") {
      if (gap && text) text += "\n\n";
      text += block.text;
      gap = false;
      for (const citation of block.citations ?? []) {
        if (citation.url) citations.push(citation.url);
      }
    } else {
      gap = true;
      // On error, `content` is a single error object instead of a list.
      if (
        block.type === "web_search_tool_result" &&
        Array.isArray(block.content)
      ) {
        for (const result of block.content) {
          if (result.url) sources.push(result.url);
        }
      }
    }
  }

  return {
    model: response.model ?? model,
    text,
    citations,
    sources,
    searches,
    stop: response.stop_reason,
    usage,
  };
}

/* OpenAI ------------------------------------------------------------------- */

function openaiRequest(prompt, mode, model) {
  return {
    url: "https://api.openai.com/v1/responses",
    body: {
      model,
      input: prompt,
      store: false,
      ...(mode === "search" && {
        tools: [{ type: "web_search" }],
        // List every URL the searches retrieved, not only the cited ones.
        include: ["web_search_call.action.sources"],
      }),
    },
  };
}

async function askOpenAI({ prompt, mode, model, key }) {
  const { url, body } = openaiRequest(prompt, mode, model);
  const response = await postJson(
    url,
    { authorization: `Bearer ${key}` },
    body,
  );
  if (response.error) {
    throw new Error(response.error.message ?? JSON.stringify(response.error));
  }

  const texts = [];
  const citations = [];
  const sources = [];
  let searches = 0;
  for (const item of response.output ?? []) {
    if (item.type === "web_search_call") {
      // Other actions (open_page, find_in_page) read a page; only `search`
      // runs a query.
      if (!item.action || item.action.type === "search") searches += 1;
      for (const source of item.action?.sources ?? []) {
        if (source.url) sources.push(source.url);
      }
      if (item.action?.url) sources.push(item.action.url);
    } else if (item.type === "message") {
      for (const part of item.content ?? []) {
        if (part.type !== "output_text") continue;
        texts.push(part.text);
        for (const annotation of part.annotations ?? []) {
          if (annotation.type === "url_citation" && annotation.url) {
            citations.push(annotation.url);
          }
        }
      }
    }
  }

  const usage = response.usage ?? {};
  return {
    model: response.model ?? model,
    text: texts.join("\n\n"),
    citations,
    sources,
    searches,
    stop:
      response.status === "incomplete"
        ? `incomplete: ${response.incomplete_details?.reason}`
        : response.status,
    usage: {
      inputTokens: usage.input_tokens ?? 0,
      outputTokens: usage.output_tokens ?? 0,
    },
  };
}

/**
 * In report order. Override a default model with its `modelEnv` variable.
 * gpt-6.1-sol is OpenAI's near-flagship model at a fifth of gpt-6-astra's
 * price, which keeps a weekly run cheap.
 */
export const PROVIDERS = [
  {
    id: "anthropic",
    label: "Claude",
    keyEnv: "ANTHROPIC_API_KEY",
    modelEnv: "ANTHROPIC_MODEL",
    defaultModel: "claude-sonnet-5-5",
    request: anthropicRequest,
    ask: askAnthropic,
  },
  {
    id: "openai",
    label: "OpenAI",
    keyEnv: "OPENAI_API_KEY",
    modelEnv: "OPENAI_MODEL",
    defaultModel: "gpt-6.1-sol",
    request: openaiRequest,
    ask: askOpenAI,
  },
];
