import { Metadata } from "next";

import { getPaginatedArticles } from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

import { PostsList } from "./PostsList";

export const metadata: Metadata = getMetadata({
  title: "Blog",
  absoluteTitle: "Argos Blog · Visual Testing, Playwright, and CI Insights",
  description:
    "Articles from the Argos team on visual testing, Playwright, CI workflows, and shipping UI changes safely at scale.",
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
