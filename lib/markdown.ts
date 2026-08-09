import { readFile } from "node:fs/promises";
import { join } from "node:path";

import * as matter from "gray-matter";

import { SITE_URL } from "./agents";
import { Categories, checkIsCategorySlug, getArticles } from "./api/blog";
import { getArticleBySlug } from "./api/blog";
import {
  getChangelogEntries,
  getChangelogEntryBySlug,
  getChangelogFiles,
} from "./api/changelog";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
  SAML_SSO_PRICE,
} from "./constants";

/**
 * Markdown representations of the site's pages, served when a request prefers
 * `Accept: text/markdown` (see proxy.ts) or hits /md/* directly. Blog articles
 * and changelog entries come from their MDX sources; static marketing pages
 * are curated documents in app/markdown/.
 *
 * Publish scheduling is enforced by reusing getArticleBySlug /
 * getChangelogEntryBySlug, which hide content whose date has not elapsed.
 */

/** Standard document header so every markdown page is self-describing. */
function docHeader(props: {
  title: string;
  description?: string;
  canonical: string;
  date?: string;
}): string {
  const lines = [`# ${props.title}`, ""];
  if (props.description) {
    lines.push(`> ${props.description}`, "");
  }
  if (props.date) {
    lines.push(`Published: ${props.date.split("T")[0]}`);
  }
  lines.push(`Canonical: ${props.canonical}`, "");
  return lines.join("\n");
}

/**
 * Reduce an MDX source to plain markdown: drop the frontmatter and the
 * top-level import/export statements. Our articles and changelog entries are
 * otherwise plain markdown.
 */
function mdxToMarkdown(source: string): string {
  const { content } = matter.default(source);
  return content
    .replace(/^(import|export)\s[^\n]*(\n|$)/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function readCuratedPage(name: string): Promise<string> {
  const filepath = join(process.cwd(), "app", "markdown", name);
  return readFile(filepath, "utf-8");
}

async function getLegalMarkdown(page: "privacy" | "terms"): Promise<string> {
  const source = await readCuratedPage(`${page}.mdx`);
  const title = page === "privacy" ? "Privacy policy" : "Terms of service";
  return [
    docHeader({ title, canonical: `${SITE_URL}/${page}` }),
    mdxToMarkdown(source),
    "",
  ].join("\n");
}

async function getArticleMarkdown(slug: string): Promise<string | null> {
  const article = await getArticleBySlug(slug);
  if (!article) {
    return null;
  }
  const source = await readFile(article.filepath, "utf-8");
  return [
    docHeader({
      title: article.title,
      description: article.description,
      canonical: `${SITE_URL}/blog/${article.slug}`,
      date: article.date,
    }),
    `Author: ${article.author.name} · Category: ${article.category.title}`,
    "",
    mdxToMarkdown(source),
    "",
  ].join("\n");
}

async function getChangelogMarkdown(urlSlug: string): Promise<string | null> {
  const entry = await getChangelogEntryBySlug(urlSlug);
  if (!entry) {
    return null;
  }
  const source = await readFile(entry.filepath, "utf-8");
  return [
    docHeader({
      title: entry.title,
      description: entry.description,
      canonical: `${SITE_URL}/changelog/${urlSlug}`,
      date: entry.date,
    }),
    mdxToMarkdown(source),
    "",
  ].join("\n");
}

async function getBlogIndexMarkdown(category?: string): Promise<string | null> {
  if (category && !checkIsCategorySlug(category)) {
    return null;
  }
  const articles = await getArticles(
    category && checkIsCategorySlug(category) ? { category } : undefined,
  );
  const title = category
    ? Categories[category as keyof typeof Categories].pageTitle
    : "Argos Blog";
  const lines = [
    docHeader({
      title,
      description:
        "Guides, product news, and engineering posts from the Argos team. Every post is available as markdown: request it with `Accept: text/markdown`.",
      canonical: `${SITE_URL}/blog${category ? `/category/${category}` : ""}`,
    }),
  ];
  for (const article of articles) {
    lines.push(
      `- [${article.title}](${SITE_URL}/blog/${article.slug}) — ${article.date.split("T")[0]}`,
      `  ${article.description}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function getChangelogIndexMarkdown(): Promise<string> {
  const files = await getChangelogFiles();
  const entries = await getChangelogEntries(files);
  const lines = [
    docHeader({
      title: "Argos Changelog",
      description:
        "New features and improvements shipped in Argos, most recent first. Every entry is available as markdown: request it with `Accept: text/markdown`.",
      canonical: `${SITE_URL}/changelog`,
    }),
  ];
  for (const entry of entries) {
    const date = entry.date.split("T")[0];
    lines.push(
      `- [${entry.title}](${SITE_URL}/changelog/${date}-${entry.slug}) — ${date}`,
      `  ${entry.description}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function getPricingMarkdown(): string {
  return [
    docHeader({
      title: "Argos Pricing",
      description: "Simple pricing that scales with your usage.",
      canonical: `${SITE_URL}/pricing`,
    }),
    `## Hobby — free

For personal projects and experiments.

- Up to ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots per month
- Visual and snapshot testing, GitHub/GitLab integration, community support

## Pro — $${ARGOS_PRO_FLAT_PRICE}/month

For teams. 14-day free trial.

- Includes ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots per month
- Extra screenshots: $${ARGOS_SCREENSHOT_PRICE} each ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook screenshots)
- Unlimited team members and projects, Slack notifications, priority support
- Add-ons: GitHub Single Sign-On ($${GITHUB_SSO_PRICE}/month), SAML SSO ($${SAML_SSO_PRICE}/month)

## Enterprise — custom

For organizations with specific needs: custom screenshot volume, 99.99% uptime
SLA, SSO/SAML, dedicated support, invoicing.
[Contact us](${SITE_URL}/contact/sale).

Full details and FAQ: ${SITE_URL}/pricing
`,
  ].join("\n");
}

/**
 * Resolve the markdown representation of a site pathname (without the leading
 * slash). Returns null when the page has no markdown representation.
 */
export async function getPageMarkdown(path: string): Promise<string | null> {
  const segments = path.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (segments.length === 0) {
    return readCuratedPage("home.md");
  }

  switch (first) {
    case "pricing":
      return rest.length === 0 ? getPricingMarkdown() : null;
    case "privacy":
      return rest.length === 0 ? getLegalMarkdown("privacy") : null;
    case "terms":
      return rest.length === 0 ? getLegalMarkdown("terms") : null;
    case "blog": {
      if (rest.length === 0 || rest[0] === "page") {
        return getBlogIndexMarkdown();
      }
      if (rest[0] === "category" && rest[1]) {
        return getBlogIndexMarkdown(rest[1]);
      }
      return getArticleMarkdown(rest.join("/"));
    }
    case "changelog": {
      if (rest.length === 0 || rest[0] === "page") {
        return getChangelogIndexMarkdown();
      }
      return getChangelogMarkdown(rest.join("/"));
    }
    default:
      return null;
  }
}
