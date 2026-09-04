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
  title: "Argos, the alternative to Applitools",
  absoluteTitle: "Argos, the alternative to Applitools",
  description:
    "Learn how Argos compares to Applitools and why Argos is the best alternative for visual testing.",
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
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
