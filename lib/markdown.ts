import { readFile } from "node:fs/promises";
import { join } from "node:path";

import * as matter from "gray-matter";

import { COMPARISONS } from "@/app/compare/comparisons";
import {
  ADDITIONAL_FEATURES_AFTER,
  type CompareSlug,
  type Comparison,
  FEATURE_DEFINITIONS,
} from "@/app/compare/features";
import { MEDIA_SHARING_QUESTIONS } from "@/app/media-sharing/faq";
import { PRICING_QUESTIONS } from "@/app/pricing/PricingFaq";
import { GDPR_FEATURES, GDPR_RIGHTS } from "@/app/security/gdpr-features";
import { SECURITY_HIGHLIGHTS } from "@/app/security/security-controls";
import { SECURITY_QUESTIONS } from "@/app/security/security-faq";
import type { FAQQuestion } from "@/components/FAQAccordion";

import { SITE_URL } from "./agents";
import {
  Categories,
  checkIsCategorySlug,
  getArticleBySlug,
  getArticles,
} from "./api/blog";
import {
  getChangelogEntries,
  getChangelogEntryBySlug,
  getChangelogFiles,
} from "./api/changelog";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_MEDIA_IMAGE_SCREENSHOT_COUNT,
  ARGOS_MEDIA_VIDEO_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
  SAML_SSO_PRICE,
} from "./constants";
import { findMarkdownPage, type MarkdownPagePath } from "./markdown-pages";
import {
  COMPETITORS,
  type CompetitorSlug,
  getArgosProPricing,
  getCompetitorPrice,
} from "./pricing";

/**
 * Markdown representations of the site's pages, served when a request prefers
 * `Accept: text/markdown` (see proxy.ts) or hits /md/* directly. Blog articles
 * and changelog entries come from their MDX sources; static marketing pages
 * are curated documents in app/markdown/; the compare and security pages are
 * rendered from the data modules their HTML is built from.
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

/**
 * A hand-curated page from `app/markdown/`, followed by the page's FAQ. The
 * curated file must not contain the FAQ itself: the questions are rendered
 * from the same array the page's `FAQAccordion` uses, so they can't drift.
 */
async function getCuratedPageMarkdown(
  name: string,
  questions: FAQQuestion[],
): Promise<string> {
  const page = await readCuratedPage(name);
  return [page.trimEnd(), "", faqMarkdown(questions)].join("\n");
}

function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

function absoluteUrl(href: string): string {
  return href.startsWith("/") ? `${SITE_URL}${href}` : href;
}

/**
 * The FAQ text answers are written for FAQPage JSON-LD, where a few carry
 * `<a>` tags; render those as markdown links and drop any other tag.
 */
function htmlToMarkdown(html: string): string {
  return html
    .replace(
      /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
      (_match, href: string, text: string) => `[${text}](${absoluteUrl(href)})`,
    )
    .replace(/<[^>]+>/g, "");
}

function faqMarkdown(questions: FAQQuestion[]): string {
  const lines = ["## Frequently asked questions", ""];
  for (const question of questions) {
    lines.push(
      `### ${question.name}`,
      "",
      htmlToMarkdown(question.textAnswer),
      "",
    );
  }
  return lines.join("\n");
}

const LEGAL_TITLES = {
  dpa: "Data Processing Agreement",
  privacy: "Privacy policy",
  terms: "Terms of service",
} as const;

async function getLegalMarkdown(
  page: keyof typeof LEGAL_TITLES,
): Promise<string> {
  const source = await readCuratedPage(`${page}.mdx`);
  const title = LEGAL_TITLES[page];
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

- Up to ${formatCount(ARGOS_HOBBY_SCREENSHOT_COUNT)} screenshots per month
- Visual and snapshot testing, GitHub/GitLab integration, community support
- Media sharing (${SITE_URL}/media-sharing): public share pages, 30-day retention, 50 MB per file

## Pro — $${ARGOS_PRO_FLAT_PRICE}/month

For teams. 14-day free trial.

- Includes ${formatCount(ARGOS_PRO_FLAT_SCREENSHOT_COUNT)} screenshots per month
- Extra screenshots: $${ARGOS_SCREENSHOT_PRICE} each ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook screenshots)
- Unlimited team members and projects, Slack notifications, priority support
- Media sharing: team-scoped or public share pages, 1-year retention, 500 MB per file
- Add-ons: GitHub Single Sign-On ($${GITHUB_SSO_PRICE}/month), SAML SSO ($${SAML_SSO_PRICE}/month)

Media uploads draw on the screenshot allowance rather than a separate quota:
an uploaded image counts as ${ARGOS_MEDIA_IMAGE_SCREENSHOT_COUNT} screenshot, an uploaded video as ${ARGOS_MEDIA_VIDEO_SCREENSHOT_COUNT}, and
re-uploading identical bytes is free.

