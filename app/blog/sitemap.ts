import { MetadataRoute } from "next";

import { Categories, getArticles } from "@/lib/api/blog";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return [
    ...Object.values(Categories).map((category) => ({
      url: `${BASE_URL}/blog/category/${category.slug}`,
    })),
    ...articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: article.date,
    })),
  ];
}
