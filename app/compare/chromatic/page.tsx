import { Metadata } from "next";

import { ComparePricingSlider } from "@/app/common/PricingSlider";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  PricingSection,
  TableSection,
  TrySection,
} from "../common";
import chromaticDark from "./chromatic-dark.svg";
import chromatic from "./chromatic.svg";
import { FAQ } from "./faq";
import { ComparisonTable } from "./table";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Chromatic",
  description:
    "Explore the differences between Argos and Chromatic, highlighting their features, performance, and user experience in visual testing.",
  pathname: "/compare/chromatic",
});

export default function Page() {
  return (
    <>
      <HeroSection
        title="Chromatic vs Argos"
        description="Chromatic and Argos are two leading visual testing tools. This guide will help you understand their key features, pricing, and unique strengths, making it easier for you to choose the right tool for your needs."
        logoSrc={chromatic}
        logoSrcDark={chromaticDark}
        logoAlt="Chromatic"
      />

      <TableSection>
        <ComparisonTable />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="chromatic" />
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection />
    </>
  );
}
