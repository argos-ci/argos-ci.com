import clsx from "clsx";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

const CODE_LINES: Array<{
  text: string;
  indent?: number;
  tone?: "comment" | "primary" | "muted";
}> = [
  {
    text: 'import { argosScreenshot } from "@argos-ci/storybook/vitest";',
    tone: "muted",
  },
  { text: "" },
  { text: "export const FormStory: Story = {" },
  { text: "play: async (ctx) => {", indent: 1 },
  { text: "const { canvasElement } = ctx;", indent: 2 },
  { text: "" },
  {
    text: "// Take a screenshot before filling the form",
    indent: 2,
    tone: "comment",
  },
  {
    text: 'await argosScreenshot(ctx, "before-fill");',
    indent: 2,
    tone: "primary",
  },
  { text: "" },
  { text: "const canvas = within(canvasElement);", indent: 2 },
  { text: "" },
  { text: "await userEvent.type(", indent: 2 },
  {
    text: 'canvas.getByLabelText("Email", { selector: "input" }),',
    indent: 3,
  },
  { text: '"example-email@email.com",', indent: 3 },
  { text: "{ delay: 100 },", indent: 3 },
  { text: ");", indent: 2 },
  { text: "" },
  {
    text: "// Take a screenshot after filling the form",
    indent: 2,
    tone: "comment",
  },
  {
    text: 'await argosScreenshot(ctx, "after-fill");',
    indent: 2,
    tone: "primary",
  },
  { text: "" },
  {
    text: 'await userEvent.click(canvas.getByRole("button"));',
    indent: 2,
  },
  { text: "},", indent: 1 },
  { text: "};" },
];

const SCREENSHOTS = [
  {
    name: "before-fill",
    description: "Empty form before typing",
    tone: "primary" as const,
    gradient: "from-(--primary-3) via-white to-(--neutral-1)",
  },
  {
    name: "after-fill",
    description: "After email is typed",
    tone: "success" as const,
    gradient: "from-(--success-3)/70 via-white to-(--neutral-1)",
  },
];

export function PlayFunctionScreenshot() {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute inset-x-10 -top-6 -z-10 h-36 rounded-full bg-[radial-gradient(circle_at_center,var(--primary-3),transparent_60%)] blur-3xl"
      />
      <Card
        className="relative overflow-hidden border-(--neutral-6)/60 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))]"
        shadow="shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-(--neutral-6)/60 px-4 py-3">
          <SmallTitle className="text-(--neutral-11)">
            <DotIndicator variant="primary" />
            Storybook play function
          </SmallTitle>
          <Chip variant="primary" className="px-2 py-[2px] text-[11px]">
            argosScreenshot()
          </Chip>
        </div>
        <div className="grid gap-4 px-4 py-4 md:grid-cols-[1.1fr,0.9fr]">
          <CodeEditor />
          <ScreenshotPanel />
        </div>
      </Card>
    </div>
  );
}

function CodeEditor() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-(--neutral-6)/60 bg-(--neutral-1) shadow-inner">
      <div className="flex items-center gap-2 border-b border-(--neutral-6)/60 px-3 py-2 text-xs font-semibold text-(--neutral-11)">
        <span
          aria-hidden
          className="flex items-center gap-1.5 text-(--neutral-10)"
        >
          <span className="block size-2.5 rounded-full bg-(--danger-8)" />
          <span className="block size-2.5 rounded-full bg-(--amber-8)" />
          <span className="block size-2.5 rounded-full bg-(--success-8)" />
        </span>
        FormStory.tsx
      </div>
      <div className="space-y-0.5 px-3 py-3 font-mono text-[11px] leading-relaxed text-(--neutral-12)">
        {CODE_LINES.map((line, index) => (
          <CodeLine key={`${line.text}-${index}`} {...line} />
        ))}
      </div>
    </div>
  );
}

function CodeLine(props: {
  text: string;
  indent?: number;
  tone?: "comment" | "primary" | "muted";
}) {
  const { text, indent = 0, tone } = props;
  const padding = 10 + indent * 14;

  return (
    <div
      className={clsx(
        "whitespace-pre rounded-md pr-2",
        {
          comment: "text-(--neutral-10)",
          primary: "bg-(--primary-2)/50 text-(--primary-11)",
          muted: "text-(--neutral-10)",
        }[tone ?? ""] || null,
        text === "" && "h-3",
      )}
      style={{ paddingLeft: `${padding}px` }}
    >
      {text}
    </div>
  );
}

function ScreenshotPanel() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-(--neutral-6)/60 bg-white/90 shadow-md">
      <div className="flex items-center justify-between border-b border-(--neutral-6)/60 px-3 py-2 text-xs font-semibold text-(--neutral-11)">
        <div className="flex items-center gap-2">
          <DotIndicator variant="primary" />
          Snapshots captured in play()
        </div>
        <Chip variant="neutral" className="px-2 py-[2px] text-[11px]">
          CI upload
        </Chip>
      </div>
      <div className="space-y-2 p-3">
        {SCREENSHOTS.map((shot) => (
          <ScreenshotRow key={shot.name} {...shot} />
        ))}
      </div>
    </div>
  );
}

function ScreenshotRow(props: {
  name: string;
  description: string;
  tone: "primary" | "success";
  gradient: string;
}) {
  const { name, description, tone, gradient } = props;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-(--neutral-6)/60 bg-(--neutral-1) px-3 py-2 shadow-xs">
      <div
        aria-hidden
      className={clsx(
        "grid h-14 w-20 place-items-center rounded-md border border-(--neutral-6)/50 bg-linear-to-r text-[11px] font-semibold text-(--neutral-11)",
        gradient,
      )}
    >
      {name.split("-").map((word) => (
        <span key={word} className="block leading-tight">
          {word}
        </span>
      ))}
    </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-(--neutral-12)">{name}</div>
        <div className="text-low text-xs font-semibold">{description}</div>
      </div>
      <Chip variant={tone} className="px-2 py-[2px] text-[11px]">
        Captured
      </Chip>
    </div>
  );
}
