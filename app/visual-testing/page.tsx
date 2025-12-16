import clsx from "clsx";
import { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { Link } from "@/components/Link";
import { getMetadata } from "@/lib/metadata";

import { PricingSlider } from "../common/PricingSlider";
import { TrustedBy } from "../common/TrustedBy";
import {
  SectionHeader,
  SectionHeaderTexts,
} from "../home/common/SectionHeader";
import { SectionDescription, SectionTitle } from "../home/common/Typography";
import { FeatureIndicator } from "../home/common/feature-section/FeatureSection";
import {
  BG_COLORS,
  BORDER_BG_COLORS,
  BORDER_COLORS,
} from "../home/common/feature-section/colors";
import { PricingCards } from "./PricingCard";
import { FAQ } from "./PricingFaq";

export const metadata: Metadata = getMetadata({
  title: "Pricing plans",
  description:
    "Argos pricing: Free Hobby Plan for personal projects, $0 forever, 5,000 screenshots. Pro Plan starts at $30/mo, ideal for teams with 15,000 screenshots included.",
  pathname: "/pricing",
});

const color = "blue" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Visual Testing</FeatureIndicator>
            </div>
            <HeroHeading>
              End to end visual testing for modern teams
            </HeroHeading>
            <HeroDescription>
              Argos is the modern visual testing platform for{" "}
              <strong>websites, mobile apps and design systems</strong>. Detect
              UI changes, review diffs, and ship confidently.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <TrustedBy />
      <section className="border-b px-4">
        <Container className="border-x">Hello</Container>
      </section>
    </>
  );
}
