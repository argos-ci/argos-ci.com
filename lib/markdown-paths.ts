/**
 * Which pages have a markdown representation, and where it lives.
 *
 * Single source of truth for the three places that need to agree: the
 * `Accept: text/markdown` rewrite (proxy.ts), the `rel="alternate"` links that
 * advertise the markdown variant (lib/metadata.tsx), and the resolver that
 * actually renders it (lib/markdown.ts).
 */

/**
 * Path prefixes served as markdown. Keep in sync with `proxy.ts`'s matcher,
 * which must stay a static literal for Next to analyze it.
 */
const MARKDOWN_PATHS = [
  "/",
  "/pricing",
  "/privacy",
  "/terms",
  "/blog",
  "/changelog",
];

/** Whether a pathname has a markdown representation under /md. */
function checkHasMarkdown(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return MARKDOWN_PATHS.some(
    (prefix) =>
      path === prefix || (prefix !== "/" && path.startsWith(`${prefix}/`)),
  );
}

/**
 * URL of the markdown representation of a pathname, or null when it has none.
 * The same document is served from the page's own URL with
 * `Accept: text/markdown`; this is its directly addressable form.
 */
export function getMarkdownPath(pathname: string): string | null {
  if (!checkHasMarkdown(pathname)) {
    return null;
  }
  const path = pathname.replace(/\/$/, "");
  return `/md${path}`;
}
