import clsx from "clsx";
import { CheckCircleIcon, type LucideIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import type React from "react";

import slack from "@/app/assets/slack.svg";
import { Card } from "@/app/home/common/Card";

export function SlackNotification() {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute top-12 -right-12 -left-12 -z-10 h-28 rounded-full bg-[radial-gradient(circle_at_center,_var(--primary-3),_transparent_60%)] blur-3xl"
      />
      <AutomationBuilder />
    </div>
  );
}

function AutomationBuilder() {
  return (
    <Card className="overflow-hidden border" shadow="shadow-lg">
      <div className="border-b-[0.5px] px-3 py-2 text-sm font-semibold">
        Automations builder
      </div>

      <div className="space-y-3 p-3">
        <BuilderRow icon={ZapIcon} label="Trigger" value="Build completes" />
        <BuilderRow
          icon={CheckCircleIcon}
          label="Conclusion"
          value="Changes detected"
          tone="warning"
        />

        <div className="space-y-2">
          <ActionRow channel="engineering" workspace="Acme" />
          <GhostSelect label="Add action..." />
        </div>
      </div>
    </Card>
  );
}

function GhostSelect(props: { label: string }) {
  const { label } = props;
  return (
    <div className="text-low rounded-md border border-dashed border-(--neutral-6) px-3 py-2 text-sm font-semibold">
      {label}
    </div>
  );
}

function ActionRow(props: { channel: string; workspace: string }) {
  const { channel, workspace } = props;
  return (
    <div className="bg-app space-y-2 rounded-md border px-3 py-2 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="grid size-6 place-items-center rounded bg-white shadow-sm">
          <Image src={slack} className="size-4" alt="" />
        </div>
        <div className="text-sm font-semibold">Send notification to Slack</div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <Pill tone="primary">{workspace} workspace</Pill>
        <Pill tone="neutral">#{channel}</Pill>
      </div>
    </div>
  );
}

function BuilderRow(props: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "primary" | "success" | "warning";
  disabled?: boolean;
}) {
  const { icon: Icon, label, value, tone, disabled } = props;
  const toneClass = tone
    ? {
        primary: "bg-(--primary-3) text-(--primary-11) border-(--primary-7)",
        success: "bg-(--success-3) text-(--success-11) border-(--success-7)",
        warning: "bg-(--amber-3) text-(--amber-11) border-(--amber-7)",
      }[tone]
    : "bg-(--neutral-2) text-(--neutral-11) border-(--neutral-7)";

  return (
    <div className="bg-app flex items-center justify-between gap-3 rounded-lg border px-3 py-2 shadow-xs">
      <div className="flex items-center gap-3">
        <span className="grid size-7 place-items-center rounded-full border bg-(--neutral-1) text-lg leading-none">
          <Icon className="size-4" />
        </span>
        <div className="text-sm font-semibold">{label}</div>
      </div>
      <span
        className={clsx(
          "inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
          tone
            ? toneClass
            : "border-(--neutral-7) bg-(--neutral-2) text-(--neutral-11)",
          disabled && "opacity-60",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Pill(props: {
  tone: "primary" | "neutral";
  children: React.ReactNode;
}) {
  const { tone, children } = props;
  const toneClass = {
    primary: "bg-(--primary-3) text-(--primary-11) border-(--primary-7)",
    neutral: "bg-(--neutral-2) text-(--neutral-11) border-(--neutral-7)",
  }[tone];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-2 py-1",
        toneClass,
      )}
    >
      {children}
    </span>
  );
}
