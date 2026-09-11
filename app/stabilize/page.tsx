import {
  ActivityIcon,
  BellIcon,
  BookOpenIcon,
  BotIcon,
  BracesIcon,
  BugPlayIcon,
  FlagOffIcon,
  FlaskConicalIcon,
  GitBranchIcon,
  ListIcon,
  MessagesSquareIcon,
  PlugIcon,
  RepeatIcon,
  Settings2Icon,
  TerminalIcon,
  ToggleLeftIcon,
  TrendingUpIcon,
  WavesIcon,
} from "lucide-react";
import { Metadata } from "next";

import { pivotAlexQuote } from "@/app/assets/customers/library/pivot";
import { TrustedBy } from "@/app/common/TrustedBy";
import { AgentSection } from "@/components/AgentSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { Code } from "@/components/Code";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
import { PillarHero } from "@/components/PillarHero";
import { PillarLinks } from "@/components/PillarLinks";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { STABILIZE_QUESTIONS } from "./faq";
import { FailureScreenshotsLarge } from "./features/FailureScreenshotsLarge";
import { FingerprintStack } from "./features/FingerprintStack";
import { FixWithAiCard } from "./features/FixWithAiCard";
import { FlakyIndicatorScreenshotIllustration } from "./features/FlakyIndicatorScreenshot";
import { IgnoreFromReviewIllustration } from "./features/IgnoreFromReview";
import { OneClickReplayIllustration } from "./features/OneClickReplay";
import { RecurringChanges } from "./features/RecurringChanges";
import { TestActivityThread } from "./features/TestActivityThread";
import { TestPageMetrics } from "./features/TestPageMetrics";

export const metadata: Metadata = getMetadata({
  title: "Argos Stabilize",
  absoluteTitle:
    "Argos Stabilize · Kill flakes and debug failures with full per-test history",
  subtitle: "Kill flakes and debug failures with full per-test history.",
  description:
    "Flakiness scores and change history per test, one-click ignore, Playwright traces and failure screenshots for every retry. Fix flaky tests, with or without AI.",
  pathname: "/stabilize",
});

const color = "amber" as const;

/**
 * The commands an agent runs to take a flaky test from the backlog to a fix.
 * Every one of them is in the CLI reference; keep them that way.
 */
const AGENT_COMMANDS = `# Flakiest tests first: the backlog
argos test list --project acme/app --limit 20 --json

# One test: metrics, trend, first and last change
argos test get <testId> --json

# Its changes, most frequent first, with screenshots
argos test changes <testId> --json

# Silence what cannot be fixed (personal access token)
argos change ignore <changeId> --project acme/app`;

