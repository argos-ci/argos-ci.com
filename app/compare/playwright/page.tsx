import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  TableSection,
  TrySection,
} from "../common";
import { ComparisonTable } from "../comparison-table";
import { comparison } from "./comparison";
import { FAQ } from "./faq";
import playwrightEmblem from "./playwright-emblem.svg";
import playwrightLogoDark from "./playwright-logo-dark.svg";
import playwrightLogo from "./playwright-logo.svg";

export const metadata: Metadata = getMetadata({
  title: "Argos vs Playwright screenshots",
  absoluteTitle: "Argos vs Playwright native screenshots",
  description:
    "Move from Playwright's built-in toHaveScreenshot() to Argos: cloud baselines, a review UI on the pull request, and no committed PNGs.",
  pathname: "/compare/playwright",
});

const emblemProps = {
  emblemSrc: playwrightEmblem,
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
          logoSrc={playwrightLogo}
          logoSrcDark={playwrightLogoDark}
        />
      </TableSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
