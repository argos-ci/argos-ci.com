import clsx from "clsx";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

type ShardStep = {
  label: string;
  detail: string;
  accent: "primary" | "amber" | "neutral";
};

type ShardLane = {
  name: string;
  meta: string;
  tone: "primary" | "warning";
  steps: ShardStep[];
};

const SHARDS: ShardLane[] = [
  {
    name: "Shard A · 1/3",
    meta: "repeat-each (2x) · 142 snapshots",
    tone: "primary",
    steps: [
      { label: "Run #1", detail: "baseline locked", accent: "primary" },
      { label: "Repeat", detail: "same checksum", accent: "primary" },
    ],
  },
  {
    name: "Shard B · 2/3",
    meta: "retry handled automatically",
    tone: "warning",
    steps: [
      { label: "Run #1", detail: "1 flaky diff", accent: "amber" },
      { label: "Retry", detail: "deterministic pass", accent: "primary" },
    ],
  },
  {
    name: "Shard C · 3/3",
    meta: "parallel worker · 136 snapshots",
    tone: "primary",
    steps: [
      { label: "Run #1", detail: "synced seed", accent: "primary" },
    ],
  },
];

const FLOW = [
  {
    title: "Shared baseline + seed",
    description:
      "All shards reuse the same commit baseline, env tags, and snapshot seed so uploads merge cleanly.",
    tone: "primary" as const,
  },
  {
    title: "Retries stay scoped",
    description:
      "Only flaky shards rerun; previous green shards remain pinned to their first successful run.",
    tone: "warning" as const,
  },
  {
    title: "Repeat-each stays deterministic",
    description:
      "Repeat iterations push to one Argos build, keeping approvals and diff counts stable across attempts.",
    tone: "success" as const,
  },
];

export function IntegratedRuns() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-(--primary-4)/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-2 h-32 w-32 rounded-full bg-(--blue-4)/18 blur-3xl" />

      <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
        <ShardMatrix />
        <DeterministicPanel />
      </div>
    </div>
  );
}

function ShardMatrix() {
  return (
    <Card className="relative overflow-hidden border-(--primary-6)/50" shadow="shadow-lg">
      <div className="flex items-center justify-between gap-2 border-b border-(--neutral-6)/60 px-4 py-3">
        <SmallTitle>
          <DotIndicator variant="primary" /> Sharded Playwright run
        </SmallTitle>
        <Chip variant="primary" className="text-[11px]">
          Argos orchestrated
        </Chip>
      </div>
      <div className="space-y-3 px-4 py-4">
        {SHARDS.map((shard) => (
          <ShardLane key={shard.name} {...shard} />
        ))}
      </div>
    </Card>
  );
}

function ShardLane(props: ShardLane) {
  const { name, meta, tone, steps } = props;
  return (
    <div className="rounded-xl border border-(--neutral-6)/60 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))] px-3 py-3 shadow-[0_16px_35px_-30px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between gap-2 text-sm font-semibold text-(--neutral-12)">
        <div className="flex items-center gap-2">
          <DotIndicator variant={tone === "primary" ? "primary" : "warning"} />
          <span>{name}</span>
        </div>
        <span className="text-[12px] font-medium text-(--neutral-11)">{meta}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {steps.map((step) => (
          <StepPill key={`${name}-${step.label}`} {...step} />
        ))}
        <Chip variant={tone} className="text-[11px]">
          Deterministic upload
        </Chip>
      </div>
    </div>
  );
}

function StepPill(props: ShardStep) {
  const { label, detail, accent } = props;
  const accentStyles = {
    primary:
      "border-(--primary-6)/60 bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,0.25),rgba(124,92,255,0.05)_70%)] text-(--primary-11)",
    amber:
      "border-(--amber-6)/60 bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,94,0.25),rgba(255,183,94,0.06)_70%)] text-(--amber-11)",
    neutral:
      "border-(--neutral-6)/60 bg-[radial-gradient(circle_at_30%_30%,rgba(116,126,137,0.18),rgba(255,255,255,0.6)_70%)] text-(--neutral-12)",
  } satisfies Record<ShardStep["accent"], string>;

  const dotTone = {
    primary: "primary",
    amber: "warning",
    neutral: "neutral",
  } as const;

  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-[0_10px_30px_-24px_rgba(0,0,0,0.8)]",
        accentStyles[accent],
      )}
    >
      <DotIndicator variant={dotTone[accent]} />
      <span>{label}</span>
      <span className="text-low text-[11px] font-medium">{detail}</span>
    </div>
  );
}

function DeterministicPanel() {
  return (
    <Card className="relative h-full overflow-hidden border-(--neutral-6)/60" shadow="shadow-lg">
      <div className="flex items-center justify-between gap-3 border-b border-(--neutral-6)/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full border border-(--primary-6)/60 bg-(--primary-2)/60">
            <ArgosEmblem className="size-4" aria-hidden />
          </span>
          <SmallTitle>Deterministic orchestration</SmallTitle>
        </div>
        <Chip variant="success" className="text-[11px]">
          Baseline locked
        </Chip>
      </div>

      <div className="space-y-3 px-4 py-4">
        {FLOW.map((item) => (
          <FlowRow key={item.title} {...item} />
        ))}
        <div className="rounded-lg border border-(--primary-6)/60 bg-(--primary-2)/50 px-3 py-2 text-[12px] font-semibold text-(--primary-11)">
          <div className="flex items-center gap-2">
            <DotIndicator variant="primary" />
            Argos Build · merged from 3 shards · approvals stay in sync
          </div>
        </div>
      </div>
    </Card>
  );
}

function FlowRow(props: (typeof FLOW)[number]) {
  const { title, description, tone } = props;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-(--neutral-6)/60 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))] px-3 py-2.5">
      <span className="mt-0.5 grid size-7 place-items-center rounded-full border border-(--neutral-6)/60 bg-(--neutral-2)/70 text-[11px] font-semibold text-(--neutral-11)">
        <DotIndicator variant={tone} />
      </span>
      <div className="space-y-0.5">
        <div className="text-sm font-semibold text-(--neutral-12)">{title}</div>
        <p className="text-low text-[12px] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
