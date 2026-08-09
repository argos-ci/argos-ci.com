import { NextRequest, NextResponse } from "next/server";

/**
 * Markdown for Agents: requests that explicitly accept `text/markdown` get
 * the markdown representation of the page (served by app/md/[[...slug]]);
 * browsers keep getting HTML. Only runs on routes that have a markdown
 * representation (see matcher + lib/markdown.ts).
 */
export default function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    url.pathname = `/md${url.pathname === "/" ? "" : url.pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept");
    return response;
  }
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/pricing",
    "/privacy",
    "/terms",
    "/blog/:path*",
    "/changelog/:path*",
  ],
};
