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
                one says the same flow is open to an agent. A verb-led benefit,
                like every title above it: "Built for agents" read as a spec,
                and "agent-ready" arrived as old news once Review had already
                said agents pick up a thread. */}
            <SectionTitle>Your agents check their own work</SectionTitle>
            {/* One verb per row of the showcase, in its order. Deploy happens
                inside "show their work", and Stabilize is not staged, so
                neither gets a clause of its own. */}
            <SectionDescription className="max-w-2xl">
              They read what their change did, fix what they broke, show their
              work, and only bring you what’s left.
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
