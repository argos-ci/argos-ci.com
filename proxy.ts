import { NextRequest, NextResponse } from "next/server";

import { getMarkdownPath } from "@/lib/markdown-paths";

/**
 * Markdown for Agents: requests that explicitly accept `text/markdown` get
 * the markdown representation of the page (served by app/md/[[...slug]]);
 * browsers keep getting HTML. Only runs on routes that have a markdown
 * representation (see matcher + lib/markdown-paths.ts).
 *
 * The `rel="alternate"` links advertising that variant are set in
 * next.config.mjs, not here: a `Link` header set from the proxy replaces the
 * ones the config adds rather than adding to them.
 */
export default function proxy(request: NextRequest) {
  const markdownPath = getMarkdownPath(request.nextUrl.pathname);
  const accept = request.headers.get("accept") ?? "";

  if (markdownPath && accept.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    url.pathname = markdownPath;
    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  // Must stay a static literal for Next to analyze it — mirrors
  // MARKDOWN_PATHS in lib/markdown-paths.ts.
  matcher: [
    "/",
    "/pricing",
    "/privacy",
    "/terms",
    "/blog/:path*",
    "/changelog/:path*",
  ],
};
