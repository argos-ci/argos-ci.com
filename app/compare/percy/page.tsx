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
  title: "Argos vs Percy",
  absoluteTitle:
    "Argos vs Percy (BrowserStack) · An open-source Percy alternative",
  description:
    "Argos vs Percy by BrowserStack for visual testing: pricing, capture model, Playwright and Storybook support, and reviews. Argos is an open-source alternative to Percy.",
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
