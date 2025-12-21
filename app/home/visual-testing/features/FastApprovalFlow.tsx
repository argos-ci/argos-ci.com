import clsx from "clsx";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { Application } from "./common/Application";
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
          className="pointer-events-none absolute inset-x-0 -bottom-4 mx-auto h-12 w-[86%] rounded-[999px] bg-black/7 blur-xl"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function SwipeCard(props: { tone: "active" | "idle" }) {
  return (
    <Card
      className={clsx(
        "flex flex-col p-4",
        props.tone === "active" ? "shadow-sm" : "shadow-xs",
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <ViewportLabel tone="baseline" />
          <Application />
        </div>
        <div className="flex flex-col gap-4">
          <ViewportLabel tone="changes" />
          <Application withChanges />
        </div>
      </div>
    </Card>
  );
}

function ViewportLabel(props: { tone: "baseline" | "changes" }) {
  const isChanges = props.tone === "changes";

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold",
        isChanges ? "border-(--danger-6)" : "border-(--neutral-6)",
      )}
    >
      <span
        className={clsx(
          "size-1.5 rounded-full",
          isChanges ? "bg-(--danger-9)" : "bg-(--neutral-9)/35",
        )}
        aria-hidden="true"
      />
      {isChanges ? "Changes" : "Baseline"}
    </div>
  );
}

function ActionRow() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-8">
        <ActionButton
          variant="down"
          icon={<ThumbsDown className="h-5 w-5" />}
          kbd="N"
        />
        <ActionButton
          variant="up"
          icon={<ThumbsUp className="h-5 w-5" />}
          kbd="Y"
        />
      </div>
    </div>
  );
}

function ActionButton(props: {
  variant: "up" | "down";
  icon: React.ReactNode;
  kbd: "Y" | "N";
}) {
  return (
    <div className="relative">
      {props.variant === "up" && (
        <div className="animate-green-pulse absolute size-14 rounded-full bg-(--success-9)" />
      )}
      <div
        className={clsx(
          "bg-app grid size-14 place-items-center rounded-full border shadow-xs",
          {
            up: "border-(--success-9)/25 bg-(--success-9)/10 text-(--success-9)",
            down: "border-(--danger-9)/25 bg-(--danger-9)/10 text-(--danger-9)",
          }[props.variant],
        )}
        aria-hidden="true"
      >
        {props.icon}
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <kbd
          className={clsx(
            "inline-flex size-6 items-center justify-center rounded border-[0.5px] border-b-2 p-1 font-mono text-[11px] font-semibold",
            "bg-app text-low/80",
          )}
        >
          {props.kbd}
        </kbd>
      </div>
    </div>
  );
}
