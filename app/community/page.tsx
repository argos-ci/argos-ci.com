import {
  ArrowDownIcon,
  GitPullRequestIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { DotIndicator } from "@/components/DotIndicator";
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroActions, HeroDescription, HeroHeading } from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { mui, muiQuote } from "../assets/customers/library/mui";
import { TrustedBy } from "../common/TrustedBy";

export const metadata: Metadata = getMetadata({
  title: "Community",
  absoluteTitle: "Argos Community · Open source, Discord, and the OSS ecosystem",
  description:
    "Argos is open source and built in the open. Join our Discord, contribute on GitHub, and see how Argos helps ship some of the most-used UI projects in the world, from MUI's Base UI to Mermaid.",
  pathname: "/community",
});

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-112">
          <FullPageGrid height="h-200 md:h-112" />
          <Hero align="center" className="relative">
            <div className="rounded-full border px-3 py-1.5 text-xs font-medium">
              Open source · built in the open
            </div>
            <HeroHeading>Built with, and for, our community</HeroHeading>
            <HeroDescription>
              Argos is open source and shaped in the open. Contribute on GitHub,
              join the conversation on Discord, and help build the quality
              platform for the age of AI agents.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link href="/discord">
                  <DiscordIcon className="size-4" />
                  Join Discord
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://github.com/argos-ci/argos">
                  <GitHubIcon className="size-4" />
                  View on GitHub
                </Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>
      <TrustedBy />

      <section className="px-4">
        <div className="border-b">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2) pb-12">
            <SectionHeader align="center" className="container-gutter max-w-2xl">
              <Chip icon={HeartIcon}>Open source</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Open source, from SDK to platform</SectionTitle>
                <SectionDescription>
                  Our SDKs and platform code are open source. Read them, learn
                  from them, and send a PR. We build Argos the way we think tools
                  should be built: in the open, with the people who use it.
                </SectionDescription>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Powering the tools you already use</>}
            description={
              <>
                Argos gives the <strong>MUI</strong> team a stable visual
                baseline to ship <strong>Base UI</strong>, the headless library
                behind the next generation of design systems, including{" "}
                <strong>shadcn/ui</strong>.
              </>
            }
            href="/customers/mui"
            cta="Read MUI's story"
            illustration={<EcosystemIllustration />}
          />
          <FeatureGridFeature
            title={<>Open source, from SDK to platform</>}
            description={
              <>
                The SDKs and the platform are public and MIT-licensed. Explore
                how Argos works under the hood, open an issue, or send a pull
                request and help shape the roadmap.
              </>
            }
            href="https://github.com/argos-ci/argos"
            cta="Explore the code"
            illustration={<RepoIllustration />}
          />
        </FeatureGrid>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          <FeatureGridFeatureSmall
            title="Free for open source"
            description={
              <>
                Open-source projects get Argos for free. Keep your UI reliable
                without a budget.
              </>
            }
            href="/docs/learn/billing-and-subscription/subscription/open-source"
            cta="See the program"
            icon={HeartIcon}
          />
          <FeatureGridFeatureSmall
            title="Contributions welcome"
            description={
              <>
                The SDKs and platform are public. Open an issue or send a pull
                request.
              </>
            }
            href="https://github.com/argos-ci/argos"
            cta="Contribute"
            icon={GitPullRequestIcon}
          />
          <FeatureGridFeatureSmall
            title="Chat on Discord"
            description={
              <>
                Ask questions, share setups, and talk directly with the people
                who build Argos.
              </>
            }
            href="/discord"
            cta="Join Discord"
            icon={MessageCircleIcon}
          />
        </Container>
        <Container className="h-12 border-x" />
      </section>

      <QuoteBlock quote={muiQuote} className="border-b" />

      <CallToActionSection description="Open source, agent-ready, and built with the community. Come build with us." />
    </>
  );
}

function EcosystemIllustration() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ThemeImage src={mui.logo["140x48"]} alt="MUI" className="h-18 w-auto" />
      <ArrowDownIcon className="text-low size-4" aria-hidden />
      <div className="flex items-center gap-2">
        <span className="bg-app inline-flex items-center rounded-lg border-[0.5px] px-3 py-2 text-sm leading-none font-medium">
          Base UI
        </span>
        <span className="text-low text-sm">powers</span>
        <span className="bg-app inline-flex items-center rounded-lg border-[0.5px] px-3 py-2 text-sm leading-none font-medium">
          shadcn/ui
        </span>
      </div>
      <div className="text-low text-center text-sm">
        Shipped to millions of developers
      </div>
    </div>
  );
}

function RepoIllustration() {
  return (
    <Card shadow="high" className="w-full max-w-sm p-5">
      <div className="flex items-center gap-2">
        <GitHubIcon className="size-5" />
        <span className="text-base font-medium">argos-ci/argos</span>
        <Badge className="text-xs ml-auto">Public</Badge>
      </div>
      <p className="text-low mt-3 text-sm">
        Visual &amp; snapshot testing platform for the age of AI agents.
      </p>
      <div className="text-low mt-4 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <DotIndicator variant="primary" />
          TypeScript
        </span>
        <span className="flex items-center gap-1.5">
          <DotIndicator variant="neutral" />
          MIT license
        </span>
      </div>
    </Card>
  );
}
