import clsx from "clsx";
import {
  BlocksIcon,
  BotIcon,
  CloudIcon,
  CopyCheckIcon,
  EyeIcon,
  FileDiffIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  KeyboardIcon,
  LayersIcon,
  MessagesSquareIcon,
  RocketIcon,
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
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
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
import { trackDemoClick } from "../google-ads";
import { trackSignupClick } from "../google-ads";
import { SnapshotFiles } from "../home/visual-testing/features/SnapshotFiles";
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
  title: "Argos Visual & Snapshot Testing",
  subtitle: "See exactly what every change does",
  absoluteTitle:
    "Argos Change Detection · Visual & snapshot testing for any file",
  description:
    "Fast, reliable change detection for CI. Visual testing plus snapshot diffs for Markdown, JSON, HTML and more. Smart stabilization, automatic baselines, Playwright/Storybook support, and rapid reviews.",
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
              <FeatureIndicator color={color}>
                Change Detection
              </FeatureIndicator>
            </div>
            <HeroHeading>
              See exactly what every PR changes
            </HeroHeading>
            <HeroDescription>
              Catch every change automatically—pixels or any file—review it fast,
              and merge with confidence across browsers, devices, and
              environments.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link
                  href="https://app.argos-ci.com/signup"
                  onClick={trackSignupClick}
                >
                  Start for free
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge" onClick={trackDemoClick}>
                  Get a demo
                </Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>
      <TrustedBy />
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
            <SectionHeader
              align="center"
              className="container-gutter max-w-2xl"
            >
              <Chip icon={EyeIcon}>Visual Review</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Review diffs at full speed</SectionTitle>
                <SectionDescription>
                  Review visual diffs at speed with a high performance
                  experience built for large scale visual testing.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
            <DiffsReview />
          </Container>
        </div>
        <div className="px-4">
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
              href="/docs"
              illustration={<InstantDiffInspector />}
            />
            <FeatureGridFeature
              title={<>Review history</>}
              description={
                <>
                  See what changed, who approved, and when. Keep a reliable
                  audit trail for releases and regressions.
                </>
              }
              href="/docs"
              illustration={<ReviewHistory />}
            />
          </FeatureGrid>
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Test context</>}
              description={
                <>
                  Every diff comes with the details you need: URL, viewport,
                  color mode, and your own annotations to understand intent
                  instantly.
                </>
              }
              href="/docs"
              illustration={<TestContext />}
            />
            <FeatureGridFeature
              title={<>Diffs grouping</>}
              description={
                <>
                  Group related screenshots so you review once, not fifty times.
                  Keep PRs readable even when the UI changes ripple across
                  pages.
                </>
              }
              href="/docs"
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
              href="/docs"
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
              href="/docs"
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
              href="/docs"
              icon={SlidersHorizontalIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
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
                href: "/docs/sdks-reference/playwright#aria-snapshots",
              },
              {
                key: "integrated",
                icon: <LayersIcon />,
                title: "Perfect integration",
                text: "Works seamlessly with sharding, retries, and repeat-each so parallel and flaky runs stay deterministic.",
                main: <IntegratedRuns />,
                href: "/docs/sdks-reference/playwright",
              },
            ]}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip icon={FileDiffIcon}>Snapshot Testing</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Not just screenshots — any file</SectionTitle>
              <SectionDescription>
                Upload text-based artifacts with the CLI and Argos matches them
                to baselines just like screenshots. Review changes to Markdown,
                JSON, HTML, CSS, JavaScript, XML, YAML, and plain text alongside
                your visual diffs — essential now that agents produce as much
                Markdown and structured data as UI.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="flex justify-center pt-4">
            <SnapshotFiles />
          </div>
        </Container>
      </section>
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
            <SectionHeader
              align="center"
              className="container-gutter max-w-2xl"
            >
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
        </div>
        <div className="border-b px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Test all UI variants from a single Story</>}
              description={
                <>
                  Capture visual snapshots for every UI configuration
                  automatically. Argos runs each Storybook scenario across
                  themes, viewports, or locales without duplicating stories, so
                  visual coverage scales while your Storybook stays simple.
                </>
              }
              href="/docs/learn/how-to-guides/visual-coverage/storybook-story-modes"
              illustration={<StoryModes />}
            />
            <FeatureGridFeature
              title={<>Capture Storybook screenshots directly in CI</>}
              description={
                <>
                  Argos runs Storybook stories inside your CI using Vitest and
                  takes screenshots as part of your test suite. No local
                  rendering, no manual steps, just deterministic visual
                  snapshots generated where your code actually runs.
                </>
              }
              href="/docs/sdks-reference/storybook"
              illustration={<StorybookCIVitest />}
            />
          </FeatureGrid>
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Take screenshots during interactive flows</>}
              description={
                <>
                  Capture visual snapshots at any moment inside the Storybook
                  play function. Argos lets you assert visuals after user
                  interactions, async states, or animations, so you can validate
                  real UI behavior, not just static renders.
                </>
              }
              href="/docs/sdks-reference/storybook"
              illustration={<PlayFunctionScreenshot />}
            />
            <FeatureGridFeature
              title={<>Cover all browsers with the same stories</>}
              description={
                <>
                  Run the exact same Storybook stories across multiple browsers
                  in CI and capture visual snapshots for each engine. Catch
                  cross-browser rendering issues early without maintaining
                  separate test setups or duplicated stories.
                </>
              }
              href="/docs/sdks-reference/storybook"
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
                  Each Storybook story gets its own visual baseline, stable
                  across refactors and story reordering.
                </>
              }
              href="/docs/sdks-reference/storybook"
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
              href="/docs/sdks-reference/storybook"
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
              href="/docs/sdks-reference/storybook"
              icon={SlidersIcon}
            />
          </Container>
          <Container className="h-12 border-x" />
        </div>
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
            href="/docs/learn/integrations/github-integration"
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
            href="/docs/learn/review-workflow/pull-request-comments"
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
            href="/docs/learn/integrations/slack-integration"
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
            href="/docs/learn/how-to-guides/ci-pipelines/run-on-preview-deployments"
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
            href="/docs/learn/integrations/github-integration#merge-queue-support"
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
            href="/docs/learn/integrations/github-integration"
            icon={RotateCcwIcon}
          />
          <FeatureGridFeatureSmall
            title="Forked PR support"
            description={
              <>
                Run visual checks safely on pull requests from forks, without
                exposing secrets with GitHub OIDC Authentication.
              </>
            }
            href="/docs/learn/integrations/github-oidc-authentication"
            icon={ShieldCheckIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <section className="border-b px-4">
        <Container className="border-x">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <SectionHeaderTexts>
              <SectionTitle>One platform, from change to merge</SectionTitle>
              <SectionDescription>
                Change detection is the foundation. Deploy every PR, review
                together, and let your agents in on it too.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Deployments"
            description={
              <>
                Deploy Storybook and static builds to a live URL on every pull
                request.
              </>
            }
            href="/deployments"
            icon={RocketIcon}
          />
          <FeatureGridFeatureSmall
            title="Collaborative Reviews"
            description={
              <>
                Pin comments to the exact change, discuss in threads, and review
                in real time.
              </>
            }
            href="/collaborative-reviews"
            icon={MessagesSquareIcon}
          />
          <FeatureGridFeatureSmall
            title="For AI Agents"
            description={
              <>
                100% agent-ready: agents read the diff, fix their mistakes, and
                review from the CLI.
              </>
            }
            href="/ai-agents"
            icon={BotIcon}
          />
        </Container>
      </section>
      <CallToActionSection />
    </>
  );
}
