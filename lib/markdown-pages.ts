/**
 * The pages that exist as markdown as well as HTML, defined once.
 *
 * Four things have to agree about this list, and they live far apart, so it
 * belongs here rather than in any of them:
 *
 * - `next.config.ts` advertises the markdown variant with `Link` headers
 * - `lib/metadata.tsx` advertises it again with a `rel="alternate"` tag
 * - `lib/markdown.ts` renders it
 * - `proxy.ts` rewrites `Accept: text/markdown` requests to it
 *
 * Adding an entry covers the first two. The third is enforced by the compiler:
 * `lib/markdown.ts` maps every `MarkdownPagePath` to a resolver, so a new page
 * fails to build until it can be rendered. The fourth is enforced by
 * `tests/markdown-pages.spec.ts`, because Next requires `proxy.ts`'s matcher
 * to be a static literal it can read without running the code.
 *
 * Keep this module dependency-free: `next.config.ts` imports it at config
 * load, and `proxy.ts` in the edge runtime.
 */

type MarkdownPage = {
  /** Path of the HTML page. */
  path: string;
  /** Whether descendants are included too, as in `/blog/:slug`. */
  section: boolean;
};

export const MARKDOWN_PAGES = [
  { path: "/", section: false },
  { path: "/pricing", section: false },
  { path: "/privacy", section: false },
  { path: "/terms", section: false },
  { path: "/blog", section: true },
  { path: "/changelog", section: true },
] as const satisfies readonly MarkdownPage[];

/** Path of a page that has a markdown representation. */
export type MarkdownPagePath = (typeof MARKDOWN_PAGES)[number]["path"];

/** Where the markdown representation of a page path is served. */
function toMarkdownPath(path: string): string {
  return path === "/" ? "/md" : `/md${path}`;
}

/**
 * Every markdown page as a Next route pattern (`source` in next.config,
 * `matcher` in proxy.ts) paired with the markdown path it maps to. `:path*`
 * matches zero or more segments, so a section also covers its own index.
 */
export const MARKDOWN_ROUTES = MARKDOWN_PAGES.map(({ path, section }) => ({
  source: section ? `${path}/:path*` : path,
  markdown: section ? `${toMarkdownPath(path)}/:path*` : toMarkdownPath(path),
}));

/**
 * The markdown page a pathname belongs to, with the path segments below it —
 * `/blog/foo/bar` resolves to the `/blog` page with `["foo", "bar"]`.
 */
export function findMarkdownPage(
  pathname: string,
): { path: MarkdownPagePath; rest: string[] } | null {
  const segments = pathname.split("/").filter(Boolean);
  const page = MARKDOWN_PAGES.find(({ path, section }) =>
    path === "/"
      ? segments.length === 0
      : segments[0] === path.slice(1) && (section || segments.length === 1),
  );
  if (!page) {
    return null;
  }
  return {
    path: page.path,
    rest: page.path === "/" ? [] : segments.slice(1),
  };
}

/**
 * URL path of the markdown representation of a pathname, or null when it has
 * none. The same document is what `Accept: text/markdown` returns from the
 * page's own URL; this is its directly addressable form.
 */
export function getMarkdownPath(pathname: string): string | null {
  const path = pathname.replace(/\/$/, "") || "/";
  return findMarkdownPage(path) ? toMarkdownPath(path) : null;
}
