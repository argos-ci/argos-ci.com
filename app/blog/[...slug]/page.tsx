import { notFound } from "next/navigation";
import { getArticleBySlug, getDocMdxSource, getArticles } from "@/lib/api";
import * as React from "react";
import { Container } from "@/components/Container";
import { Metadata, ResolvingMetadata } from "next";

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
  const articles = await getArticles();
  return getArticleBySlug(articles, slug);
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  const article = await getArticleFromParams(params);
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
    return notFound();
  }
  const source = await getDocMdxSource(article);
  return (
    <article
      className="prose dark:prose-invert mx-auto max-w-none mt-14 mb-24"
      style={{ contain: "none" }}
    >
      <Container tight>
        {article.category && (
          <div className="mb-4 font-medium text-violet-11">
            {article.category}
          </div>
        )}
        <h1>{article.title}</h1>
        <div className="text-low my-4 flex gap-2 text-sm items-center">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(article.date))}
          <div className="text-mauve-10 text-xs">|</div>
          {article.author}
        </div>
        {source}
        {/* <MDXRemote
          source={source}
          components={{
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
          }}
        /> */}
      </Container>
    </article>
  );
}
