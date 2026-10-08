import fg from "fast-glob";
import * as matter from "gray-matter";

/**
 * Scheduled content (publish date in the future) is hidden from the production
 * build. It stays visible in dev and on Vercel preview deployments so it can be
 * reviewed before its release. A Vercel Cron Job redeploys the site shortly
 * after midnight UTC to reveal content whose publish date has elapsed
 * (see app/api/cron/publish-scheduled/route.ts).
 */
export const showScheduledContent =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.SHOW_SCHEDULED_ARTICLES === "true";

/**
 * Check if a publish date has elapsed.
 */
export function checkIsPublished(date: string | Date): boolean {
  return new Date(date) <= new Date();
}

type DatedContent = { pathname: string; date: string | Date };

/**
 * Pathname and publish date of every article and changelog entry.
 */
async function readDatedContent(): Promise<DatedContent[]> {
  const [articleFiles, changelogFiles] = await Promise.all([
    fg("./articles/**/*.mdx"),
    fg("./changelogs/**/*.mdx"),
  ]);
  const content: DatedContent[] = [];
  for (const filepath of articleFiles) {
    const { date } = matter.read(filepath).data;
    if (date) {
      const slug = filepath
        .replace(/^\.\/articles\//, "")
        .replace(/\/index\.mdx$/, "");
      content.push({ pathname: `/blog/${slug}`, date });
    }
  }
  for (const filepath of changelogFiles) {
    // Changelog entries carry their date in the folder name (YYYY-MM-DD__slug).
    const match = filepath.match(/\/(\d{4}-\d{2}-\d{2})__([^/]+)\//);
    if (match) {
      content.push({
        pathname: `/changelog/${match[1]}-${match[2]}`,
        date: match[1],
      });
    }
  }
  return content;
}

let scheduledPathsPromise: Promise<ReadonlySet<string>> | null = null;

/**
 * Pathnames of the content that is not part of this build because its publish
 * date has not elapsed yet. Used to unlink references to it in MDX content
 * (see `getDocMdxSource`), so we never ship a link to a 404.
 */
export function getScheduledPaths(): Promise<ReadonlySet<string>> {
  scheduledPathsPromise ??= readScheduledPaths();
  return scheduledPathsPromise;
}

async function readScheduledPaths(): Promise<ReadonlySet<string>> {
  if (showScheduledContent) {
    return new Set();
  }
  const content = await readDatedContent();
  return new Set(
    content
      .filter(({ date }) => !checkIsPublished(date))
      .map(({ pathname }) => pathname),
  );
}

const SITE_URL = "https://argos-ci.com";

async function fetchLiveSitemap(pathname: string): Promise<string> {
  const response = await fetch(`${SITE_URL}${pathname}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${pathname}: ${response.status}`);
  }
  return response.text();
}

/**
 * Pathnames of the content whose publish date has elapsed but that is missing
 * from the live site, i.e. content waiting for a redeploy to go live.
 *
 * Comparing against the live sitemaps (instead of "was something due since
 * the last run") makes the check self-healing: if a redeploy fails, the
 * content is still detected as missing on the next run.
 */
export async function getPendingPaths(): Promise<string[]> {
  const [content, ...sitemaps] = await Promise.all([
    readDatedContent(),
    fetchLiveSitemap("/blog/sitemap.xml"),
    fetchLiveSitemap("/changelog/sitemap.xml"),
  ]);
  const liveSitemaps = sitemaps.join("\n");
  return content
    .filter(({ date }) => checkIsPublished(date))
    .map(({ pathname }) => pathname)
    .filter(
      (pathname) => !liveSitemaps.includes(`<loc>${SITE_URL}${pathname}</loc>`),
    );
}
