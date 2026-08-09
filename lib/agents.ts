/**
 * Canonical URLs of the machine-facing Argos surfaces, shared by the
 * agent-facing documents the site serves (auth.md, llms.txt, the markdown
 * representations). One module so they can't drift apart from each other.
 *
 * The well-known discovery documents themselves (API catalog, OAuth protected
 * resource metadata, MCP server card) are served by the backend on
 * app.argos-ci.com — this site's /.well-known/* redirect points there.
 */

export const SITE_URL = "https://argos-ci.com";

/** Base URL of the Argos REST API. */
export const API_URL = "https://api.argos-ci.com/v2";

/** Human documentation of the REST API. */
export const API_DOCS_URL = "https://argos-ci.com/docs/api-reference";

/** Official remote MCP server (Streamable HTTP). */
export const MCP_URL = "https://mcp.argos-ci.com";

/** Human documentation of the MCP server. */
export const MCP_DOCS_URL = "https://argos-ci.com/docs/agents/mcp-server";

/**
 * OAuth 2.1 authorization server that issues tokens for the REST API and the
 * MCP server. Serves RFC 8414 metadata at
 * https://app.argos-ci.com/.well-known/oauth-authorization-server
 * (argos-ci.com/.well-known/oauth-authorization-server redirects there).
 */
export const OAUTH_ISSUER = "https://app.argos-ci.com";

/**
 * OAuth scopes accepted by the API and the MCP server. Mirrors
 * `scopes_supported` in the authorization server metadata — update both
 * together (source of truth: the argos backend).
 */
export const OAUTH_SCOPES = [
  "profile",
  "projects:read",
  "projects:write",
  "builds:write",
  "reviews:write",
  "comments:read",
  "comments:write",
  "account:admin",
];

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
