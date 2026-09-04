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
import backstopjsEmblem from "./backstopjs-emblem.svg";
import backstopjsLogoDark from "./backstopjs-logo-dark.svg";
import backstopjsLogo from "./backstopjs-logo.svg";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos, the alternative to BackstopJS",
  absoluteTitle: "Argos, the alternative to BackstopJS",
  description:
    "Move from self-hosted BackstopJS to Argos: cloud baselines from your Git history, consistent comparisons across machines, and reviews on the pull request.",
  pathname: "/compare/backstopjs",
});

const emblemProps = {
  emblemSrc: backstopjsEmblem,
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
          logoSrc={backstopjsLogo}
          logoSrcDark={backstopjsLogoDark}
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
