/**
 * Check if any article or changelog entry with an elapsed publish date is
 * missing from the production site. Used by the "Publish scheduled articles"
 * workflow to decide whether to trigger a Vercel deployment.
 *
 * Comparing against the live sitemaps (instead of "was something due in the
 * last 24h") makes the check self-healing: if a scheduled deployment fails,
 * the content is still detected as missing on the next run.
 *
 * Outputs `pending=true|false` in the GitHub Actions output format.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = "https://argos-ci.com";
const ARTICLES_DIR = new URL("../articles", import.meta.url).pathname;
const CHANGELOGS_DIR = new URL("../changelogs", import.meta.url).pathname;

async function getLocalPublishedArticleUrls() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const urls = [];
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
      urls.push(`${BASE_URL}/blog/${entry.name}`);
    }
  }
  return urls;
}

async function getLocalPublishedChangelogUrls() {
  const entries = await readdir(CHANGELOGS_DIR, { withFileTypes: true });
  const urls = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const match = entry.name.match(/^(\d{4}-\d{2}-\d{2})__(.+)$/);
    if (!match) {
      throw new Error(`Invalid changelog folder name: ${entry.name}`);
    }
    if (new Date(match[1]) <= new Date()) {
      urls.push(`${BASE_URL}/changelog/${match[1]}-${match[2]}`);
    }
  }
  return urls;
}

async function fetchSitemap(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  return response.text();
}

const [articleUrls, changelogUrls, blogSitemap, changelogSitemap] =
  await Promise.all([
    getLocalPublishedArticleUrls(),
    getLocalPublishedChangelogUrls(),
    fetchSitemap("/blog/sitemap.xml"),
    fetchSitemap("/changelog/sitemap.xml"),
  ]);

const missing = [
  ...articleUrls.filter((url) => !blogSitemap.includes(url)),
  ...changelogUrls.filter((url) => !changelogSitemap.includes(url)),
];

if (missing.length > 0) {
  console.error(`Content pending publication: ${missing.join(", ")}`);
} else {
  console.error("No content pending publication.");
}

console.log(`pending=${missing.length > 0 ? "true" : "false"}`);
