import {
  BotIcon,
  FileJson2Icon,
  FileTextIcon,
  GitPullRequestIcon,
  GlobeIcon,
  ImageUpIcon,
  KeyRoundIcon,
  MousePointerClickIcon,
  PlugIcon,
  SparklesIcon,
  TerminalIcon,
  UserCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { gitbookAgentQuote } from "@/app/assets/customers/library/gitbook";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { Code } from "@/components/Code";
import { CodeBlock } from "@/components/CodeBlock";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
import { PillarHero } from "@/components/PillarHero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { Terminal } from "@/components/Terminal";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";
import { WEBMCP_TOOLS } from "@/lib/webmcp-tools";

import { AI_AGENTS_QUESTIONS } from "./faq";
import { DiscoveryTerminal } from "./features/DiscoveryTerminal";
import { McpSetup } from "./features/McpSetup";
import { PillarAgentGrid } from "./features/PillarAgentGrid";

export const metadata: Metadata = getMetadata({
  title: "Argos for AI Agents",
  absoluteTitle: "Argos for AI Agents · MCP server, CLI, skills, and REST API",
  subtitle: "MCP server, CLI, skills, and REST API",
  description:
    "Connect Claude Code, Cursor, or any MCP client to Argos. Agents deploy previews, read diffs, review builds, and fix flaky tests from the CLI, the MCP server, and the REST API.",
  pathname: "/ai-agents",
});

const skillsCode = `# Install every skill Argos publishes
npx skills add https://argos-ci.com`;

const WEBMCP_TOOL_NAMES = WEBMCP_TOOLS.map((tool) => tool.name);

export default function Page() {
  return (
    <>
      <PillarHero
        color="violet"
        label="For AI agents"
        title="Your agents use Argos end to end"
        description={
          <>
            Deploy a preview, read the diff, review the build, fix the flake.
            Every pillar is reachable from the CLI, the MCP server and the REST
            API, with the permissions of the person running the agent.
          </>
        }
      />
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={BotIcon}>Four pillars</Chip>
              <SectionHeaderTexts>
                <SectionTitle>One agent, four jobs</SectionTitle>
                <SectionDescription>
                  Argos follows a pull request through four steps, and an agent
                  can take each of them. Every pillar page has a section for
                  agents with the full set of commands; these are the four it
                  reaches for first.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <PillarAgentGrid />
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={PlugIcon}>MCP server</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  Connect your agent with the Argos MCP server
                </SectionTitle>
                <SectionDescription>
                  One remote server at <Code>mcp.argos-ci.com</Code>, streamable
                  HTTP, nothing to install. Add the URL to your client, sign in
                  with OAuth, and the agent lists builds, reads diffs, reviews
                  changes and manages projects with the scopes you granted.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <Container className="border-x border-b py-12 md:py-18">
            <McpSetup />
            <div className="mt-8 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/docs/agents/mcp-server#setup">
                  Set up the MCP server
                </Link>
              </Button>
            </div>
          </Container>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Scoped by OAuth"
              description={
                <>
                  Your client opens a browser; you choose the organizations to
                  share and the scopes to grant: <Code>projects:read</Code>,{" "}
                  <Code>reviews:write</Code>, <Code>comments:write</Code>,{" "}
                  <Code>projects:write</Code>, <Code>media:read</Code>,{" "}
                  <Code>media:write</Code>, <Code>account:admin</Code>. Revoke
                  it any time under Authorized applications.
                </>
              }
              href="/docs/agents/mcp-server#authentication"
              icon={KeyRoundIcon}
            />
            <FeatureGridFeatureSmall
              title="Keep a human on writes"
              description={
                <>
                  Approving a build or posting a comment goes through your
                  client&apos;s approval prompt. Keep it on for write actions,
                  and grant read-only scopes when the agent only inspects
                  builds.
                </>
              }
              href="/docs/agents/mcp-server#security-best-practices"
              icon={UserCheckIcon}
            />
            <FeatureGridFeatureSmall
              title="Tools generated from the REST API"
              description={
                <>
                  Every API operation a user can call is a tool with the same
                  name, parameters and permissions. When the management API
                  shipped, the server went from 37 to 71 tools with no client
                  update.
                </>
              }
              href="/docs/agents/mcp-server#available-tools"
              icon={WorkflowIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={SparklesIcon}>CLI &amp; skills</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  Teach your agent the CLI in one command
                </SectionTitle>
                <SectionDescription>
                  The CLI runs wherever the agent has a terminal: your machine,
                  CI, a sandbox. The skills teach it the commands, the flags,
                  the token rules and a complete pull-request review, so you
                  don&apos;t write the prompt.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <Container className="flex flex-col items-center gap-8 border-x border-b py-12 md:py-18">
            <Terminal
              title="Terminal"
              right={<Badge>3 skills</Badge>}
              className="animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
            >
              <CodeBlock
                code={skillsCode}
                lang="bash"
                className="text-xs [&_pre]:overflow-x-auto"
              />
              <div className="mt-4 flex gap-2 rounded-lg bg-(--neutral-3) px-3 py-2 font-mono text-xxs">
                <span aria-hidden className="shrink-0 text-(--violet-11)">
                  ›
                </span>
                <p className="text-default">
                  Use $argos-pr-review to review this pull request with its
                  Argos build.
                </p>
              </div>
            </Terminal>
            <Button variant="outline" asChild>
              <Link href="/docs/agents/agent-skills">
                Explore the agent skills
              </Link>
            </Button>
          </Container>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title={<Code>argos-cli</Code>}
              description={
                <>
                  The CLI&apos;s commands, flags, authentication rules and
                  output formats, flakiness commands included, so the agent can
                  investigate an unstable test and silence a change it
                  can&apos;t fix.
                </>
              }
              href="/docs/sdks-reference/argos-command-line-interface-cli"
              icon={TerminalIcon}
            />
            <FeatureGridFeatureSmall
              title={<Code>argos-pr-review</Code>}
              description={
                <>
                  A complete review: find the Argos build from the pull request,
                  inspect the snapshots that need review, summarize what
                  changed, compare it with the intent, then approve or request
                  changes.
                </>
              }
              href="/docs/learn/review-workflow/review-builds-with-ai-agents"
              icon={GitPullRequestIcon}
            />
            <FeatureGridFeatureSmall
              title={<Code>argos-upload</Code>}
              description={
                <>
                  When a screenshot or a recording beats a paragraph, how to
                  stage it on the branch so Argos posts it on the pull request,
                  and how to read back the comments a human pinned on it.
                </>
              }
              href="/media-sharing"
              icon={ImageUpIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={GlobeIcon}>API &amp; discovery</Chip>
              <SectionHeaderTexts>
                <SectionTitle>
                  Machine-readable from the first request
                </SectionTitle>
                <SectionDescription>
                  The REST API describes itself with OpenAPI, this site answers
                  in Markdown when asked for it, and the documentation ships
                  every page as <Code>.md</Code>. An agent never has to scrape
                  HTML to learn what Argos does or how to call it.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>A REST API, described in OpenAPI</>}
              description={
                <>
                  Everything the app does is at <Code>api.argos-ci.com/v2</Code>
                  : builds and their diffs, reviews, comments, tests and their
                  changes, deployments, projects, teams. One bearer token: a
                  project token reads, a personal access token acts as a user.
                  The OpenAPI 3.1 file is at <Code>/v2/openapi.yaml</Code>.
                </>
              }
              href="/docs/api-reference"
              illustration={<DiscoveryTerminal variant="api" />}
            />
            <FeatureGridFeature
              title={<>This site and the docs, in Markdown</>}
              description={
                <>
                  Send <Code>Accept: text/markdown</Code> to a product page, or
                  prefix its path with <Code>/md</Code>, and you get its
                  Markdown twin. <Code>llms.txt</Code> maps the site,{" "}
                  <Code>auth.md</Code> explains how agents authenticate, and the
                  documentation publishes every page as <Code>.md</Code>,
                  indexed by <Code>/docs/llms.txt</Code>.
                </>
              }
              href="/llms.txt"
              illustration={<DiscoveryTerminal variant="markdown" />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="OpenAPI and an API catalog"
              description={
                <>
                  The homepage&apos;s <Code>Link</Code> header and{" "}
                  <Code>/.well-known/api-catalog</Code> (RFC 9727) point at the
                  OpenAPI description and the API docs, so a crawler finds the
                  API without reading a page.
                </>
              }
              href="https://api.argos-ci.com/v2/openapi.yaml"
              icon={FileJson2Icon}
            />
            <FeatureGridFeatureSmall
              title="Markdown twins on every pillar page"
              description={
                <>
                  <Code>/deploy</Code>, <Code>/diff</Code>, <Code>/review</Code>
                  , <Code>/stabilize</Code> and this page each have one, with
                  the page&apos;s FAQ appended. The docs add a read-only MCP
                  server at <Code>argos-ci.com/docs/~gitbook/mcp</Code>.
                </>
              }
              href="/md/ai-agents"
              icon={FileTextIcon}
            />
            <FeatureGridFeatureSmall
              title="WebMCP tools in the browser"
              description={
                <>
                  In a browser with WebMCP, this site registers{" "}
                  {WEBMCP_TOOL_NAMES.length} read-only tools on{" "}
                  <Code>document.modelContext</Code>:{" "}
                  {WEBMCP_TOOL_NAMES.map((name, index) => (
                    <span key={name}>
                      {index > 0 ? ", " : null}
                      <Code>{name}</Code>
                    </span>
                  ))}
                  .
                </>
              }
              href="https://github.com/argos-ci/argos-ci.com/blob/main/lib/webmcp-tools.ts"
              icon={MousePointerClickIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <QuoteBlock quote={gitbookAgentQuote} className="border-b" />
      <FAQSection questions={AI_AGENTS_QUESTIONS} />
      <CallToActionSection />
    </>
  );
}
