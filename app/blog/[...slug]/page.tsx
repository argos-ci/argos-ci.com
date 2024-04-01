import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";

import { Container } from "@/components/Container";
import {
  PostCard,
  PostCardAuthor,
  PostCardBody,
  PostCardDate,
  PostCardFooter,
  PostCardImage,
  PostCardTag,
  PostCardTitle,
} from "@/components/PostCard";
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

  const url = `https://argos-ci.com/blog/${article.slug}`;

  return {
    title: {
      absolute: article.title,
    },
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      images,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt ?? article.date,
      url,
      siteName: "Argos",
      locale: "en_US",
      authors: [article.author],
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

async function Siblings({ slug }: { slug: string }) {
  const articles = await getArticles();
  const sideArticles = articles
    .filter((article) => article.slug !== slug)
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 2);
  return (
    <section>
      <h3 className="mb-8 text-2xl font-semibold text">Read also</h3>
      <div className="grid grid-cols-2 gap-x-16 gap-y-20">
        {sideArticles.map((article) => {
          return (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="contents"
            >
              <PostCard className="col-span-2 md:col-span-1">
                <PostCardImage
                  width={article.image.width}
                  height={article.image.height}
                  src={article.image.src}
                  alt={article.imageAlt}
                  data-visual-test="blackout"
                />
                <PostCardBody>
                  {article.category && (
                    <PostCardTag data-visual-test="blackout">
                      {article.category}
                    </PostCardTag>
                  )}
                  <PostCardTitle
                    $classname="line-clamp-2"
                    data-visual-test="blackout"
                  >
                    {article.title}
                  </PostCardTitle>
                  <PostCardFooter data-visual-test="blackout">
                    <PostCardAuthor>{article.author}</PostCardAuthor>
                    <div className="text-xs text-mauve-10">|</div>
                    <PostCardDate date={article.date} />
                  </PostCardFooter>
                </PostCardBody>
              </PostCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export default async function Page({ params }: Props) {
  const article = await getArticleFromParams(params);
  if (!article) {
    notFound();
  }
  const source = await getDocMdxSource(article);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.image.src],
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    author: [
      {
        "@type": "Person",
        name: article.author,
      },
    ],
  };
  return (
    <>
      <article
        className="prose mx-auto mb-24 mt-14 max-w-none dark:prose-invert"
        style={{ contain: "none" }}
      >
        <Container tight>
          <header>
            {article.category && (
              <div className="mb-4 font-medium text-violet-11">
                {article.category}
              </div>
            )}
            <h1>{article.title}</h1>
            <div className="my-4 flex items-center gap-2 text-sm text-low">
              <time dateTime={article.date}>
                {dateFormatter.format(new Date(article.date))}
              </time>
              <div className="text-xs text-mauve-10">|</div>
              <address className="not-italic">{article.author}</address>
            </div>
          </header>
          {source}
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
      <Container tight>
        <Siblings slug={article.slug} />
      </Container>
    </>
  );
}
