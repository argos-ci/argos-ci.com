import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  Categories,
  checkIsCategorySlug,
  getArticles,
  getArticlesPagesCount,
  getPaginatedArticles,
} from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

import { PostsList } from "../../../../PostsList";

type Params = { slug: string; page: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const params: { slug: string; page: string }[] = [];
  for (const category of Object.values(Categories)) {
    const articles = await getArticles({ category: category.slug });
    const pageCount = getArticlesPagesCount(articles.length);
    for (let i = 2; i <= pageCount; i++) {
      params.push({ slug: category.slug, page: String(i) });
    }
  }
  return params;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  if (!checkIsCategorySlug(params.slug)) {
    notFound();
  }
  const category = Categories[params.slug];
  return getMetadata({
    title: `${category.pageTitle} - Page ${params.page}`,
    description: category.description,
    pathname: `/blog/category/${category.slug}/page/${params.page}`,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  if (!checkIsCategorySlug(params.slug)) {
    notFound();
  }
  const category = Categories[params.slug];
  const page = Number(params.page);
  if (Number.isNaN(page) || page < 1) {
    notFound();
  }
  if (page === 1) {
    redirect(`/blog/category/${category.slug}`);
  }
  const result = await getPaginatedArticles({ page, category: category.slug });
  if (result.articles.length === 0) {
    notFound();
  }
  return (
    <PostsList
      articles={result.articles}
      title={category.title}
      description={category.description}
      basePath={`/blog/category/${category.slug}`}
      previous={result.previous}
      next={result.next}
    />
  );
}
