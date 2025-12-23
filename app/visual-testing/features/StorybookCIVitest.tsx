import clsx from "clsx";
import {
  CheckCircle2Icon,
  PlayIcon,
  UploadCloudIcon,
  Wand2Icon,
} from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

const LOG_LINES: Array<{
  label: string;
  text: string;
  tone?: "muted" | "primary" | "success" | "amber";
}> = [
  {
    label: "$",
    text: "pnpm vitest run storybook --reporter=dot",
    tone: "muted",
  },
  { label: "vitest", text: "Found 38 Storybook stories across 4 projects" },
  {
    label: "play",
    text: "Running play function for Button / Primary",
    tone: "amber",
  },
  {
    label: "snap",
    text: "Captured snapshot: Button/Primary · desktop",
    tone: "primary",
  },
  {
    label: "snap",
    text: "Captured snapshot: Modal/Open · mobile",
    tone: "primary",
  },
  {
    label: "upload",
    text: "Uploading 38 snapshots to Argos…",
    tone: "primary",
  },
  {
    label: "argos",
    text: "Build created · #45892 · waiting for review",
    tone: "success",
  },
];

export function StorybookCIVitest() {
  return (
    <div className="relative isolate mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-[1.1fr,0.9fr]">
      <Glow position="left" />
      <Glow position="right" />
      <VitestTerminal />
      {/* <ArgosBuild /> */}
    </div>
  );
}

function VitestTerminal() {
  return (
    <Card
      className="relative h-full overflow-hidden border-(--neutral-6)/60 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))]"
      shadow="shadow-md"
    >
      <div className="relative flex items-center justify-between border-b px-3 py-2 text-[11px] font-semibold">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className="block size-2.5 rounded-full bg-(--danger-8)"
              aria-hidden
            />
            <span
              className="block size-2.5 rounded-full bg-(--amber-8)"
              aria-hidden
            />
            <span
              className="block size-2.5 rounded-full bg-(--success-8)"
              aria-hidden
            />
          </div>
          <SmallTitle>
            <ThemeImage src={storybook.logo} alt="" className="-mr-1 size-5" />
            Storybook CI · Vitest
          </SmallTitle>
        </div>
        <Chip variant="primary" className="text-[10px]">
          Running
        </Chip>
      </div>
      <div className="relative space-y-1.5 px-3 py-3 font-mono text-[11px] leading-relaxed text-(--neutral-12)">
        {LOG_LINES.map((line) => (
          <TerminalLine key={line.text} {...line} />
        ))}
      </div>
    </Card>
  );
}

function TerminalLine(props: {
  label: string;
  text: string;
  tone?: "muted" | "primary" | "success" | "amber";
}) {
  const { label, text, tone = "muted" } = props;
  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-lg px-2 py-1",
        {
          muted: "text-(--neutral-11)",
          primary: "bg-(--primary-2)/50 text-(--primary-11)",
          success: "bg-(--success-2)/60 text-(--success-11)",
          amber: "bg-(--amber-2)/60 text-(--amber-11)",
        }[tone],
      )}
    >
      <span className="text-[10px] tracking-wide text-(--neutral-10) uppercase">
        {label}
      </span>
      <span className="flex-1">{text}</span>
    </div>
  );
}

function ArgosBuild() {
  return (
    <Card
      className="relative h-full overflow-hidden border-(--primary-6)/70 bg-[linear-gradient(210deg,--alpha(var(--primary-2)/70%),var(--neutral-1))]"
      shadow="shadow-lg"
    >
      <div
        aria-hidden
        className="absolute -top-16 -left-20 h-40 w-40 rounded-full bg-(--primary-4)/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-(--blue-4)/25 blur-3xl"
      />
      <div className="relative flex items-center justify-between border-b border-(--primary-6)/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-(--primary-7)/60 bg-(--primary-2)/60 shadow-[0_12px_30px_-18px_rgba(80,62,255,0.8)]">
            <ArgosEmblem
              className="size-4 w-auto text-(--primary-10)"
              aria-hidden
            />
          </span>
          <div>
            <div className="text-sm font-semibold text-(--neutral-12)">
              Argos build
            </div>
            <div className="text-low text-xs font-semibold">
              Storybook snapshots from Vitest
            </div>
          </div>
        </div>
        <Badge className="border-(--success-7)/70 bg-(--success-2)/70 text-(--success-11)">
          <CheckCircle2Icon className="size-3" aria-hidden />
          Build created
        </Badge>
      </div>

      <div className="relative grid gap-3 p-4 text-sm">
        <BuildRow
          icon={<PlayIcon className="size-4 text-(--primary-10)" aria-hidden />}
          label="Workflow"
          value="vitest run storybook"
        />
        <BuildRow
          icon={<Wand2Icon className="size-4 text-(--amber-10)" aria-hidden />}
          label="Play functions"
          value="Async flows captured"
        />
        <BuildRow
          icon={
            <UploadCloudIcon
              className="size-4 text-(--primary-10)"
              aria-hidden
            />
          }
          label="Snapshots"
          value="38 uploaded · 12 changed"
          badge={<Chip variant="primary">Awaiting review</Chip>}
        />
        <div className="rounded-xl border border-(--primary-6)/60 bg-(--primary-2)/50 p-3 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-(--primary-11) uppercase">
            <DotIndicator variant="primary" />
            Build timeline
          </div>
          <div className="mt-2 grid gap-2 font-mono text-[12px] text-(--neutral-12)">
            <TimelineItem
              label="Vitest"
              text="Storybook tests finished in 58s"
            />
            <TimelineItem label="Argos" text="Build #45892 created from CI" />
            <TimelineItem label="Review" text="Open in Argos app" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function BuildRow(props: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: React.ReactNode;
}) {
  const { icon, label, value, badge } = props;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-(--neutral-6)/60 bg-(--neutral-1) px-3 py-2 shadow-xs">
      <span className="grid size-9 place-items-center rounded-lg border border-(--neutral-6)/60 bg-white/70">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-xs font-semibold text-(--neutral-11)">{label}</div>
        <div className="text-sm font-semibold text-(--neutral-12)">{value}</div>
      </div>
      {badge ?? null}
    </div>
  );
}

function TimelineItem(props: { label: string; text: string }) {
  const { label, text } = props;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-(--neutral-6)/60 bg-white/50 px-2 py-1">
      <span className="text-[11px] font-semibold text-(--primary-11)">
        {label}
      </span>
      <span className="text-(--neutral-12)">{text}</span>
    </div>
  );
}

function Glow(props: { position: "left" | "right" }) {
  const { position } = props;
  return (
    <div
      className={clsx(
        "pointer-events-none absolute h-40 w-40 rounded-full blur-3xl",
        {
          left: "top-8 -left-16 bg-(--primary-4)/25",
          right: "-right-12 bottom-6 bg-(--blue-4)/25",
        }[position],
      )}
      aria-hidden
    />
  );
}
