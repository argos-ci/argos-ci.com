import fg from "fast-glob";
import Image from "next/image";
import * as React from "react";
import { z } from "zod";

import { Zoom } from "@/components/Zoom";

import { assertAllItems, getDocMdxSource, readMatterData } from "./common";

const PAGE_SIZE = 10;

const FrontmatterSchema = z.object({
  homeTitle: z.string().optional(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.date().transform((d) => d.toISOString()),
  image: z.string().optional(),
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
  const [source] = await Promise.all([
    getDocMdxSource(filepath, {
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
    }),
  ]);
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
 * Get all the changelog files.
 */
export async function getChangelogFiles() {
  const files = await fg("./changelogs/**/*.mdx");
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
  return getChangelogFromPath(filepath);
}
