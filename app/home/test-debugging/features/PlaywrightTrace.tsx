"use client";

import clsx from "clsx";
import { ArrowUpRightIcon, BugPlayIcon, PlayCircleIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { playwright } from "@/app/assets/brands/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

const events = [
  {
    label: "beforeEach: sign in",
    detail: 'page.goto("/dashboard")',
    duration: "2.1s",
    status: "success" as const,
  },
  {
    label: "cart.spec.ts → checkout",
    detail: 'page.click("Pay now")',
    duration: "0.8s",
    status: "success" as const,
  },
  {
    label: "assertions",
    detail: "expect(locator).toBeVisible()",
    duration: "failed",
    status: "danger" as const,
  },
];

const timeline = [
  { label: "Render product card", at: "00:03.4" },
  { label: "Click checkout CTA", at: "00:08.1" },
  { label: "Network call /charge", at: "00:10.0" },
  { label: "Expectation failed", at: "00:12.6", variant: "danger" as const },
];

export function PlaywrightTrace() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-row gap-12 p-4">
      <Line
        className={clsx(
          "absolute top-1/2 left-1/2 z-0 hidden size-75 -translate-1/2 sm:block",
          "animate-fade-in motion-reduce:animate-fade-in animate-delay-500 animate-duration-500 fill-mode-both",
        )}
      />

      <Card
        className={clsx(
          "relative z-10 flex-1 space-y-3 p-4",
          "animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-app flex size-12 shrink-0 items-center justify-center rounded-full border">
              <ThemeImage
                src={playwright.logo}
                alt="Playwright"
                className="size-7"
              />
            </div>
            <div>
              <div className="text-sm font-semibold">Playwright Trace</div>
              <div className="text-low text-xs">
                Argos attaches the trace to every failing run.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="items-center gap-1.5">
            <DotIndicator variant="success" />
            Uploaded · Build #214
          </Badge>
          <Badge className="items-center gap-1.5">
            <DotIndicator variant="primary" />
            1-click replay in Argos
          </Badge>
        </div>

        <div className="hidden space-y-2 md:block">
          {events.map((event) => (
            <TraceEvent key={event.label} {...event} />
          ))}
        </div>
        <div>
          <TraceButton />
        </div>
      </Card>

      <Card
        className={clsx(
          "relative z-10 hidden flex-1 space-y-3 overflow-hidden border bg-[linear-gradient(220deg,--alpha(var(--primary-2)/80%),var(--neutral-1))] p-4 sm:block",
          "animate-fade-in-right motion-reduce:animate-fade-in animate-delay-250 animate-duration-500 fill-mode-both",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <SmallTitle>
            <DotIndicator variant="primary" />
            Trace viewer
          </SmallTitle>
          <Badge className="items-center gap-1.5">
            <ArrowUpRightIcon className="text-low size-3" />
            Open in new tab
          </Badge>
        </div>

        <div className="bg-app rounded-lg border-[0.5px] shadow-xs">
          <div className="text-xxs flex items-center justify-between border-b-[0.5px] px-3 py-2 text-(--neutral-11)">
            <span>trace.zip · checkout.spec.ts</span>
            <span className="font-semibold text-(--primary-10)">Replay</span>
          </div>
          <div className="flex flex-col gap-3 px-3 py-4">
            <div className="bg-app text-xxs rounded-md border px-3 py-2 text-(--neutral-11)">
              <div className="flex items-center justify-between font-semibold text-(--neutral-12)">
                Screenshot at failure
                <span className="text-(--danger-10)">Failed</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <PlayCircleIcon className="size-4 text-(--primary-10)" />
                <div className="h-1 w-full rounded-full bg-(--neutral-6)">
                  <div className="h-1 w-2/3 rounded-full bg-(--primary-9)" />
                </div>
                <span className="text-xxs font-semibold text-(--neutral-11)">
                  00:12.6
                </span>
              </div>
            </div>

            <div className="bg-app grid gap-2 rounded-md border border-(--neutral-6) p-3">
              {timeline.map((item) => (
                <TimelineRow key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TraceEvent(props: {
  label: string;
  detail: string;
  duration: string;
  status: "success" | "danger";
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm font-medium",
        {
          success: "bg-app border-(--success-7) text-(--success-11)",
          danger: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
        }[props.status],
      )}
    >
      <DotIndicator
        variant={props.status === "danger" ? "danger" : "success"}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate">{props.label}</div>
        <div className="text-low text-xxs font-normal">{props.detail}</div>
      </div>
      <span className="text-xxs font-semibold tracking-wide uppercase">
        {props.duration}
      </span>
    </div>
  );
}

function TimelineRow(props: { label: string; at: string; variant?: "danger" }) {
  return (
    <div className="flex items-center gap-2 rounded text-xs font-medium text-(--neutral-12)">
      <DotIndicator
        variant={props.variant === "danger" ? "danger" : "primary"}
      />
      <div className="flex-1 truncate">{props.label}</div>
      <span
        className={clsx("text-xxs font-semibold", {
          "text-(--danger-10)": props.variant === "danger",
          "text-(--primary-10)": props.variant !== "danger",
        })}
      >
        {props.at}
      </span>
    </div>
  );
}

function TraceButton() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-(--primary-7) bg-(--primary-2) px-3 py-1.5 text-xs font-medium text-(--primary-11) shadow-xs">
      <BugPlayIcon className="size-4" />
      Run Trace
      <ArrowUpRightIcon className="size-3" />
    </div>
  );
}

function Line(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 300 300"
      className={clsx("pointer-events-none", props.className)}
      aria-hidden="true"
    >
      <path
        d="M 0 150 C 180 150 205 150 300 150"
        fill="none"
        stroke="var(--primary-10)"
        strokeWidth="1"
        strokeLinecap="square"
        strokeDasharray="2 5"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-49"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
