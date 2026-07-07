/**
 * Check if any article with an elapsed publish date is missing from the
 * production site. Used by the "Publish scheduled articles" workflow to
 * decide whether to trigger a Vercel deployment.
 *
 * Comparing against the live sitemap (instead of "was an article due in the
 * last 24h") makes the check self-healing: if a scheduled deployment fails,
 * the article is still detected as missing on the next run.
 *
 * Outputs `pending=true|false` in the GitHub Actions output format.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = "https://argos-ci.com";
const ARTICLES_DIR = new URL("../articles", import.meta.url).pathname;

async function getLocalPublishedSlugs() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const slugs = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const source = await readFile(
      join(ARTICLES_DIR, entry.name, "index.mdx"),
      "utf-8",
    );
    const match = source.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
    if (!match) {
      throw new Error(`No date found in frontmatter of ${entry.name}`);
    }
    if (new Date(match[1]) <= new Date()) {
      slugs.push(entry.name);
    }
  }
  return slugs;
}

async function getLiveArticleUrls() {
  const response = await fetch(`${BASE_URL}/blog/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Failed to fetch blog sitemap: ${response.status}`);
  }
  return response.text();
}

const [slugs, sitemap] = await Promise.all([
  getLocalPublishedSlugs(),
  getLiveArticleUrls(),
]);

const missing = slugs.filter(
  (slug) => !sitemap.includes(`${BASE_URL}/blog/${slug}`),
);

if (missing.length > 0) {
  console.error(`Articles pending publication: ${missing.join(", ")}`);
} else {
  console.error("No articles pending publication.");
}

console.log(`pending=${missing.length > 0 ? "true" : "false"}`);
