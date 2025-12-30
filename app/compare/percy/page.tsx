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
import { FAQ } from "./faq";
import percyEmblemDark from "./percy-emblem-dark.svg";
import percyEmblem from "./percy-emblem.svg";
import percyLogoDark from "./percy-logo-dark.svg";
import percyLogo from "./percy-logo.svg";

const features: Features = {
  pricing: {
    argos: "$100/mo",
    competitor: "$599/mo",
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
  emblemAlt: "Percy by Browserstack",
};

export default function Page() {
  return (
    <>
      <HeroSection
        title="Percy vs Argos"
        description="Learn how Argos compares to Percy and why Argos is the best alternative for visual testing."
        {...emblemProps}
      />

      <TableSection>
        <ComparisonTable
          logoSrc={percyLogo}
          logoSrcDark={percyLogoDark}
          title="Percy"
          features={features}
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
