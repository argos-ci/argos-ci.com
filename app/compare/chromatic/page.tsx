import { Metadata } from "next";

import { ComparePricingSlider } from "@/app/common/PricingSlider";
import { Th, ThMain, ThSub, ThSubLink, Tr } from "@/components/ComparisonTable";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  PricingSection,
  TableSection,
  TrySection,
} from "../common";
import { ComparisonTable, Feature, Features } from "../comparison-table";
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
    argos: "$100/mo",
    competitor: "$179/mo",
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
          additionals={
            <>
              <Tr>
                <Th>
                  <ThMain>Screenshot in Play function</ThMain>
                  <ThSubLink href="/docs/storybook#interactions-using-the-play-function">
                    Take screenshots during the test
                  </ThSubLink>
                </Th>
                <Feature
                  feature={{
                    argos: "✔️",
                    competitor: "❌",
                  }}
                />
              </Tr>
              <Tr>
                <Th>
                  <ThMain>No time-limit for Play function</ThMain>
                  <ThSub>Take screenshots of long-running tests</ThSub>
                </Th>
                <Feature
                  feature={{
                    argos: "✔️",
                    competitor: "❌",
                  }}
                />
              </Tr>
            </>
          }
        />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="chromatic" />
        <p className="text-low mt-4 text-center text-sm">
          Our estimation is based on the assumption that you have 80% Turbosnap.
        </p>
      </PricingSection>

      <KeyFeaturesSection />

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
