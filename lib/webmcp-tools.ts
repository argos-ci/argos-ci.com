import { COMPARE_SLUGS, isCompareSlug } from "@/app/compare/features";

import { SITE_URL } from "./agents";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_MEDIA_IMAGE_SCREENSHOT_COUNT,
  ARGOS_MEDIA_VIDEO_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
  SAML_SSO_PRICE,
} from "./constants";
import { MARKDOWN_PAGES, getMarkdownPath } from "./markdown-pages";
import { CUSTOM_PLAN_SCREENSHOT_COUNT, getArgosProPricing } from "./pricing";

/**
 * The tools argos-ci.com registers with browser agents through WebMCP (see
 * components/WebMcp.tsx). All read-only: they fetch the markdown the site
 * already serves to agents over HTTP (the markdown twins, the docs' `.md`
 * pages) or compute from the pricing constants, so they cannot disagree with
 * the pages.
 */

type ToolContent = { type: "text"; text: string };

type WebMcpToolResult = { content: ToolContent[] };

type ToolExecuteOptions = { signal?: AbortSignal };

export type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean };
  execute: (
    input: Record<string, unknown>,
    options?: ToolExecuteOptions,
  ) => Promise<WebMcpToolResult>;
};

const NO_ARGS_SCHEMA = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

const READ_ONLY = { readOnlyHint: true };

const STATUS_PAGE_URL = "https://argos.openstatus.dev";

function text(content: string): WebMcpToolResult {
  return { content: [{ type: "text", text: content }] };
}

async function fetchText(
  url: string,
  init: { accept?: string; signal?: AbortSignal } = {},
): Promise<string> {
  const response = await fetch(url, {
    headers: init.accept ? { accept: init.accept } : undefined,
    signal: init.signal,
  });
  if (!response.ok) {
    throw new Error(`Fetching ${url} failed with status ${response.status}`);
  }
  return response.text();
}

/** Markdown from the site, turning a 404 into a message the agent can act on. */
async function fetchMarkdown(
  url: string,
  notFound: string,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(url, {
    headers: { accept: "text/markdown" },
    signal,
  });
  if (response.status === 404) {
    return notFound;
  }
  if (!response.ok) {
    throw new Error(`Fetching ${url} failed with status ${response.status}`);
  }
  return response.text();
}

function readString(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

/** A non-negative whole count; anything else reads as zero. */
function readCount(input: Record<string, unknown>, key: string): number {
  const value = input[key];
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;
}

function readFlag(input: Record<string, unknown>, key: string): boolean {
  return input[key] === true;
}

function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

function formatDollars(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

const PAGE_LIST = MARKDOWN_PAGES.map(({ path, section }) =>
  section ? `${path}/<slug>` : path,
).join(", ");

// --- Documentation ---------------------------------------------------------

const DOCS_INDEX = "/docs/llms.txt";

/** `/docs/quickstart/foo`, `quickstart/foo.md` or a full URL → `quickstart/foo`. */
function toDocsPath(input: string): string {
  let path = input.trim();
  if (/^https?:\/\//.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      return "";
    }
  }
  return path
    .split(/[?#]/)[0]
    .replace(/^\/?docs(\/|$)/, "")
    .replace(/\.md$/, "")
    .replace(/^\/+|\/+$/g, "");
}

async function fetchDocsPage(
  path: string,
  signal?: AbortSignal,
): Promise<string> {
  if (!path) {
    return fetchText(DOCS_INDEX, { signal });
  }
  return fetchMarkdown(
    `/docs/${path}.md`,
    `No documentation page at ${SITE_URL}/docs/${path}. Use search_docs to find the right page.`,
    signal,
  );
}

type DocsEntry = {
  title: string;
  url: string;
  path: string;
  description: string;
  section: string;
};

/** The `- [Title](url): description` lines of /docs/llms.txt, by section. */
function parseDocsIndex(markdown: string): DocsEntry[] {
  const entries: DocsEntry[] = [];
  let section = "";
  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      section = heading[1].trim();
      continue;
    }
    const entry = line.match(/^- \[([^\]]+)\]\(([^)\s]+)\)(?::\s*(.*))?$/);
    if (!entry) {
      continue;
    }
    const [, title, url, description = ""] = entry;
    entries.push({
      title: title.replace(/\\(.)/g, "$1").trim(),
      url,
      path: toDocsPath(url),
      description: description.trim(),
      section,
    });
  }
  return entries;
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "argos",
  "can",
  "do",
  "does",
  "for",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "the",
  "to",
  "use",
  "using",
  "what",
  "with",
]);

