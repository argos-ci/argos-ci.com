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
import { comparison } from "./comparison";
import { FAQ } from "./faq";
import percyEmblemDark from "./percy-emblem-dark.svg";
import percyEmblem from "./percy-emblem.svg";
import percyLogoDark from "./percy-logo-dark.svg";
import percyLogo from "./percy-logo.svg";

export const metadata: Metadata = getMetadata({
  title: "Argos, the alternative to Percy",
  absoluteTitle: "Argos, the alternative to Percy Browserstack",
  description:
    "Learn how Argos compares to Percy and why Argos is the best alternative for visual testing.",
  pathname: "/compare/percy",
});

const emblemProps = {
  emblemSrc: percyEmblem,
  emblemSrcDark: percyEmblemDark,
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
          logoSrc={percyLogo}
          logoSrcDark={percyLogoDark}
        />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="percy" />
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
