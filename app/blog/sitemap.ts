import { MetadataRoute } from "next";

import { getArticles } from "@/lib/blog-api";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.date,
  }));
}
