import {
  ClipboardCheckIcon,
  RefreshCwIcon,
  ScanEyeIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DotIndicator } from "@/components/DotIndicator";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionDescription, SectionTitle } from "@/components/Typography";

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
          <div className="relative flex items-center justify-center p-6 md:p-10">
            <AgentTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}

function AgentTerminal() {
  return (
    <div className="bg-app animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden rounded-xl border-[0.5px] shadow-md/7">
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <div className="text-low flex items-center gap-2 text-xs font-medium">
          <TerminalIcon className="size-3.5" />
          agent · terminal
        </div>
        <Badge className="text-low text-xxs gap-1">
          <ArgosEmblem className="size-3 text-(--violet-11)" />
          @argos-ci/cli
        </Badge>
      </div>
      <div className="text-xxs space-y-1.5 p-4 font-mono leading-relaxed">
        <Line prompt>argos build snapshots 1234 --needs-review</Line>
        <Line muted>→ 3 snapshots changed · 1 flaky · machine-readable</Line>
        <Line prompt>argos build review 1234 --conclusion approve</Line>
        <div className="flex items-center gap-2 pt-1">
          <DotIndicator variant="success" />
          <span className="text-(--success-11)">
            Review submitted, safe to merge
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-[0.5px] px-3 py-2">
        <span className="text-low text-xxs">Start a review from any build</span>
        <Badge className="text-xxs gap-1 border-(--violet-7) text-(--violet-11)">
          <ClipboardCheckIcon className="size-3" />
          Copy prompt
        </Badge>
      </div>
    </div>
  );
}

function Line(props: {
  children: React.ReactNode;
  prompt?: boolean;
  muted?: boolean;
}) {
  const { children, prompt, muted } = props;
  return (
    <div className={muted ? "text-low pl-4" : "flex gap-2"}>
      {prompt ? <span className="text-(--violet-11)">$</span> : null}
      <span className={prompt ? "text-default" : undefined}>{children}</span>
    </div>
  );
}
