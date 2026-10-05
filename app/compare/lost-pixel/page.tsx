import { Metadata } from "next";

import { PricingSlider } from "@/app/common/PricingSlider";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  PricingSection,
  SourcesNote,
  TableSection,
  TrySection,
  VerdictSection,
} from "../common";
import { ComparisonTable } from "../comparison-table";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos vs Lost Pixel",
  absoluteTitle:
    "Lost Pixel Alternative · Argos, open-source visual testing after the sunset",
  description:
    "Lost Pixel is being sunset after its team joined Figma. Argos is an open-source alternative for Storybook and page screenshots, with baselines from Git and reviews on the pull request.",
  pathname: "/compare/lost-pixel",
});

const emblemProps = { emblemAlt: comparison.fullName };

export default function Page() {
  return (
    <>
      <HeroSection
        title={comparison.title}
        description={comparison.description}
        migrationHref={comparison.migrationHref}
        {...emblemProps}
      />

      <VerdictSection comparison={comparison} />

      <TableSection>
        <ComparisonTable comparison={comparison} />
        <SourcesNote comparison={comparison} />
      </TableSection>

      <PricingSection title="Argos Pricing">
        <PricingSlider />
      </PricingSection>

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
