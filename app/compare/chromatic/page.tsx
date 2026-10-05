import { Metadata } from "next";

import { ComparePricingSlider } from "@/app/common/PricingSlider";
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
import chromaticEmblem from "./chromatic-emblem.svg";
import chromaticLogoDark from "./chromatic-logo-dark.svg";
import chromaticLogo from "./chromatic-logo.svg";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos vs Chromatic",
  absoluteTitle: "Argos vs Chromatic · An open-source Chromatic alternative",
  description:
    "Argos vs Chromatic for visual testing: pricing, capture model, Storybook and Playwright support, and reviews. Argos is an open-source alternative to Chromatic.",
  pathname: "/compare/chromatic",
});

const emblemProps = {
  emblemSrc: chromaticEmblem,
  emblemAlt: comparison.fullName,
};

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
        <ComparisonTable
          comparison={comparison}
          logoSrc={chromaticLogo}
          logoSrcDark={chromaticLogoDark}
        />
        <SourcesNote comparison={comparison} />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="chromatic" />
        {comparison.pricingNote ? (
          <p className="mt-4 text-center text-sm text-low">
            {comparison.pricingNote}
          </p>
        ) : null}
      </PricingSection>

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
