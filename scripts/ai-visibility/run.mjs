/**
 * Track how often AI assistants mention and cite Argos when developers ask
 * about visual testing.
 *
 * Asks every question in prompts.json to each provider whose API key is set,
 * in two modes: `search` (web search on) and `memory` (no tools, so the answer
 * comes from training data). Answers vary from run to run, so the metric is
 * how often Argos comes up across many prompts, not its place in one answer.
 *
 *   node scripts/ai-visibility/run.mjs --dry-run
 *   node scripts/ai-visibility/run.mjs --provider anthropic --mode search --limit 5
 *   RUNS=3 node scripts/ai-visibility/run.mjs --out-dir /tmp/ai-visibility
 *
 * Keys: ANTHROPIC_API_KEY, OPENAI_API_KEY, PERPLEXITY_API_KEY. A provider
 * without its key is skipped with a notice. ANTHROPIC_MODEL, OPENAI_MODEL and
 * PERPLEXITY_MODEL override the default models (see providers.mjs).
 *
 * Writes <out-dir>/<timestamp>.json (every answer, with its mentions and
 * links) and <out-dir>/<timestamp>.md (the summary, also printed to stdout).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

import { analyze } from "./analyze.mjs";
import { MODES, PROVIDERS } from "./providers.mjs";
import { renderSummary } from "./report.mjs";

/** Parallel requests per provider; providers run side by side. */
const CONCURRENCY = 4;

const USAGE = `Usage: node scripts/ai-visibility/run.mjs [options]

  --provider <ids>   ${PROVIDERS.map((p) => p.id).join(", ")} (comma-separated or repeated; default: all)
  --mode <mode>      ${MODES.join(" or ")} (default: both)
  --limit <n>        only the first n prompts
  --out-dir <dir>    where to write results (default: ai-visibility-results)
  --dry-run          print the planned requests without calling any API

  RUNS=<n>           ask each prompt n times (default: 1)`;

function fail(message) {
  console.error(`${message}\n\n${USAGE}`);
  process.exit(1);
}

const inActions = process.env.GITHUB_ACTIONS === "true";

/** GitHub Actions annotation in CI, a plain line on stderr locally. */
function annotate(level, message) {
  if (inActions) console.log(`::${level}::${message}`);
  else console.error(`${level}: ${message}`);
}

