import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { getMetadata } from "@/lib/metadata";

import { TrustedBy } from "../common/TrustedBy";
import {
  SectionHeader,
  SectionHeaderTexts,
} from "../home/common/SectionHeader";
import { SectionDescription, SectionTitle } from "../home/common/Typography";
import { FeatureIndicator } from "../home/common/feature-section/FeatureSection";
import { GitHubChecks } from "./features/GitHubChecks";
import { GitHubComment } from "./features/GitHubComment";
import { SlackNotification } from "./features/SlackNotification";

export const metadata: Metadata = getMetadata({
  title: "Visual Testing for modern CI",
  description:
    "Argos brings fast, reliable visual testing to your CI. Catch UI regressions with smart stabilization, automatic baselines, Playwright and Storybook support, and a review workflow built for speed.",
  pathname: "/visual-testing",
});

const color = "blue" as const;

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" tint={color} />
          <Hero align="center" className="relative">
            <div className={clsx("rounded-full border px-3 py-1.5")}>
              <FeatureIndicator color={color}>Visual Testing</FeatureIndicator>
            </div>
            <HeroHeading>
              Visual testing that scales from PRs to production
            </HeroHeading>
            <HeroDescription>
              Catch visual regressions automatically, review changes fast, and
              trust every deployment across browsers, devices, and environments.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <TrustedBy />
      <section className="border-b px-4">
        <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
          <SectionHeader align="center" className="container-gutter max-w-2xl">
            <SectionHeaderTexts>
              <SectionTitle>Built into your delivery flow</SectionTitle>
              <SectionDescription>
                Visual checks that follow your code from commit to deploy,
                integrated with GitHub, Vercel, CI, and your team channels.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="mask-b-from-70%">
            <GitHubChecks />
          </div>
        </Container>
      </section>
      <FeatureGrid>
        <FeatureGridFeature
          title={<>Clear visual status in pull request comments</>}
          description={
            <>
              Argos posts a concise build summary directly in pull requests. See
              what changed, what was approved, and what requires attention at a
              glance, without noise, without leaving GitHub.
            </>
          }
          href="/docs/pull-request-comments"
          illustration={<GitHubComment />}
        />
        <FeatureGridFeature
          title={<>Actionable Slack notifications, right where your team is</>}
          description={
            <>
              Use Automations to send concise Argos updates to the right Slack
              channels at the right time. Notify your team when a build is ready
              for review, changes are requested, or a build is auto approved on
              main.
            </>
          }
          href="/docs/slack"
          illustration={<SlackNotification />}
        />
        <FeatureGridFeature
          title={<>Visual checks on every deployment preview</>}
          description={
            <>
              Argos plugs into GitHub Actions and deployment providers like
              Vercel, Netlify, and Cloudflare. Every preview is tested
              automatically, regressions are reported back to the pull request,
              and your production baseline stays clean and reliable.
            </>
          }
          href="/docs/pull-request-comments"
          illustration={<GitHubComment />}
        />
      </FeatureGrid>
    </>
  );
}

function FeatureGrid(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <section className="border-b px-4">
      <Container
        noGutter
        className="relative grid grid-cols-1 border-x max-md:divide-y md:grid-cols-2 md:divide-x"
      >
        {children}
      </Container>
    </section>
  );
}

export function FeatureGridFeature(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  illustration: React.ReactNode;
}) {
  const { title, description, href, illustration } = props;
  return (
    <div className="relative flex flex-col gap-10 px-4 py-6 sm:px-10 sm:py-14">
      <div className="relative flex h-72 items-center justify-center">
        {illustration}
      </div>
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-low font-[450]">{description}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href={href}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
