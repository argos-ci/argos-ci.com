import fg from "fast-glob";
import * as matter from "gray-matter";

/**
 * Scheduled content (publish date in the future) is hidden from the production
 * build. It stays visible in dev and on Vercel preview deployments so it can be
 * reviewed before its release. A daily GitHub Actions cron redeploys the site to
 * reveal content whose publish date has elapsed
 * (see .github/workflows/publish-scheduled-articles.yml).
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
  const [articleFiles, changelogFiles] = await Promise.all([
    fg("./articles/**/*.mdx"),
    fg("./changelogs/**/*.mdx"),
  ]);
  const paths = new Set<string>();
  for (const filepath of articleFiles) {
    const { date } = matter.read(filepath).data;
    if (date && !checkIsPublished(date)) {
      const slug = filepath
        .replace(/^\.\/articles\//, "")
        .replace(/\/index\.mdx$/, "");
      paths.add(`/blog/${slug}`);
    }
  }
  for (const filepath of changelogFiles) {
    // Changelog entries carry their date in the folder name (YYYY-MM-DD__slug).
    const match = filepath.match(/\/(\d{4}-\d{2}-\d{2})__([^/]+)\//);
    if (match && !checkIsPublished(match[1])) {
      paths.add(`/changelog/${match[1]}-${match[2]}`);
    }
  }
  return paths;
}
