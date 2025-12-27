import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FeatureGrid, FeatureGridFeature } from "@/components/FeatureGrid";
import { FullPageGrid } from "@/components/FullPageGrid";
import {
  Hero,
  HeroActions,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { getMetadata } from "@/lib/metadata";

import { permitIoQuote } from "../assets/customers/library/permit-io";
import { TrustedBy } from "../common/TrustedBy";
import { FailureScreenshots as FailureScreenshotsIllustration } from "../home/test-debugging/features/FailureScreenshots";
import { OneClickReplayIllustration } from "./features/OneClickReplay";
import { OneLineSetupIllustration } from "./features/OneLineSetup";
import { RetryScreenshotsLeftIllustration } from "./features/RetryScreenshotsLeft";
import { SdkFloatingLogosIllustration } from "./features/SdkFloatingLogos";
import { UnlimitedTracesIllustration } from "./features/UnlimitedTraces";

export const metadata: Metadata = getMetadata({
  title: "Test Debugging",
  description:
    "Investigate failed visual tests from Playwright and Cypress with full context. See what changed, understand why tests failed, and debug UI regressions instantly in your CI.",
  pathname: "/test-debugging",
});

const color = "teal" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-120 md:py-24">
          <FullPageGrid height="h-200 md:h-120" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Test Debugging</FeatureIndicator>
            </div>
            <HeroHeading>See why your E2E fails</HeroHeading>
            <HeroDescription>
              Investigate failed tests from Playwright and Cypress. See what
              broke, understand why it failed instantly in your CI.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link href="https://app.argos-ci.com/signup">
                  Start for free
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge">Get a demo</Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>
      <TrustedBy />
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="container-gutter max-w-2xl"
            >
              <SectionHeaderTexts>
                <SectionTitle>Playwright Traces, built in</SectionTitle>
                <SectionDescription>
                  Capture, store, and inspect Playwright traces directly in
                  Argos. No setup overhead, no limits, and full visibility even
                  when tests pass after retries.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid cols={3}>
            <FeatureGridFeature
              title={<>Unlimited Traces</>}
              description={
                <>
                  All Playwright traces are stored without quotas or caps.
                  Capture everything, keep full history, and debug without
                  worrying about volume or cost.
                </>
              }
              href="/docs/playwright#aria-snapshots"
              illustration={<UnlimitedTracesIllustration />}
            />
            <FeatureGridFeature
              title={<>One line setup</>}
              description={
                <>
                  Enable trace support with a single Playwright reporter. No
                  extra infra, no CI tweaks, no artifact plumbing.
                </>
              }
              href="/docs/quickstart/playwright"
              illustration={<OneLineSetupIllustration />}
            />
            <FeatureGridFeature
              title={<>One click replay from Argos</>}
              description={
                <>
                  Open the Playwright trace viewer instantly from the Argos UI,
                  including traces from retried tests. Jump straight from a
                  failed screenshot to the full execution context.
                </>
              }
              href="/docs/playwright#aria-snapshots"
              illustration={<OneClickReplayIllustration />}
            />
          </FeatureGrid>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <QuoteBlock quote={permitIoQuote} className="border-b" />
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="container-gutter max-w-2xl"
            >
              <SectionHeaderTexts>
                <SectionTitle>Every failure, every retry</SectionTitle>
                <SectionDescription>
                  Argos captures screenshots from all test failures and every
                  retry in Cypress and Playwright. You never lose context, even
                  when tests eventually pass.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid cols={3}>
            <FeatureGridFeature
              title={<>Screenshots from all failures</>}
              description={
                <>
                  Every failed assertion produces screenshots automatically. No
                  artifacts to fetch, no missing images, everything is
                  centralized in Argos.
                </>
              }
              href="/docs/getting-started"
              illustration={<FailureScreenshotsIllustration />}
            />
            <FeatureGridFeature
              title={<>Screenshots for every retry</>}
              description={
                <>
                  Each retry gets its own screenshots, so you can see what
                  changed between attempts and understand flaky behavior instead
                  of guessing.
                </>
              }
              href="/docs/getting-started"
              illustration={<RetryScreenshotsLeftIllustration />}
            />
            <FeatureGridFeature
              title={<>Cypress and Playwright, same experience</>}
              description={
                <>
                  Identical screenshot handling across Cypress and Playwright.
                  Same UI, same review flow, same guarantees.
                </>
              }
              href="/docs/getting-started"
              illustration={<SdkFloatingLogosIllustration />}
            />
          </FeatureGrid>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <CallToActionSection />
    </>
  );
}
