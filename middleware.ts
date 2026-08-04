import { NextResponse, type NextRequest } from "next/server";

const DOCS_PROXY = "https://proxy.gitbook.site/sites/site_S9wzD";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    const rest = pathname.slice("/docs".length);
    const url = new URL(DOCS_PROXY + rest + request.nextUrl.search);
    console.log(`[middleware] rewriting ${pathname} -> ${url.toString()}`, {
      headers: Object.fromEntries(request.headers),
    });
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs", "/docs/:path*"],
};
