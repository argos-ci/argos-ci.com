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
import backstopjsEmblem from "./backstopjs-emblem.svg";
import backstopjsLogoDark from "./backstopjs-logo-dark.svg";
import backstopjsLogo from "./backstopjs-logo.svg";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos, the alternative to BackstopJS",
  absoluteTitle: "Argos, the alternative to BackstopJS",
  description:
    "Move from self-hosted BackstopJS to Argos: cloud baselines from your Git history, consistent comparisons across machines, and reviews on the pull request.",
  pathname: "/compare/backstopjs",
});

const features: Features = {
  snapshotTesting: {
    argos: "✔️",
    competitor: "❌",
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
    competitor: "✔️",
  },
  beautifulAndIntuitiveUi: {
    argos: "✔️",
    competitor: "Local HTML report",
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
    competitor: "Global only",
  },
  spendManamgement: {
    argos: "✔️",
    competitor: "❌",
  },
};

const emblemProps = {
  emblemSrc: backstopjsEmblem,
  emblemAlt: "BackstopJS",
};

export default function Page() {
  return (
    <>
      <HeroSection
        title="BackstopJS vs Argos"
        description="Keep the visit-screenshot-diff workflow, drop the self-hosting. Argos moves your BackstopJS scenarios to cloud baselines reviewed on the pull request."
        migrationHref="/docs/learn/how-to-guides/migrate-to-argos/from-backstopjs"
        {...emblemProps}
      />

      <TableSection>
        <ComparisonTable
          logoSrc={backstopjsLogo}
          logoSrcDark={backstopjsLogoDark}
          title="BackstopJS"
          features={features}
          additionals={
            <>
              <Tr>
                <Th>
                  <ThMain>Cloud baselines</ThMain>
                  <ThSubLink href="/docs/learn/platform-fundamentals/baseline-build">
                    Selected from Git history, not a local folder
                  </ThSubLink>
                </Th>
                <Feature feature={{ argos: "✔️", competitor: "❌" }} />
              </Tr>
              <Tr>
                <Th>
                  <ThMain>Pull request review &amp; approval</ThMain>
                  <ThSubLink href="/docs/learn/review-workflow/review-a-build">
                    Shared review, not backstop approve on one machine
                  </ThSubLink>
                </Th>
                <Feature feature={{ argos: "✔️", competitor: "❌" }} />
              </Tr>
              <Tr>
                <Th>
                  <ThMain>Managed infrastructure</ThMain>
                  <ThSub>Browsers, storage, and parallelization handled</ThSub>
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
