import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { BundledLanguage } from "@/lib/shiki";

import { Badge } from "./Badge";
import { Button } from "./Button";
import { CodeBlock } from "./CodeBlock";
import { Container } from "./Container";
import { FeatureIndicator } from "./feature-section/FeatureSection";
import { FeatureGridFeatureSmall } from "./FeatureGrid";
import { SectionHeader, SectionHeaderTexts } from "./SectionHeader";
import { Terminal } from "./Terminal";
import { SectionDescription, SectionTitle } from "./Typography";

export type AgentSectionCard = {
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
};

/**
 * The "For AI agents" section every pillar page carries: what an agent does
 * with this part of Argos, the real commands it runs, and the three ways in
 * (CLI, MCP, API or skill). Violet everywhere, whatever the page's colour, so
 * agents read as one thread through the four pillars.
 *
 * The section is anchored as `#agents` so the agents hub can deep-link into
 * each pillar.
 */
export function AgentSection(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  /** Commands shown in the terminal. Keep them real: the CLI reference is the source. */
  code: string;
  lang?: BundledLanguage;
  terminalTitle?: string;
  /** Rendered as a badge in the terminal's title bar, e.g. a skill name. */
  badge?: React.ReactNode;
  docsHref: string;
  docsLabel?: React.ReactNode;
  cards: [AgentSectionCard, AgentSectionCard, AgentSectionCard];
}) {
  const {
    title,
    description,
    code,
    lang = "bash",
    terminalTitle = "Terminal",
    badge,
    docsHref,
    docsLabel = "Read the guide",
    cards,
  } = props;
  return (
    <section id="agents" className="scroll-mt-24 border-b px-4">
      <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
        <SectionHeader align="center" className="max-w-2xl container-gutter">
          <div className="rounded-full border px-3 py-1.5">
            <FeatureIndicator color="violet">For AI agents</FeatureIndicator>
          </div>
          <SectionHeaderTexts>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </SectionHeaderTexts>
        </SectionHeader>
      </Container>
      <Container className="flex flex-col items-center gap-8 border-x border-t py-12 md:py-18">
        <Terminal
          title={terminalTitle}
          right={badge ? <Badge>{badge}</Badge> : undefined}
        >
          <CodeBlock
            code={code}
            lang={lang}
            className="text-xs [&_pre]:overflow-x-auto"
          />
        </Terminal>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href={docsHref}>{docsLabel}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ai-agents">Argos for AI agents</Link>
          </Button>
        </div>
      </Container>
      <Container
        noGutter
        className="relative grid grid-cols-1 border-x border-t max-md:divide-y md:grid-cols-3 md:divide-x"
      >
        {cards.map((card, index) => (
          <FeatureGridFeatureSmall
            key={index}
            title={card.title}
            description={card.description}
            href={card.href}
            icon={card.icon}
          />
        ))}
      </Container>
      <Container className="h-12 border-x border-t" />
    </section>
  );
}
