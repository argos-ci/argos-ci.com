import clsx from "clsx";

import type { CustomerQuote } from "@/app/assets/customers/types";

import { Container } from "./Container";
import { ThemeImage } from "./ThemeImage";

export function QuoteBlock(props: {
  quote: CustomerQuote;
  className?: string;
}) {
  const { quote, className } = props;
  return (
    <section className={clsx("px-4", className)}>
      <Container className="flex flex-col items-center justify-center gap-5 border-x py-24">
        <ThemeImage
          src={quote.company.logo.adjusted}
          alt={quote.company.name}
          className="h-6 w-auto"
        />
        <blockquote>
          <p className="font-accent [&_strong]:text-default max-w-3xl bg-linear-to-b from-(--neutral-11) to-(--neutral-12) bg-clip-text py-2 text-center text-lg text-balance text-transparent sm:text-xl md:text-2xl [&_strong]:font-medium">
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
