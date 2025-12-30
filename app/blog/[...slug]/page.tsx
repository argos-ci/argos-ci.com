import { Metadata } from "next";
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
  PostCardAuthor,
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
                <PostCard className="col-span-2 border-y md:col-span-1 md:border-r md:group-last:border-r-0">
                  <PostCardImage
                    width={article.image.width}
                    height={article.image.height}
                    src={article.image.src}
                    alt={article.imageAlt}
                  />
                  <PostCardBody>
                    {article.category && (
                      <PostCardTag>{article.category}</PostCardTag>
                    )}
                    <PostCardTitle $classname="line-clamp-2">
                      {article.title}
                    </PostCardTitle>
                    <PostCardFooter>
                      <PostCardAuthor>{article.author}</PostCardAuthor>
                      <span className="text-low text-xs">•</span>
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
        name: article.author,
      },
    ],
  };
  return (
    <>
      <article>
        <header className="overflow-hidden border-b px-4">
          <Container className="relative py-16 md:h-105 md:py-24">
            <FullPageGrid height="h-200 md:h-105" />
            <Hero className="relative">
              {article.category && (
                <div className="font-medium text-(--primary-11)">
                  {article.category}
                </div>
              )}
              <HeroHeading>{article.title}</HeroHeading>
              <HeroDescription>{article.description}</HeroDescription>
              <div className="text-low my-4 flex items-center gap-2 text-sm">
                <time dateTime={article.date}>
                  {dateFormatter.format(new Date(article.date))}
                </time>
                <span className="text-low text-xs">•</span>
                <address className="not-italic">{article.author}</address>
              </div>
            </Hero>
          </Container>
        </header>
        <div className="border-x px-4">
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
