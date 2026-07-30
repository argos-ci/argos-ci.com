import clsx from "clsx";
import { BookTextIcon } from "lucide-react";
import Link from "next/link";

import type { CustomerQuote } from "@/app/assets/customers/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Pattern } from "@/components/Pattern";
import { ThemeImage } from "@/components/ThemeImage";
import { SECTION_FADE } from "@/components/section-fade";

import { SectionHeader, SectionHeaderTexts } from "../SectionHeader";
import { SectionDescription, SectionTitle } from "../Typography";
import { type Feature, FeaturesCarousel } from "./FeaturesCarousel";
import { FROM_COLORS, type FeatureColor, INDICATOR_BG_COLORS } from "./colors";

export function FeatureIndicator(props: {
  color: FeatureColor;
  children: React.ReactNode;
}) {
  const { color, children } = props;
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span className={clsx("h-1.5 w-3 rounded", INDICATOR_BG_COLORS[color])} />
      {children}
    </div>
  );
}

export function FeatureSection(props: {
  color: FeatureColor;
  /** Eyebrow. Omit on supporting chapters — its presence marks a pillar. */
  featureName?: string;
  title: string;
  description: string;
  cta: React.ReactNode;
  features: Feature[];
  story?: {
    quote: CustomerQuote;
    href: string;
  };
}) {
  const { color, featureName, cta, title, description, features, story } =
    props;
  const [firstLine, ...rest] = description.split("\n");
  return (
    <div className={clsx("separator-b relative px-4", SECTION_FADE)}>
      <Container className="border-x" noGutter>
        {/* Tighter at the bottom than the shared default: with no rule between
            them, the header and the illustration read as one block, so the gap
            has to be smaller than the space above the header. */}
        <SectionHeader className="container-gutter pb-8 md:pb-10">
          <SectionHeaderTexts>
            {featureName ? (
              <FeatureIndicator color={color}>{featureName}</FeatureIndicator>
            ) : null}
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>
              <span className="after:content-['_'] md:block">{firstLine}</span>
              {...rest}
            </SectionDescription>
          </SectionHeaderTexts>
          {cta}
        </SectionHeader>
        <FeaturesCarousel color={color} features={features} />
        <div className="relative">
          <div
            className={clsx(
              "absolute inset-0 bg-linear-to-t",
              FROM_COLORS[color],
            )}
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
      </Container>
    </div>
  );
}
