import NextLink from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { Link } from "@/components/Link";
import {
  PostCard,
  PostCardAvatar,
  PostCardBody,
  PostCardDate,
  PostCardDescription,
  PostCardFooter,
  PostCardImage,
  PostCardTag,
  PostCardTitle,
} from "@/components/PostCard";
import { type Article, Categories } from "@/lib/api/blog";

import { CategoryLink } from "./CategoryLink";

function ArticleCard(props: { article: Article }) {
  const { article } = props;
  return (
    <Link href={`/blog/${article.slug}`} className="group contents">
      <PostCard className="col-span-3 border-b max-md:group-last:border-b-0 md:col-span-1 md:border-r md:group-nth-[3n+1]:border-r-0">
        <PostCardImage
          width={article.image.width}
          height={article.image.height}
          src={article.image.src}
          alt={article.imageAlt}
        />
        <PostCardBody>
          <PostCardTag>{article.category.title}</PostCardTag>
          <PostCardTitle>{article.title}</PostCardTitle>
          <PostCardDescription>{article.description}</PostCardDescription>
          <PostCardFooter>
            <PostCardAvatar author={article.author} />
            <PostCardDate date={article.date} />
          </PostCardFooter>
        </PostCardBody>
      </PostCard>
    </Link>
  );
}

export function PostsList(props: {
  title: string;
  description: string;
  articles: Article[];
  basePath?: string;
  previous?: number | null;
  next?: number | null;
}) {
  const { title, description, articles, basePath = "/blog" } = props;
  const firstArticle = articles[0];
  if (!firstArticle) {
    notFound();
  }
  // Feature the first article only on the first page.
  const featureFirst = !props.previous;
  const cardArticles = featureFirst ? articles.slice(1) : articles;
  return (
    <>
      <div className="relative overflow-hidden border-b px-4">
        <Container className="relative py-8 md:h-75 md:py-16 md:pt-20">
          <FullPageGrid height="h-200 md:h-75" />
          <Hero className="relative">
            <HeroHeading>{title}</HeroHeading>
            <HeroDescription>{description}</HeroDescription>
            <div className="mt-4 flex w-full min-w-0 gap-1 overflow-x-auto md:gap-2">
              <CategoryLink href="/blog">All posts</CategoryLink>
              {Object.values(Categories).map((category) => {
                return (
                  <CategoryLink
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                  >
                    {category.title}
                  </CategoryLink>
                );
              })}
            </div>
          </Hero>
        </Container>
      </div>
      <div className="px-4">
        <Container noGutter className="relative border-x">
          <div className="grid grid-cols-3">
            {featureFirst ? (
              <Link href={`/blog/${firstArticle.slug}`} className="contents">
                <PostCard className="col-span-3 border-b">
                  <PostCardImage
                    width={firstArticle.image.width}
                    height={firstArticle.image.height}
                    src={firstArticle.image.src}
                    alt={firstArticle.imageAlt}
                    extended
                  />
                  <PostCardBody>
                    <PostCardTag>{firstArticle.category.title}</PostCardTag>
                    <PostCardTitle extended>{firstArticle.title}</PostCardTitle>
                    <PostCardDescription>
                      {firstArticle.description}
                    </PostCardDescription>
                    <PostCardFooter>
                      <PostCardAvatar author={firstArticle.author} />
                      <PostCardDate date={firstArticle.date} />
                    </PostCardFooter>
                  </PostCardBody>
                </PostCard>
              </Link>
            ) : null}

            {cardArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </div>
      {props.previous || props.next ? (
        <div className="-mt-px border-t px-4">
          <Container noGutter className="border-x">
            <div className="flex gap-4 p-6">
              {props.previous ? (
                <Button variant="outline" className="mr-auto" asChild>
                  <NextLink
                    href={
                      props.previous === 1
                        ? basePath
                        : `${basePath}/page/${props.previous}`
                    }
                  >
                    Newer posts
                  </NextLink>
                </Button>
              ) : null}
              {props.next ? (
                <Button variant="outline" className="ml-auto" asChild>
                  <NextLink href={`${basePath}/page/${props.next}`}>
                    Previous posts
                  </NextLink>
                </Button>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}
      <div className="-mt-px border-t">
        <Container className="h-12 border-x" />
      </div>
      <CallToActionSection />
    </>
  );
}
