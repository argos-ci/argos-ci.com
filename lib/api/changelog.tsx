import fg from "fast-glob";
import Image from "next/image";
import * as React from "react";
import { z } from "zod";

import { Zoom } from "@/components/Zoom";

import { assertAllItems, getDocMdxSource, readMatterData } from "./common";
import { checkIsPublished, showScheduledContent } from "./schedule";

const PAGE_SIZE = 10;

const FrontmatterSchema = z.object({
  homeTitle: z.string().optional(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.date().transform((d) => d.toISOString()),
  image: z.string(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type ChangelogEntry = Frontmatter & {
  filepath: string;
  source: React.ReactNode;
};

async function getChangelogFromPath(
  filepath: string,
): Promise<ChangelogEntry | null> {
  const frontmatter = readMatterData(filepath, FrontmatterSchema);
  if (!frontmatter) {
    return null;
  }
  const YYYY_MM_DD = frontmatter.date.split("T")[0];
  const source = await getDocMdxSource(filepath, {
    components: {
      img: ({ src, height, width, alt }) => {
        return (
          <Zoom>
            <Image
              className="rounded-md"
              src={src as string}
              height={height as number}
              width={width as number}
              alt={alt as string}
              sizes="(max-width: 576px) 100vw, 576px"
            />
          </Zoom>
        );
      },
    },
  });
  return {
    filepath,
    homeTitle: frontmatter.homeTitle,
    title: frontmatter.title,
    description: frontmatter.description,
    slug: `${YYYY_MM_DD}-${frontmatter.slug}`,
    date: frontmatter.date,
    image: frontmatter.image,
    source,
  };
}

/**
 * Scheduled changelog entries (date in the future) are hidden from the
 * production build, following the same rules as scheduled blog articles
 * (see schedule.ts). The date is read from the folder name (YYYY-MM-DD__slug).
 */
function checkIsEntryPublished(filepath: string): boolean {
  const match = filepath.match(/\/(\d{4}-\d{2}-\d{2})__/);
  return !match || checkIsPublished(match[1]);
}

/**
 * Get all the changelog files.
 */
export async function getChangelogFiles() {
  const allFiles = await fg("./changelogs/**/*.mdx");
  const files = showScheduledContent
    ? allFiles
    : allFiles.filter(checkIsEntryPublished);
  files.sort((a, b) => b.localeCompare(a));
  return files;
}

/**
 * Get all the changelog entries.
 */
export async function getChangelogEntries(files: string[]) {
  const entries = await Promise.all(files.map(getChangelogFromPath));
  assertAllItems(entries);
  return entries;
}

const SITE_URL = "https://argos-ci.com";

/**
 * The latest published changelog entries as a JSON Feed
 * (https://jsonfeed.org/version/1.1), newest first. Read from the frontmatter
 * alone: the feed tells what shipped and links to it, it carries no body.
 */
export async function getChangelogFeed(input: { limit: number }) {
  const files = (await getChangelogFiles()).slice(0, input.limit);
  const items = files.map((filepath) => {
    const frontmatter = readMatterData(filepath, FrontmatterSchema);
    if (!frontmatter) {
      throw new Error(`Changelog entry not found: ${filepath}`);
    }
    const url = `${SITE_URL}/changelog/${frontmatter.date.split("T")[0]}-${frontmatter.slug}`;
    return {
      id: url,
      url,
      title: frontmatter.title,
      summary: frontmatter.description,
      image: new URL(frontmatter.image, SITE_URL).href,
      date_published: frontmatter.date,
    };
  });
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "Argos changelog",
    home_page_url: `${SITE_URL}/changelog`,
    feed_url: `${SITE_URL}/changelog.json`,
    items,
  };
}

/**
 * Get the paginated changelogs.
 */
export async function getPaginatedChangelogs(input: { page: number }) {
  const allFiles = await getChangelogFiles();
  const files = allFiles.slice(
    (input.page - 1) * PAGE_SIZE,
    input.page * PAGE_SIZE,
  );
  const hasMore = allFiles.length > input.page * PAGE_SIZE;
  const hasLess = input.page > 1;
  return {
    entries: await getChangelogEntries(files),
    next: hasMore ? input.page + 1 : null,
    previous: hasLess ? input.page - 1 : null,
  };
}

/**
 * Get the number of pages for the changelog.
 */
export function getChangelogPagesCount(nbEntries: number) {
  return Math.ceil(nbEntries / PAGE_SIZE);
}

/**
 * Get the changelog entry by the slug.
 */
export async function getChangelogEntryBySlug(
  urlSlug: string,
): Promise<ChangelogEntry | null> {
  const date = urlSlug.split("-").slice(0, 3).join("-");
  const slug = urlSlug.split("-").slice(3).join("-");
  const filepath = `./changelogs/${date}__${slug}/index.mdx`;
  if (!showScheduledContent && !checkIsEntryPublished(filepath)) {
    return null;
  }
  return getChangelogFromPath(filepath);
}
