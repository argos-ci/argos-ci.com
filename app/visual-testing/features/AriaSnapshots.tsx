"use client";

import clsx from "clsx";
import { GitBranchIcon, ScanTextIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

type DiffKind = "context" | "removed" | "added" | "changed";

type DiffLine = {
  number: number;
  text: string;
  kind: DiffKind;
};

const BASELINE_LINES: DiffLine[] = [
  { number: 168, text: "- paragraph:", kind: "context" },
  { number: 169, text: "  - superscript: registered", kind: "context" },
  { number: 170, text: "  - text: .", kind: "context" },
  { number: 172, text: "- tabpanel:", kind: "removed" },
  {
    number: 173,
    text: '  - heading "Pay with Rewards" [level=3]',
    kind: "removed",
  },
  { number: 174, text: "  - paragraph:", kind: "removed" },
  {
    number: 175,
    text: "    - text: Check out with PayPal, and use your cash",
    kind: "removed",
  },
  { number: 180, text: "- tabpanel:", kind: "removed" },
  {
    number: 181,
    text: '  - heading "Redeem for Purchases" [level=3]',
    kind: "removed",
  },
  {
    number: 182,
    text: "  - paragraph: Redeem your cash rewards toward",
    kind: "removed",
  },
  { number: 187, text: "- tabpanel:", kind: "removed" },
  { number: 188, text: '  - heading "Gift Cards" [level=3]', kind: "removed" },
  {
    number: 189,
    text: "  - paragraph: Redeem cash rewards for gift cards",
    kind: "removed",
  },
  { number: 190, text: "- tabpanel:", kind: "removed" },
  {
    number: 191,
    text: '  - heading "Redeem to Account" [level=3]',
    kind: "removed",
  },
];

const PR_LINES: DiffLine[] = [
  { number: 168, text: "- paragraph:", kind: "context" },
  { number: 169, text: "  - superscript: registered", kind: "context" },
  { number: 170, text: "  - text: .", kind: "context" },
  {
    number: 172,
    text: '- heading "Pay with Rewards" [level=3]',
    kind: "changed",
  },
  { number: 173, text: "  - paragraph:", kind: "changed" },
  {
    number: 174,
    text: "    - text: Check out with PayPal, and use your cash rewards",
    kind: "changed",
  },
  { number: 175, text: '    - link "Footnote 13.":', kind: "added" },
  { number: 176, text: '      - /url: "#fn13"', kind: "added" },
  { number: 177, text: '      - superscript: "13"', kind: "added" },
  {
    number: 178,
    text: '- heading "Redeem for Purchases" [level=3]',
    kind: "context",
  },
  {
    number: 179,
    text: "  - paragraph: Redeem your cash rewards toward the cost",
    kind: "context",
  },
  { number: 180, text: '  - link "Footnote 14.":', kind: "added" },
  { number: 181, text: '    - /url: "#fn14"', kind: "added" },
  { number: 182, text: '    - superscript: "14"', kind: "added" },
  { number: 183, text: '- heading "Gift Cards" [level=3]', kind: "context" },
  {
    number: 184,
    text: "  - paragraph: Redeem cash rewards for gift cards",
    kind: "context",
  },
  {
    number: 185,
    text: '- heading "Redeem to Account" [level=3]',
    kind: "context",
  },
  {
    number: 186,
    text: "  - paragraph: Redeem cash rewards as a credit",
    kind: "context",
  },
  { number: 187, text: '  - link "Footnote 15.":', kind: "added" },
  { number: 188, text: '    - /url: "#fn15"', kind: "added" },
  { number: 189, text: '    - superscript: "15"', kind: "added" },
];

export function AriaSnapshots() {
  return (
    <div className="grid h-full items-start gap-4 p-3 md:grid-cols-2 md:gap-5 md:p-5">
      <DiffColumn
        title={
          <SmallTitle>
            <GitBranchIcon className="size-3" />
            Baseline from main
            <span className="text-low font-normal">5 days ago</span>
          </SmallTitle>
        }
        lines={BASELINE_LINES}
        variant="left"
        className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both max-sm:hidden"
      />
      <DiffColumn
        title={
          <SmallTitle>
            <GitBranchIcon className="size-3" />
            Changes from feature-x
            <span className="text-low font-normal max-sm:hidden">
              one day ago
            </span>
          </SmallTitle>
        }
        lines={PR_LINES}
        variant="right"
        className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both sm:animate-delay-250"
      />
    </div>
  );
}

function DiffColumn(props: {
  title: React.ReactNode;
  lines: DiffLine[];
  variant: "left" | "right";
  className?: string;
}) {
  const { title, lines, variant, className } = props;
  return (
    <Card
      className={clsx(
        "relative m-auto flex h-full max-h-80 max-w-100 flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-1.5">
        {title}
        <Badge className="text-low text-[11px]">
          <ScanTextIcon className="size-3" aria-hidden />
          ARIA snapshot
        </Badge>
      </div>
      <div className="relative space-y-0.5 overflow-hidden mask-b-from-80% p-3 font-mono text-[11px] leading-[1.45]">
        {lines.map((line) => (
          <DiffRow key={`${variant}-${line.number}-${line.text}`} line={line} />
        ))}
      </div>
    </Card>
  );
}

function DiffRow(props: { line: DiffLine }) {
  const { line } = props;
  const tone = {
    context:
      "bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.03)_8px,transparent_8px,transparent_16px)] border-(--neutral-5)/50",
    removed: "bg-(--danger-2)/60 border-(--danger-6)/60 text-(--danger-11)",
    added: "bg-(--primary-2)/60 border-(--primary-6)/60 text-(--primary-11)",
    changed: "bg-(--amber-2)/55 border-(--amber-6)/60 text-(--amber-11)",
  }[line.kind];

  return (
    <div
      className={clsx(
        "flex items-stretch gap-2.5 overflow-hidden rounded-md border px-1 py-1.5",
        tone,
      )}
    >
      <span className="w-8 shrink-0 text-right text-(--neutral-9)">
        {line.number}
      </span>
      <div className="flex flex-1 items-center gap-2">
        <DotIndicator
          variant={
            line.kind
              ? {
                  added: "primary" as const,
                  removed: "danger" as const,
                  changed: "warning" as const,
                  context: "neutral" as const,
                }[line.kind]
              : "neutral"
          }
        />
        <span className="whitespace-pre">{line.text}</span>
      </div>
    </div>
  );
}
