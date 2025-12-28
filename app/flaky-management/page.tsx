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
import { AdvancedAnalyticsCardsIllustration } from "./features/AdvancedAnalyticsCards";
import { CleanSignalHistoryIllustration } from "./features/CleanSignalHistory";
import { ChangeHistoryStackIllustration } from "./features/ChangeHistoryStack";
import { FlakyIndicatorScreenshotIllustration } from "./features/FlakyIndicatorScreenshot";
import { SmartMatchingStackIllustration } from "./features/SmartMatchingStack";
import { IgnoreFromReviewIllustration } from "./features/IgnoreFromReview";

export const metadata: Metadata = getMetadata({
  title: "Flaky Management",
  description:
    "Detect, track, and control flaky visual tests in CI. Argos identifies unstable screenshots across builds, silences flaky noise, and helps teams keep reliable visual signals at scale.",
  pathname: "/flaky-management",
});

const color = "amber" as const;

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
            <HeroHeading>
              Flaky test management that keeps your CI reliable
            </HeroHeading>
            <HeroDescription>
              Detect unstable visual tests, track flakiness over time, and
              automatically silence noisy changes before they slow your team
              down.
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
                <SectionTitle>
                  See flakiness before it hurts your CI
                </SectionTitle>
                <SectionDescription>
                  Argos makes flaky behavior visible at a glance, then gives you
                  the data to understand it, track it, and fix it with
                  confidence.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid cols={3}>
            <FeatureGridFeature
              title={<>Flaky indicator on every screenshot</>}
              description={
                <>
                  Instantly see whether a screenshot is stable or flaky. Argos
                  flags unstable visual changes directly in the review flow so
                  you never approve noise by accident.
                </>
              }
              href="/docs/flaky-test-detection#view-flaky-indicators-in-your-build-review"
              illustration={<FlakyIndicatorScreenshotIllustration />}
            />
            <FeatureGridFeature
              title={<>Advanced analytics per test</>}
              description={
                <>
                  Dive into a dedicated test page with flakiness score,
                  instability over time, build level metrics, and consistency
                  signals. You get a clear picture of how reliable a test really
                  is.
                </>
              }
              href="/docs/flaky-test-detection#explore-the-test-page"
              illustration={<AdvancedAnalyticsCardsIllustration />}
            />
            <FeatureGridFeature
              title={<>Full change history and context</>}
              description={
                <>
                  Trace every visual change from first appearance to latest
                  occurrence. Compare runs to understand exactly when and why
                  flakiness happens.
                </>
              }
              href="/docs/flaky-test-detection#explore-the-test-page"
              illustration={<ChangeHistoryStackIllustration />}
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
                <SectionTitle>
                  Ignore noise without hiding real regressions
                </SectionTitle>
                <SectionDescription>
                  Silence known flaky or irrelevant visual changes once, and
                  keep your CI signal clean without lowering your detection
                  standards.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid cols={3}>
            <FeatureGridFeature
              title={<>Ignore changes directly from review</>}
              description={
                <>
                  Ignore a specific visual change right from the build or test
                  page. One click is enough, no config files, no baselines to
                  rewrite.
                </>
              }
              href="/docs/getting-started"
              illustration={<IgnoreFromReviewIllustration />}
            />
            <FeatureGridFeature
              title={<>Smart matching across builds</>}
              description={
                <>
                  Once ignored, Argos automatically detects the same change in
                  future builds and silences it. New or different regressions
                  are still surfaced normally.
                </>
              }
              href="/docs/getting-started"
              illustration={<SmartMatchingStackIllustration />}
            />
            <FeatureGridFeature
              title={<>Clean CI signal, preserved context</>}
              description={
                <>
                  Ignored changes stay visible in history for auditing and
                  debugging. You reduce noise today without losing the ability
                  to understand what happened later.
                </>
              }
              href="/docs/getting-started"
              illustration={<CleanSignalHistoryIllustration />}
            />
          </FeatureGrid>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <CallToActionSection />
    </>
  );
}
