import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsArticle } from "schema-dts";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import {
  PostCard,
  PostCardAvatar,
  PostCardBody,
  PostCardDate,
  PostCardFooter,
  PostCardImage,
  PostCardTag,
  PostCardTitle,
} from "@/components/PostCard";
import {
  getArticleBySlug,
  getArticleMdxSource,
  getArticles,
} from "@/lib/api/blog";

type Params = { slug: string[] };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter((article) => article.slug !== "")
    .map((article) => ({ slug: article.slug.split("/") }));
}

async function getArticleFromParams(params: Params) {
  const slug = params.slug.join("/");
  return getArticleBySlug(slug);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const article = await getArticleFromParams(await props.params);
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
      authors: [article.author.name],
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

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(48271, h) % 0x7fffffff;
    return (h & 0x7fffffff) / 0x7fffffff;
  };
}

async function Siblings({ slug }: { slug: string }) {
  const articles = await getArticles();
  const rand = seededRandom(slug);
  const sideArticles = articles
    .filter((article) => article.slug !== slug)
    .map((value) => ({ value, sort: rand() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 3);
  return (
    <div className="border-t px-4">
      <Container noGutter className="border-x pt-4 md:pt-8">
        <h3 className="container-gutter text-default font-accent mb-8 text-2xl font-semibold">
          Read also
        </h3>
        <div className="grid grid-cols-3" data-visual-test="transparent">
          {sideArticles.map((article) => {
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group contents"
              >
                <PostCard className="col-span-3 border-t md:col-span-1 md:border-r md:border-b md:group-last:border-r-0">
                  <PostCardImage
                    width={article.image.width}
                    height={article.image.height}
                    src={article.image.src}
                    alt={article.imageAlt}
                  />
                  <PostCardBody>
                    <PostCardTag>{article.category.title}</PostCardTag>
                    <PostCardTitle className="line-clamp-2">
                      {article.title}
                    </PostCardTitle>
                    <PostCardFooter>
                      <PostCardAvatar author={article.author} />
                      <PostCardDate date={article.date} />
                    </PostCardFooter>
                  </PostCardBody>
                </PostCard>
              </Link>
            );
          })}
        </div>
      </Container>
      <div className="-mt-px border-t">
        <Container className="h-12 border-x" />
      </div>
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export default async function Page(props: Props) {
  const params = await props.params;
  const article = await getArticleFromParams(params);
  if (!article) {
    notFound();
  }
  const source = await getArticleMdxSource(article);
  const jsonLd: NewsArticle = {
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.image.src],
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.title,
        image: article.author.avatar.src,
        sameAs: [article.author.github, article.author.x],
      },
    ],
  };
  return (
    <>
      <article>
        <header className="overflow-hidden border-b px-4">
          <Container className="relative pt-16 pb-8 md:pt-24">
            <FullPageGrid height="h-full" bottom />
            <Hero className="relative">
              <div>
                <Link
                  className="font-medium text-(--primary-11) hover:underline"
                  href={`/blog/category/${article.category.slug}`}
                >
                  {article.category.title}
                </Link>
              </div>
              <HeroHeading>{article.title}</HeroHeading>
              <HeroDescription>{article.description}</HeroDescription>
              <div className="my-4 flex w-full flex-col justify-between gap-8 text-sm md:flex-row md:items-center md:gap-2">
                <address className="flex gap-2 not-italic md:items-center">
                  <Image
                    src={article.author.avatar}
                    alt=""
                    className="size-8 rounded-full"
                  />
                  <div className="flex flex-col gap-x-2 md:flex-row md:items-center">
                    <span className="font-medium">{article.author.name}</span>
                    <span className="text-low">{article.author.title}</span>
                  </div>
                </address>
                <time dateTime={article.date} className="text-low">
                  {dateFormatter.format(new Date(article.date))}
                </time>
              </div>
            </Hero>
          </Container>
        </header>
        <div className="px-4">
          <Container className="border-x">
            <Container
              tight
              className="prose prose-h2:font-accent prose-h3:font-accent dark:prose-invert py-8 md:py-16"
            >
              {source}
            </Container>
          </Container>
        </div>
        <JsonLd json={jsonLd} />
      </article>
      <Siblings slug={article.slug} />
      <CallToActionSection />
    </>
  );
}
