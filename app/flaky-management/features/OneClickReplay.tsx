import { ArrowUpRightIcon, BugPlayIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";

const timeline = [
  { label: "Render product card", at: "00:03.4" },
  { label: "Click checkout CTA", at: "00:08.1" },
  { label: "Network call /charge", at: "00:10.0" },
  { label: "Expectation failed", at: "00:12.6", variant: "danger" as const },
];

export function OneClickReplayIllustration() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      <div
        className="absolute inset-6 rounded-3xl bg-[linear-gradient(145deg,--alpha(var(--primary-4)/35%),--alpha(var(--neutral-3)/60%))] blur-3xl"
        aria-hidden
      />
      <Card className="relative z-10 w-full max-w-md">
        <div className="text-xxs flex items-center justify-between border-b-[0.5px] px-3 py-2 font-semibold text-(--neutral-11)">
          <span className="flex items-center gap-2">
            <DotIndicator variant="primary" />
            trace.zip · checkout.spec.ts
          </span>
          <span className="text-(--primary-10)">Trace viewer</span>
        </div>

        <div className="space-y-3 p-3">
          <div className="rounded-lg border border-(--neutral-6) bg-white/75 px-3 py-2 shadow-xs">
            <div className="text-xxs flex items-center justify-between font-semibold text-(--neutral-12)">
              Replay failure
              <span className="text-(--danger-10)">Failed</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 w-full rounded-full bg-(--neutral-6)">
                <div className="h-1 w-2/3 rounded-full bg-(--primary-9)" />
              </div>
              <span className="text-xxxs font-semibold text-(--neutral-10)">
                00:12.6
              </span>
            </div>
          </div>

          <div className="grid gap-1.5 rounded-lg border border-(--neutral-6) bg-white/80 p-3">
            {timeline.map((item) => (
              <TimelineRow key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div className="absolute -bottom-8 left-4">
          <TraceButton />
        </div>
      </Card>
    </div>
  );
}

function TimelineRow(props: { label: string; at: string; variant?: "danger" }) {
  return (
    <div className="flex items-center gap-2 rounded text-xs font-medium text-(--neutral-12)">
      <DotIndicator
        variant={props.variant === "danger" ? "danger" : "primary"}
      />
      <div className="flex-1 truncate">{props.label}</div>
      <span
        className="text-xxs font-semibold"
        style={{
          color:
            props.variant === "danger"
              ? "var(--danger-10)"
              : "var(--primary-10)",
        }}
      >
        {props.at}
      </span>
    </div>
  );
}

function TraceButton() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-(--primary-7) bg-(--primary-2) px-3 py-1.5 font-medium text-(--primary-11) shadow-md/7">
      <BugPlayIcon className="size-4" />
      Run Trace
      <ArrowUpRightIcon className="size-3" />
    </div>
  );
}
