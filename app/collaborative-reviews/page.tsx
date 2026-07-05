import clsx from "clsx";
import {
  AtSignIcon,
  FileEditIcon,
  MessagesSquareIcon,
  RadioIcon,
  SmilePlusIcon,
  UsersIcon,
  Volume2Icon,
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
import { getMetadata } from "@/lib/metadata";

import { leMondeReviewsQuote } from "../assets/customers/library/le-monde";
import { TrustedBy } from "../common/TrustedBy";
import { trackDemoClick, trackSignupClick } from "../google-ads";
import { CommentThread } from "./features/CommentThread";
import { Reviewers } from "./features/Reviewers";

export const metadata: Metadata = getMetadata({
  title: "Argos Collaborative Reviews",
  absoluteTitle:
    "Argos Collaborative Reviews · Review visual changes together, in real time",
  description:
    "Request multiple reviewers, comment on the exact pixel or line that changed, and discuss in real-time threads with mentions, reactions, and resolve. Humans and agents review together.",
  pathname: "/collaborative-reviews",
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
                Collaborative Reviews
              </FeatureIndicator>
            </div>
            <HeroHeading>Review changes together, in real time</HeroHeading>
            <HeroDescription>
              Request the reviewers you need, pin comments to the exact pixel or
              line that changed, and resolve the discussion together. Every
              reviewer&apos;s decision counts, so a build reflects the whole
              team, not just the last click.
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
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader align="center" className="container-gutter max-w-2xl">
              <Chip icon={MessagesSquareIcon}>Discussion</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Talk about the exact thing that changed</SectionTitle>
                <SectionDescription>
                  Reviewing a build is now a place to collaborate. Pin a comment
                  to a precise point on a screenshot, or to a line range inside a
                  text snapshot, and discuss it in a full thread.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>Comment on exactly what changed</>}
              description={
                <>
                  Pin a comment to a precise point on a screenshot, or a line
                  range in a Markdown or JSON snapshot. Reply, @mention
                  teammates, react with emoji, and resolve when it&apos;s done.
                </>
              }
              href="/docs/learn/review-workflow/review-a-build"
              illustration={<CommentThread />}
            />
            <FeatureGridFeature
              title={<>Every reviewer&apos;s verdict counts</>}
              description={
                <>
                  Request multiple reviewers and track each verdict individually
                  instead of overwriting it with the most recent one. Agents
                  reviewing from the CLI show up right alongside your team.
                </>
              }
              href="/docs/learn/review-workflow/review-a-build"
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
                  Gather comments into a pending review that stays private until
                  you submit, then notifies everyone at once, GitHub-style.
                </>
              }
              href="/docs/learn/review-workflow/review-a-build"
              icon={FileEditIcon}
            />
            <FeatureGridFeatureSmall
              title="Real time, with presence"
              description={
                <>
                  Comments, reactions, and decisions appear live. Presence dots
                  show who&apos;s online and their local time.
                </>
              }
              href="/docs/learn/review-workflow/review-a-build"
              icon={RadioIcon}
            />
            <FeatureGridFeatureSmall
              title="One digest, not a flood"
              description={
                <>
                  Review notifications arrive as a single digest instead of one
                  message per action.
                </>
              }
              href="/docs/learn/review-workflow/review-a-build"
              icon={Volume2Icon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <QuoteBlock quote={leMondeReviewsQuote} className="border-b" />
      <section className="px-4">
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Markdown & slash commands"
            description={
              <>
                Comments are written in Markdown with{" "}
                <code className="font-mono">/</code> slash commands and
                @mentions. Drafts persist locally so you never lose a thought.
              </>
            }
            href="/docs/learn/review-workflow/review-a-build"
            icon={AtSignIcon}
          />
          <FeatureGridFeatureSmall
            title="Humans and agents together"
            description={
              <>
                The full review toolkit is in the CLI and REST API, so agents can
                read a build and submit a complete review beside your team.
              </>
            }
            href="/ai-agents"
            icon={UsersIcon}
          />
          <FeatureGridFeatureSmall
            title="Review from the API"
            description={
              <>
                Dismiss and list reviews, full comment CRUD, replies, reactions,
                and thread resolve, all in the public REST API.
              </>
            }
            href="/docs/api-reference"
            icon={SmilePlusIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <CallToActionSection />
    </>
  );
}
