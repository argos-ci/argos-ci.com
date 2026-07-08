import { type NextRequest, NextResponse } from "next/server";

const DOCS_PROXY = "https://proxy.gitbook.site/sites/site_S9wzD";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    const rest = pathname.slice("/docs".length);
    const url = new URL(DOCS_PROXY + rest + request.nextUrl.search);

    // Tell GitBook exactly which content URL to resolve via `x-gitbook-url`, its
    // highest-priority signal. By default GitBook derives the content URL from
    // `x-forwarded-host`, which Vercel sets to `argos-ci.com` on production requests;
    // combined with the rewritten `/sites/<id>` path that resolves to "Domain not found".
    // Setting the header makes resolution deterministic and independent of the forwarded host.
    const headers = new Headers(request.headers);
    headers.set("x-gitbook-url", url.toString());

    return NextResponse.rewrite(url, { request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs", "/docs/:path*"],
};
