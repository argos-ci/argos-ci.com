import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getArticleBySlug, getDocMdxSource, getArticles } from "@/lib/api";
import { MainImage } from "@/components/Post";
import * as React from "react";
import { Separator } from "@/components/Separator";
import { Container } from "@/components/Container";
import { Metadata, ResolvingMetadata } from "next";

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   if (!params?.slug) return { notFound: true };
//   const slugParam = params.slug as string[];
//   const slug = slugParam.join("/");
//   const articles = await getArticles();
//   const article = getArticleBySlug(articles, slug);
//   if (!article) return { notFound: true };
//   const source = await getDocMdxSource(article);
//   return {
//     props: {
//       article,
//       source,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const articles = await getArticles();
//   const paths = articles
//     .filter((article) => article.slug !== "")
//     .map((article) => ({ params: { slug: article.slug.split("/") } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

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
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticleFromParams(params);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      images: [article.image.src, ...previousImages],
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
      className="prose prose-invert mx-auto max-w-none mt-14 mb-24"
      style={{ contain: "none" }}
    >
      <Container>
        {article.category && (
          <div className="text-on-light mb-4">{article.category}</div>
        )}
        <h1>{article.title}</h1>
        <div className="text-on-light my-4 flex gap-2 text-sm">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(article.date))}
          <Separator />
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
