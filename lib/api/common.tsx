import { readFile } from "node:fs/promises";

import rehypeShiki from "@shikijs/rehype";
import * as matter from "gray-matter";
import { MDXRemoteProps, compileMDX } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import rehypeImgSize from "rehype-img-size";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { ZodType, type output } from "zod";

import { getScheduledPaths } from "./schedule";

/**
 * Read the frontmatter data from a file.
 */
export function readMatterData<T extends ZodType>(
  filepath: string,
  schema: T,
): output<T> | null {
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

const SITE_URL = "https://argos-ci.com";

/**
 * Get the pathname of an internal link, or `null` if the href points somewhere
 * else (external site, anchor, mailto, …).
 */
function getInternalPathname(href: string): string | null {
  const path = href.startsWith(`${SITE_URL}/`)
    ? href.slice(SITE_URL.length)
    : href;
  if (!path.startsWith("/")) {
    return null;
  }
  return path.replace(/[?#].*$/, "").replace(/\/$/, "");
}

/**
 * Anchor used for links in MDX content. Links pointing to content that is not
 * published yet are rendered as plain text instead of a link to a 404. They
 * become real links again on their own once the publish date has elapsed and the
 * site is rebuilt (see `getScheduledPaths`).
 */
function createMdxAnchor(scheduledPaths: ReadonlySet<string>) {
  return function MdxAnchor({ href, children, ...props }: ComponentProps<"a">) {
    const pathname = href ? getInternalPathname(href) : null;
    if (pathname && scheduledPaths.has(pathname)) {
      return <>{children}</>;
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
}

/**
 * Get the MDX source of a MDX file.
 */
export async function getDocMdxSource(
  filepath: string,
  options: Pick<MDXRemoteProps, "components"> &
    Pick<NonNullable<MDXRemoteProps["options"]>, "scope">,
) {
  const [source, scheduledPaths] = await Promise.all([
    readFile(filepath, "utf-8"),
    getScheduledPaths(),
  ]);
  const result = await compileMDX({
    source,
    components: { a: createMdxAnchor(scheduledPaths), ...options.components },
    options: {
      scope: options.scope,
      blockJS: false,
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
