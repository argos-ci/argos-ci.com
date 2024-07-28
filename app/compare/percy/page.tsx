import { Metadata } from "next";

import { PercyPricingSlider } from "@/app/common/PricingSlider";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  PricingSection,
  TableSection,
  TrySection,
} from "../common";
import { FAQ } from "./faq";
import percy from "./percy.svg";
import { ComparisonTable } from "./table";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Percy Browserstack",
  description:
    "Compare Argos and Percy Browserstack in detail, focusing on their features, performance, and ease of use for visual testing.",
  pathname: "/compare/percy",
});

export default function Page() {
  return (
    <>
      <HeroSection
        title="Percy vs Argos"
        description="Percy and Argos are two leading visual testing tools. This guide will help you understand their key features, pricing, and unique strengths, making it easier for you to choose the right tool for your needs."
        logoSrc={percy}
        logoAlt="Percy by Browserstack"
      />

      <TableSection>
        <ComparisonTable />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <PercyPricingSlider />
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection />
    </>
  );
}
