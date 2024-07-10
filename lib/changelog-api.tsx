import rehypeShiki from "@shikijs/rehype";
import fg from "fast-glob";
import * as matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { readFile } from "node:fs/promises";
import * as React from "react";
import rehypeImgSize from "rehype-img-size";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { Zoom } from "@/components/Zoom";

const PAGE_SIZE = 10;

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.date(),
});

export type ChangelogEntry = {
  filepath: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  source: React.ReactNode;
};

function readMatterData(filepath: string) {
  try {
    const { data } = matter.read(filepath);
    return FrontmatterSchema.parse(data);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getDocMdxSource(filepath: string) {
  const source = await readFile(filepath, "utf-8");
  const result = await compileMDX({
    source,
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
    options: {
      mdxOptions: {
        // @ts-ignore
        rehypePlugins: [
          [
            // @ts-ignore
            rehypeShiki,
            {
              themes: {
                dark: "github-dark",
                light: "github-light",
              },
            },
          ],
          // @ts-ignore
          [rehypeImgSize, { dir: "public" }],
        ],
        remarkPlugins: [remarkGfm, remarkFrontmatter],
      },
    },
  });
  return result.content;
}

async function getChangelogFromPath(
  filepath: string,
): Promise<ChangelogEntry | null> {
  const frontmatter = readMatterData(filepath);
  if (!frontmatter) {
    return null;
  }
  const YYYY_MM_DD = frontmatter.date.toISOString().split("T")[0];
  return {
    filepath,
    title: frontmatter.title,
    description: frontmatter.description,
    slug: `${YYYY_MM_DD}-${frontmatter.slug}`,
    date: frontmatter.date.toISOString(),
    source: await getDocMdxSource(filepath),
  };
}

function validateChangelogs(
  changelogs: unknown[],
): asserts changelogs is ChangelogEntry[] {
  if (changelogs.some((changelog) => changelog === null)) {
    throw new Error("Invalid changelog data");
  }
}

export async function getChangelogFiles() {
  const files = await fg("./changelogs/**/*.mdx");
  files.sort((a, b) => b.localeCompare(a));
  return files;
}

export async function getChangelogEntries(files: string[]) {
  const entries = await Promise.all(files.map(getChangelogFromPath));
  validateChangelogs(entries);
  return entries;
}

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

export function getChangelogPagesCount(nbEntries: number) {
  return Math.ceil(nbEntries / PAGE_SIZE);
}

export async function getChangelogEntryBySlug(
  urlSlug: string,
): Promise<ChangelogEntry | null> {
  const date = urlSlug.split("-").slice(0, 3).join("-");
  const slug = urlSlug.split("-").slice(3).join("-");
  const filepath = `./changelogs/${date}__${slug}/index.mdx`;
  return getChangelogFromPath(filepath);
}
