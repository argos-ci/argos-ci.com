import clsx from "clsx";
import type React from "react";

import { Card } from "@/app/home/common/Card";
import { ArgosEmblem } from "@/components/ArgosEmblem";

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
    <Card className="overflow-hidden border shadow-lg">
      <div className="border-b-[0.5px] px-3 py-1.5 text-sm font-semibold">
        Automations builder
      </div>

      <div className="space-y-4 p-4">
        <Field label="Automation rule name">
          <Input value="Notify when a build has changes" />
        </Field>

        <Section label="When">
          <Checkbox label="Build completed" checked />
          <Checkbox label="Build reviewed" />
        </Section>

        <Section label="If">
          <SelectRow
            label="Build conclusion is"
            value="Changes detected"
            tone="warning"
          />
          <SelectRow
            label="Build type is"
            value="Auto-approved"
            tone="success"
          />
          <GhostSelect label="Add optional condition..." />
        </Section>

        <Section label="Then">
          <ActionRow channel="notif-tech-production" workspace="Acme" />
          <GhostSelect label="Add action..." />
        </Section>
      </div>
    </Card>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props;
  return (
    <label className="flex flex-col gap-1">
      <span className="text-low text-xs">{label}</span>
      {children}
    </label>
  );
}

function Input(props: { value: string }) {
  const { value } = props;
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm font-semibold shadow-xs">
      <span className="truncate">{value}</span>
    </div>
  );
}

function Section(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props;
  return (
    <div className="space-y-2 rounded-lg border bg-(--neutral-1) p-3 shadow-xs">
      <SectionBadge>{label}</SectionBadge>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SectionBadge(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-(--primary-3) px-2 py-1 text-[11px] font-semibold tracking-[0.06em] text-(--primary-11) uppercase">
      <span className="size-2 rounded-full bg-(--primary-9)" aria-hidden />
      {children}
    </span>
  );
}

function Checkbox(props: { label: string; checked?: boolean }) {
  const { label, checked } = props;
  return (
    <div className="bg-app flex items-center gap-3 rounded-md border px-3 py-2 text-sm font-semibold shadow-xs">
      <span
        className={clsx(
          "grid size-4 place-items-center rounded border",
          checked
            ? "border-(--primary-8) bg-(--primary-10) text-white"
            : "border-(--neutral-7) bg-(--neutral-1)",
        )}
      >
        {checked && "✓"}
      </span>
      <span className={checked ? "text-(--neutral-12)" : "text-low"}>
        {label}
      </span>
    </div>
  );
}

function SelectRow(props: {
  label: string;
  value: string;
  tone: "success" | "warning";
}) {
  const { label, value, tone } = props;
  const toneClass = {
    success: "bg-(--success-3) text-(--success-11) border-(--success-7)",
    warning: "bg-(--amber-3) text-(--amber-11) border-(--amber-7)",
  }[tone];
  return (
    <div className="bg-app flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm font-semibold shadow-xs">
      <span>{label}</span>
      <span
        className={clsx(
          "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs",
          toneClass,
        )}
      >
        {value}
      </span>
    </div>
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
          <SlackMark />
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

function TextButton(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <button className="text-sm font-semibold text-(--primary-10) underline decoration-1 underline-offset-2 transition hover:text-(--primary-11)">
      {children}
    </button>
  );
}

function GhostPill(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="rounded-lg border border-(--neutral-6) px-3 py-2 text-xs font-semibold text-(--neutral-11)">
      {children}
    </span>
  );
}

function PrimaryPill(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="rounded-lg bg-(--primary-10) px-3 py-2 text-xs font-semibold text-white shadow">
      {children}
    </span>
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

function SlackMark() {
  return (
    <div className="relative size-4">
      <span className="absolute top-[6px] left-0 h-[5px] w-[10px] rounded-full bg-[#36C5F0]" />
      <span className="absolute top-0 left-[6px] h-[10px] w-[5px] rounded-full bg-[#2EB67D]" />
      <span className="absolute top-[6px] right-0 h-[5px] w-[10px] rounded-full bg-[#E01E5A]" />
      <span className="absolute bottom-0 left-[6px] h-[10px] w-[5px] rounded-full bg-[#ECB22E]" />
    </div>
  );
}
