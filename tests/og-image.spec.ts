import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import { getOgTheme } from "@/app/api/og/theme";

/**
 * Every page in the sitemap gets a themed social image: a section label and
 * its own tile, from `app/api/og/theme.ts`. A new section without an entry
 * there would silently fall back to the homepage's look, with no label.
 */
const sitemap = readFileSync(
  join(process.cwd(), "public/main-sitemap.xml"),
  "utf8",
);
const paths = Array.from(
  sitemap.matchAll(/<loc>https:\/\/argos-ci\.com(\/[^<]*)<\/loc>/g),
  (match) => match[1]!,
).filter((path) => path !== "/");

test.describe("Social image themes", () => {
  test("reads pages from the sitemap", () => {
    expect(paths.length).toBeGreaterThan(20);
  });

  for (const path of paths) {
    test(`labels the social image of ${path}`, () => {
      expect(getOgTheme(path).eyebrow).toBeTruthy();
    });
  }
});
