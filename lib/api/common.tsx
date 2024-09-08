import rehypeShiki from "@shikijs/rehype";
import * as matter from "gray-matter";
import { MDXRemoteProps, compileMDX } from "next-mdx-remote/rsc";
import { readFile } from "node:fs/promises";
import rehypeImgSize from "rehype-img-size";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { ZodSchema, ZodType } from "zod";

/**
 * Read the frontmatter data from a file.
 */
export function readMatterData<T>(
  filepath: string,
  schema: ZodType<T, any, any>,
): T | null {
  try {
    const { data } = matter.read(filepath);
    return schema.parse(data);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

/**
 * Get the MDX source of a MDX file.
 */
export async function getDocMdxSource(
  filepath: string,
  options: Pick<MDXRemoteProps, "components">,
) {
  const source = await readFile(filepath, "utf-8");
  const result = await compileMDX({
    source,
    components: options.components,
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

/**
 * Assert that all the items in an array are not null.
 */
export function assertAllItems<T>(items: (T | null)[]): asserts items is T[] {
  if (items.some((item) => item === null)) {
    throw new Error("Invalid data");
  }
}