## Enterprise — custom

For organizations with specific needs: custom screenshot volume, 99.99% uptime
SLA, SSO/SAML, dedicated support, invoicing.
[Contact us](${SITE_URL}/contact/sale).
`,
    faqMarkdown(PRICING_QUESTIONS),
    `Full details: ${SITE_URL}/pricing
`,
  ].join("\n");
}

function formatFeatureCell(value: string): string {
  if (value === "✔️") {
    return "Yes";
  }
  if (value === "❌") {
    return "No";
  }
  return value;
}

function featureRowMarkdown(row: {
  title: string;
  description: string;
  href?: string;
  argos: string;
  competitor: string;
}): string {
  const title = row.href
    ? `**[${row.title}](${absoluteUrl(row.href)})**`
    : `**${row.title}**`;
  return `| ${title} — ${row.description} | ${formatFeatureCell(row.argos)} | ${formatFeatureCell(row.competitor)} |`;
}

/** Volumes at which the pricing section quotes both tools. */
const PRICING_SAMPLE_VOLUMES = [10_000, 50_000, 100_000];

function isCompetitorSlug(slug: string): slug is CompetitorSlug {
  return slug in COMPETITORS;
}

/**
 * The pricing estimate of a compare page, for the competitors whose public
 * prices the page's calculator knows. States the assumptions the calculator
 * makes so the numbers can be checked.
 */
function getComparePricingMarkdown(comparison: Comparison): string | null {
  if (!isCompetitorSlug(comparison.slug)) {
    return null;
  }
  const slug = comparison.slug;
  const competitor = COMPETITORS[slug];
  const tiers = competitor.steps
    .map(
      (step) =>
        `$${step.price}/month for ${formatCount(step.screenshots)} screenshots`,
    )
    .join(", then ");
  const lines = [
    "## Pricing",
    "",
    `Argos Pro is $${ARGOS_PRO_FLAT_PRICE}/month including ${formatCount(ARGOS_PRO_FLAT_SCREENSHOT_COUNT)} screenshots, then $${ARGOS_SCREENSHOT_PRICE} per extra screenshot ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook screenshots). The estimate uses the same assumptions as the calculator on the page: ${competitor.name} at ${tiers}, and $${competitor.screenshotPrice} per additional screenshot.`,
    "",
    `| Screenshots per month | Argos | ${comparison.name} |`,
    "| --- | --- | --- |",
    ...PRICING_SAMPLE_VOLUMES.map((volume) => {
      const usage = { screenshots: volume, storybookScreenshots: 0 };
      return `| ${formatCount(volume)} | $${formatCount(getArgosProPricing(usage).price)} | $${formatCount(getCompetitorPrice(slug, usage))} |`;
    }),
    "",
  ];
  if (comparison.pricingNote) {
    lines.push(comparison.pricingNote, "");
  }
  lines.push(`Argos pricing in full: ${SITE_URL}/pricing`, "");
  return lines.join("\n");
}

function getCompareMarkdown(slug: CompareSlug): string {
  const { comparison, questions } = COMPARISONS[slug];
  const lines = [
    docHeader({
      title: comparison.title,
      description: comparison.description,
      canonical: `${SITE_URL}/compare/${slug}`,
    }),
    `Migration guide: ${SITE_URL}${comparison.migrationHref}`,
    "",
    "## Feature comparison",
    "",
    `| Feature | Argos | ${comparison.name} |`,
    "| --- | --- | --- |",
  ];
  for (const definition of FEATURE_DEFINITIONS) {
    const feature = comparison.features[definition.key];
    if (!feature) {
      continue;
    }
    lines.push(
      featureRowMarkdown({
        title: definition.title,
        description: definition.description,
        href: definition.href,
        argos: feature.argos,
        competitor: feature.competitor,
      }),
    );
    if (definition.key === ADDITIONAL_FEATURES_AFTER) {
      for (const additional of comparison.additionalFeatures ?? []) {
        lines.push(featureRowMarkdown(additional));
      }
    }
  }
  lines.push("");
  const pricing = getComparePricingMarkdown(comparison);
  if (pricing) {
    lines.push(pricing);
  }
  lines.push(
    faqMarkdown(questions),
    `Ready to switch to Argos? Get started for free, no credit card required: https://app.argos-ci.com/signup`,
    "",
  );
  return lines.join("\n");
}

/**
 * The security page. Its prose is hand-written here (keep it in step with
 * app/security/page.tsx); the lists come from the page's data modules.
 */
