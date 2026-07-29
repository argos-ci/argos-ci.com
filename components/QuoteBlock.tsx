import clsx from "clsx";

import type { CustomerQuote } from "@/app/assets/customers/types";

import { Container } from "./Container";
import { Pattern } from "./Pattern";
import { ThemeImage } from "./ThemeImage";
import { FROM_COLORS, type FeatureColor } from "./feature-section/colors";

export function QuoteBlock(props: {
  quote: CustomerQuote;
  /** Accent wash closing the section, as `FeatureSection` does for its story. */
  color?: FeatureColor;
  className?: string;
}) {
  const { quote, color, className } = props;
  return (
    <section className={clsx("relative px-4", className)}>
      {color ? (
        <Container className="pointer-events-none absolute inset-0" noGutter>
          <div
            className={clsx(
              "absolute inset-0 bg-linear-to-t",
              FROM_COLORS[color],
            )}
          />
          <div className="absolute inset-x-4 inset-y-5 text-(--neutral-3)">
            <Pattern />
          </div>
        </Container>
      ) : null}
      <Container className="relative flex flex-col items-center justify-center gap-5 border-x py-16 text-center md:py-24">
        <ThemeImage
          src={quote.company.logo["140x48"]}
          alt={quote.company.name}
          className="h-12 w-auto"
        />
        <blockquote>
          <p className="font-accent [&_strong]:text-default max-w-3xl bg-linear-to-b from-(--neutral-11) to-(--neutral-12) bg-clip-text py-2 text-lg text-balance text-transparent sm:text-xl md:text-2xl [&_strong]:font-medium">
            “{quote.text}”
          </p>
        </blockquote>
        <div className="flex flex-col items-center gap-2.5">
          <ThemeImage
            src={quote.author.avatar}
            className="size-14 rounded-full border"
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
