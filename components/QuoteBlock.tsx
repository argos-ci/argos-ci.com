import clsx from "clsx";

import type { CustomerQuote } from "@/app/assets/customers/types";

import { Container } from "./Container";
import { Pattern } from "./Pattern";
import { ThemeImage } from "./ThemeImage";

export function QuoteBlock(props: {
  quote: CustomerQuote;
  /**
   * Texture for a quote that closes a section, as `FeatureSection` gives its
   * story. The tint is not this block's job: it comes from the section's
   * `SectionGlow`, which runs past the rails where a wash here would stop.
   */
  pattern?: boolean;
  className?: string;
}) {
  const { quote, pattern, className } = props;
  return (
    <section className={clsx("relative px-4", className)}>
      {pattern ? (
        <Container className="pointer-events-none absolute inset-0" noGutter>
          <div className="absolute inset-x-4 inset-y-5 text-(--neutral-3)">
            <Pattern />
          </div>
        </Container>
      ) : null}
      <Container className="relative flex flex-col items-center justify-center gap-4 border-x py-12 text-center md:py-16">
        <ThemeImage
          src={quote.company.logo["140x48"]}
          alt={quote.company.name}
          className="h-8 w-auto"
        />
        <blockquote>
          <p className="font-accent [&_strong]:text-default max-w-3xl bg-linear-to-b from-(--neutral-11) to-(--neutral-12) bg-clip-text py-2 text-lg text-balance text-transparent sm:text-xl md:text-2xl [&_strong]:font-medium">
            “{quote.text}”
          </p>
        </blockquote>
        <div className="flex flex-col items-center gap-2.5">
          <ThemeImage
            src={quote.author.avatar}
            className="size-12 rounded-full border"
            alt=""
          />
          <div>
            <div className="mb-1 text-sm font-medium">{quote.author.name}</div>
            <div className="text-low text-sm font-medium">
              {quote.author.title}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