function searchDocsIndex(entries: DocsEntry[], query: string): DocsEntry[] {
  const phrase = query.toLowerCase().trim();
  const terms = phrase
    .split(/[^a-z0-9.+#-]+/)
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
  if (terms.length === 0) {
    return [];
  }
  return entries
    .map((entry, index) => {
      const title = entry.title.toLowerCase();
      const description = entry.description.toLowerCase();
      const path = entry.path.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 3;
        if (path.includes(term)) score += 2;
        if (description.includes(term)) score += 1;
      }
      if (title.includes(phrase)) score += 5;
      return { entry, index, score };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 10)
    .map((match) => match.entry);
}

const QUICKSTARTS = {
  playwright: "quickstart/playwright-quickstart",
  vitest: "quickstart/vitest-quickstart",
  storybook: "quickstart/storybook-quickstart",
  cypress: "quickstart/cypress-quickstart",
  webdriverio: "quickstart/webdriverio-quickstart",
  puppeteer: "quickstart/puppeteer-quickstart",
  other: "quickstart/any-test-framework",
} as const;

type Framework = keyof typeof QUICKSTARTS;

function isFramework(value: string): value is Framework {
  return value in QUICKSTARTS;
}

// --- Status ----------------------------------------------------------------

const STATUS_LABELS: Record<string, string> = {
  operational: "All systems operational",
  degraded_performance: "Degraded performance",
  partial_outage: "Partial outage",
  major_outage: "Major outage",
  under_maintenance: "Under maintenance",
  incident: "Incident in progress",
  unknown: "Status unknown",
};

// --- Tools -----------------------------------------------------------------

export const WEBMCP_TOOLS: WebMcpTool[] = [
  {
    name: "get_argos_overview",
    description:
      "What Argos is (visual and snapshot testing for Playwright, Storybook and other frameworks; media sharing; deployments), with a map of every page, doc, API and agent surface. Start here.",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) =>
      text(await fetchText("/llms.txt", { signal: options?.signal })),
  },
  {
    name: "get_pricing",
    description:
      "Argos plans and prices: Hobby (free), Pro (flat monthly price plus per-screenshot overage), Enterprise, add-ons, what counts as a screenshot, and the pricing FAQ. Use estimate_monthly_cost to price a specific usage.",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) =>
      text(await fetchText("/md/pricing", { signal: options?.signal })),
  },
  {
    name: "estimate_monthly_cost",
    description:
      "Estimate what Argos costs per month for a given usage: screenshots, Storybook screenshots, media uploads (images and videos), and the GitHub SSO or SAML SSO add-ons. Uses the same arithmetic as the pricing page.",
    inputSchema: {
      type: "object",
      properties: {
        screenshots: {
          type: "number",
          minimum: 0,
          description:
            "Screenshots uploaded per month from Playwright, Cypress, Vitest, or any non-Storybook SDK or the CLI.",
        },
        storybookScreenshots: {
          type: "number",
          minimum: 0,
          description:
            "Storybook screenshots uploaded per month (billed at a lower rate).",
        },
        mediaImages: {
          type: "number",
          minimum: 0,
          description:
            "Standalone images uploaded per month through media sharing.",
        },
        mediaVideos: {
          type: "number",
          minimum: 0,
          description:
            "Standalone videos uploaded per month through media sharing.",
        },
        githubSso: {
          type: "boolean",
          description: "Add the GitHub Single Sign-On add-on.",
        },
        samlSso: {
          type: "boolean",
          description: "Add the SAML SSO add-on.",
        },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input) => {
      const screenshots = readCount(input, "screenshots");
      const storybookScreenshots = readCount(input, "storybookScreenshots");
      const mediaImages = readCount(input, "mediaImages");
      const mediaVideos = readCount(input, "mediaVideos");
      const githubSso = readFlag(input, "githubSso");
      const samlSso = readFlag(input, "samlSso");

      const mediaScreenshots =
        mediaImages * ARGOS_MEDIA_IMAGE_SCREENSHOT_COUNT +
        mediaVideos * ARGOS_MEDIA_VIDEO_SCREENSHOT_COUNT;
      const usage = {
        screenshots: screenshots + mediaScreenshots,
        storybookScreenshots,
      };
      const total = usage.screenshots + usage.storybookScreenshots;
      const pro = getArgosProPricing(usage);
      const addOns =
        (githubSso ? GITHUB_SSO_PRICE : 0) + (samlSso ? SAML_SSO_PRICE : 0);

      const lines = [
        `Usage: ${formatCount(screenshots)} screenshots and ${formatCount(storybookScreenshots)} Storybook screenshots per month.`,
      ];
      if (mediaScreenshots > 0) {
        lines.push(
          `Media uploads draw on the screenshot allowance: ${formatCount(mediaImages)} images × ${ARGOS_MEDIA_IMAGE_SCREENSHOT_COUNT} + ${formatCount(mediaVideos)} videos × ${ARGOS_MEDIA_VIDEO_SCREENSHOT_COUNT} = ${formatCount(mediaScreenshots)} screenshots, for ${formatCount(total)} screenshots in total.`,
        );
      }
      if (total <= ARGOS_HOBBY_SCREENSHOT_COUNT && addOns === 0) {
        lines.push(
          `Hobby plan: free. This usage fits its ${formatCount(ARGOS_HOBBY_SCREENSHOT_COUNT)} screenshots/month allowance. Hobby is for personal projects; teams and private organizations need Pro.`,
        );
      }
      const extras: string[] = [];
      if (pro.extraScreenshots > 0) {
        extras.push(
          `${formatCount(pro.extraScreenshots)} extra screenshots at $${ARGOS_SCREENSHOT_PRICE} each`,
        );
      }
      if (pro.extraStorybookScreenshots > 0) {
        extras.push(
          `${formatCount(pro.extraStorybookScreenshots)} extra Storybook screenshots at $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} each`,
        );
      }
      lines.push(
        `Pro plan: ${formatDollars(pro.price)}/month (${formatDollars(ARGOS_PRO_FLAT_PRICE)} flat with ${formatCount(ARGOS_PRO_FLAT_SCREENSHOT_COUNT)} screenshots included${extras.length > 0 ? `, plus ${extras.join(" and ")}` : ""}).`,
      );
      if (githubSso) {
        lines.push(
          `GitHub Single Sign-On add-on: ${formatDollars(GITHUB_SSO_PRICE)}/month.`,
        );
      }
      if (samlSso) {
        lines.push(`SAML SSO add-on: ${formatDollars(SAML_SSO_PRICE)}/month.`);
      }
      lines.push(
        `Estimated total on Pro: ${formatDollars(pro.price + addOns)}/month. Pro starts with a 14-day free trial.`,
      );
      if (total >= CUSTOM_PLAN_SCREENSHOT_COUNT) {
        lines.push(
          `At this volume, contact sales for a custom Enterprise plan: ${SITE_URL}/contact/sale`,
        );
      }
      lines.push(`Details: ${SITE_URL}/pricing`);
      return text(lines.join("\n"));
    },
  },
  {
    name: "get_page",
    description: `Read an argos-ci.com page as markdown, by path or full URL. Pages: ${PAGE_LIST}. Documentation paths (/docs/...) work too.`,
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description:
            "Page path such as /pricing or /blog/<slug>, or a full https://argos-ci.com URL.",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input, options) => {
      const raw = readString(input, "path");
      if (!raw) {
        return text(
          `Pass a page path. Pages with a markdown version: ${PAGE_LIST}.`,
        );
      }
      let pathname = raw;
      if (/^https?:\/\//.test(raw)) {
        let url: URL;
        try {
          url = new URL(raw);
        } catch {
          return text(`Not a valid URL: ${raw}`);
        }
        if (url.origin !== SITE_URL && url.origin !== location.origin) {
          return text(
            `get_page reads argos-ci.com pages only, not ${url.origin}.`,
          );
        }
        pathname = url.pathname;
      }
      if (!pathname.startsWith("/")) {
        pathname = `/${pathname}`;
      }
      if (/^\/docs(\/|$)/.test(pathname)) {
        return text(await fetchDocsPage(toDocsPath(pathname), options?.signal));
      }
      const markdownPath = getMarkdownPath(pathname);
      if (!markdownPath) {
        return text(
          `${SITE_URL}${pathname} has no markdown version. Pages that do: ${PAGE_LIST}. For documentation, use search_docs or get_docs_page.`,
        );
      }
      return text(
        await fetchMarkdown(
          markdownPath,
          `Nothing is published at ${SITE_URL}${pathname}. Read /blog for the list of posts and /changelog for the list of updates.`,
          options?.signal,
        ),
      );
    },
  },
  {
    name: "search_docs",
    description:
      "Search the Argos documentation (setup guides, SDK references, CI integrations, review workflow, flaky tests, API, agents) and get the matching pages with their URLs. Follow up with get_docs_page.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Keywords, e.g. 'playwright quickstart', 'gitlab', 'baseline build', 'flaky'.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input, options) => {
      const query = readString(input, "query");
      const index = await fetchText(DOCS_INDEX, { signal: options?.signal });
      const matches = query
        ? searchDocsIndex(parseDocsIndex(index), query)
        : [];
      if (matches.length === 0) {
        return text(
          `No documentation page matches "${query}". The full index follows; pick a page and read it with get_docs_page.\n\n${index}`,
        );
      }
      const lines = [
        `Documentation pages matching "${query}":`,
        "",
        ...matches.map(
          (match) =>
            `- [${match.title}](${match.url})${match.description ? `: ${match.description}` : ""}${match.section ? ` (${match.section})` : ""}`,
        ),
        "",
        `Read one with get_docs_page, e.g. { "path": "${matches[0].path}" }.`,
      ];
      return text(lines.join("\n"));
    },
  },
  {
    name: "get_docs_page",
    description:
      "Read one Argos documentation page as markdown. Pass the path from search_docs or a docs URL, e.g. 'quickstart/playwright-quickstart' or https://argos-ci.com/docs/learn/review-workflow. An empty path returns the documentation index.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description:
            "Docs path without the /docs prefix, or a full docs URL.",
        },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input, options) =>
      text(
        await fetchDocsPage(
          toDocsPath(readString(input, "path")),
          options?.signal,
        ),
      ),
  },
  {
    name: "get_quickstart",
    description:
      "Step-by-step guide to set up Argos with a test framework: install the SDK, capture screenshots, run it in CI. Use 'other' for any framework not listed (upload screenshots with the Argos CLI).",
    inputSchema: {
      type: "object",
      properties: {
        framework: {
          type: "string",
          enum: Object.keys(QUICKSTARTS),
          description: "The test framework to set up Argos with.",
        },
      },
      required: ["framework"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input, options) => {
      const framework = readString(input, "framework").toLowerCase();
      if (!isFramework(framework)) {
        return text(
          `Unknown framework "${framework}". Quickstarts exist for: ${Object.keys(QUICKSTARTS).join(", ")}.`,
        );
      }
      return text(await fetchDocsPage(QUICKSTARTS[framework], options?.signal));
    },
  },
  {
    name: "compare_with",
    description:
      "How Argos compares to another visual testing tool: feature-by-feature table, prices at sample volumes where the competitor publishes them, migration guide, and FAQ.",
    inputSchema: {
      type: "object",
      properties: {
        competitor: {
          type: "string",
          enum: [...COMPARE_SLUGS],
          description:
            "The tool to compare Argos with. 'playwright' means Playwright's built-in toHaveScreenshot().",
        },
      },
      required: ["competitor"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    execute: async (input, options) => {
      const competitor = readString(input, "competitor").toLowerCase();
      if (!isCompareSlug(competitor)) {
        return text(
          `Unknown competitor "${competitor}". Argos publishes comparisons with: ${COMPARE_SLUGS.join(", ")}.`,
        );
      }
      return text(
        await fetchText(`/md/compare/${competitor}`, {
          signal: options?.signal,
        }),
      );
    },
  },
  {
    name: "get_security_compliance",
    description:
      "Argos security and compliance: SOC 2 Type II (auditor, report access), GDPR, data location and encryption, access controls, open source, responsible disclosure, and the security FAQ.",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) =>
      text(await fetchText("/md/security", { signal: options?.signal })),
  },
  {
    name: "get_latest_changelog",
    description:
      "Recent Argos product updates and new features (the changelog), most recent first, as markdown. Read one entry in full with get_page.",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) =>
      text(
        await fetchText("/changelog", {
          accept: "text/markdown",
          signal: options?.signal,
        }),
      ),
  },
  {
    name: "get_service_status",
    description:
      "Current operational status of the Argos service (live, from the status page).",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) => {
      const response = await fetch("/api/openstatus", {
        signal: options?.signal,
      });
      if (!response.ok) {
        throw new Error(
          `Fetching the status failed with status ${response.status}`,
        );
      }
      const data = (await response.json()) as { status?: unknown };
      const status = typeof data.status === "string" ? data.status : "unknown";
      const label = STATUS_LABELS[status] ?? status;
      return text(
        `Argos status: ${label} (${status}). Live status page with incident history: ${STATUS_PAGE_URL}`,
      );
    },
  },
  {
    name: "get_mcp_connection_info",
    description:
      "How to connect an AI agent to Argos itself: the MCP server endpoint, OAuth and personal access token authentication, and the REST API endpoints.",
    inputSchema: NO_ARGS_SCHEMA,
    annotations: READ_ONLY,
    execute: async (_input, options) =>
      text(await fetchText("/auth.md", { signal: options?.signal })),
  },
];
