import NextLink from "next/link";

import { Button } from "@/components/Button";
import { Container, SideBorder } from "@/components/Container";
import {
  Hero,
  HeroActions,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { Link } from "@/components/Link";
import { ChangelogEntry } from "@/lib/api/changelog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export function Changelogs(props: {
  changelogs: ChangelogEntry[];
  single?: boolean;
  previous?: number | null;
  next?: number | null;
}) {
  return (
    <div className="px-4">
      <Container className="relative border-b pt-16 pb-8 md:pt-24">
        <SideBorder />
        <h1 className="mb-2 text-4xl font-semibold">Changelog</h1>
        <div className="text-low mb-2">
          New updates and improvements to Argos.
        </div>
        <div className="text-sm">
          <Link
            href="https://x.com/argos_ci"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on X.com
          </Link>
        </div>
      </Container>
      <Container noGutter className="border-x">
        {props.changelogs.map((changelog) => {
          return (
            <article
              key={changelog.slug}
              className="container-gutter grid items-start gap-4 border-b pb-8 max-md:pt-8 sm:grid-cols-[minmax(0,25%)_minmax(0,36rem)]"
              style={{ contain: "none" }}
            >
              <div className="text-low text-sm sm:sticky sm:top-[60px] sm:pt-10">
                {props.single && (
                  <div className="mb-4">
                    <NextLink
                      href="/changelog"
                      className="hover:text-default font-semibold"
                    >
                      ← All posts
                    </NextLink>
                  </div>
                )}
                <time dateTime={changelog.date}>
                  {dateFormatter.format(new Date(changelog.date))}
                </time>
              </div>
              <div className="prose dark:prose-invert prose-h2:mt-4 prose-h2:font-accent sm:prose-h2:mt-8">
                <header>
                  <NextLink
                    href={`/changelog/${changelog.slug}`}
                    className="no-underline hover:underline"
                  >
                    <h2>{changelog.title}</h2>
                  </NextLink>
                </header>
                {changelog.source}
              </div>
            </article>
          );
        })}
        {props.previous || props.next ? (
          <div className="flex gap-4 p-6">
            {props.previous ? (
              <Button variant="outline" className="mr-auto" asChild>
                <NextLink
                  href={
                    props.previous === 1
                      ? `/changelog`
                      : `/changelog/page/${props.previous}`
                  }
                >
                  Newer posts
                </NextLink>
              </Button>
            ) : null}
            {props.next ? (
              <Button variant="outline" className="ml-auto" asChild>
                <NextLink href={`/changelog/page/${props.next}`}>
                  Previous posts
                </NextLink>
              </Button>
            ) : null}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
