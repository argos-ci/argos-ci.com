import { NextRequest, NextResponse } from "next/server";

import { getMarkdownPath } from "@/lib/markdown-pages";

/**
 * Markdown for Agents: requests that explicitly accept `text/markdown` get
 * the markdown representation of the page (served by app/md/[[...slug]]);
 * browsers keep getting HTML. Only runs on pages that have one
 * (see matcher + lib/markdown-pages.ts).
 *
 * The `rel="alternate"` links advertising that variant are set in
 * next.config.ts, not here: a `Link` header set from the proxy replaces the
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
  // The one copy of the page list that can't import it: Next reads this
  // without running the file, so it must be a static literal. It mirrors
  // MARKDOWN_ROUTES in lib/markdown-pages.ts, and tests/markdown-pages.spec.ts
  // fails if the two drift apart.
  matcher: [
    "/",
    "/media-sharing",
    "/pricing",
    "/privacy",
    "/terms",
    "/blog/:path*",
    "/changelog/:path*",
  ],
};
