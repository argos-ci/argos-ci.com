import { Metadata } from "next";

import { Th, ThMain, ThSub, ThSubLink, Tr } from "@/components/ComparisonTable";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  KeyFeaturesSection,
  TableSection,
  TrySection,
} from "../common";
import { ComparisonTable, Feature, Features } from "../comparison-table";
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

const features: Features = {
  snapshotTesting: {
    argos: "✔️",
    competitor: "Local only",
  },
  deployments: {
    argos: "✔️",
    competitor: "❌",
  },
  collaborativeReviews: {
    argos: "✔️",
    competitor: "❌",
  },
  agentReady: {
    argos: "✔️",
    competitor: "❌",
  },
  playwrightDebugging: {
    argos: "✔️",
    competitor: "Local only",
  },
  playwrightTestRetries: {
    argos: "✔️",
    competitor: "Local only",
  },
  githubSso: {
    argos: "✔️",
    competitor: "❌",
  },
  openSource: {
    argos: "✔️",
    competitor: "✔️",
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
    competitor: "❌",
  },
  sensitivityThresholdPerScreenshot: {
    argos: "✔️",
    competitor: "Per assertion",
  },
  spendManamgement: {
    argos: "✔️",
    competitor: "❌",
  },
};

const emblemProps = {
  emblemSrc: playwrightEmblem,
  emblemAlt: "Playwright",
};

export default function Page() {
  return (
    <>
      <HeroSection
        title="Playwright screenshots vs Argos"
        description="Keep your Playwright tests, drop the committed PNG baselines. Argos moves toHaveScreenshot() to cloud baselines you review on the pull request."
        migrationHref="/docs/learn/how-to-guides/migrate-to-argos/from-playwright-native-screenshots"
        {...emblemProps}
      />

      <TableSection>
        <ComparisonTable
          logoSrc={playwrightLogo}
          logoSrcDark={playwrightLogoDark}
          title="Playwright screenshots"
          features={features}
          additionals={
            <>
              <Tr>
                <Th>
                  <ThMain>Cloud baselines</ThMain>
                  <ThSubLink href="/docs/learn/platform-fundamentals/baseline-build">
                    No committed *-snapshots/ PNGs in Git
                  </ThSubLink>
                </Th>
                <Feature feature={{ argos: "✔️", competitor: "❌" }} />
              </Tr>
              <Tr>
                <Th>
                  <ThMain>Review UI on the pull request</ThMain>
                  <ThSubLink href="/docs/learn/review-workflow/review-a-build">
                    Approve changes without --update-snapshots
                  </ThSubLink>
                </Th>
                <Feature feature={{ argos: "✔️", competitor: "❌" }} />
              </Tr>
              <Tr>
                <Th>
                  <ThMain>Cross-platform consistency</ThMain>
                  <ThSub>No -darwin vs -linux baseline mismatches</ThSub>
                </Th>
                <Feature feature={{ argos: "✔️", competitor: "❌" }} />
              </Tr>
            </>
          }
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
