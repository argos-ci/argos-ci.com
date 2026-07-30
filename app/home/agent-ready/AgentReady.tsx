import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";

import { AgentShowcase } from "./AgentShowcase";

export function AgentReady() {
  return (
    // `dark` re-scopes the Radix scales for this subtree, so the whole section
    // flips with the design system instead of being restyled by hand. It gives
    // the page a landmark at its midpoint, where six light sections otherwise
    // run together.
    // `text-default` has to be reapplied: colour inherits from `body` as a
    // computed value, so it would stay dark-on-dark without it.
    <section className="separator-b text-default dark relative bg-(--violet-1) px-4 [color-scheme:dark]">
      {/* `--violet-1` rather than `--neutral-1`: the same depth to within ΔL 3
          (#14121f against #111), but it carries the hue of this chapter's
          eyebrow and of the Argos mark, where a neutral black left the page's
          largest surface saying nothing.

          The glow does two jobs. `SectionHeader` is `max-w-4xl`, so the right
          half of the header is empty — on a black band that reads as dead space
          rather than as air. And the terminal is a #111 panel that sat on a #111
          ground, with only its hairline to separate the two. Lighting this
          quadrant fills the void and gives the terminal something to sit on. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(70%_55%_at_72%_38%,var(--violet-3),transparent_70%)] md:w-3/5" />
      <Container noGutter className="relative border-x pb-12">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color="violet">
              Built for the AI age
            </FeatureIndicator>
            {/* Imperative, and honest about the direction. The previous title
                said comments "become" the agent's next task, which describes a
                push: a queue that fills itself. Argos pushes nothing — the agent
                fetches, as the description right below already said with
                "pulls". The title contradicted its own subtitle. */}
            <SectionTitle>Hand your review to your agent</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Pin what&apos;s wrong on the screenshot. Your agent pulls the
              comments and the images they point to straight from the CLI or
              over MCP, ships the fix, and Argos shows you whether it worked.
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
