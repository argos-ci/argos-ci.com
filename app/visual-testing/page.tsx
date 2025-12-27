import clsx from "clsx";
import {
  BlocksIcon,
  CloudIcon,
  CopyCheckIcon,
  EyeIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  KeyboardIcon,
  LayersIcon,
  type LucideIcon,
  RotateCcwIcon,
  RouteIcon,
  ScanTextIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SlidersIcon,
  ZapIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
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
import { FeaturesCarousel } from "@/components/feature-section/FeaturesCarousel";
import { FeaturedSDKsSection } from "@/components/featured-sdk/FeaturedSDKs";
import { getMetadata } from "@/lib/metadata";

import { pivotQuote } from "../assets/customers/library/pivot";
import { TrustedBy } from "../common/TrustedBy";
import { AriaSnapshots } from "./features/AriaSnapshots";
import { BrowserCoverage } from "./features/BrowserCoverage";
import { CITimeline } from "./features/CITimeline";
import { DeploymentPreviewFlow } from "./features/DeploymentPreviewFlow";
import { DiffsReview } from "./features/DiffsReview";
import { GitHubChecks } from "./features/GitHubChecks";
import { GitHubComment } from "./features/GitHubComment";
import { GroupedDiffs } from "./features/GroupedDiffs";
import { InstantDiffInspector } from "./features/InstantDiffInspector";
import { IntegratedRuns } from "./features/IntegratedRuns";
import { PlayFunctionScreenshot } from "./features/PlayFunctionScreenshot";
import { ReviewHistory } from "./features/ReviewHistory";
import { ScreenshotsStayInCI } from "./features/ScreenshotsStayInCI";
import { SlackNotification } from "./features/SlackNotification";
import { StoryModes } from "./features/StoryModes";
import { StorybookCIVitest } from "./features/StorybookCIVitest";
import { StorybookSnapshots } from "./features/StorybookSnapshots";
import { TestContext } from "./features/TestContext";

export const metadata: Metadata = getMetadata({
  title: "Visual Testing for modern CI",
  description:
    "Argos brings fast, reliable visual testing to your CI. Catch UI regressions with smart stabilization, automatic baselines, Playwright and Storybook support, and a review workflow built for speed.",
  pathname: "/visual-testing",
});

const color = "blue" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-120 md:py-24">
          <FullPageGrid height="h-200 md:h-120" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Visual Testing</FeatureIndicator>
            </div>
            <HeroHeading>
              Visual testing that scales from PRs to production
            </HeroHeading>
            <HeroDescription>
              Catch visual regressions automatically, review changes fast, and
              trust every deployment across browsers, devices, and environments.
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
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip>
              <EyeIcon className="size-4" />
              Visual Review
            </Chip>
            <SectionHeaderTexts>
              <SectionTitle>Review diffs at full speed</SectionTitle>
              <SectionDescription>
                Review visual diffs at speed with a high performance experience
                built for large scale visual testing.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <DiffsReview />
        </Container>
      </section>
      <section className="px-4">
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Find and inspect changes instantly</>}
            description={
              <>
                Side by side and overlay views with synchronized zoom, plus a
                built in changes highlighter. Jump from diff to diff, see
                exactly what changed, and inspect details without losing
                context.
              </>
            }
            href="/docs/getting-started"
            illustration={<InstantDiffInspector />}
          />
          <FeatureGridFeature
            title={<>Review history</>}
            description={
              <>
                See what changed, who approved, and when. Keep a reliable audit
                trail for releases and regressions.
              </>
            }
            href="/docs/getting-started"
            illustration={<ReviewHistory />}
          />
        </FeatureGrid>
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Test context</>}
            description={
              <>
                Every diff comes with the details you need: URL, viewport, color
                mode, and your own annotations to understand intent instantly.
              </>
            }
            href="/docs/getting-started"
            illustration={<TestContext />}
          />
          <FeatureGridFeature
            title={<>Diffs grouping</>}
            description={
              <>
                Group related screenshots so you review once, not fifty times.
                Keep PRs readable even when the UI changes ripple across pages.
              </>
            }
            href="/docs/getting-started"
            illustration={<GroupedDiffs />}
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Automatic approval reuse"
            description={
              <>
                Argos remembers what you already approved and reapplies it
                automatically when identical changes show up again.
              </>
            }
            href="/docs/getting-started"
            icon={CopyCheckIcon}
          />
          <FeatureGridFeatureSmall
            title="Keyboard shortcuts"
            description={
              <>
                Review at the speed of thought. Approve, reject, mask, and
                navigate without leaving the keyboard.
              </>
            }
            href="/docs/getting-started"
            icon={KeyboardIcon}
          />
          <FeatureGridFeatureSmall
            title="Overlay customization"
            description={
              <>
                Tune the overlay to your needs. Adjust opacity, colors, and
                blending to isolate real visual changes and ignore noise.
              </>
            }
            href="/docs/getting-started"
            icon={SlidersHorizontalIcon}
          />
        </Container>
        <Container className="h-12 border-x border-b" />
      </section>
      <QuoteBlock quote={pivotQuote} className="border-b" />
      <section className="border-b px-4">
        <Container className="border-x">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip icon={RouteIcon}>End-to-end Testing</Chip>
            <SectionHeaderTexts>
              <SectionTitle>
                E2E visual testing at scale, without friction
              </SectionTitle>
              <SectionDescription>
                Run visual screenshots directly in your existing Playwright or
                Cypress tests. Review reliable diffs with zero extra setup.
                Built to handle sharding, retries, parallel runs, and large
                volumes while keeping feedback fast and predictable.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container noGutter className="border-x">
          <FeaturesCarousel
            color={color}
            features={[
              {
                key: "ci-based",
                icon: <CloudIcon />,
                title: "Screenshots outside Git",
                text: "Capture screenshots directly from Playwright in CI. No files committed, no artifacts to manage, even at scale.",
                main: <ScreenshotsStayInCI />,
                href: "/docs/quickstart",
              },
              {
                key: "aria-snapshots",
                icon: <ScanTextIcon />,
                title: "ARIA snapshots, first-class",
                text: "Validate accessibility trees with ARIA snapshots and catch semantic regressions beyond pixels.",
                main: <AriaSnapshots />,
                href: "/docs/playwright#aria-snapshots",
              },
              {
                key: "integrated",
                icon: <LayersIcon />,
                title: "Perfect integration",
                text: "Works seamlessly with sharding, retries, and repeat-each so parallel and flaky runs stay deterministic.",
                main: <IntegratedRuns />,
                href: "/docs/playwright",
              },
            ]}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip icon={BlocksIcon}>Components Testing</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Visual testing for Storybook</SectionTitle>
              <SectionDescription>
                Validate every Storybook component visually with zero extra
                setup. Turn stories into visual checkpoints and catch
                regressions early, without slowing down your workflow.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <StorybookSnapshots />
        </Container>
      </section>
      <section className="border-b px-4">
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Test all UI variants from a single Story</>}
            description={
              <>
                Capture visual snapshots for every UI configuration
                automatically. Argos runs each Storybook scenario across themes,
                viewports, or locales without duplicating stories, so visual
                coverage scales while your Storybook stays simple.
              </>
            }
            href="/docs/storybook-story-modes"
            illustration={<StoryModes />}
          />
          <FeatureGridFeature
            title={<>Capture Storybook screenshots directly in CI</>}
            description={
              <>
                Argos runs Storybook stories inside your CI using Vitest and
                takes screenshots as part of your test suite. No local
                rendering, no manual steps, just deterministic visual snapshots
                generated where your code actually runs.
              </>
            }
            href="/docs/storybook"
            illustration={<StorybookCIVitest />}
          />
        </FeatureGrid>
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Take screenshots during interactive flows</>}
            description={
              <>
                Capture visual snapshots at any moment inside the Storybook play
                function. Argos lets you assert visuals after user interactions,
                async states, or animations, so you can validate real UI
                behavior, not just static renders.
              </>
            }
            href="/docs/storybook"
            illustration={<PlayFunctionScreenshot />}
          />
          <FeatureGridFeature
            title={<>Cover all browsers with the same stories</>}
            description={
              <>
                Run the exact same Storybook stories across multiple browsers in
                CI and capture visual snapshots for each engine. Catch
                cross-browser rendering issues early without maintaining
                separate test setups or duplicated stories.
              </>
            }
            href="/docs/storybook"
            illustration={<BrowserCoverage />}
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Story based baselines"
            description={
              <>
                Each Storybook story gets its own visual baseline, stable across
                refactors and story reordering.
              </>
            }
            href="/docs/storybook"
            icon={LayersIcon}
          />

          <FeatureGridFeatureSmall
            title="Zero config Storybook CI"
            description={
              <>
                Detects stories, viewports, and themes automatically without
                manual snapshot wiring.
              </>
            }
            href="/docs/storybook"
            icon={ZapIcon}
          />

          <FeatureGridFeatureSmall
            title="Addons aware rendering"
            description={
              <>
                Correctly captures stories using controls, decorators, themes,
                and globals.
              </>
            }
            href="/docs/storybook"
            icon={SlidersIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <FeaturedSDKsSection />
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip>
              <GitPullRequestIcon className="size-4" />
              Continuous Integration
            </Chip>
            <SectionHeaderTexts>
              <SectionTitle>Built into your delivery flow</SectionTitle>
              <SectionDescription>
                Visual checks that follow your code from commit to deploy,
                integrated at the core of your CI.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <CITimeline />
        </Container>
      </section>
      <section className="px-4">
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Enforce visual quality with CI checks</>}
            description={
              <>
                Argos reports visual test results as native CI checks on pull
                requests and merge requests. Catch regressions early, block
                merges only when it matters, and keep visual quality gates
                consistent across GitHub and GitLab.
              </>
            }
            href="/docs/github"
            illustration={<GitHubChecks />}
          />
          <FeatureGridFeature
            title={<>Clear visual status in pull request comments</>}
            description={
              <>
                Argos posts a concise build summary directly in pull requests.
                See what changed, what was approved, and what requires attention
                at a glance, without noise, without leaving GitHub.
              </>
            }
            href="/docs/pull-request-comments"
            illustration={<GitHubComment />}
          />
        </FeatureGrid>
        <FeatureGrid>
          <FeatureGridFeature
            title={
              <>Actionable Slack notifications, right where your team is</>
            }
            description={
              <>
                Use Automations to send concise Argos updates to the right Slack
                channels at the right time. Notify your team when a build is
                ready for review, changes are requested, or a build is auto
                approved on main.
              </>
            }
            href="/docs/slack"
            illustration={<SlackNotification />}
          />
          <FeatureGridFeature
            title={<>Visual checks on every deployment preview</>}
            description={
              <>
                Argos plugs into GitHub Actions and deployment providers like
                Vercel, Netlify, and Cloudflare. Every preview is tested
                automatically, regressions are reported back to the pull
                request, and your production baseline stays clean and reliable.
              </>
            }
            href="/docs/run-on-preview-deployment"
            illustration={<DeploymentPreviewFlow />}
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Merge queue support"
            description={
              <>
                Automatically validate visual changes in GitHub merge queues
                before they land on main.
              </>
            }
            href="/docs/github"
            icon={GitMergeIcon}
          />
          <FeatureGridFeatureSmall
            title="Partial retries"
            description={
              <>
                Re-run only failed checks in GitHub Actions, without restarting
                the full workflow.
              </>
            }
            href="/docs/github"
            icon={RotateCcwIcon}
          />
          <FeatureGridFeatureSmall
            title="Forked PR support"
            description={
              <>
                Run visual checks safely on pull requests from forks, without
                exposing secrets with tokenless authentication.
              </>
            }
            href="/docs/github"
            icon={ShieldCheckIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <CallToActionSection />
    </>
  );
}

function FeatureGrid(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Container
      noGutter
      className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-2 md:divide-x"
    >
      {children}
    </Container>
  );
}

function FeatureGridFeature(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  illustration: React.ReactNode;
}) {
  const { title, description, href, illustration } = props;
  return (
    <div className="relative flex flex-col gap-10 px-4 py-6 sm:px-10 sm:py-14">
      <div className="relative flex h-72 items-center justify-center">
        {illustration}
      </div>
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-low font-[450]">{description}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href={href}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}

function FeatureGridFeatureSmall(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  icon: LucideIcon;
}) {
  const { title, description, href, icon: Icon } = props;
  return (
    <div className="flex flex-col items-start gap-2 p-8 text-left text-sm lg:px-9 lg:py-10">
      <Icon className="size-4 text-(--primary-10)" />
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-low font-[450]">{description}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href={href}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
