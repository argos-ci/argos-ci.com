import {
  BlocksIcon,
  CodeIcon,
  CombineIcon,
  CropIcon,
  EyeOffIcon,
  FileDiffIcon,
  FlaskConicalIcon,
  GitCompareArrowsIcon,
  HistoryIcon,
  LayersIcon,
  MousePointerClickIcon,
  PlugIcon,
  ScaleIcon,
  ScanEyeIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SunMoonIcon,
  TerminalIcon,
  WorkflowIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { mermaidSnapshotQuote } from "@/app/assets/customers/library/mermaid";
import { TrustedBy } from "@/app/common/TrustedBy";
import { AgentSection } from "@/components/AgentSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { Code } from "@/components/Code";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import { FeaturesCarousel } from "@/components/feature-section/FeaturesCarousel";
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
import { Link } from "@/components/Link";
import { PillarHero } from "@/components/PillarHero";
import { PillarLinks } from "@/components/PillarLinks";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";
import { getPillar } from "@/lib/pillars";

import { DIFF_QUESTIONS } from "./faq";
import { AriaSnapshots } from "./features/AriaSnapshots";
import { DiffMaskScore } from "./features/DiffMaskScore";
import { ScreenshotsStayInCI } from "./features/ScreenshotsStayInCI";
import { SnapshotFiles } from "./features/SnapshotFiles";
import { Stabilization } from "./features/Stabilization";
import { StorybookCIVitest } from "./features/StorybookCIVitest";
import { StorybookSnapshots } from "./features/StorybookSnapshots";
import { StoryModes } from "./features/StoryModes";
import { TestContext } from "./features/TestContext";

const pillar = getPillar("diff");

export const metadata: Metadata = getMetadata({
  title: "Argos Diff",
  absoluteTitle:
    "Argos Diff · Visual and snapshot diffs for any file, not just pixels",
  subtitle: pillar.description,
  description:
    "Deterministic pixel diffs for screenshots, text diffs for Markdown, JSON, YAML, HTML and ARIA snapshots. Playwright, Storybook, Vitest, Cypress or the CLI.",
  pathname: pillar.href,
});

const FILES_GLOB = '"**/*.{txt,json,yaml,yml,xml,html,md,css,js}"';

const AGENT_CODE = `argos upload ./screenshots
argos upload ./snapshots \\
  -f ${FILES_GLOB}
argos build get <build>
argos build snapshots <build> --needs-review --json`;

export default function Page() {
  return (
    <>
      <PillarHero
        color={pillar.color}
        label={pillar.name}
        title="Every change, diffed. Pixels or any file."
        description={
          <>
            Deterministic pixel diffs for screenshots. Text diffs for Markdown,
            JSON, YAML, HTML and ARIA snapshots. Every snapshot is compared to
            the baseline Argos picks from your Git history, and every diff is
            structured data your agents can read.
          </>
        }
      />
      <TrustedBy />

      <section id="screenshots" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={ScanEyeIcon}>Screenshots</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Only the real changes</SectionTitle>
                <SectionDescription>
                  The SDKs capture the same page the same way on every run, and
                  Argos compares each screenshot to its baseline pixel by pixel.
                  What reaches review is a change, not rendering noise.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Deterministic capture"
              description={
                <>
                  Before the screenshot, the SDK waits for fonts, images and{" "}
                  <Code>aria-busy</Code> to settle, hides carets and scrollbars,
                  pauses GIFs on their first frame and pins sticky elements in
                  place. Same page, same pixels, in every run.
                </>
              }
              href="/docs/sdks-reference/playwright#api-overview"
              illustration={<Stabilization compact />}
            />
            <FeatureGridFeature
              title="A mask and a score, not a guess"
              description={
                <>
                  Each comparison normalizes both images, runs several diff
                  passes at different thresholds, clusters pixels to separate
                  noise from change, and outputs a diff mask and a score. The
                  engine is the open-source odiff library; the implementation is
                  public too.
                </>
              }
              href="/docs/learn/platform-fundamentals/how-argos-detects-visual-differences"
              example={{
                href: "https://app.argos-ci.com/argos-ci/snkr-shop/builds/11",
                label: "See a real build",
              }}
              illustration={<DiffMaskScore />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="A threshold you set"
              description={
                <>
                  <Code>threshold</Code> runs from 0 to 1, default 0.5: the
                  higher, the less sensitive the comparison. Set it per
                  screenshot in the SDK or per upload with{" "}
                  <Code>--threshold</Code>.
                </>
              }
              href="/docs/sdks-reference/playwright#api-overview"
              icon={SlidersHorizontalIcon}
            />
            <FeatureGridFeatureSmall
              title="Mask what you can't control"
              description={
                <>
                  <Code>data-visual-test=&quot;transparent&quot;</Code> hides a
                  date or an avatar and keeps its space, <Code>blackout</Code>{" "}
                  masks it, <Code>removed</Code> drops it from the layout.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-tests/argos-helpers"
              icon={EyeOffIcon}
            />
            <FeatureGridFeatureSmall
              title="Open source, no black box"
              description={
                <>
                  Same input, same result, and the exact pixels that changed are
                  visible. No model decides what counts, and nothing hides a
                  small change.
                </>
              }
              href="/docs/learn/platform-fundamentals/how-argos-detects-visual-differences#why-pixel-diffing-instead-of-ai"
              icon={CodeIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <section id="any-file" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={FileDiffIcon}>Any file</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Not just screenshots</SectionTitle>
                <SectionDescription>
                  Upload text files with the CLI and Argos matches each one to
                  its baseline like a screenshot, then diffs it as text. The
                  Markdown an agent wrote, a JSON fixture, generated HTML:
                  reviewed next to your visual diffs.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Text diffs for structured output"
              description={
                <>
                  <Code>argos upload -f {FILES_GLOB} ./snapshots</Code> uploads
                  plain text, JSON, YAML, XML, HTML, Markdown, CSS and
                  JavaScript. Keep file names stable and each one gets a
                  baseline of its own.
                </>
              }
              href="/docs/learn/how-to-guides/visual-coverage/compare-non-image-files"
              illustration={<SnapshotFiles />}
            />
            <FeatureGridFeature
              title="ARIA snapshots, diffed like code"
              description={
                <>
                  Pass <Code>ariaSnapshot: true</Code> to{" "}
                  <Code>argosScreenshot</Code>, or call{" "}
                  <Code>argosAriaSnapshot</Code>, and the Playwright SDK
                  captures the page&apos;s accessibility tree next to the
                  screenshot. A renamed heading or a lost landmark shows up as a
                  text diff even when the pixels don&apos;t move.
                </>
              }
              href="/docs/sdks-reference/playwright#aria-snapshots"
              illustration={<AriaSnapshots />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Snapshot any value from Vitest"
              description={
                <>
                  <Code>argosSnapshot(value, {'{ extension: ".json" }'})</Code>{" "}
                  serializes any value in a browser or Node test and diffs it
                  across builds. No browser needed.
                </>
              }
              href="/docs/sdks-reference/vitest#capturing-snapshots"
              icon={FlaskConicalIcon}
            />
            <FeatureGridFeatureSmall
              title="Same build as your screenshots"
              description={
                <>
                  Pass both globs to one <Code>argos upload</Code> and images
                  and text files land in the same build, the same review and the
                  same check.
                </>
              }
              href="/docs/learn/how-to-guides/visual-coverage/compare-non-image-files#upload-non-image-files"
              icon={LayersIcon}
            />
            <FeatureGridFeatureSmall
              title="One file, one screenshot"
              description={
                <>
                  Every snapshot in a build counts as one screenshot toward your
                  plan, image or not, and each is limited to 50 MB.
                </>
              }
              href="/docs/sdks-reference/argos-command-line-interface-cli#snapshot-size-limit"
              icon={ScaleIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <section id="storybook" className="scroll-mt-24 border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={BlocksIcon}>Storybook</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Every story, every mode, in your CI</SectionTitle>
              <SectionDescription>
                Argos captures your stories in your own CI with Playwright,
                through Vitest or the Test Runner. Each story becomes a snapshot
                with a baseline of its own, and each mode multiplies it.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container noGutter className="border-x">
          <FeaturesCarousel
            color={pillar.color}
            features={[
              {
                key: "stories",
                icon: <BlocksIcon />,
                title: "Stories become snapshots",
                text: "Every story is captured and compared to its own baseline, so a component regression is caught where it lives, not three pages later.",
                main: <StorybookSnapshots />,
                href: "/docs/quickstart/storybook-quickstart",
              },
              {
                key: "modes",
                icon: <SunMoonIcon />,
                title: "One story, every mode",
                text: "Declare parameters.argos.modes for theme, viewport or locale, and Argos captures one snapshot per mode name, each with its own baseline, without duplicating stories.",
                main: (
                  <div className="w-full max-w-sm px-4">
                    <StoryModes />
                  </div>
                ),
                href: "/docs/learn/how-to-guides/visual-coverage/storybook-story-modes",
              },
              {
                key: "vitest",
                icon: <FlaskConicalIcon />,
                title: "Captured in your CI with Vitest",
                text: "Screenshots are taken where your code runs, by the Vitest browser mode you already use. Nothing is rendered in a third-party cloud.",
                main: (
                  <div className="w-full max-w-lg px-4">
                    <StorybookCIVitest />
                  </div>
                ),
                href: "/docs/sdks-reference/storybook",
              },
            ]}
          />
        </Container>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Screenshots inside play functions"
            description={
              <>
                The <Code>play</Code> function runs before the capture. With
                Vitest, call <Code>argosScreenshot(ctx, name)</Code> inside it
                to capture a form before and after it is filled.
              </>
            }
            href="/docs/sdks-reference/storybook#interactions-using-the-play-function"
            icon={MousePointerClickIcon}
          />
          <FeatureGridFeatureSmall
            title="Fit to content"
            description={
              <>
                Snapshots are cropped to the rendered component by default, with
                16px of padding at 2x zoom. Set <Code>fitToContent: false</Code>{" "}
                to capture the whole page.
              </>
            }
            href="/docs/sdks-reference/storybook#fit-to-content-vs-page"
            icon={CropIcon}
          />
          <FeatureGridFeatureSmall
            title="Vitest, Test Runner, or legacy Storybook"
            description={
              <>
                Storybook&apos;s Vitest addon is the recommended path. The Test
                Runner and Storybook before v8 are supported too, each with its
                own quickstart.
              </>
            }
            href="/docs/quickstart/storybook-quickstart"
            icon={HistoryIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>

      <section id="ci" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={WorkflowIcon}>Any framework, any CI</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Your tests, your CI, one baseline</SectionTitle>
                <SectionDescription>
                  Playwright, Vitest, Cypress, WebdriverIO, Puppeteer, or any
                  tool that writes a screenshot to disk. Upload from any CI,
                  Argos picks the baseline from your Git history, and every diff
                  lands on the pull request{" "}
                  <Link href="/review">as a check</Link>.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Screenshots stay in CI, not in Git"
              description={
                <>
                  The reporter uploads what your tests captured, straight from
                  the CI job. No binary files committed, no baseline folder to
                  maintain, no local run to refresh it.
                </>
              }
              href="/docs/quickstart"
              illustration={<ScreenshotsStayInCI />}
            />
            <FeatureGridFeature
              title="Every snapshot carries its context"
              description={
                <>
                  URL, viewport, color scheme, browser, test title and location,
                  retry, tags: the SDKs attach it all as metadata. It shows on
                  the build page and in the CLI&apos;s JSON, so a reviewer or an
                  agent knows what they are looking at.
                </>
              }
              href="/docs/sdks-reference/screenshot-metadata"
              illustration={<TestContext />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="The right baseline, from Git"
              description={
                <>
                  Argos compares against the latest approved build on the commit
                  your branch started from: the merge base with the base branch.
                  Auto-approved branches like <Code>main</Code> keep the
                  baseline current without a review.
                </>
              }
              href="/docs/learn/platform-fundamentals/baseline-build"
              icon={GitCompareArrowsIcon}
            />
            <FeatureGridFeatureSmall
              title="Shards in, one build out"
              description={
                <>
                  Playwright shards join one build automatically, Vitest shards
                  with a shared <Code>ARGOS_PARALLEL_NONCE</Code>. Elsewhere,
                  <Code>ARGOS_PARALLEL</Code> and the nonce do it. One
                  comparison, one status per commit.
                </>
              }
              href="/docs/learn/how-to-guides/ci-pipelines/parallel-testing-sharding"
              icon={CombineIcon}
            />
            <FeatureGridFeatureSmall
              title="Any framework via the CLI"
              description={
                <>
                  <Code>argos upload ./screenshots</Code> creates a build from
                  any folder of images. The CLI reads the commit, branch and
                  pull request from your CI environment.
                </>
              }
              href="/docs/quickstart/any-test-framework"
              icon={TerminalIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <AgentSection
        title="Diffs your agent can read"
        description={
          <>
            Every diff is structured data: status, score, diff mask URL,
            baseline and current files, and the metadata the SDK attached. An
            agent uploads from the CLI, reads the build back as JSON, and uses
            the diff as evidence before it approves anything.
          </>
        }
        code={AGENT_CODE}
        badge="argos-cli"
        docsHref="/docs/sdks-reference/argos-command-line-interface-cli#inspecting-builds-and-tests"
        docsLabel="CLI reference"
        cards={[
          {
            icon: TerminalIcon,
            title: "Read-only with the CI token",
            description: (
              <>
                <Code>build get</Code> and <Code>build snapshots</Code> work
                with the project token your CI already has.{" "}
                <Code>--needs-review --json</Code> returns only the diffs
                awaiting a decision.
              </>
            ),
            href: "/docs/sdks-reference/argos-command-line-interface-cli#project-tokens-and-personal-access-tokens",
          },
          {
            icon: PlugIcon,
            title: "Inspect diffs from your editor",
            description: (
              <>
                Connect Claude Code, Cursor or Copilot to{" "}
                <Code>mcp.argos-ci.com</Code> and the agent lists builds and
                inspects their screenshot diffs, with the{" "}
                <Code>projects:read</Code> scope and nothing more.
              </>
            ),
            href: "/docs/agents/mcp-server",
          },
          {
            icon: SparklesIcon,
            title: "Skills that know the diff",
            description: (
              <>
                <Code>npx skills add https://argos-ci.com</Code> installs{" "}
                <Code>argos-pr-review</Code>, which inspects snapshots as
                evidence for a review, and <Code>argos-cli</Code>, which teaches
                the commands.
              </>
            ),
            href: "/docs/agents/agent-skills",
          },
        ]}
      />

      <QuoteBlock quote={mermaidSnapshotQuote} className="border-b" />
      <FAQSection questions={DIFF_QUESTIONS} />
      <PillarLinks
        exclude="diff"
        description="A diff is the middle of the flow: deploy the pull request first, review what changed next, and stabilize the tests behind it."
      />
      <CallToActionSection />
    </>
  );
}
