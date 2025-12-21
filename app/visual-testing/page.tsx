import clsx from "clsx";
import { Metadata } from "next";

import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { getMetadata } from "@/lib/metadata";

import { TrustedBy } from "../common/TrustedBy";
import { FeatureIndicator } from "../home/common/feature-section/FeatureSection";

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
