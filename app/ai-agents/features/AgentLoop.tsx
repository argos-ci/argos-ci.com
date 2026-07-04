"use client";

import clsx from "clsx";
import {
  CheckCircle2Icon,
  GitPullRequestIcon,
  type LucideIcon,
  ScanEyeIcon,
  WandSparklesIcon,
} from "lucide-react";

import { Card } from "@/components/Card";

const STEPS: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
  tone: "violet" | "blue" | "amber" | "success";
}> = [
  {
    icon: GitPullRequestIcon,
    title: "Your agent opens a PR",
    text: "New UI, Markdown, or JSON, shipped in minutes.",
    tone: "violet",
  },
  {
    icon: ScanEyeIcon,
    title: "Argos captures every change",
    text: "A machine-readable diff of exactly what moved.",
    tone: "blue",
  },
  {
    icon: WandSparklesIcon,
    title: "The agent reads it and fixes",
    text: "It sees its own mistake and iterates, before you look.",
    tone: "amber",
  },
  {
    icon: CheckCircle2Icon,
    title: "You merge with confidence",
    text: "Nothing unexpected slips through.",
    tone: "success",
  },
];

const TONES = {
  violet: "border-(--violet-7) bg-(--violet-3) text-(--violet-11)",
  blue: "border-(--blue-7) bg-(--blue-3) text-(--blue-11)",
  amber: "border-(--amber-7) bg-(--amber-3) text-(--amber-11)",
  success: "border-(--success-7) bg-(--success-3) text-(--success-11)",
};

export function AgentLoop() {
  return (
    <Card
      shadow="high"
      className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md cursor-default p-4"
    >
      <ol className="relative flex flex-col gap-3">
        <span
          className="absolute top-4 bottom-4 left-4 -z-10 w-px bg-(--border-color-base)"
          aria-hidden
        />
        {STEPS.map((step) => (
          <li key={step.title} className="flex items-start gap-3">
            <span
              className={clsx(
                "grid size-8 shrink-0 place-items-center rounded-full border-[0.5px]",
                TONES[step.tone],
              )}
            >
              <step.icon className="size-4" strokeWidth={1.75} />
            </span>
            <div className="pt-0.5">
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-low text-xs">{step.text}</div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
