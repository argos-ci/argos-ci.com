import fg from "fast-glob";
import Image, { ImageProps, StaticImageData } from "next/image";
import { dirname, join } from "node:path";
import { z } from "zod";

import {
  type Employee,
  gregEmployee,
  jeremyEmployee,
} from "@/app/assets/people/library";
import { MainImage } from "@/components/Post";

import { assertAllItems, getDocMdxSource, readMatterData } from "./common";

const authorSlugSchema = z.enum(["greg", "jeremy"]);

const Authors: Record<z.infer<typeof authorSlugSchema>, Employee> = {
  greg: gregEmployee,
  jeremy: jeremyEmployee,
};

const categorySlugSchema = z.enum(["company", "guides", "engineering"]);
type CategorySlug = z.infer<typeof categorySlugSchema>;

type Category = {
  title: string;
  pageTitle: string;
  description: string;
  slug: CategorySlug;
};

export const Categories: Record<CategorySlug, Category> = {
  company: {
    title: "Company News",
    pageTitle: "Company News Posts",
    description: "Product launches and updates from the Argos team.",
    slug: "company",
  },

  guides: {
    title: "Guides",
    pageTitle: "Guides Posts",
    description: "Practical guides for visual testing and CI workflows.",
    slug: "guides",
  },

  engineering: {
    title: "Engineering",
    pageTitle: "Engineering Posts",
    description: "Technical deep dives into how Argos is built.",
    slug: "engineering",
  },
};

export function checkIsCategorySlug(value: string): value is CategorySlug {
  return value in Categories;
}

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date().transform((d) => d.toISOString()),
  updatedAt: z
    .date()
    .optional()
    .transform((d) => d?.toISOString() ?? null),
  author: authorSlugSchema,
  image: z.string(),
  imageAlt: z.string(),
  category: categorySlugSchema,
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Article = Omit<Frontmatter, "image" | "author" | "category"> & {
  image: StaticImageData;
  filepath: string;
  slug: string;
  author: Employee;
  category: Category;
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
    author: Authors[frontmatter.author],
    category: Categories[frontmatter.category],
  };
}

/**
 * Get all the articles.
 */
export async function getArticles(filters?: {
  category?: CategorySlug;
}): Promise<Article[]> {
  const files = await fg("./articles/**/*.mdx");
  let articles = await Promise.all(files.map(getArticleDataFromPath));
  if (filters?.category) {
    articles = articles.filter(
      (article) => article && article.category.slug === filters.category,
    );
  }
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
