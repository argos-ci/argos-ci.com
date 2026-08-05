import clsx from "clsx";

import type { CustomerQuote } from "@/app/assets/customers/types";
import { Container } from "@/components/Container";

import { SectionHeader, SectionHeaderTexts } from "../SectionHeader";
import { SectionDescription, SectionTitle } from "../Typography";
import { CustomerStory } from "./CustomerStory";
import { type Feature, FeaturesCarousel } from "./FeaturesCarousel";
import { type FeatureColor, INDICATOR_BG_COLORS } from "./colors";

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
  const { color, featureName, cta, title, description, features, story } =
    props;
  const [firstLine, ...rest] = description.split("\n");
  return (
    <div className="separator-b relative px-4">
      <Container className="border-x" noGutter>
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color={color}>{featureName}</FeatureIndicator>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>
              <span className="after:content-['_'] md:block">{firstLine}</span>
              {...rest}
            </SectionDescription>
          </SectionHeaderTexts>
          {cta}
        </SectionHeader>
        <FeaturesCarousel color={color} features={features} />
        <CustomerStory color={color} story={story} />
        <div className="h-12 border-t" />
      </Container>
    </div>
  );
}
