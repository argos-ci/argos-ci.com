import { MetadataRoute } from "next";

import {
  Categories,
  getArticles,
  getArticlesPagesCount,
} from "@/lib/api/blog";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  const blogPageCount = getArticlesPagesCount(articles.length);
  const blogPages = Array.from({ length: blogPageCount - 1 }, (_, i) => ({
    url: `${BASE_URL}/blog/page/${i + 2}`,
  }));

  const categoryPages = await Promise.all(
    Object.values(Categories).map(async (category) => {
      const categoryArticles = await getArticles({ category: category.slug });
      const pageCount = getArticlesPagesCount(categoryArticles.length);
      return [
        { url: `${BASE_URL}/blog/category/${category.slug}` },
        ...Array.from({ length: pageCount - 1 }, (_, i) => ({
          url: `${BASE_URL}/blog/category/${category.slug}/page/${i + 2}`,
        })),
      ];
    }),
  );

  return [
    ...blogPages,
    ...categoryPages.flat(),
    ...articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: article.date,
    })),
  ];
}
