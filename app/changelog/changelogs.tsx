import NextLink from "next/link";

import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { ChangelogEntry } from "@/lib/changelog-api";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export default function Changelogs(props: {
  changelogs: ChangelogEntry[];
  single?: boolean;
}) {
  return (
    <Container className="my-10" style={{ contain: "none" }}>
      <div className="sm:ml-[calc(25%+1rem)]">
        <h1 className="mb-2 text-4xl font-semibold">Changelog</h1>
        <div className="mb-2 text-low">
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
      </div>
      <hr className="my-8 border-0 border-b" />
      {props.changelogs.map((changelog) => {
        return (
          <article
            key={changelog.slug}
            className="grid items-start gap-4 sm:grid-cols-[minmax(0,25%)_minmax(0,36rem)]"
            style={{ contain: "none" }}
          >
            <div className="text-sm text-low sm:sticky sm:top-[60px] sm:pt-10">
              {props.single && (
                <div className="mb-4">
                  <NextLink
                    href="/changelog"
                    className="font-semibold hover:text"
                  >
                    ← All posts
                  </NextLink>
                </div>
              )}
              <time dateTime={changelog.date}>
                {dateFormatter.format(new Date(changelog.date))}
              </time>
            </div>
            <div className="prose dark:prose-invert prose-h2:mt-4 sm:prose-h2:mt-8">
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
    </Container>
  );
}
