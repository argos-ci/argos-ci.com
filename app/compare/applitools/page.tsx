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
import { ComparisonTable, Features } from "../comparison-table";
import applitoolsEmblem from "./applitools-emblem.svg";
import applitoolsLogoDark from "./applitools-logo-dark.svg";
import applitoolsLogo from "./applitools-logo.svg";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Applitools",
  description:
    "Learn how Argos compares to Applitools and why Argos is the best alternative for visual testing.",
  pathname: "/compare/applitools",
});

const features: Features = {
  pricing: {
    argos: "$100/mo",
    competitor: "Not public",
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
    competitor: "❌",
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
  emblemSrc: applitoolsEmblem,
  emblemAlt: "Applitools",
};

export default function Page() {
  return (
    <>
      <HeroSection
        title="Applitools vs Argos"
        description="Learn how Argos compares to Applitools and why Argos is the best alternative for visual testing."
        {...emblemProps}
      />

      <TableSection>
        <ComparisonTable
          logoSrc={applitoolsLogo}
          logoSrcDark={applitoolsLogoDark}
          title="Applitools"
          features={features}
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