let args;
try {
  ({ values: args } = parseArgs({
    options: {
      provider: { type: "string", multiple: true },
      mode: { type: "string" },
      limit: { type: "string" },
      "out-dir": { type: "string", default: "ai-visibility-results" },
      "dry-run": { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  }));
} catch (error) {
  fail(error.message);
}
if (args.help) {
  console.log(USAGE);
  process.exit(0);
}

const providerIds = args.provider && [
  ...new Set(
    args.provider.flatMap((value) => value.split(",").map((id) => id.trim())),
  ),
];
const providers = providerIds
  ? providerIds.map(
      (id) =>
        PROVIDERS.find((provider) => provider.id === id) ??
        fail(`Unknown provider "${id}"`),
    )
  : PROVIDERS;
if (args.mode && !MODES.includes(args.mode)) {
  fail(`Unknown mode "${args.mode}"`);
}
const modes = args.mode ? [args.mode] : MODES;
const limit = Number(args.limit ?? Infinity);
if (!(Number.isInteger(limit) || limit === Infinity) || limit < 1) {
  fail("--limit takes a positive integer");
}
const runs = Number(process.env.RUNS ?? 1);
if (!Number.isInteger(runs) || runs < 1) fail("RUNS takes a positive integer");

/** @type {{ id: string, topic: string, prompt: string }[]} */
const prompts = JSON.parse(
  readFileSync(new URL("prompts.json", import.meta.url), "utf8"),
).slice(0, limit);
for (const prompt of prompts) {
  if (!prompt.id || !prompt.topic || !prompt.prompt) {
    throw new Error(
      `prompts.json entry needs id, topic and prompt: ${JSON.stringify(prompt)}`,
    );
  }
}

const plan = providers.map((provider) => ({
  provider,
  model: process.env[provider.modelEnv] || provider.defaultModel,
  key: process.env[provider.keyEnv],
}));
const jobs = plan.flatMap((entry) =>
  modes.flatMap((mode) =>
    prompts.flatMap((prompt) =>
      Array.from({ length: runs }, (_, index) => ({
        ...entry,
        mode,
        prompt,
        run: index + 1,
      })),
    ),
  ),
);

if (args["dry-run"]) {
  const count = (n, noun) => `${n} ${noun}${n === 1 ? "" : "s"}`;
  console.log(
    `Dry run: ${count(jobs.length, "request")} (${count(providers.length, "provider")} × ${count(modes.length, "mode")} × ${count(prompts.length, "prompt")} × ${count(runs, "run")}). No API is called.\n`,
  );
  for (const { provider, model, key } of plan) {
    const status = key
      ? "key set"
      : `${provider.keyEnv} not set, would be skipped`;
    console.log(`${provider.id} (${model}): ${status}`);
    for (const mode of modes) {
      const { url, body } = provider.request(prompts[0].prompt, mode, model);
      console.log(`\n  ${mode}: POST ${url}`);
      console.log(JSON.stringify(body, null, 2).replace(/^/gm, "  "));
    }
    console.log("");
  }
  console.log("Planned requests:");
  for (const job of jobs) {
    console.log(
      `  ${job.provider.id} ${job.mode} ${job.prompt.id} (run ${job.run})`,
    );
  }
  process.exit(0);
}

const skipped = plan
  .filter((entry) => !entry.key)
  .map((entry) => entry.provider);
for (const provider of skipped) {
  annotate(
    "notice",
    `Skipping ${provider.label}: ${provider.keyEnv} is not set.`,
  );
}
const queue = jobs.filter((job) => job.key);
const startedAt = new Date().toISOString();
if (queue.length) {
  const active = plan.filter((entry) => entry.key);
  console.error(
    `Asking ${active.map((entry) => `${entry.provider.id} (${entry.model})`).join(", ")}: ${queue.length} requests`,
  );
} else {
  annotate(
    "notice",
    "No AI provider key is set, so nothing was measured. Set ANTHROPIC_API_KEY, OPENAI_API_KEY or PERPLEXITY_API_KEY.",
  );
}

async function runJob({ provider, model, key, mode, prompt, run }) {
  const started = Date.now();
  const record = {
    provider: provider.id,
    mode,
    model,
    promptId: prompt.id,
    topic: prompt.topic,
    prompt: prompt.prompt,
    run,
  };
  const label = `[${provider.id} ${mode}] ${prompt.id} (run ${run})`;
  try {
    const answer = await provider.ask({
      prompt: prompt.prompt,
      mode,
      model,
      key,
    });
    const analysis = analyze(answer);
    console.error(
      `${label}: ${analysis.argosMentioned ? `Argos #${analysis.argosRank}` : "no Argos"}, ${analysis.citations.length} cited links`,
    );
    return {
      ...record,
      ok: true,
      model: answer.model,
      stop: answer.stop,
      searches: answer.searches,
      argosMentioned: analysis.argosMentioned,
      argosRank: analysis.argosRank,
      mentions: analysis.mentions,
      citations: analysis.citations,
      sources: analysis.sources,
      usage: answer.usage,
      durationMs: Date.now() - started,
      answer: answer.text,
    };
  } catch (error) {
    const message = String(error.cause?.message ?? error.message)
      .replace(/\s+/g, " ")
      .slice(0, 300);
    console.error(`${label}: FAILED ${message}`);
    return {
      ...record,
      ok: false,
      error: message,
      durationMs: Date.now() - started,
    };
  }
}

// Results keep the job order (provider, mode, prompt, run) whatever finishes first.
const results = Array.from({ length: queue.length });
await Promise.all(
  plan.map(async ({ provider }) => {
    const pending = queue
      .map((job, index) => ({ job, index }))
      .filter(({ job }) => job.provider === provider);
    const workers = Array.from(
      { length: Math.min(CONCURRENCY, pending.length) },
      async () => {
        let next;
        while ((next = pending.shift()))
          results[next.index] = await runJob(next.job);
      },
    );
    await Promise.all(workers);
  }),
);

const outDir = resolve(args["out-dir"]);
mkdirSync(outDir, { recursive: true });
const stamp = startedAt.replace(/\.\d+Z$/, "Z").replaceAll(":", "-");
const resultsFile = join(outDir, `${stamp}.json`);
writeFileSync(
  resultsFile,
  `${JSON.stringify(
    {
      startedAt,
      finishedAt: new Date().toISOString(),
      runs,
      prompts: prompts.length,
      providers: plan
        .filter((entry) => entry.key)
        .map((entry) => ({ id: entry.provider.id, model: entry.model })),
      skipped: skipped.map((provider) => provider.id),
      results,
    },
    null,
    2,
  )}\n`,
);
const summary = renderSummary({
  startedAt,
  runs,
  promptCount: prompts.length,
  results,
  skipped,
  resultsFile: join(args["out-dir"], `${stamp}.json`),
});
writeFileSync(join(outDir, `${stamp}.md`), summary);
console.log(summary);

for (const { provider } of plan) {
  const records = results.filter((result) => result.provider === provider.id);
  const failures = records.filter((result) => !result.ok).length;
  if (records.length && failures === records.length) {
    annotate(
      "error",
      `Every ${provider.label} request failed. Check ${provider.keyEnv} and the model.`,
    );
    process.exitCode = 1;
  } else if (failures) {
    annotate(
      "warning",
      `${failures} of ${records.length} ${provider.label} requests failed.`,
    );
  }
}
