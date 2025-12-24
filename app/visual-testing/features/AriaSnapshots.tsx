import clsx from "clsx";
import { ArrowLeftRightIcon, ScanTextIcon } from "lucide-react";

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
    <div className="relative isolate mx-auto w-full max-w-5xl p-2">
      <Glow position="left" />
      <Glow position="right" />
      <Card className="relative h-[420px] overflow-hidden border bg-[linear-gradient(120deg,--alpha(var(--primary-3)/35%),var(--neutral-1))] shadow-md md:h-[450px]">
        <div className="grid h-full items-start gap-4 p-3 md:grid-cols-2 md:gap-5 md:p-5">
          <DiffColumn
            title="Baseline from production"
            caption="5 days ago"
            lines={BASELINE_LINES}
            variant="left"
          />
          <DiffColumn
            title="Changes from main"
            caption="a day ago"
            lines={PR_LINES}
            variant="right"
          />
        </div>
      </Card>
    </div>
  );
}

function DiffColumn(props: {
  title: string;
  caption: string;
  lines: DiffLine[];
  variant: "left" | "right";
}) {
  const { title, caption, lines, variant } = props;
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-(--neutral-6)/60 bg-white/85 shadow-xs">
      <div className="flex items-center justify-between border-b border-(--neutral-6)/60 px-3 py-1.5">
        <SmallTitle className="gap-2 text-[11px] text-(--neutral-12)">
          <Badge className="border-(--neutral-6)/60 bg-(--neutral-2)/80 text-[11px] text-(--neutral-11)">
            <ScanTextIcon className="size-3.5" aria-hidden />
            {title}
          </Badge>
          <span className="text-low text-[10px] font-semibold">{caption}</span>
        </SmallTitle>
        <Badge className="border-(--primary-6)/60 bg-(--primary-2)/70 text-[11px] text-(--primary-10)">
          <ArrowLeftRightIcon className="size-3" aria-hidden />
          ARIA snapshot
        </Badge>
      </div>
      <div className="relative">
        <div
          className="absolute inset-y-0 right-3 w-1 rounded-full bg-(--neutral-6)/40"
          aria-hidden
        />
        <div className="space-y-[2px] overflow-hidden mask-b-from-80% p-3 font-mono text-[11px] leading-[1.45] text-(--neutral-12) md:max-h-[360px]">
          {lines.map((line) => (
            <DiffRow
              key={`${variant}-${line.number}-${line.text}`}
              line={line}
            />
          ))}
        </div>
      </div>
    </div>
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
        "flex items-stretch gap-2.5 overflow-hidden rounded-md border px-2.5 py-1.5",
        tone,
      )}
    >
      <span className="w-8 shrink-0 text-right text-[10px] font-semibold text-(--neutral-9)">
        {line.number}
      </span>
      <div className="flex flex-1 items-start gap-2">
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
          className="mt-0.5"
        />
        <span className="leading-[1.45] whitespace-pre">{line.text}</span>
      </div>
    </div>
  );
}

function Glow(props: { position: "left" | "right" }) {
  const { position } = props;
  return (
    <div
      className={clsx(
        "pointer-events-none absolute h-48 w-48 rounded-full blur-3xl",
        {
          left: "top-4 -left-10 bg-(--primary-4)/18",
          right: "-right-16 bottom-6 bg-(--blue-4)/18",
        }[position],
      )}
      aria-hidden
    />
  );
}
