import { Metadata } from "next";

import { BLOG_METADATA, getPaginatedArticles } from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

import { PostsList } from "./PostsList";

export const metadata: Metadata = getMetadata({
  title: "Blog",
  absoluteTitle: "Argos Blog · Visual Testing, Playwright, and CI Insights",
  ...BLOG_METADATA,
  pathname: "/blog",
});

export default async function Page() {
  const result = await getPaginatedArticles({ page: 1 });
  return (
    <PostsList
      articles={result.articles}
      title="Blog"
      description="All the latest Argos news, straight from the team."
      basePath="/blog"
      previous={result.previous}
      next={result.next}
    />
  );
}
