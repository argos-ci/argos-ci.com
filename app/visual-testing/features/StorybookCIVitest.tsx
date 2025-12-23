import clsx from "clsx";

import { storybook } from "@/app/assets/brands/library";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
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
    <Card className="relative" shadow="shadow-lg">
      <div className="relative flex items-center justify-between border-b-[0.5px] px-3 py-2 text-[11px] font-semibold">
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
      <div className="relative space-y-1.5 px-3 py-3 font-mono text-[11px] leading-relaxed">
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
