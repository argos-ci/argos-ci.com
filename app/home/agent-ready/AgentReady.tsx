import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";

import { AgentShowcase } from "./AgentShowcase";

export function AgentReady() {
  return (
    <section className="separator-b relative bg-subtle px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            {/* A product area, like "Change Detection" and "Collaborative
                Reviews" above — and the destination of the CTA below. "Built
                for the AI age" named an era instead, and broke the run. */}
            <FeatureIndicator color="violet">AI Agents</FeatureIndicator>
            {/* The claim the section above cannot make. Collaborative Reviews
                already told the reader that agents pick up a thread, so
                "100% agent-ready" arrived as old news, and as a spec where
                every neighbouring title is a verb-led benefit. */}
            <SectionTitle>Your agents check their own work</SectionTitle>
            {/* One line, to sit at the same weight as the one-line description
                above it, and ordered so it announces the three rows. The long
                version led on CLI and MCP — the transport, which the terminal
                to the right already shows. */}
            <SectionDescription className="max-w-2xl">
              They read what their change did, fix what they broke, and only
              bring you what’s left.
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
