import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import { MARKDOWN_PAGES, MARKDOWN_ROUTES } from "@/lib/markdown-pages";

/**
 * Every page in MARKDOWN_PAGES must actually be served as markdown. This is
 * what keeps `proxy.ts`'s matcher honest: it is the one copy of the list that
 * cannot import it (Next requires a static literal), so if a page is added
 * here without being added there, negotiation silently falls back to HTML and
 * these tests fail.
 */

/** A path under each entry, so sections are exercised through their matcher. */
const SAMPLE_PATHS: Record<string, string> = {
  "/blog": "/blog/visual-testing",
  "/changelog": "/changelog/2026-07-20-mcp-server",
};

const paths = MARKDOWN_PAGES.flatMap(({ path }) => {
  const sample = SAMPLE_PATHS[path];
  return sample ? [path, sample] : [path];
});

test.describe("Markdown pages", () => {
  for (const path of paths) {
    test(`serves ${path} as markdown when asked`, async ({ request }) => {
      const response = await request.get(path, {
        headers: { accept: "text/markdown" },
      });
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/markdown");
      expect((await response.text()).trim()).not.toBe("");
    });

    test(`serves ${path} as HTML by default, pointing at the markdown`, async ({
      request,
    }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html");
      // Advertised both ways: the Link header and the tag in the document.
      expect(response.headers()["link"]).toContain(
        'rel="alternate"; type="text/markdown"',
      );
      expect(await response.text()).toContain(
        'rel="alternate" type="text/markdown"',
      );
    });
  }

  test("has no markdown for pages outside the list", async ({ request }) => {
    const response = await request.get("/about", {
      headers: { accept: "text/markdown" },
    });
    expect(response.headers()["content-type"]).toContain("text/html");
  });

  test("proxy matcher matches the page list", () => {
    // Read from the source the way Next reads it — statically, without
    // running the module (importing it would pull in next/server). Compared
    // against the canonical list rather than a copy of it, so this can only
    // pass while the two agree.
    const source = readFileSync(join(process.cwd(), "proxy.ts"), "utf-8");
    const literal = source.match(/matcher:\s*\[([\s\S]*?)\]/)?.[1];
    expect(literal, "proxy.ts must export a literal matcher").toBeDefined();
    const matcher = [...literal!.matchAll(/"([^"]+)"/g)].map(([, m]) => m);
    expect(matcher).toEqual(MARKDOWN_ROUTES.map((route) => route.source));
  });
});
