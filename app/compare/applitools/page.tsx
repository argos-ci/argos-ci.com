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
import { ComparisonTable } from "../comparison-table";
import applitoolsEmblem from "./applitools-emblem.svg";
import applitoolsLogoDark from "./applitools-logo-dark.svg";
import applitoolsLogo from "./applitools-logo.svg";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos vs Applitools",
  absoluteTitle: "Argos vs Applitools · An open-source Applitools alternative",
  description:
    "Argos vs Applitools for visual testing: pricing, deterministic pixel diffs vs Visual AI, Playwright and Storybook support, and reviews. Argos is an open-source alternative to Applitools.",
  pathname: "/compare/applitools",
});

const emblemProps = {
  emblemSrc: applitoolsEmblem,
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
          logoSrc={applitoolsLogo}
          logoSrcDark={applitoolsLogoDark}
        />
      </TableSection>

      <PricingSection title="Argos Pricing">
        <PricingSlider />
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
