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
            {/* A claim no other visual testing tool can make, and one the rows
                below actually support.

                "Hand your review to your agent" promised a delegation, but the
                strongest point of the section — agents catching what they broke
                and fixing it — happens without you handing over anything. The
                title described the last and most demanding of the three rows as
                if it were the whole section. */}
            <SectionTitle>Your agents check their own work</SectionTitle>
            {/* Opens on the autonomy the title claims and closes on your part,
                in the order the rows use. Leading on "pin what's wrong", as it
                did, put the one step that costs the reader something first and
                contradicted the title right above it. */}
            <SectionDescription className="max-w-2xl">
              Your agents pull the diff from the CLI or over MCP, catch what
              they broke, and fix it before you look. Pin a comment when you
              want something else, and the next build tells you whether they got
              it.
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
