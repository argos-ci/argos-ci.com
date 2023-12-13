import { Metadata } from "next";

import { Container } from "@/components/Container";
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
import { getArticles } from "@/lib/blog-api";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export const metadata: Metadata = {
  metadataBase: new URL("https://argos-ci.com"),
  title: "Updates from the Argos team",
};

export default async function Page() {
  const articles = await getArticles();
  const firstArticle = articles[0];
  return (
    <Container className="my-10" style={{ contain: "none" }}>
      <div className="flex flex-col items-baseline gap-x-2 md:flex-row">
        <h2 className="font-semibold text">Latest updates</h2>
        <div
          role="separator"
          aria-orientation="vertical"
          className="hidden text-slate-600 md:block"
        >
          |
        </div>
        <div className="text-sm text-low">
          All the latest Argos news, straight from the team.
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-16 gap-y-20">
        <Link href={`/blog/${firstArticle.slug}`} className="col-span-2">
          <PostCard>
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
              <PostCardTitle extended>{firstArticle.title}</PostCardTitle>
              <PostCardDescription>
                {firstArticle.description}
              </PostCardDescription>
              <PostCardFooter>
                <PostCardAuthor>{firstArticle.author}</PostCardAuthor>
                <span className="text-low">|</span>
                <PostCardDate>{formatDate(firstArticle.date)}</PostCardDate>
              </PostCardFooter>
            </PostCardBody>
          </PostCard>
        </Link>

        {articles.slice(1).map((article) => {
          return (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="col-span-2 md:col-span-1"
            >
              <PostCard>
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
                    <div className="text-xs text-mauve-10">|</div>
                    <PostCardDate>{formatDate(article.date)}</PostCardDate>
                  </PostCardFooter>
                </PostCardBody>
              </PostCard>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