export default function Page() {
  return (
    <>
      <PillarHero
        color={color}
        label="Stabilize"
        title="Kill flakes and debug failures with full per-test history"
        description={
          <>
            A flakiness score for every test, computed from your auto-approved
            builds. The history of each recurring change. A one-click ignore
            that never hides a new regression. And when a test fails, the
            Playwright trace and the failure screenshots are already in Argos,
            for you or the agent fixing it.
          </>
        }
      />
      <TrustedBy />

      {/* Flakiness */}
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={WavesIcon}>Flakiness</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  See flakiness before it hurts your CI
                </SectionTitle>
                <SectionDescription>
                  Argos scores every test from its auto-approved builds, where a
                  change means the test moved on its own. The score, its trend
                  and every change the test produced live on one test page.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
            <TestPageMetrics className="mx-auto" />
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>A flaky badge on every changed test</>}
              description={
                <>
                  Reviewing a build, you see which changed tests are known to be
                  unstable before you decide. Hover the badge for the numbers,
                  select it to open the test page with everything Argos knows
                  about that test.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-test-detection#view-flaky-indicators-in-your-build-review"
              illustration={<FlakyIndicatorScreenshotIllustration />}
            />
            <FeatureGridFeature
              title={<>Every change, grouped by shape</>}
              description={
                <>
                  A change is one exact visual difference, not one occurrence of
                  it. Argos groups every diff that looks the same, so the
                  recurring change stands out from the one-offs, with its
                  occurrences, first seen and last seen, each linking to the
                  build.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#explore-the-changes"
              illustration={<RecurringChanges />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Ranked by flakiness"
              description={
                <>
                  The Tests dashboard sorts a project&apos;s tests flakiest
                  first; the account-wide one does the same across every project
                  you can see. The first page is the backlog, for you or an
                  agent.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/tests-dashboard"
              icon={TrendingUpIcon}
            />
            <FeatureGridFeatureSmall
              title="Only auto-approved builds count"
              description={
                <>
                  A change on a pull request is usually intentional, so scores
                  use auto-approved builds only, over a period you pick: 24
                  hours to 90 days, 7 days by default, kept in the URL.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#choose-the-period"
              icon={GitBranchIcon}
            />
            <FeatureGridFeatureSmall
              title="Five metrics, one score"
              description={
                <>
                  Flakiness from 0 to 100, plus Builds, Changes, Stability and
                  Consistency, broken down over time. A cliff in the chart
                  usually points at the commit that introduced the flake.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#read-the-metrics"
              icon={ActivityIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      {/* Ignore changes */}
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={FlagOffIcon}>Ignore changes</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  Silence noise without hiding regressions
                </SectionTitle>
                <SectionDescription>
                  Argos treats flakiness as technical debt to fix, not noise to
                  ignore. When a change genuinely cannot be made deterministic,
                  ignore it: the ignore covers that one change, and everything
                  else on the screenshot stays under review.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Ignore in one click</>}
              description={
                <>
                  From the build page or the test page, select{" "}
                  <strong>Ignore</strong> next to the change, or press{" "}
                  <Code>I</Code>. No config file, no baseline to rewrite. Argos
                  stops asking about that exact change on future builds.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-test-detection#ignore-changes"
              illustration={<IgnoreFromReviewIllustration />}
            />
            <FeatureGridFeature
              title={<>A fingerprint, not a screenshot</>}
              description={
                <>
                  Each change carries a fingerprint computed from the shape of
                  its diff. An ignore is a test-plus-fingerprint pair: it
                  absorbs antialiasing noise, but a different change to the same
                  screenshot is still reported. The fingerprint is part of a
                  change&apos;s identity in the API and CLI.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-test-detection#how-argos-recognizes-the-same-change"
              illustration={<FingerprintStack />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Auto-ignore recurring changes"
              description={
                <>
                  Let Argos ignore a change once it has appeared N times in
                  auto-approved builds over the last 7 days. The default is 3.
                  Auto-ignored changes are attributed to the Argos bot and carry
                  an Auto badge.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-test-detection#automatically-ignore-recurring-flaky-changes"
              icon={BotIcon}
            />
            <FeatureGridFeatureSmall
              title="An Ignored page you can audit"
              description={
                <>
                  Every ignored change, with how many builds it has absorbed
                  since and when it was last seen. An ignore that went quiet is
                  a blind spot: unignore it in one click.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/ignored-changes"
              icon={ListIcon}
            />
            <FeatureGridFeatureSmall
              title="Visible on the pull request"
              description={
                <>
                  The PR comment counts ignored screenshots next to the others,
                  as in <Code>4 changed, 3 ignored</Code>. The whole feature is
                  a per-project toggle in Project Settings → Flaky detection.
                </>
              }
              href="/docs/learn/review-workflow/pull-request-comments#what-the-comment-shows"
              icon={ToggleLeftIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      {/* Test debugging */}
      <section id="debug" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={BugPlayIcon}>Test debugging</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  When a test fails, the evidence is already there
                </SectionTitle>
                <SectionDescription>
                  The Argos Playwright reporter uploads failure screenshots and
                  traces with your build. You open them in Argos instead of
                  downloading CI artifacts, whether the test failed for good or
                  passed on retry.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Replay the Playwright trace in Argos</>}
              description={
                <>
                  Set <Code>trace: &quot;on-first-retry&quot;</Code> and add the
                  Argos reporter. The trace of a failing test is uploaded with
                  the build and opens in the trace viewer straight from Argos,
                  so you or your agent start where the failure happened.
                </>
              }
              href="/docs/sdks-reference/playwright#setup-tests-debugging"
              illustration={<OneClickReplayIllustration />}
            />
            <FeatureGridFeature
              title={<>Every failure, every attempt</>}
              description={
                <>
                  With <Code>screenshot: &quot;only-on-failure&quot;</Code>,
                  each failed attempt uploads its screenshot, with{" "}
                  <Code>retries</Code> and <Code>retry</Code> in its metadata.
                  Failures that passed on retry sit in their own section, so you
                  can inspect a flaky run without it cluttering the review.
                </>
              }
              href="/changelog/2024-04-29-retried-failures"
              illustration={<FailureScreenshotsLarge />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="One reporter, two lines of config"
              description={
                <>
                  Add <Code>@argos-ci/playwright/reporter</Code> and the two{" "}
                  <Code>use</Code> options. The same reporter uploads your
                  screenshots, so debugging and visual testing share one build.
                </>
              }
              href="/docs/sdks-reference/playwright#setup-tests-debugging"
              icon={Settings2Icon}
            />
            <FeatureGridFeatureSmall
              title="Cypress too"
              description={
                <>
                  The Cypress SDK gives you visibility on test failures
                  alongside its stabilization: fonts, images and{" "}
                  <Code>aria-busy</Code> loaders settled before capture. Traces
                  are a Playwright feature.
                </>
              }
              href="/docs/sdks-reference/cypress"
              icon={FlaskConicalIcon}
            />
            <FeatureGridFeatureSmall
              title="Reproduce a flake on purpose"
              description={
                <>
                  Run <Code>playwright test --repeat-each 5</Code> to run each
                  test several times in one go and catch discrepancies before
                  they reach your main branch.
                </>
              }
              href="/docs/sdks-reference/playwright#debug-flaky-tests"
              icon={RepeatIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      {/* Test comments */}
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={MessagesSquareIcon}>Test comments</Chip>
              <SectionHeaderTexts>
                <SectionTitle>A thread that outlives the build</SectionTitle>
                <SectionDescription>
                  Some things belong to a test, not to one run: flaky since the
                  carousel landed, waiting on the upstream fix, safe to ignore
                  until Q3. The test page has its own Activity thread, and a
                  prompt to hand the whole investigation to an agent.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Comment on the test, not the run</>}
              description={
                <>
                  The Activity section is the test&apos;s own conversation,
                  separate from any build review. Markdown, <Code>/</Code>{" "}
                  commands and @mentions; reply, react and resolve. A comment on
                  a test posts immediately: there is no pending review to batch
                  it into.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#discuss-the-test-with-your-team"
              illustration={<TestActivityThread />}
            />
            <FeatureGridFeature
              title={<>Fix with AI</>}
              description={
                <>
                  Copy a prompt that names the test, carries the flakiness Argos
                  measured, and tells the agent how to pull the recurring
                  changes and their screenshots before it edits anything. Paste
                  it into Claude Code, Codex, Cursor or any agent with your
                  repository checked out.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#fix-the-flakiness-with-an-ai-agent"
              illustration={<FixWithAiCard />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Follow a test"
              description={
                <>
                  The bell in the Activity header notifies you of new comments.
                  Commenting follows the test for you;{" "}
                  <Code>argos test subscribe</Code> does it from the CLI.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/test-page#discuss-the-test-with-your-team"
              icon={BellIcon}
            />
            <FeatureGridFeatureSmall
              title="From the CLI, API and MCP"
              description={
                <>
                  <Code>argos test comment create</Code> posts to the thread;
                  list, resolve and react are there too. The same operations
                  exist over the REST API and as MCP tools, so an agent can
                  leave its findings where the team reads them.
                </>
              }
              href="/docs/sdks-reference/argos-command-line-interface-cli#reviewing-and-commenting"
              icon={TerminalIcon}
            />
            <FeatureGridFeatureSmall
              title="A playbook for humans"
              description={
                <>
                  Dates and times, fonts, GIFs, background images, loading
                  states: the stabilization guide covers what the SDK cannot
                  infer on its own, for you or the agent you point at it.
                </>
              }
              href="/docs/learn/reliability-and-flakiness/flaky-tests"
              icon={BookOpenIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <AgentSection
        title="Hand the flake to an agent"
        description="Everything on the test page is readable from a terminal. An agent lists the flakiest tests, reads one test's metrics and its recurring changes with their screenshots, finds the non-determinism in your repository and fixes it. What it cannot fix, it ignores."
        code={AGENT_COMMANDS}
        badge="argos-cli"
        docsHref="/docs/learn/reliability-and-flakiness/fix-flaky-tests-with-ai-agents"
        docsLabel="Fix flaky tests with AI agents"
        cards={[
          {
            icon: TerminalIcon,
            title: "CLI",
            description: (
              <>
                A project token reads tests and changes; ignoring a change needs
                a personal access token.{" "}
                <Code>npx skills add https://argos-ci.com</Code> installs the{" "}
                <Code>argos-cli</Code> skill, which covers the flakiness
                commands and the token rules.
              </>
            ),
            href: "/docs/agents/agent-skills",
          },
          {
            icon: PlugIcon,
            title: "MCP server",
            description: (
              <>
                <Code>getTest</Code> and <Code>listTestChanges</Code> return the
                same data at <Code>https://mcp.argos-ci.com</Code>. Reading
                needs <Code>projects:read</Code>; ignoring a change needs{" "}
                <Code>reviews:write</Code>.
              </>
            ),
            href: "/docs/agents/mcp-server",
          },
          {
            icon: BracesIcon,
            title: "REST API",
            description: (
              <>
                <Code>
                  GET /projects/
                  <wbr />
                  {"{owner}"}/<wbr />
                  {"{project}"}/<wbr />
                  tests/
                  <wbr />
                  {"{testId}"}
                </Code>{" "}
                and <Code>…/changes</Code> carry the evidence. Review the
                agent&apos;s fix like any change: a test that stops asserting is
                worse than a flaky one.
              </>
            ),
            href: "/docs/learn/reliability-and-flakiness/fix-flaky-tests-with-ai-agents#without-the-prompt",
          },
        ]}
      />

      <QuoteBlock quote={pivotAlexQuote} className="border-b" />
      <FAQSection questions={STABILIZE_QUESTIONS} />
      <PillarLinks
        exclude="stabilize"
        description="Stabilize is the last step of the flow. Argos also deploys every pull request to a preview URL, diffs everything it changed, and gives humans and agents one place to review it."
      />
      <CallToActionSection />
    </>
  );
}
