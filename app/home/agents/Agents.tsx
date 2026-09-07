import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";

import { AgentShowcase } from "./AgentShowcase";

export function Agents() {
  return (
    <section className="separator-b relative bg-subtle px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            {/* The same eyebrow as the "For AI agents" section on every pillar
                page and the hub's hero pill: agents are one thread through the
                four pillars above, not a fifth pillar, and the label says so. */}
            <FeatureIndicator color="violet">For AI agents</FeatureIndicator>
            {/* The four sections above each sold one pillar to a team; this
                one says the same flow is open to an agent. "From deploy to
                review" names the span the showcase covers, with Stabilize in
                the description rather than the title: it is the one step the
                showcase does not stage. */}
            <SectionTitle>Built for agents, from deploy to review</SectionTitle>
            {/* One sentence per row of the showcase, in its order, then the
                Stabilize clause the showcase leaves out. */}
            <SectionDescription className="max-w-2xl">
              They deploy the preview, read what their change did, fix what they
              broke, show their work, and bring you only what’s left. When a
              test flakes, they read its history and ignore the recurring
              change.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/ai-agents">Explore Argos for AI Agents</Link>
          </Button>
        </SectionHeader>
        <AgentShowcase />
      </Container>
    </section>
  );
}
