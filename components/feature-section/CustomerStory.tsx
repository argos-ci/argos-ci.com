import clsx from "clsx";
import { BookTextIcon } from "lucide-react";
import Link from "next/link";

import type { CustomerQuote } from "@/app/assets/customers/types";
import { Button } from "@/components/Button";
import { Pattern } from "@/components/Pattern";
import { ThemeImage } from "@/components/ThemeImage";

import { FROM_COLORS, type FeatureColor } from "./colors";

/**
 * The band a homepage section closes on, and the customer story inside it.
 *
 * The band is painted whether or not there is a story: it is the section's
 * closing edge first, a frame for the quote second. That is why `story` is
 * optional rather than the component being conditional at the call site.
 *
 * Shared so every section on the homepage closes the same way. The inner pages
 * use `QuoteBlock` instead — centred, no story link — and the two must not be
 * mixed on the same page or the quotes read as two different components.
 */
export function CustomerStory(props: {
  color: FeatureColor;
  story?: { quote: CustomerQuote; href: string };
}) {
  const { color, story } = props;
  return (
    <div className="relative">
      <div
        className={clsx("absolute inset-0 bg-linear-to-t", FROM_COLORS[color])}
      />
      <div className="absolute inset-x-4 inset-y-5 text-(--neutral-3)">
        <Pattern />
      </div>
      {story ? (
        <div className="relative flex flex-col items-center gap-10 px-10 py-12 text-center md:flex-row md:items-start md:gap-30 md:text-left">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <blockquote>
              <p
                className={clsx(
                  "font-accent bg-linear-to-b from-(--neutral-12) to-(--neutral-12)/80 bg-clip-text text-lg text-transparent md:text-2xl md:font-medium",
                  "[&_strong]:font-semibold",
                )}
              >
                “{story.quote.text}”
              </p>
            </blockquote>
            <Button variant="outline" asChild>
              <Link href={story.href}>
                <BookTextIcon />
                Read the story
              </Link>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-6 text-center whitespace-nowrap md:items-end md:text-end">
            <ThemeImage
              src={story.quote.company.logo.adjusted}
              alt={story.quote.company.name}
              className="h-5 w-auto"
            />
            <div className="flex flex-col items-center gap-2.5 md:items-end">
              <div>
                <div className="text-sm font-medium">
                  {story.quote.author.name}
                </div>
                <div className="text-low text-xs font-medium">
                  {story.quote.author.title}
                </div>
              </div>
              <ThemeImage
                src={story.quote.author.avatar}
                className="size-10 rounded-full border"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
