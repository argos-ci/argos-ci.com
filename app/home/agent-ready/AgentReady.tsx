import { ClipboardCheckIcon, RefreshCwIcon, ScanEyeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionDescription, SectionTitle } from "@/components/Typography";

import { AgentTerminal } from "./AgentTerminal";

const POINTS = [
  {
    icon: ScanEyeIcon,
    title: "Agents see the diff",
    text: "Machine-readable snapshots let an agent read exactly what its change did to the UI, the Markdown, or the API output.",
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
            <SectionTitle>100% agent-ready</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Your agents write the code. Argos gives them (and you) the ground
              truth of what actually changed, from the same CLI and REST API they
              already use.
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