function getSecurityMarkdown(): string {
  return [
    docHeader({
      title: "Security you can audit",
      description:
        "SOC 2 Type II, GDPR compliant, and fully open source. We protect your data with strong controls, and let you verify every one of them.",
      canonical: `${SITE_URL}/security`,
    }),
    "## Compliance",
    "",
    `- SOC 2 Type II — independently audited security controls. Request the report from the trust center: ${SITE_URL}/trust-center`,
    "- GDPR compliant — privacy and data protection for the EU.",
    "",
    "## How we keep your data safe",
    "",
    "The essentials, without the security-theater checklist. Every claim below is enforced in code you can read.",
    "",
    ...SECURITY_HIGHLIGHTS.map(
      (highlight) => `- **${highlight.title}** — ${highlight.description}`,
    ),
    "",
    "## SOC 2 Type II",
    "",
    "SOC 2 is the AICPA framework for how organizations manage customer data across security, availability, processing integrity, confidentiality, and privacy. Type II verifies our controls work over time, not just on paper. This is a long-term security investment, not a short-term growth play.",
    "",
    "- Framework: AICPA SOC 2 Type II",
    "- Auditor: Prescient Security (https://prescientassurance.com)",
    "- Continuous monitoring: Vanta (https://vanta.com)",
    `- Report: ${SITE_URL}/trust-center`,
    "",
    "## GDPR",
    "",
    "Many of our customers are based in Europe or serve European users. We align our operations with GDPR, from how we handle data to how we design our systems. Data is stored in the US and replicated to the EU, with Standard Contractual Clauses covering lawful transfers.",
    "",
    "GDPR gives individuals the right to:",
    "",
    ...GDPR_RIGHTS.map((right) => `- ${right}`),
    "",
    ...GDPR_FEATURES.map(
      (feature) => `- **${feature.title}** — ${feature.description}`,
    ),
    "",
    `Privacy policy: ${SITE_URL}/privacy · Data Processing Agreement: ${SITE_URL}/dpa`,
    "",
    "## Responsible disclosure",
    "",
    "We value input from the community to help us detect vulnerabilities. If you believe you have found a security issue, please follow our disclosure policy to report it: https://github.com/argos-ci/argos/security/policy",
    "",
    faqMarkdown(SECURITY_QUESTIONS),
  ].join("\n");
}

/**
 * How each markdown page renders itself, from the path segments below it.
 * Typed by `MarkdownPagePath`, so adding a page to `MARKDOWN_PAGES` doesn't
 * compile until it has a resolver here.
 */
const resolvers: Record<
  MarkdownPagePath,
  (rest: string[]) => Promise<string | null> | string | null
> = {
  "/": () => readCuratedPage("home.md"),
  "/media-sharing": (rest) =>
    rest.length === 0
      ? getCuratedPageMarkdown("media-sharing.md", MEDIA_SHARING_QUESTIONS)
      : null,
  "/pricing": (rest) => (rest.length === 0 ? getPricingMarkdown() : null),
  "/security": (rest) => (rest.length === 0 ? getSecurityMarkdown() : null),
  "/compare/applitools": (rest) =>
    rest.length === 0 ? getCompareMarkdown("applitools") : null,
  "/compare/backstopjs": (rest) =>
    rest.length === 0 ? getCompareMarkdown("backstopjs") : null,
  "/compare/chromatic": (rest) =>
    rest.length === 0 ? getCompareMarkdown("chromatic") : null,
  "/compare/percy": (rest) =>
    rest.length === 0 ? getCompareMarkdown("percy") : null,
  "/compare/playwright": (rest) =>
    rest.length === 0 ? getCompareMarkdown("playwright") : null,
  "/dpa": (rest) => (rest.length === 0 ? getLegalMarkdown("dpa") : null),
  "/privacy": (rest) =>
    rest.length === 0 ? getLegalMarkdown("privacy") : null,
  "/terms": (rest) => (rest.length === 0 ? getLegalMarkdown("terms") : null),
  "/blog": (rest) => {
    if (rest.length === 0 || rest[0] === "page") {
      return getBlogIndexMarkdown();
    }
    if (rest[0] === "category" && rest[1]) {
      return getBlogIndexMarkdown(rest[1]);
    }
    return getArticleMarkdown(rest.join("/"));
  },
  "/changelog": (rest) => {
    if (rest.length === 0 || rest[0] === "page") {
      return getChangelogIndexMarkdown();
    }
    return getChangelogMarkdown(rest.join("/"));
  },
};

/**
 * Resolve the markdown representation of a site pathname (without the leading
 * slash). Returns null when the page has no markdown representation.
 */
export async function getPageMarkdown(path: string): Promise<string | null> {
  const page = findMarkdownPage(`/${path}`);
  return page ? resolvers[page.path](page.rest) : null;
}
