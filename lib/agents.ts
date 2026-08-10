/**
 * Helpers for the agent-facing representations of the site.
 *
 * Facts about the machine-facing Argos surfaces — API and MCP URLs, OAuth
 * endpoints and scopes — deliberately do not live here: the backend owns them
 * and generates the documents that state them (`/auth.md`, the well-known
 * discovery documents), which this site proxies or redirects to.
 */

export const SITE_URL = "https://argos-ci.com";

/** Rough token count of a markdown document, for `x-markdown-tokens`. */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Response headers for markdown served to agents. `X-Robots-Tag: noindex`
 * keeps the markdown variants out of search indexes (the HTML pages are the
 * canonical documents).
 */
export function markdownHeaders(text: string): HeadersInit {
  return {
    "Content-Type": "text/markdown; charset=utf-8",
    "x-markdown-tokens": String(estimateTokens(text)),
    Vary: "Accept",
    "X-Robots-Tag": "noindex",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  };
}
