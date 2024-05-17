import rehypeShiki from "@shikijs/rehype";
import fg from "fast-glob";
import * as matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Image, { ImageProps, StaticImageData } from "next/image";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import rehypeImgSize from "rehype-img-size";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import { MainImage } from "@/components/Post";

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  updatedAt: z.date().optional(),
  author: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  category: z.string().optional(),
});

export type Article = {
  filepath: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string | null;
  author: string;
  image: StaticImageData;
  imageAlt: string;
  slug: string;
  category?: string;
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

async function readImage(filepath: string, imagepath: string) {
  const dir = dirname(filepath).replace(/^.\/articles\//, "");
  const fullImagePath = join(dir, imagepath);
  const { default: image } = await import(`../articles/${fullImagePath}`);
  return image as StaticImageData;
}

async function getArticleDataFromPath(
  filepath: string,
): Promise<Article | null> {
  const frontmatter = readMatterData(filepath);
  if (!frontmatter) {
    return null;
  }
  const image = await readImage(filepath, frontmatter.image);
  const slug = filepath
    .replace(/^.\/articles\//, "")
    .replace(/\/index.mdx$/, "");

  return {
    filepath,
    image,
    imageAlt: frontmatter.imageAlt,
    title: frontmatter.title,
    description: frontmatter.description,
    slug,
    date: frontmatter.date.toISOString(),
    updatedAt: frontmatter.updatedAt?.toISOString() ?? null,
    author: frontmatter.author,
    category: frontmatter.category,
  };
}

function validateAllArticles(
  articles: unknown[],
): asserts articles is Article[] {
  if (articles.some((article) => article === null)) {
    throw new Error("Invalid article data");
  }
}

export const getArticles = async (): Promise<Article[]> => {
  const files = await fg("./articles/**/*.mdx");
  const articles = await Promise.all(files.map(getArticleDataFromPath));
  validateAllArticles(articles);
  return articles.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
};

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filepath = `./articles/${slug}/index.mdx`;
  return getArticleDataFromPath(filepath);
}

export async function getDocMdxSource(article: Article) {
  const source = await readFile(article.filepath, "utf-8");
  const result = await compileMDX({
    source,
    components: {
      img: ({ src, height, width, alt }) => {
        return (
          <Image
            className="rounded-md"
            src={src as string}
            height={height as number}
            width={width as number}
            alt={alt as string}
            sizes="(max-width: 900px) 100vw, 832px"
          />
        );
      },
      Image: (props: ImageProps) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image {...props} />;
      },
      MainImage: ({ credit }: { credit: React.ReactNode }) => {
        return (
          <MainImage
            width={article.image.width}
            height={article.image.height}
            src={article.image.src}
            alt={article.imageAlt}
            credit={credit}
          />
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
