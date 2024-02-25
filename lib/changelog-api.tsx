import fg from "fast-glob";
import * as matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { readFile } from "node:fs/promises";
import * as React from "react";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { z } from "zod";

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
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
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
  const slug = filepath
    .replace(/^.\/changelogs\//, "")
    .replace(/\/index.mdx$/, "");

  const YYYY_MM_DD = frontmatter.date.toISOString().split("T")[0];
  return {
    filepath,
    title: frontmatter.title,
    description: frontmatter.description,
    slug: `${YYYY_MM_DD}-${slug}`,
    date: frontmatter.date.toISOString(),
    source: await getDocMdxSource(filepath),
  };
}

function validateAllChangelogs(
  changelogs: unknown[],
): asserts changelogs is ChangelogEntry[] {
  if (changelogs.some((changelog) => changelog === null)) {
    throw new Error("Invalid changelog data");
  }
}

export async function getChangelogs(): Promise<ChangelogEntry[]> {
  const files = await fg("./changelogs/**/*.mdx");
  const changelogs = await Promise.all(files.map(getChangelogFromPath));
  validateAllChangelogs(changelogs);
  return changelogs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
}

export async function getChangelogEntryBySlug(
  slug: string,
): Promise<ChangelogEntry | null> {
  const slugWithoutDate = slug.split("-").slice(3).join("-");
  const filepath = `./changelogs/${slugWithoutDate}/index.mdx`;
  return getChangelogFromPath(filepath);
}
