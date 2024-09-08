import fg from "fast-glob";
import Image, { ImageProps, StaticImageData } from "next/image";
import { dirname, join } from "node:path";
import { z } from "zod";

import { MainImage } from "@/components/Post";

import { assertAllItems, getDocMdxSource, readMatterData } from "./common";

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date().transform((d) => d.toISOString()),
  updatedAt: z
    .date()
    .optional()
    .transform((d) => d?.toISOString() ?? null),
  author: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  category: z.string().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Article = Omit<Frontmatter, "image"> & {
  image: StaticImageData;
  filepath: string;
  slug: string;
};

/**
 * Read the image from the file.
 */
async function readImage(filepath: string, imagepath: string) {
  const dir = dirname(filepath).replace(/^.\/articles\//, "");
  const fullImagePath = join(dir, imagepath);
  const { default: image } = await import(`../../articles/${fullImagePath}`);
  return image as StaticImageData;
}

/**
 * Get the article data from the file path.
 */
async function getArticleDataFromPath(
  filepath: string,
): Promise<Article | null> {
  const frontmatter = readMatterData(filepath, FrontmatterSchema);
  if (!frontmatter) {
    return null;
  }
  const image = await readImage(filepath, frontmatter.image);
  const slug = filepath
    .replace(/^.\/articles\//, "")
    .replace(/\/index.mdx$/, "");

  return {
    ...frontmatter,
    filepath,
    image,
    slug,
  };
}

/**
 * Get all the articles.
 */
export async function getArticles(): Promise<Article[]> {
  const files = await fg("./articles/**/*.mdx");
  const articles = await Promise.all(files.map(getArticleDataFromPath));
  assertAllItems(articles);
  return articles.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
}

/**
 * Get the article by the slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filepath = `./articles/${slug}/index.mdx`;
  return getArticleDataFromPath(filepath);
}

/**
 * Get the MDX source of an article.
 */
export async function getArticleMdxSource(article: Article) {
  return getDocMdxSource(article.filepath, {
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
  });
}
