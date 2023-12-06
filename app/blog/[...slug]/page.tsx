import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { Container } from "@/components/Container";
import { getArticleBySlug, getArticles, getDocMdxSource } from "@/lib/blog-api";

type Props = {
  params: { slug: string[] };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter((article) => article.slug !== "")
    .map((article) => ({ slug: article.slug.split("/") }));
}

async function getArticleFromParams(params: Props["params"]) {
  const slug = params.slug.join("/");
  return getArticleBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleFromParams(params);
  if (!article) {
    notFound();
  }

  const images = [article.image.src];

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images,
      type: "article",
    },
    twitter: {
      title: article.title,
      description: article.description,
      images,
      card: "summary_large_image",
      site: "@argos_ci",
    },
  };
}

export default async function Page({ params }: Props) {
  const article = await getArticleFromParams(params);
  if (!article) {
    notFound();
  }
  const source = await getDocMdxSource(article);
  return (
    <article
      className="prose mx-auto mb-24 mt-14 max-w-none dark:prose-invert"
      style={{ contain: "none" }}
    >
      <Container tight>
        {article.category && (
          <div className="mb-4 font-medium text-violet-11">
            {article.category}
          </div>
        )}
        <h1>{article.title}</h1>
        <div className="my-4 flex items-center gap-2 text-sm text-low">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(article.date))}
          <div className="text-xs text-mauve-10">|</div>
          {article.author}
        </div>
        {source}
      </Container>
    </article>
  );
}
