"use client";
import clsx from "clsx";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ApplicationSVG } from "./common/ApplicationSVG";
import { Card } from "./common/Card";

export function FastApprovalFlow() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8">
      <CardStack />
      <ActionRow />
    </div>
  );
}

function CardStack() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[75%]">
        <div className="absolute inset-0 translate-y-7 scale-[0.96] -rotate-4">
          <SwipeCard tone="idle" />
        </div>

        <div className="absolute inset-0 translate-y-3 scale-[0.98] rotate-4">
          <SwipeCard tone="idle" />
        </div>

        <div className="animate-nudge-right relative z-10">
          <SwipeCard tone="active" />
          <div
            className="animate-green-pulse pointer-events-none absolute inset-0 z-20 rounded-xl bg-(--success-9)"
            aria-hidden="true"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 -bottom-4 mx-auto h-12 w-[86%] rounded-full bg-black/7 blur-xl"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function SwipeCard(props: { tone: "active" | "idle" }) {
  const { tone } = props;
  return (
    <Card
      className={clsx(
        "flex flex-col p-4",
        { active: "shadow-sm", idle: "shadow-xs" }[tone],
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <ViewportLabel tone="baseline" />
          <ApplicationSVG />
        </div>
        <div className="flex flex-col gap-4">
          <ViewportLabel tone="changes" />
          <ApplicationSVG withChanges />
        </div>
      </div>
    </Card>
  );
}

function ViewportLabel(props: { tone: "baseline" | "changes" }) {
  const { tone } = props;
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold",
        { baseline: "border-(--neutral-6)", changes: "border-(--danger-6)" }[
          tone
        ],
      )}
    >
      <span
        className={clsx(
          "size-1.5 rounded-full",
          { baseline: "border-(--neutral-9)", changes: "border-(--danger-9)" }[
            tone
          ],
        )}
        aria-hidden="true"
      />
      {{ baseline: "Baseline", changes: "Changes" }[tone]}
    </div>
  );
}

function ActionRow() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-8">
        <ActionButton variant="down" icon={ThumbsDownIcon} kbd="N" />
        <ActionButton variant="up" icon={ThumbsUpIcon} kbd="Y" />
      </div>
    </div>
  );
}

function ActionButton(props: {
  variant: "up" | "down";
  icon: LucideIcon;
  kbd: "Y" | "N";
}) {
  const { variant, kbd } = props;
  return (
    <div className="relative">
      {variant === "up" ? (
        <div className="animate-green-pulse absolute size-14 rounded-full bg-(--success-9)" />
      ) : null}
      <div
        className={clsx(
          "bg-app grid size-14 place-items-center rounded-full border shadow-xs",
          {
            up: "border-(--success-9)/25 bg-(--success-9)/10 text-(--success-9)",
            down: "border-(--danger-9)/25 bg-(--danger-9)/10 text-(--danger-9)",
          }[variant],
        )}
        aria-hidden="true"
      >
        {/* <Icon className="size-5" /> */}
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <kbd
          className={clsx(
            "inline-flex size-6 items-center justify-center rounded border-[0.5px] border-b-2 p-1 font-mono text-[11px] font-semibold",
            "bg-app text-low/80",
          )}
        >
          {kbd}
        </kbd>
      </div>
    </div>
  );
}
