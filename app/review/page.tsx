import {
  BellIcon,
  FileEditIcon,
  GitBranchIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  ImageUpIcon,
  KeyboardIcon,
  KeyRoundIcon,
  LinkIcon,
  ListChecksIcon,
  MessageSquareTextIcon,
  PlugIcon,
  RadioIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  UsersIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { leMondeReviewsQuote } from "@/app/assets/customers/library/le-monde";
import { TrustedBy } from "@/app/common/TrustedBy";
import { MediaFlow } from "@/app/media-sharing/features/MediaFlow";
import { AgentSection } from "@/components/AgentSection";
import { Button } from "@/components/Button";
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
import { PillarHero } from "@/components/PillarHero";
import { PillarLinks } from "@/components/PillarLinks";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { REVIEW_QUESTIONS } from "./faq";
import { AutomationRule } from "./features/AutomationRule";
import { CommentThread } from "./features/CommentThread";
import { DiffsReview } from "./features/DiffsReview";
import { GitHubChecks } from "./features/GitHubChecks";
import { GitHubComment } from "./features/GitHubComment";
import { InstantDiffInspector } from "./features/InstantDiffInspector";
import { Reviewers } from "./features/Reviewers";
import { ReviewHistory } from "./features/ReviewHistory";

export const metadata: Metadata = getMetadata({
  title: "Argos Review",
  absoluteTitle:
    "Argos Review · One place for humans and agents to approve what changed",
  subtitle: "One place for humans and agents to approve what changed.",
  description:
    "One place to review what changed: side-by-side diffs, keyboard shortcuts, comments pinned to the pixel, one verdict per reviewer, GitHub checks, and Slack alerts. For humans and agents.",
  pathname: "/review",
});

const color = "pink" as const;

const REVIEW_DOCS = "/docs/learn/review-workflow/review-a-build";

const agentCode = `npx skills add https://argos-ci.com

# Read: a project token is enough
argos build get <build>
argos build snapshots <build> --needs-review --json

# Decide: needs a personal access token
argos review create <build> --event approve \\
  --body "Matches the PR intent."
argos comment list <build> --json`;

export default function Page() {
  return (
    <>
      <PillarHero
        color={color}
        label="Review"
        title="One place for humans and agents to approve what changed"
        description={
          <>
            Baseline and changes side by side, comments pinned to the exact
            pixel, approve or reject with a keystroke. Every reviewer&apos;s
            verdict counts on its own, including the agent reviewing from the
            CLI, and the result lands on the pull request as a check.
          </>
        }
      />
      <TrustedBy />

      <section id="fast" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={ZapIcon}>Fast review</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Review diffs at full speed</SectionTitle>
                <SectionDescription>
                  The build page puts the baseline next to the changes and
                  highlights what moved. Split or single view, an overlay you
                  can tune, and a shortcut for every action, so you get through
                  a build without touching the mouse.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
            <DiffsReview />
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Find and inspect changes instantly"
              description={
                <>
                  Split view or single view, a changes overlay in your own color
                  and opacity, and a highlighter that flashes the changed
                  regions. <Code>J</Code> and <Code>K</Code> jump from one
                  change to the next, and zoom and pan stay in sync between the
                  baseline and changes panes.
                </>
              }
              href={`${REVIEW_DOCS}#compare-baseline-and-changes`}
              illustration={<InstantDiffInspector />}
            />
            <FeatureGridFeature
              title="Decide in one keystroke, keep the record"
              description={
                <>
                  <Code>Y</Code> accepts a change, <Code>N</Code> rejects it,{" "}
                  <Code>↵</Code> opens the review popover. Add a summary in
                  Markdown, submit, and the review stays in the build&apos;s
                  history: who decided what, and when. A progress chip such as{" "}
                  <Code>2 / 3 reviewed</Code> shows how far along you are.
                </>
              }
              href={`${REVIEW_DOCS}#submit-a-review`}
              illustration={<ReviewHistory />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Keyboard shortcuts"
              description={
                <>
                  <Code>↑</Code> <Code>↓</Code> move between snapshots,{" "}
                  <Code>←</Code> <Code>→</Code> show one side, <Code>S</Code>{" "}
                  <Code>D</Code> <Code>H</Code> switch views, <Code>Y</Code>{" "}
                  <Code>N</Code> decide. Press <Code>?</Code> for the full list.
                </>
              }
              href={`${REVIEW_DOCS}#keyboard-shortcuts`}
              icon={KeyboardIcon}
            />
            <FeatureGridFeatureSmall
              title="An overlay you can tune"
              description={
                <>
                  Changed pixels are highlighted in red. Toggle the overlay with{" "}
                  <Code>D</Code> and pick its color and opacity from the
                  toolbar, so it stands out on any screenshot.
                </>
              }
              href={`${REVIEW_DOCS}#compare-baseline-and-changes`}
              icon={SlidersHorizontalIcon}
            />
            <FeatureGridFeatureSmall
              title="Reference a screenshot"
              description={
                <>
                  From either pane, copy a direct link, copy an embed as
                  Markdown for a PR description, or download the screenshot, its
                  diff mask, or the composed changes.
                </>
              }
              href={`${REVIEW_DOCS}#reference-a-screenshot`}
              icon={LinkIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <section id="together" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={UsersIcon}>Together</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  Every reviewer&apos;s verdict counts
                </SectionTitle>
                <SectionDescription>
                  Request the people you need and track each verdict on its own;
                  a new review never overwrites someone else&apos;s. One
                  rejection blocks the build. Without one, a single approval
                  passes it.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Comment on exactly what changed"
              description={
                <>
                  Pin a comment to a point on a screenshot, or to a line range
                  in a Markdown or JSON snapshot. Comments are Markdown with{" "}
                  <Code>/</Code> commands and @mentions. Reply in threads, react
                  with emoji, and resolve the thread once it&apos;s settled.
                </>
              }
              href={`${REVIEW_DOCS}#comment-on-exactly-what-changed`}
              illustration={<CommentThread />}
            />
            <FeatureGridFeature
              title="Request reviewers, track each verdict"
              description={
                <>
                  Each reviewer is Approved, Rejected, Commented, Pending, or
                  Dismissed, and only their latest review counts. A review
                  submitted from the CLI or the API is attributed to the
                  token&apos;s user, so an agent&apos;s verdict appears under
                  the person who ran it, beside the rest of the team.
                </>
              }
              href={`${REVIEW_DOCS}#request-reviewers`}
              illustration={<Reviewers />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Draft reviews"
              description={
                <>
                  Comments gather into a pending review only you can see until
                  you submit; then everyone is notified at once. Hold{" "}
                  <Code>Alt</Code> to post a single comment immediately.
                </>
              }
              href={`${REVIEW_DOCS}#draft-reviews`}
              icon={FileEditIcon}
            />
            <FeatureGridFeatureSmall
              title="Real time, with presence"
              description={
                <>
                  Comments, reactions, and decisions appear as they happen, with
                  no refresh. Presence dots show who is on the build, and each
                  user card shows their role and local time.
                </>
              }
              href={`${REVIEW_DOCS}#collaborate-in-real-time`}
              icon={RadioIcon}
            />
            <FeatureGridFeatureSmall
              title="One digest, not a flood"
              description={
                <>
                  Review notifications arrive as a single digest instead of one
                  message per action. Subscribe or unsubscribe per build from
                  the Activity section of the sidebar.
                </>
              }
              href={`${REVIEW_DOCS}#collaborate-in-real-time`}
              icon={BellIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <section id="ship" className="scroll-mt-24 px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={GitPullRequestIcon}>Ship it</Chip>
            <SectionHeaderTexts>
              <SectionTitle>
                The verdict lands on your pull request
              </SectionTitle>
              <SectionDescription>
                Argos reports each build as a commit status you can require in
                branch protection, keeps one comment on the pull request
                current, and tells the channel that needs to know.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container noGutter className="border-x">
          <FeaturesCarousel
            color={color}
            features={[
              {
                key: "checks",
                icon: <GitPullRequestIcon />,
                title: "A check you can require",
                text: "Statuses post as argos, argos/<build-name>, or argos/summary when a commit has several builds. Require them in branch protection and a rejected build blocks the merge.",
                main: <GitHubChecks />,
                href: "/docs/learn/integrations/github-integration#commit-status-names",
              },
              {
                key: "comment",
                icon: <MessageSquareTextIcon />,
                title: "One PR comment, always current",
                text: "Each build's status, an Inspect link, and a Details column such as 4 changed, 3 ignored, edited in place on every update. Deployments list their preview URLs too.",
                main: <GitHubComment />,
                href: "/docs/learn/review-workflow/pull-request-comments",
              },
              {
                key: "automations",
                icon: <WorkflowIcon />,
                title: "Tell the channel that needs to know",
                text: "When a build completes or is reviewed, if it matches your conditions, then post in Slack, Microsoft Teams, or Discord. Rules are per project, so nobody has to watch Argos.",
                main: <AutomationRule />,
                href: "/docs/learn/review-workflow/automations",
              },
            ]}
          />
        </Container>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="GitLab too"
            description={
              <>
                On GitLab, Argos posts commit statuses on your merge requests
                through a bot user, with the same baseline selection from your
                commit history.
              </>
            }
            href="/docs/learn/integrations/gitlab-integration"
            icon={GitMergeIcon}
          />
          <FeatureGridFeatureSmall
            title="Auto-approved branches become baselines"
            description={
              <>
                Builds on <Code>main</Code>, or any branch pattern you set, are
                approved automatically so they can serve as baselines without a
                manual review. A build with an active rejection never becomes
                one.
              </>
            }
            href="/docs/learn/platform-fundamentals/baseline-build#auto-approved-branches"
            icon={GitBranchIcon}
          />
          <FeatureGridFeatureSmall
            title="Summary check, your way"
            description={
              <>
                Post <Code>argos/summary</Code> only when a commit has more than
                one build, always, or never. Require the summary and the
                requirement keeps working as you add or rename builds.
              </>
            }
            href="/docs/learn/review-workflow/summary-checks#options"
            icon={ListChecksIcon}
          />
        </Container>
        <Container className="h-12 border-x border-b" />
      </section>

      <section id="media" className="scroll-mt-24 border-b px-4">
        <Container className="border-x pb-12 md:pb-18">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={ImageUpIcon}>Media sharing</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Agents show their work</SectionTitle>
              <SectionDescription>
                GitHub has no API for attaching an image to a pull request. With
                Argos, an agent uploads a screenshot or a screen recording from
                the terminal, stages it on its branch, and Argos posts it on the
                PR the moment it opens: proof of the change, beside the diff.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="flex justify-center">
            <MediaFlow />
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/media-sharing">Explore Media Sharing</Link>
            </Button>
          </div>
        </Container>
      </section>

      <AgentSection
        title="Agents review beside your team"
        description={
          <>
            Install the skills and point the agent at a pull request. It finds
            the build, reads the snapshots that need review, weighs them against
            the PR&apos;s intent, and approves or rejects under the name of
            whoever ran it.
          </>
        }
        code={agentCode}
        badge="argos-pr-review"
        docsHref="/docs/learn/review-workflow/review-builds-with-ai-agents"
        docsLabel="Review builds with AI agents"
        cards={[
          {
            icon: TerminalIcon,
            title: "Review from the CLI",
            description: (
              <>
                Install the skills, then ask:{" "}
                <Code>Use $argos-pr-review to review this pull request</Code>.
                The agent finds the build, reads the snapshots that need review,
                and submits its verdict with <Code>argos review create</Code>.
              </>
            ),
            href: "/docs/agents/agent-skills",
          },
          {
            icon: PlugIcon,
            title: "Review over MCP",
            description: (
              <>
                Connect <Code>mcp.argos-ci.com</Code> and the agent can approve
                or reject builds, request reviewers, and read or post comments,
                within the <Code>reviews:write</Code> and{" "}
                <Code>comments:write</Code> scopes you grant.
              </>
            ),
            href: "/docs/agents/mcp-server",
          },
          {
            icon: KeyRoundIcon,
            title: "Every action in the API",
            description: (
              <>
                Submit, list, and dismiss reviews; create comments and replies,
                react, resolve. Project tokens read, personal tokens decide.
                Agents use build data as review evidence; they do not replace
                your team&apos;s ownership of review decisions.
              </>
            ),
            href: `${REVIEW_DOCS}#review-from-the-api`,
          },
        ]}
      />

      <QuoteBlock quote={leMondeReviewsQuote} className="border-b" />
      <FAQSection questions={REVIEW_QUESTIONS} />
      <PillarLinks
        exclude="review"
        description="Review is the third step. Argos also deploys every pull request, diffs everything that changed, and stabilizes the tests behind it."
      />
      <CallToActionSection />
    </>
  );
}
