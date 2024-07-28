import { Metadata } from "next";

import { PricingSlider } from "@/app/common/PricingSlider";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  PricingSection,
  TableSection,
  TrySection,
} from "../common";
import applitools from "./applitools.svg";
import { FAQ } from "./faq";
import { ComparisonTable } from "./table";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Applitools",
  description:
    "Explore a detailed comparison of Argos and Applitools, focusing on features, performance, and ease of use in visual testing.",
  pathname: "/compare/applitools",
});

export default function Page() {
  return (
    <>
      <HeroSection
        title="Applitools vs Argos"
        description="Applitools and Argos are two leading visual testing tools. This guide will help you understand their key features, pricing, and unique strengths, making it easier for you to choose the right tool for your needs."
        logoSrc={applitools}
        logoAlt="Applitools"
      />

      <TableSection>
        <ComparisonTable />
      </TableSection>

      <PricingSection title="Argos Pricing">
        <PricingSlider />
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection />
    </>
  );
}
