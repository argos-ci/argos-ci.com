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
import { PricingCards } from "./PricingCard";
import { FAQ } from "./PricingFaq";

export const metadata: Metadata = getMetadata({
  title: "Pricing plans",
  description:
    "Argos pricing: Free Hobby Plan for personal projects, $0 forever, 5,000 screenshots. Pro Plan starts at $30/mo, ideal for teams with 15,000 screenshots included.",
  pathname: "/pricing",
});

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-75 md:py-24">
          <FullPageGrid height="h-200 md:h-75" />
          <Hero align="center" className="relative">
            <HeroHeading>Pricing built for visual testing at scale</HeroHeading>
            <HeroDescription>
              Free to start, no credit card. Scale usage, not seats.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <PricingCards />
      <OpenSourceSponsoring />
      <TrustedBy />
      <section className="border-b px-4">
        <Container className="border-x py-12 pb-6 md:py-18 md:pb-12">
          <SectionTitle className="mb-12 text-center">
            How much does it cost?
          </SectionTitle>
          <PricingSlider />
        </Container>
      </section>

      <section className="px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mx-auto mb-10 max-w-2xl">
            Frequently Asked Questions
          </SectionTitle>
          <FAQ />
        </Container>
      </section>
    </>
  );
}

function OpenSourceSponsoring() {
  return (
    <section className="bg-subtle border-y px-4">
      <Container className="border-x">
        <SectionHeader align="center" className="container-gutter">
          <SectionHeaderTexts>
            <SectionTitle>Open source sponsoring</SectionTitle>
            <SectionDescription className="text-lg md:text-center md:text-xl">
              We ❤️ the open source community and we are happy to support it.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/docs/open-source">Apply to sponsoring program</Link>
          </Button>
        </SectionHeader>
      </Container>
    </section>
  );
}
