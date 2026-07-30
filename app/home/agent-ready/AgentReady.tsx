import {
  ClipboardCheckIcon,
  MessageSquareCodeIcon,
  PlugIcon,
  RefreshCwIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";

import { AgentTerminal } from "./AgentTerminal";

/**
 * Ordered from mechanism to consequence, not strongest first.
 *
 * "Agents act on your review" used to open, and it asks the reader to accept
 * three things at once — that comments are pinned to pixels, that an agent can
 * reach them, and that it can act on them — right after a title that already
 * claimed the same thing. Two assertions of the payoff before anything made it
 * credible.
 *
 * MCP and the CLI are concrete and checkable, and they are what earns the last
 * two points. Once "the agent reads and writes through these" is established,
 * acting on the review is a consequence rather than a promise.
 */
const POINTS = [
  {
    icon: PlugIcon,
    title: "Agents connect over MCP",
    text: "Connect Claude, Cursor, or any MCP client to the Argos MCP server with OAuth — every review action, natively in your agent.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Agents review from the CLI",
    text: "Inspect a build, list what needs review, and submit a decision, or hit Copy prompt to hand an agent the full context.",
  },
  {
    icon: MessageSquareCodeIcon,
    title: "Agents act on your review",
    text: "Ask your agent to pick up a build and it reads every comment, plus the screenshot each one is pinned to, then fixes exactly what you flagged.",
  },
  {
    icon: RefreshCwIcon,
    title: "Agents iterate and self-correct",
    text: "When Argos surfaces an unintended change, the agent has the context to fix its own mistake before you ever look.",
  },
];

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
        <div className="grid border-y md:grid-cols-2">
          <ul className="flex flex-col divide-y border-b md:border-r md:border-b-0">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-4 p-6 md:p-8">
                <point.icon
                  className="mt-0.5 size-5 shrink-0 text-(--violet-11)"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-accent font-medium">{point.title}</h3>
                  <p className="text-low text-sm">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="relative flex cursor-default items-center justify-center p-6 md:p-10">
            <AgentTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}
