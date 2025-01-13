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
import { ComparisonTable, Features } from "../comparison-table";
import chromaticEmblem from "./chromatic-emblem.svg";
import chromaticLogoDark from "./chromatic-logo-dark.svg";
import chromaticLogo from "./chromatic-logo.svg";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Chromatic",
  description:
    "Learn how Argos compares to Chromatic and why Argos is the best alternative for visual testing.",
  pathname: "/compare/chromatic",
});

const features: Features = {
  pricing: {
    argos: "$30/mo",
    competitor: "$149/mo",
  },
  playwrightDebugging: {
    argos: "✔️",
    competitor: "❌",
  },
  playwrightTestRetries: {
    argos: "✔️",
    competitor: "❌",
  },
  githubSso: {
    argos: "✔️",
    competitor: "❌",
  },
  openSource: {
    argos: "✔️",
    competitor: "❌",
  },
  beautifulAndIntuitiveUi: {
    argos: "✔️",
    competitor: "✔️",
  },
  bestScreenshotQuality: {
    argos: "✔️",
    competitor: "❌",
  },
  githubActionsPartialReRuns: {
    argos: "✔️",
    competitor: "❌",
  },
  githubLight: {
    argos: "✔️",
    competitor: "❌",
  },
  monitoringMode: {
    argos: "✔️",
    competitor: "✔️",
  },
  sensitivityThresholdPerScreenshot: {
    argos: "✔️",
    competitor: "❌",
  },
  spendManamgement: {
    argos: "✔️",
    competitor: "❌",
  },
};

const emblemProps = {
  emblemSrc: chromaticEmblem,
  emblemAlt: "Chromatic",
};

export default function Page() {
  return (
    <>
      <HeroSection
        title="Chromatic vs Argos"
        description="Learn how Argos compares to Chromatic and why Argos is the best alternative for visual testing."
        {...emblemProps}
      />

      <TableSection>
        <ComparisonTable
          logoSrc={chromaticLogo}
          logoSrcDark={chromaticLogoDark}
          title="Percy"
          features={features}
        />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="chromatic" />
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
