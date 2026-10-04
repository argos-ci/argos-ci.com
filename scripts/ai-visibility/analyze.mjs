/**
 * Turn one answer into metrics: whether it mentions Argos, where Argos ranks
 * among the tracked tools by first mention, which competitors it names, and
 * which URLs it cites or retrieved.
 */

/** `argos-ci` (argos-ci.com, @argos-ci/playwright, Argos CI) is always Argos. */
const ARGOS_ID = /\bargos[- ]?ci\b/i;

/** A bare "Argos" never counts as part of "Argo(s) CD". */
const ARGOS_NAME = /\bargos\b(?![- ]?cd\b)/gi;

/**
 * A bare "Argos" counts only next to testing words, and never next to the UK
 * retailer.
 */
const TESTING_CONTEXT =
  /\b(?:visual|screenshots?|snapshots?|regressions?|tests?|testing|diffs?|baselines?|storybook|playwright|cypress|vitest|puppeteer|webdriverio|chromatic|percy|applitools|ci|pull requests?|open[- ]source|github)\b/i;
const RETAIL_CONTEXT =
  /\b(?:retailer|retail|catalogue|argos\.co\.uk|sainsbury'?s|high street|click (?:and|&) collect)\b/i;
const CONTEXT_CHARS = 150;

/** Tracked alongside Argos. Case-insensitive unless a word is too common. */
const COMPETITORS = [
  { name: "Chromatic", pattern: /\bchromatic\b|\bchromaui\b/i },
  { name: "Percy", pattern: /\bpercy\b/i },
  { name: "Applitools", pattern: /\bapplitools\b/i },
  { name: "Lost Pixel", pattern: /\blost[- ]?pixel\b/i },
  { name: "BackstopJS", pattern: /\bbackstop\.?js\b/i },
  { name: "Happo", pattern: /\bhappo\b/i },
  // "meticulous" is also an everyday adjective.
  { name: "Meticulous", pattern: /\bMeticulous\b|\bmeticulous\.ai\b/ },
  {
    name: "Playwright toHaveScreenshot",
    pattern:
      /\btoHaveScreenshot\b|\bplaywright(?:'s)? (?:built[- ]in|native) (?:visual|screenshot|snapshot)/i,
  },
  {
    name: "Vitest toMatchScreenshot",
    pattern:
      /\btoMatchScreenshot\b|\bvitest(?:'s)? (?:built[- ]in|native) (?:visual|screenshot)/i,
  },
  // "smart UI" is also an everyday phrase.
  {
    name: "LambdaTest SmartUI",
    pattern: /\bSmart ?UI\b|\bLambda ?[Tt]est\b|\blambdatest\b/,
  },
  { name: "Sauce Visual", pattern: /\bsauce (?:labs )?visual\b/i },
  { name: "reg-suit", pattern: /\breg-?suit\b/i },
];

export const TOOL_NAMES = ["Argos", ...COMPETITORS.map((tool) => tool.name)];

function firstArgosMention(text) {
  const id = text.search(ARGOS_ID);
  for (const match of text.matchAll(ARGOS_NAME)) {
    if (id !== -1 && match.index >= id) break;
    const context = text.slice(
      Math.max(0, match.index - CONTEXT_CHARS),
      match.index + CONTEXT_CHARS,
    );
    if (TESTING_CONTEXT.test(context) && !RETAIL_CONTEXT.test(context)) {
      return match.index;
    }
  }
  return id;
}

const URL_IN_TEXT = /https?:\/\/[^\s<>"'`)\]}]+/g;

/** Unique, normalized links: no fragment, no utm_* tracking parameters. */
function toLinks(urls) {
  const links = new Map();
  for (const raw of urls) {
    let url;
    try {
      url = new URL(raw.replace(/[.,;:!?*_]+$/, ""));
    } catch {
      continue;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") continue;
    url.hash = "";
    const tracking = [...url.searchParams.keys()].filter((key) =>
      key.startsWith("utm_"),
    );
    for (const key of tracking) url.searchParams.delete(key);
    const domain = url.hostname.replace(/^www\./, "");
    const argos = domain === "argos-ci.com" || domain.endsWith(".argos-ci.com");
    links.set(url.href, { url: url.href, domain, argos });
  }
  return [...links.values()];
}

/**
 * @param {{ text: string, citations: string[], sources: string[] }} answer
 * `citations` are the URLs the provider attached to the answer; links written
 * in the answer text count as cited too. `sources` are every URL the web
 * search retrieved, cited or not.
 */
export function analyze({ text, citations, sources }) {
  const found = [];
  const argosIndex = firstArgosMention(text);
  if (argosIndex !== -1) found.push({ name: "Argos", index: argosIndex });
  for (const { name, pattern } of COMPETITORS) {
    const index = text.search(pattern);
    if (index !== -1) found.push({ name, index });
  }
  const mentions = found
    .sort((a, b) => a.index - b.index)
    .map((tool) => tool.name);
  return {
    argosMentioned: argosIndex !== -1,
    argosRank: argosIndex === -1 ? null : mentions.indexOf("Argos") + 1,
    mentions,
    citations: toLinks([
      ...citations,
      ...Array.from(text.matchAll(URL_IN_TEXT), (match) => match[0]),
    ]),
    sources: toLinks(sources),
  };
}
