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
import { ComparisonTable } from "../comparison-table";
import chromaticEmblem from "./chromatic-emblem.svg";
import chromaticLogoDark from "./chromatic-logo-dark.svg";
import chromaticLogo from "./chromatic-logo.svg";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos, the alternative to Chromatic",
  absoluteTitle: "Argos, the alternative to Chromatic",
  description:
    "Learn how Argos compares to Chromatic and why Argos is the best alternative for visual testing.",
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
      <TableSection>
        <ComparisonTable
          comparison={comparison}
          logoSrc={chromaticLogo}
          logoSrcDark={chromaticLogoDark}
        />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="chromatic" />
        {comparison.pricingNote ? (
          <p className="mt-4 text-center text-sm text-low">
            {comparison.pricingNote}
          </p>
        ) : null}
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
