import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Categories, checkIsCategorySlug, getArticles } from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

import { PostsList } from "../../PostsList";

type Params = { slug: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return Object.values(Categories).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  if (!checkIsCategorySlug(params.slug)) {
    notFound();
  }
  const category = Categories[params.slug];

  return getMetadata({
    title: category.pageTitle,
    description: category.description,
    pathname: `/blog/category/${category.slug}`,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  if (!checkIsCategorySlug(params.slug)) {
    notFound();
  }
  const category = Categories[params.slug];
  const articles = await getArticles({ category: category.slug });
  return (
    <PostsList
      articles={articles}
      title={category.title}
      description={category.description}
    />
  );
}
