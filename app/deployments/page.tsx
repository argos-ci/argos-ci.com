import clsx from "clsx";
import {
  FileStackIcon,
  GitPullRequestIcon,
  LinkIcon,
  LockKeyholeIcon,
  RocketIcon,
  ShieldCheckIcon,
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

import { gitbookQuote } from "../assets/customers/library/gitbook";
import { TrustedBy } from "../common/TrustedBy";
import { trackDemoClick, trackSignupClick } from "../google-ads";
import { DeployUrlCard } from "./features/DeployUrlCard";
import { EnvironmentPromotion } from "./features/EnvironmentPromotion";

export const metadata: Metadata = getMetadata({
  title: "Argos Deployments",
  absoluteTitle:
    "Argos Deployments · Deploy Storybook & static builds on every PR",
  description:
    "Deploy Storybook, Vite, Next.js exports, or any static build to Argos on every pull request. Live preview URLs, a production domain, and access protection—no extra infra.",
  pathname: "/deployments",
});

const color = "teal" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-120 md:py-24">
          <FullPageGrid height="h-200 md:h-120" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Deployments</FeatureIndicator>
            </div>
            <HeroHeading>Deploy Storybook on every pull request</HeroHeading>
            <HeroDescription>
              Run <code className="font-mono">argos deploy</code> and get a live,
              shareable URL for every PR. Preview what your team and your agents
              built before you merge—no extra infrastructure to maintain.
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
              <Chip icon={RocketIcon}>Deployments</Chip>
              <SectionHeaderTexts>
                <SectionTitle>One command, one live URL</SectionTitle>
                <SectionDescription>
                  Point Argos at any static directory and it hosts it for you.
                  Every pull request gets an immutable preview URL, wired
                  straight into the PR comment and commit status.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            <FeatureGridFeature
              title={<>A preview URL on every PR</>}
              description={
                <>
                  <code className="font-mono">argos deploy ./storybook-static</code>{" "}
                  ships your build to a unique, immutable URL—perfect for sharing
                  a change with reviewers, designers, or an agent before it
                  merges.
                </>
              }
              href="/docs/learn/deployments"
              illustration={<DeployUrlCard />}
            />
            <FeatureGridFeature
              title={<>Preview and production, built in</>}
              description={
                <>
                  Pull requests ship to preview URLs; merges to your production
                  branch promote to a stable domain. Each deployment also exposes
                  a branch URL that always follows the latest build.
                </>
              }
              href="/docs/learn/deployments"
              illustration={<EnvironmentPromotion />}
            />
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            <FeatureGridFeatureSmall
              title="Works with your stack"
              description={
                <>
                  Storybook, Vite, Next.js exports, or plain HTML—anything that
                  builds to a static directory.
                </>
              }
              href="/docs/learn/deployments"
              icon={FileStackIcon}
            />
            <FeatureGridFeatureSmall
              title="Access protection"
              description={
                <>
                  Keep previews private to your team, leave production public, or
                  lock everything behind Argos login.
                </>
              }
              href="/docs/learn/deployments"
              icon={LockKeyholeIcon}
            />
            <FeatureGridFeatureSmall
              title="Right in the PR"
              description={
                <>
                  Deployment links sit next to your visual build, with a commit
                  status you can require in branch protection.
                </>
              }
              href="/docs/learn/deployments"
              icon={GitPullRequestIcon}
            />
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>
      <QuoteBlock quote={gitbookQuote} className="border-b" />
      <section className="px-4">
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Stable URLs to share"
            description={
              <>
                Immutable deployment URLs, branch URLs that follow the latest
                build, and a project-wide production domain.
              </>
            }
            href="/docs/learn/deployments"
            icon={LinkIcon}
          />
          <FeatureGridFeatureSmall
            title="Deploy + visual test together"
            description={
              <>
                Pair deployments with Argos change detection so every preview is
                both live and verified.
              </>
            }
            href="/visual-testing"
            icon={ShieldCheckIcon}
          />
          <FeatureGridFeatureSmall
            title="No infrastructure to maintain"
            description={
              <>
                No servers, no buckets, no CDN config. Argos hosts and expires
                previews for you.
              </>
            }
            href="/docs/learn/deployments"
            icon={RocketIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>
      <CallToActionSection />
    </>
  );
}
