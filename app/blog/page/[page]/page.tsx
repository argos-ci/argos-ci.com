import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  getArticles,
  getArticlesPagesCount,
  getPaginatedArticles,
} from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

import { PostsList } from "../../PostsList";

type Params = { page: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const articles = await getArticles();
  const pageCount = getArticlesPagesCount(articles.length);
  return Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return getMetadata({
    title: `Blog - Page ${params.page}`,
    description:
      "Articles from the Argos team on visual testing, Playwright, CI workflows, and shipping UI changes safely at scale.",
    pathname: `/blog/page/${params.page}`,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  const page = Number(params.page);
  if (Number.isNaN(page) || page < 1) {
    notFound();
  }
  if (page === 1) {
    redirect("/blog");
  }
  const result = await getPaginatedArticles({ page });
  if (result.articles.length === 0) {
    notFound();
  }
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
