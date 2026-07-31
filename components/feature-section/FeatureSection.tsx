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
import { SectionGlow } from "./SectionGlow";
import {
  type FeatureColor,
  INDICATOR_BG_COLORS,
  SUBTLE_BG_COLORS,
} from "./colors";

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
    <div className="separator-b relative px-4">
      {/* Everything coloured lives between the rails, and runs the full height
          of the chapter — header, carousel and story together.

          The tint used to sit under the illustration only. That put a second
          boundary marker one block below the one the header already sets, so the
          reader saw the ground change mid-chapter and read it as a new section
          starting. It also gave a step 2 tint — ΔL 1-2 off the neutral, about as
          light as a tint can be and still exist — a hard edge to announce itself
          with, which is what made it read as loud.

          A Container-width layer rather than a background on the section: the
          margins outside the rails stay neutral, so the hue reads as belonging
          to the content rather than to the page. `SectionGlow` sits in the same
          layer and is clipped to the same width, for the same reason.

          `px-4` is repeated here because `inset-0` resolves against the padding
          box, so without it the layer runs wider than the rails at viewports
          narrower than the max content width. */}
      <div className="pointer-events-none absolute inset-0 px-4">
        <Container noGutter className="relative h-full overflow-hidden">
          <div className={clsx("absolute inset-0", SUBTLE_BG_COLORS[color])} />
          <SectionGlow color={color} />
        </Container>
      </div>
      <Container className="relative border-x" noGutter>
        {/* Tighter at the bottom than the shared default, and closed by a rule:
            the tint now covers header and illustration alike, so it no longer
            says where the chapter's content starts. The rule does that, and the
            short gap keeps the two reading as one block despite it. */}
        <SectionHeader className="container-gutter border-b pb-8 md:pb-10">
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
        <FeaturesCarousel
          color={color}
          features={features}
          background={false}
        />
        {/* No wash of its own — the story sits on `SectionGlow`, which is the
            section's single tint and runs past the rails. See SectionGlow. */}
        <div className="relative">
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
        <div className="bg-app h-12 border-t" />
      </Container>
    </div>
  );
}
