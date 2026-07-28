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

const POINTS = [
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
  {
    icon: ClipboardCheckIcon,
    title: "Agents review from the CLI",
    text: "Inspect a build, list what needs review, and submit a decision, or hit Copy prompt to hand an agent the full context.",
  },
  {
    icon: PlugIcon,
    title: "Agents connect over MCP",
    text: "Connect Claude, Cursor, or any MCP client to the Argos MCP server with OAuth — every review action, natively in your agent.",
  },
];

export function AgentReady() {
  return (
    <section className="separator-b bg-subtle relative px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color="violet">
              Built for the AI age
            </FeatureIndicator>
            <SectionTitle>
              Your comments become the agent&apos;s next task
            </SectionTitle>
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
        <div className="grid border-t md:grid-cols-2">
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
