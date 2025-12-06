import clsx from "clsx";
import { BookTextIcon } from "lucide-react";
import Link from "next/link";

import type { CustomerQuote } from "@/app/assets/customers/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Pattern } from "@/components/Pattern";
import { ThemeImage } from "@/components/ThemeImage";

import { SectionHeader, SectionHeaderTexts } from "../SectionHeader";
import { SectionDescription, SectionTitle } from "../Typography";
import { type Feature, FeaturesCarousel } from "./FeaturesCarousel";
import { type FeatureColor, INDICATOR_BG_COLORS, TO_COLORS } from "./colors";

export function FeatureSection(props: {
  color: FeatureColor;
  featureName: string;
  title: string;
  description: string;
  cta: React.ReactNode;
  features: Feature[];
  story?: {
    quote: CustomerQuote;
    href: string;
  };
}) {
  const { color, featureName, title, description, features, story } = props;
  const [firstLine, ...rest] = description.split("\n");
  return (
    <section className="separator-b relative px-4">
      <Container className="border-x" noGutter>
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={clsx(
                  "h-1.5 w-3 rounded",
                  INDICATOR_BG_COLORS[color],
                )}
              />
              {featureName}
            </div>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>
              <span className="after:content-['_'] md:block">{firstLine}</span>
              {...rest}
            </SectionDescription>
          </SectionHeaderTexts>
          {/* {cta} */}
        </SectionHeader>
        <FeaturesCarousel color={color} features={features} />
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-t from-(--blue-1)" />
          <div className="absolute inset-x-4 inset-y-5 text-(--neutral-3)">
            <Pattern />
          </div>
          {story ? (
            <div className="relative flex flex-col items-center gap-10 px-10 py-12 text-center md:flex-row md:items-start md:gap-30 md:text-left">
              <div className="flex flex-col items-center gap-6 md:items-start">
                <blockquote>
                  <p
                    className={clsx(
                      "font-accent bg-linear-to-b from-(--neutral-12) bg-clip-text text-lg text-transparent md:text-2xl md:font-medium",
                      "[&_strong]:font-semibold",
                      TO_COLORS[color],
                    )}
                  >
                    “{story.quote.text}”
                  </p>
                </blockquote>
                <Button variant="outline-primary" asChild>
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
        <div className="h-12 border-t" />
      </Container>
    </section>
  );
}
