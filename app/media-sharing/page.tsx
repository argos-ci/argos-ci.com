import clsx from "clsx";
import {
  BotIcon,
  FilmIcon,
  ImageUpIcon,
  LockIcon,
  MessagesSquareIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { CodeBlock } from "@/components/CodeBlock";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
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
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { Terminal } from "@/components/Terminal";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { TrustedBy } from "../common/TrustedBy";
import { trackDemoClick, trackSignupClick } from "../google-ads";
import { MEDIA_SHARING_QUESTIONS } from "./faq";
import { BeforeAfterPair } from "./features/BeforeAfterPair";
import { MediaFlow } from "./features/MediaFlow";
import { MediaUploadTerminal } from "./features/MediaUploadTerminal";
import { PinnedFeedback } from "./features/PinnedFeedback";
import { VersionStack } from "./features/VersionStack";

export const metadata: Metadata = getMetadata({
  title: "Media Sharing",
  absoluteTitle: "Media Sharing · See what your agents built",
  description:
    "Upload a screenshot or a screen recording from the CLI, SDK, API, or MCP and get a share link with ready-to-paste Markdown. Stage media on a branch and Argos posts it to the pull request automatically, so you see what your agents built instead of reading about it.",
  pathname: "/media-sharing",
});

const skillCode = `# Install the Argos skills for your coding agent
npx skills add https://argos-ci.com`;

const color = "plum" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-120 md:py-24">
          <FullPageGrid height="h-200 md:h-120" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Media Sharing</FeatureIndicator>
            </div>
            <HeroHeading>
              Your agents can&apos;t show you what they built. Now they can.
            </HeroHeading>
            <HeroDescription>
              GitHub has no API for attaching an image to a pull request. Argos
              gives your agents one command, and the screenshot or recording is
              there the moment the PR opens.
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
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={ImageUpIcon}>From terminal to pull request</Chip>
            <SectionHeaderTexts>
              <SectionTitle>
                Upload while you work. It lands when the PR opens.
              </SectionTitle>
              <SectionDescription>
                <strong>Media sharing</strong> is standalone image and video
                upload for Argos: no build, no test run, just a file with a
                stable share URL and Markdown ready to paste. Stage media on a
                branch while the work happens; the moment a pull request opens
                for that branch, Argos publishes everything staged there and
                posts a single managed comment.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="flex justify-center">
            <MediaFlow />
          </div>
        </Container>
      </section>
      <section className="px-4">
        <FeatureGrid>
          <FeatureGridFeature
            title={<>One command, a link and Markdown</>}
            description={
              <>
                The CLI registers, uploads, and finalizes in one go, then prints
                a stable share URL and the exact Markdown to paste. For a video,
                that Markdown is a poster frame wrapped in a link, the only form
                GitHub renders. PNG and JPEG are compressed to WebP before
                upload, so a 252 KB screenshot travels at a tenth of the size.
              </>
            }
            href="/docs/learn/media/standalone-media-upload"
            illustration={<MediaUploadTerminal />}
          />
          <FeatureGridFeature
            title={<>Before and after, one link</>}
            description={
              <>
                Name two files <code>-before</code> and <code>-after</code> and
                they share one identity: a single row in the pull request
                comment, and a share page that compares both sides with synced
                pan and zoom. The reviewer sees the change, not two tabs.
              </>
            }
            href="/docs/learn/media/standalone-media-upload#before-and-after-pairs"
            illustration={<BeforeAfterPair />}
          />
          <FeatureGridFeature
            title={<>Feedback pinned to the pixel</>}
            description={
              <>
                Reviewers pin comments to a point on the image. A pin stores
                normalized coordinates and the exact version it was written on,
                so an agent that cannot see the picture can still read the spot,
                fix it, and resolve the thread, all from the CLI.
              </>
            }
            href="/docs/learn/media/standalone-media-upload#reading-the-feedback-left-on-a-media"
            illustration={<PinnedFeedback />}
          />
          <FeatureGridFeature
            title={<>Re-upload freely, the link never changes</>}
            description={
              <>
                A media is an identity; every upload is a version of it.
                Re-uploading <code>checkout.png</code> updates the Markdown
                already pasted in the pull request, keeps the version a reviewer
                commented on underneath, and identical bytes cost nothing.
              </>
            }
            href="/docs/learn/media/standalone-media-upload#versions-re-upload-same-link"
            illustration={<VersionStack />}
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Videos that render on GitHub"
            description={
              <>
                MP4, WebM, and MOV up to 500 MB. The embed is a poster frame
                linked to the share page, derived from the video itself and
                available instantly.
              </>
            }
            href="/docs/learn/media/standalone-media-upload#embedding-the-result"
            icon={FilmIcon}
          />
          <FeatureGridFeatureSmall
            title="Every surface an agent has"
            description={
              <>
                CLI, Node.js SDK, REST API, and MCP tools under the{" "}
                <code>media:read</code> and <code>media:write</code> scopes. The
                same flow everywhere.
              </>
            }
            href="/docs/learn/media/standalone-media-upload#from-an-ai-agent"
            icon={BotIcon}
          />
          <FeatureGridFeatureSmall
            title="Private by default, safe to paste"
            description={
              <>
                Team-scoped share pages on Pro, unguessable URLs, no indexing,
                and plan-based retention: 30 days on Hobby, 1 year on Pro.
              </>
            }
            href="/docs/learn/media/share-links-retention-and-limits"
            icon={LockIcon}
          />
        </Container>
        <Container className="h-12 border-x border-b" />
      </section>
      <section className="border-b px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={SparklesIcon}>Agent skill</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Teach your agent to show its work</SectionTitle>
              <SectionDescription>
                The <strong>argos-upload</strong> skill teaches any coding agent
                when a screenshot beats a paragraph, how to stage media on the
                branch it is working on, and how to paste an embed that actually
                renders. One command installs it for Claude Code, Cursor, and
                any skill-compatible agent.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="mx-auto mt-10 max-w-md">
            <Terminal title="Terminal" right={<Badge>argos-upload</Badge>}>
              <CodeBlock code={skillCode} lang="bash" className="text-xs" />
            </Terminal>
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/docs/agents/agent-skills">
                Explore the agent skills
              </Link>
            </Button>
          </div>
        </Container>
      </section>
      <section className="border-b px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mx-auto mb-10 max-w-2xl">
            Frequently asked questions
          </SectionTitle>
          <FAQAccordion questions={MEDIA_SHARING_QUESTIONS} />
        </Container>
      </section>
      <section className="px-4">
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="For AI agents"
            description={
              <>
                Agents read machine-readable diffs, review builds, and fix their
                own regressions. Media is how they show the result.
              </>
            }
            href="/ai-agents"
            icon={BotIcon}
          />
          <FeatureGridFeatureSmall
            title="Collaborative reviews"
            description={
              <>
                Media comments use the same review grammar as builds: pinned
                threads, mentions, reactions, and resolution.
              </>
            }
            href="/collaborative-reviews"
            icon={MessagesSquareIcon}
          />
          <FeatureGridFeatureSmall
            title="Change detection"
            description={
              <>
                Visual testing flags the changes nobody intended; media shows
                the one you did. Both land on the same pull request.
              </>
            }
            href="/visual-testing"
            icon={WorkflowIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <CallToActionSection />
    </>
  );
}
