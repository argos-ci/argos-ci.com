import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { Link } from "@/components/Link";
import {
  PostCard,
  PostCardAuthor,
  PostCardBody,
  PostCardDate,
  PostCardDescription,
  PostCardFooter,
  PostCardImage,
  PostCardTag,
  PostCardTitle,
} from "@/components/PostCard";
import { getArticles } from "@/lib/api/blog";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "Blog",
  description: "All the latest Argos news, straight from the team.",
  pathname: "/blog",
});

export default async function Page() {
  const articles = await getArticles();
  const firstArticle = articles[0];
  return (
    <>
      <div className="relative overflow-hidden border-b px-4">
        <Container className="relative py-8 md:h-60 md:py-16 md:pt-20">
          <FullPageGrid height="h-200 md:h-60" />
          <Hero className="relative">
            <HeroHeading>Blog</HeroHeading>
            <HeroDescription>
              All the latest Argos news, straight from the team.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <div className="px-4">
        <Container noGutter className="relative border-x">
          <div className="grid grid-cols-3">
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
                  {firstArticle.category && (
                    <PostCardTag>{firstArticle.category}</PostCardTag>
                  )}
                  <PostCardTitle $extended>{firstArticle.title}</PostCardTitle>
                  <PostCardDescription>
                    {firstArticle.description}
                  </PostCardDescription>
                  <PostCardFooter>
                    <PostCardAuthor>{firstArticle.author}</PostCardAuthor>
                    <span className="text-low">•</span>
                    <PostCardDate date={firstArticle.date} />
                  </PostCardFooter>
                </PostCardBody>
              </PostCard>
            </Link>

            {articles.slice(1).map((article) => {
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group contents"
                >
                  <PostCard className="col-span-3 border-b max-md:group-last:border-b-0 md:col-span-1 md:border-r md:group-nth-[3n+1]:border-r-0">
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
                      <PostCardTitle>{article.title}</PostCardTitle>
                      <PostCardDescription>
                        {article.description}
                      </PostCardDescription>
                      <PostCardFooter>
                        <PostCardAuthor>{article.author}</PostCardAuthor>
                        <div className="text-low text-xs">•</div>
                        <PostCardDate date={article.date} />
                      </PostCardFooter>
                    </PostCardBody>
                  </PostCard>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
      <div className="-mt-px border-t">
        <Container className="h-12 border-x" />
      </div>
      <CallToActionSection />
    </>
  );
}
