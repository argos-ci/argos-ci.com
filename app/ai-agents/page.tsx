import clsx from "clsx";
import {
  BotIcon,
  FileJson2Icon,
  KeyRoundIcon,
  PlugIcon,
  TerminalIcon,
  WorkflowIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Terminal } from "@/components/Terminal";
import { Chip } from "@/components/Chip";
import { CodeBlock } from "@/components/CodeBlock";
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

import { gitbookAgentQuote } from "../assets/customers/library/gitbook";
import { TrustedBy } from "../common/TrustedBy";
import { trackDemoClick, trackSignupClick } from "../google-ads";
import { AgentLoop } from "./features/AgentLoop";
import { CopyPromptCard } from "./features/CopyPromptCard";

export const metadata: Metadata = getMetadata({
  title: "Argos for AI Agents",
  absoluteTitle: "Argos for AI Agents · Merge AI-generated code with confidence",
  description:
    "Argos is 100% agent-ready. Agents see exactly what their PR changed, iterate to fix their own mistakes, and review builds from the CLI and REST API, so you merge AI-generated code with confidence.",
  pathname: "/ai-agents",
});

const mcpCode = `{
  "mcpServers": {
    "argos": {
      "command": "npx",
      "args": ["-y", "@argos-ci/mcp"]
    }
  }
}`;

const cliCode = `npm install -D @argos-ci/cli

# Inspect a build and read what needs review
argos build get <build>
argos build snapshots <build> --needs-review

# Submit a decision (respects project permissions)
argos build review <build> --conclusion approve`;

const color = "violet" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-120 md:py-24">
          <FullPageGrid height="h-200 md:h-120" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>For AI Agents</FeatureIndicator>
            </div>
            <HeroHeading>Merge AI-generated code with confidence</HeroHeading>
            <HeroDescription>
              Your agents write the code. Reviewing what they changed is the hard
              part. Argos is 100% agent-ready: it shows exactly what every PR
              changed, so agents can fix their own mistakes and you can merge
              without second-guessing.
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
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip icon={BotIcon}>The confidence loop</Chip>
            <SectionHeaderTexts>
              <SectionTitle>
                Agents ship fast. Argos keeps them honest.
              </SectionTitle>
              <SectionDescription>
                When an agent can see exactly what its change did, it can catch
                and fix its own regressions before a human ever opens the PR.
                That is what turns &ldquo;review everything by hand&rdquo; into
                &ldquo;merge with confidence.&rdquo;
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="flex justify-center">
            <AgentLoop />
          </div>
        </Container>
      </section>
      <section className="px-4">
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Agents see exactly what changed</>}
            description={
              <>
                Every build exposes machine-readable snapshot data. An agent can
                read what moved, whether pixels, Markdown, or JSON, and compare
                it against the PR intent. From any build,{" "}
                <strong>Copy prompt</strong>{" "}
                hands it the build URL, PR context, and review guidance.
              </>
            }
            href="/docs/learn/review-workflow/review-builds-with-ai-agents"
            illustration={<CopyPromptCard />}
          />
          <FeatureGridFeature
            title={<>Review straight from the CLI</>}
            description={
              <>
                Fetch build status, list snapshots that still need review, and
                submit an approval or request changes, without leaving the
                terminal. Reviews use personal access tokens and respect existing
                project permissions.
              </>
            }
            href="/docs/sdks-reference/argos-command-line-interface-cli"
            illustration={
              <Terminal title="Terminal · @argos-ci/cli">
                <CodeBlock code={cliCode} lang="bash" className="text-xs" />
              </Terminal>
            }
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Machine-readable diffs"
            description={
              <>
                Structured snapshot data for every change, ready to feed straight
                into an agent&apos;s context.
              </>
            }
            href="/docs/learn/review-workflow/review-builds-with-ai-agents"
            icon={FileJson2Icon}
          />
          <FeatureGridFeatureSmall
            title="Full review REST API"
            description={
              <>
                Reviews, comments, replies, reactions, and thread resolve are all
                in the public API.
              </>
            }
            href="/docs/api-reference"
            icon={WorkflowIcon}
          />
          <FeatureGridFeatureSmall
            title="Scoped, permission-safe"
            description={
              <>
                Agents authenticate with personal access tokens and inherit your
                project permissions, with no broad access required.
              </>
            }
            href="/docs/sdks-reference/argos-command-line-interface-cli"
            icon={KeyRoundIcon}
          />
        </Container>
        <Container className="h-12 border-x border-b" />
      </section>
      <section className="border-b px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <Chip icon={PlugIcon}>Coming soon</Chip>
            <SectionHeaderTexts>
              <SectionTitle>Connect your agents with the Argos MCP</SectionTitle>
              <SectionDescription>
                The Argos MCP server lets any MCP-compatible agent, like Claude
                or Cursor, inspect builds, read diffs, and submit reviews
                natively. No glue code, no custom integration.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="mx-auto mt-10 max-w-md">
            <Terminal
              title="mcp.json"
              right={<Badge>Coming soon</Badge>}
            >
              <CodeBlock code={mcpCode} lang="json" className="text-xs" />
            </Terminal>
          </div>
        </Container>
      </section>
      <QuoteBlock quote={gitbookAgentQuote} className="border-b" />
      <section className="px-4">
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Any agent, any CI"
            description={
              <>
                The CLI runs anywhere your agents and pipelines run, with no
                special integration needed.
              </>
            }
            href="/docs/sdks-reference/argos-command-line-interface-cli"
            icon={TerminalIcon}
          />
          <FeatureGridFeatureSmall
            title="Humans and agents, one review"
            description={
              <>
                Agent reviews show up beside your team&apos;s in the same
                collaborative thread.
              </>
            }
            href="/collaborative-reviews"
            icon={BotIcon}
          />
          <FeatureGridFeatureSmall
            title="Confidence to merge"
            description={
              <>
                See every change before it ships, whoever (or whatever) wrote
                it.
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
