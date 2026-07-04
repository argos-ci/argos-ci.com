import { HeartIcon, MessageCircleIcon, StarIcon } from "lucide-react";
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
import { Hero, HeroActions, HeroDescription, HeroHeading } from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { clickhouse } from "../assets/customers/library/clickhouse";
import { mermaid } from "../assets/customers/library/mermaid";
import { mui, muiQuote } from "../assets/customers/library/mui";
import { TrustedBy } from "../common/TrustedBy";

export const metadata: Metadata = getMetadata({
  title: "Community",
  absoluteTitle: "Argos Community · Open source, Discord, and the OSS ecosystem",
  description:
    "Argos is open source and built in the open. Join our Discord, star us on GitHub, and see how Argos helps ship some of the most-used UI projects in the world, from MUI's Base UI to Mermaid.",
  pathname: "/community",
});

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" />
          <Hero align="center" className="relative">
            <div className="rounded-full border px-3 py-1.5 text-xs font-medium">
              Open source · built in the open
            </div>
            <HeroHeading>Built with, and for, our community</HeroHeading>
            <HeroDescription>
              Argos is open source and shaped in the open. Star us on GitHub,
              join the conversation on Discord, and help build the quality
              platform for the age of AI agents.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link href="https://github.com/argos-ci/argos">
                  <GitHubIcon className="size-4" />
                  Star on GitHub
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="/discord">
                  <DiscordIcon className="size-4" />
                  Join Discord
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
                  from them, self-host the pieces you need, and send a PR. We
                  build Argos the way we think tools should be built: in the
                  open.
                </SectionDescription>
              </SectionHeaderTexts>
              <Button variant="outline" asChild>
                <Link href="https://github.com/argos-ci">
                  <GitHubIcon className="size-4" />
                  Explore the code
                </Link>
              </Button>
            </SectionHeader>
          </Container>
        </div>
        <FeatureGrid>
          <FeatureGridFeature
            title={<>Powering the tools you already use</>}
            description={
              <>
                Argos gives the <strong>MUI</strong> team a stable visual
                baseline to ship <strong>Base UI</strong>, the headless
                component library behind the next generation of design systems,
                including <strong>shadcn/ui</strong>. When Argos catches a
                regression, millions of downstream apps are protected.
              </>
            }
            href="/customers/mui"
            illustration={
              <div className="flex flex-col items-center gap-6">
                <ThemeImage
                  src={mui.logo["140x48"]}
                  alt="MUI"
                  className="h-10 w-auto"
                />
                <div className="text-low text-center text-xs">
                  Trusted to ship Base UI to millions of developers
                </div>
              </div>
            }
          />
          <FeatureGridFeature
            title={<>Loved by open-source maintainers</>}
            description={
              <>
                From <strong>Mermaid</strong>&apos;s diagram rendering to data
                tooling at <strong>ClickHouse</strong>, maintainers rely on
                Argos to catch the smallest visual changes before every release,
                with a free plan for open-source projects.
              </>
            }
            href="/docs/learn/billing-and-subscription/subscription/open-source"
            illustration={
              <div className="flex items-center gap-8">
                <ThemeImage
                  src={mermaid.logo["140x48"]}
                  alt="Mermaid"
                  className="h-8 w-auto"
                />
                <ThemeImage
                  src={clickhouse.logo["140x48"]}
                  alt="ClickHouse"
                  className="h-8 w-auto"
                />
              </div>
            }
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
            icon={HeartIcon}
          />
          <FeatureGridFeatureSmall
            title="Star us on GitHub"
            description={
              <>
                Follow along, open issues, and contribute to the SDKs and the
                platform.
              </>
            }
            href="https://github.com/argos-ci/argos"
            icon={StarIcon}
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
