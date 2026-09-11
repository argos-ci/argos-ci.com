import {
  CloudIcon,
  FileStackIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  HistoryIcon,
  InfinityIcon,
  KeyRoundIcon,
  LinkIcon,
  LockKeyholeIcon,
  PlugIcon,
  RocketIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SquareTerminalIcon,
  ZapIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { muiDeploymentsQuote } from "@/app/assets/customers/library/mui";
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
import { getPillar } from "@/lib/pillars";

import { DEPLOY_QUESTIONS } from "./faq";
import { CustomDomainCard } from "./features/CustomDomainCard";
import { DeployPrComment } from "./features/DeployPrComment";
import { DeployUrlCard } from "./features/DeployUrlCard";
import { DeployWorkflow } from "./features/DeployWorkflow";
import { EnvironmentPromotion } from "./features/EnvironmentPromotion";
import { UrlLadder } from "./features/UrlLadder";

const pillar = getPillar("deploy");

export const metadata: Metadata = getMetadata({
  title: "Argos Deploy",
  absoluteTitle:
    "Argos Deploy · Free preview URLs for Storybook and static sites on every PR",
  subtitle: pillar.description,
  description:
    "Deploy your Storybook or static site to a free, immutable preview URL on every pull request. Branch URLs, custom domains, access protection, no infra.",
  pathname: pillar.href,
});

/** Every command is real: docs/sdks-reference/argos-command-line-interface-cli. */
const AGENT_COMMANDS = `npm i --save-dev @argos-ci/cli
argos deploy ./storybook-static
argos deploy ./storybook-static --prod
argos project deployments --project acme/storybook --json
argos project domain get --project acme/storybook`;

export default function Page() {
  return (
    <>
      <PillarHero
        color={pillar.color}
        label={pillar.name}
        title="Free preview URLs for every pull request"
        description={
          <>
            Run <Code>argos deploy</Code> on your Storybook or any static build.
            Every pull request gets an immutable URL, a branch URL that follows
            it, and production lands on a domain you own. Nothing to host, and
            your agents run the same command.
          </>
        }
      />
      <TrustedBy />

      <section>
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={RocketIcon}>Deploy</Chip>
              <SectionHeaderTexts>
                <SectionTitle>One command, one live URL</SectionTitle>
                <SectionDescription>
                  Point the CLI at a static directory. Argos uploads the files
                  it hasn&apos;t seen, serves the build on its own URL, and
                  reports the status back to the pull request.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="A preview URL on every pull request"
              description={
                <>
                  <Code>argos deploy ./storybook-static</Code> uploads your
                  build and prints an immutable URL. Share it with a reviewer, a
                  designer, or an agent: it always points at that exact build.
                </>
              }
              href="/docs/learn/deployments"
              illustration={<DeployUrlCard />}
            />
            <FeatureGridFeature
              title="Preview and production, decided by your branch"
              description={
                <>
                  Pull requests get preview deployments. A push to your
                  production branch, or{" "}
                  <Code className="whitespace-nowrap">--prod</Code>, promotes
                  the build to the production domain the moment it is ready.
                  Earlier builds stay reachable on their own URLs.
                </>
              }
              href="/docs/learn/deployments/environments"
              illustration={<EnvironmentPromotion />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Any static directory"
              description={
                <>
                  Storybook, a Vite build, a Next.js export, plain HTML. If it
                  builds to a directory of files, <Code>argos deploy</Code>{" "}
                  serves it.
                </>
              }
              href="/docs/learn/deployments"
              icon={FileStackIcon}
            />
            <FeatureGridFeatureSmall
              title="Near-instant re-deploys"
              description={
                <>
                  The CLI hashes every file and uploads only what Argos
                  doesn&apos;t already have. Re-deploying an unchanged build is
                  near-instant.
                </>
              }
              href="/docs/learn/deployments#how-it-works"
              icon={ZapIcon}
            />
            <FeatureGridFeatureSmall
              title="Never expires"
              description={
                <>
                  Deployments are permanent, immutable records. They don&apos;t
                  age out, and they don&apos;t count toward your screenshot
                  quota.
                </>
              }
              href="/docs/learn/deployments/retention"
              icon={InfinityIcon}
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
              <Chip icon={LinkIcon}>URLs &amp; domains</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Links that hold up</SectionTitle>
                <SectionDescription>
                  Each deployment gets URLs with different promises: one that
                  never moves, one that follows the branch, and a production
                  domain, Argos&apos;s or yours.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="Four URLs, one deployment"
              description={
                <>
                  The deployment URL always points at one build. The branch URL
                  updates on every push. The production domain, and your custom
                  domain if you add one, serve the latest promoted build. All of
                  them are listed in the Deployments tab.
                </>
              }
              href="/docs/learn/deployments/urls-and-domains"
              illustration={<UrlLadder />}
            />
            <FeatureGridFeature
              title="Your own domain, one CNAME"
              description={
                <>
                  Add <Code>storybook.acme.com</Code> in the project settings,
                  point a CNAME at <Code>cname.argos-ci.live</Code>, and Argos
                  issues the certificate. Once active, the links Argos posts to
                  GitHub use your domain. Included in paid plans.
                </>
              }
              href="/docs/learn/deployments/urls-and-domains#custom-domain"
              illustration={<CustomDomainCard />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Access protection"
              description={
                <>
                  Public, or Standard: previews require an Argos login while
                  production stays open, on every plan. Team plans can require a
                  login for all deployments, production included.
                </>
              }
              href="/docs/learn/deployments/access-protection"
              icon={LockKeyholeIcon}
            />
            <FeatureGridFeatureSmall
              title="Every build, browsable"
              description={
                <>
                  The Deployments tab lists every build across branches and
                  commits with its URLs, and marks the one currently serving
                  production.
                </>
              }
              href="/docs/learn/deployments"
              icon={HistoryIcon}
            />
            <FeatureGridFeatureSmall
              title="Branch URLs for review checklists"
              description={
                <>
                  Put the branch URL in your pull request template. A reviewer
                  bookmarks one link and always opens the latest build on that
                  branch.
                </>
              }
              href="/docs/learn/deployments/urls-and-domains#branch-url"
              icon={GitBranchIcon}
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
              <Chip icon={GitPullRequestIcon}>In your CI</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Wired into the pull request</SectionTitle>
                <SectionDescription>
                  Run <Code>argos deploy</Code> in the workflow you already
                  have. Argos links the deployment to the pull request, lists
                  its URLs in the comment, and sets a commit status you can
                  require.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title="One comment, deployment and diff together"
              description={
                <>
                  Run <Code>deploy</Code> and <Code>upload</Code> on the same
                  commit and Argos posts a single pull request comment: the
                  deployment on top, the visual build results underneath. One
                  place to open the preview and see what changed.
                </>
              }
              href="/docs/learn/deployments/use-deployments-in-ci#combine-with-visual-testing"
              illustration={<DeployPrComment />}
            />
            <FeatureGridFeature
              title="Deploy and test in the same workflow"
              description={
                <>
                  Build once, test it, deploy it: three steps in a GitHub
                  Actions job. Pull request runs create previews, pushes to{" "}
                  <Code>main</Code> create production deployments, and the same
                  commands work on any CI.
                </>
              }
              href="/docs/learn/deployments/use-deployments-in-ci"
              illustration={<DeployWorkflow />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="A status you can require"
              description={
                <>
                  Every deployment sets an{" "}
                  <Code>argos-deploy/&lt;project&gt;</Code> commit status:
                  pending while it uploads, success when it is ready. Require it
                  in branch protection.
                </>
              }
              href="/docs/learn/deployments/use-deployments-in-ci#status-checks"
              icon={ShieldCheckIcon}
            />
            <FeatureGridFeatureSmall
              title="Any CI provider"
              description={
                <>
                  Nothing GitHub-specific. Set <Code>ARGOS_TOKEN</Code>, run the
                  command, and Argos picks up the commit, branch, and pull
                  request from your CI&apos;s environment variables.
                </>
              }
              href="/docs/learn/deployments/use-deployments-in-ci#other-ci-providers"
              icon={CloudIcon}
            />
            <FeatureGridFeatureSmall
              title="No secret on GitHub Actions"
              description={
                <>
                  Grant <Code>id-token: write</Code> and the CLI authenticates
                  with OIDC; on pull requests from forks it falls back to
                  tokenless. Nothing to provision or rotate.
                </>
              }
              href="/docs/learn/integrations/github-actions-authentication"
              icon={KeyRoundIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <AgentSection
        title="Your agent deploys its own preview"
        description={
          <>
            The deploy command is plain CLI. An agent that changed a component
            ships the Storybook to a URL and puts the link in its pull request,
            with the same token, OIDC, or tokenless authentication as{" "}
            <Code>argos upload</Code>.
          </>
        }
        code={AGENT_COMMANDS}
        badge="argos-cli"
        docsHref="/docs/sdks-reference/argos-command-line-interface-cli#deploying-a-static-build"
        docsLabel="CLI reference"
        cards={[
          {
            icon: SquareTerminalIcon,
            title: "CLI",
            description: (
              <>
                <Code>argos deploy</Code> works wherever the agent has a
                terminal. <Code>argos project deployments --json</Code> lists
                what shipped, most recent first.
              </>
            ),
            href: "/docs/sdks-reference/argos-command-line-interface-cli#configuring-a-project",
          },
          {
            icon: PlugIcon,
            title: "MCP server",
            description: (
              <>
                Connect <Code>mcp.argos-ci.com</Code> and your assistant reads a
                project&apos;s deployments and updates its settings, within the
                scopes you grant.
              </>
            ),
            href: "/docs/agents/mcp-server",
          },
          {
            icon: SparklesIcon,
            title: "Agent skill",
            description: (
              <>
                <Code>npx skills add https://argos-ci.com</Code> installs{" "}
                <Code>argos-cli</Code>: the commands, flags, and authentication
                rules, for Claude Code, Codex, or Cursor.
              </>
            ),
            href: "/docs/agents/agent-skills",
          },
        ]}
      />

      <QuoteBlock quote={muiDeploymentsQuote} className="border-b" />
      <FAQSection questions={DEPLOY_QUESTIONS} />
      <PillarLinks
        exclude="deploy"
        description="A preview is the first step. Argos then diffs what changed in it, gives your team and your agents one place to approve it, and keeps the tests behind it stable."
      />
      <CallToActionSection />
    </>
  );
}
