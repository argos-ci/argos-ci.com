import clsx from "clsx";

import { Card } from "@/components/Card";

const CODE_LINES: Array<{
  text: string;
  indent?: number;
  tone?: "comment" | "primary" | "muted";
}> = [
  {
    text: 'import { argosScreenshot } from "@argos-ci/storybook/vitest";',
  },
  { text: "" },
  { text: "export const FormStory: Story = {" },
  { text: "play: async (ctx) => {", indent: 1 },
  {
    text: 'await argosScreenshot(ctx, "before-fill");',
    indent: 2,
    tone: "primary",
  },
  { text: "" },
  { text: "await userEvent.type(", indent: 2 },
  {
    text: 'within(ctx.canvasElement).getByLabelText("Email"),',
    indent: 3,
  },
  { text: '"example-email@email.com",', indent: 3 },
  { text: ");", indent: 2 },
  { text: "" },
  {
    text: 'await argosScreenshot(ctx, "after-fill");',
    indent: 2,
    tone: "primary",
  },
  { text: "},", indent: 1 },
  { text: "};" },
];

export function PlayFunctionScreenshot() {
  return (
    <Card className="max-h-80 overflow-hidden" shadow="shadow-lg">
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs font-semibold">
        <span
          aria-hidden
          className="flex items-center gap-1.5 text-(--neutral-10)"
        >
          <span className="block size-2.5 rounded-full bg-(--danger-8)" />
          <span className="block size-2.5 rounded-full bg-(--amber-8)" />
          <span className="block size-2.5 rounded-full bg-(--success-8)" />
        </span>
        Form.story.tsx
      </div>
      <div className="space-y-0.5 mask-b-from-80% p-2 font-mono text-[0.7rem]">
        {CODE_LINES.map((line, index) => (
          <CodeLine key={`${line.text}-${index}`} {...line} />
        ))}
      </div>
    </Card>
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
        "rounded-md pr-2 whitespace-pre",
        tone
          ? {
              comment: "text-(--neutral-10)",
              primary: "bg-(--primary-2) text-(--primary-11)",
              muted: "text-(--neutral-10)",
            }[tone]
          : "text-low/70",
        text === "" && "h-3",
      )}
      style={{ paddingLeft: `${padding}px` }}
    >
      {text}
    </div>
  );
}
