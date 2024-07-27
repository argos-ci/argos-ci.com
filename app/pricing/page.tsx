import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import * as React from "react";
import { twc } from "react-twc";

import { BrandTestimonials } from "@/components/BrandTestimonials";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { getMetadata } from "@/lib/metadata";

import { PricingSlider } from "../common/PricingSlider";
import { PricingCards } from "./PricingCard";
import { FAQ } from "./PricingFaq";

export const metadata: Metadata = getMetadata({
  title: "Pricing plans",
  description:
    "Argos pricing: Free Hobby Plan for personal projects, $0 forever, 5,000 screenshots. Pro Plan starts at $30/mo, ideal for teams with 15,000 screenshots included.",
  pathname: "/pricing",
});

const H1 = twc.h1`my-8 font-accent text-5xl sm:text-6xl`;
const H2 = twc.h2`mb-8 font-accent text-4xl md:text-5xl`;
const Section = twc(
  Container,
)`flex flex-col items-center gap-6 text-center py-12`;

const OpenSourceSponsoring = () => (
  <div className="flex w-full flex-col items-center rounded border-2 border-plum-6 p-6 md:py-16">
    <H2>Open source sponsoring</H2>
    <p className="text-lg md:text-center md:text-xl">
      We ❤️ the open source community and we are happy to support it.
    </p>
    <Link
      href="https://argos-ci.com/docs/open-source"
      className="mt-6 transition-colors ease-in-out hover:underline [&>svg]:hover:translate-x-0.5"
    >
      Read more about our open source sponsoring program
      <ArrowRightIcon className="ml-2 inline size-3 shrink-0 transition-transform ease-in-out" />
    </Link>
  </div>
);

export default function Page() {
  return (
    <div className="flex flex-col gap-8 pb-14">
      <Section>
        <H1>Pricing plans</H1>
        <PricingCards />
      </Section>

      <Section>
        <OpenSourceSponsoring />
      </Section>

      <Section>
        <div className="text-center text-xl">
          Trusted by the best frontend teams
        </div>
        <BrandTestimonials />
      </Section>

      <Section>
        <H2>How much does it cost?</H2>
        <PricingSlider />
      </Section>

      <Section>
        <H2>Frequently asked questions</H2>
        <FAQ />
      </Section>
    </div>
  );
}
