import clsx from "clsx";
import { CheckCircle2Icon, RefreshCwIcon, XCircleIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cypress, playwright } from "@/app/assets/sdk/library";
import type { SDK } from "@/app/assets/sdk/types";
import { ThemeImage } from "@/components/ThemeImage";

import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { DotIndicator } from "../../common/DotIndicator";
import { Title } from "../../common/Title";

const retries = [
  {
    label: "Retry #1 · checkout.spec.ts",
    status: "fail" as const,
    note: "Timed out waiting for .pay-button",
  },
  {
    label: "Retry #2 · checkout.spec.ts",
    status: "pass" as const,
    note: "Page stabilized after retry",
  },
];

const screenshots = [
  {
    label: "Retry #1 · failure",
    status: "fail" as const,
    caption: "404 page shown instead of checkout",
    footer: "Captured at 10:12",
  },
  {
    label: "Retry #2 · pass",
    status: "pass" as const,
    caption: "Checkout renders with totals and CTA",
    footer: "Captured at 10:16",
  },
];

export function RetryScreenshots() {
  return (
    <div className="relative mx-auto w-full max-w-4xl p-5">
      <Line
        className={clsx(
          "absolute top-1/2 left-1/2 z-0 size-75 -translate-1/2",
          "animate-fade-in motion-reduce:animate-fade-in animate-delay-500 animate-duration-500 fill-mode-both",
        )}
      />

      <div className="relative flex flex-col gap-10 lg:flex-row">
        <Card
          className={clsx(
            "relative z-10 flex flex-1 flex-col gap-4 p-4 md:p-5",
            "animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SDKBubble sdk={playwright} />
              <SDKBubble sdk={cypress} />
            </div>
            <Badge className="items-center gap-1.5 text-[11px]">
              <RefreshCwIcon className="size-3" />
              Auto-retry enabled
            </Badge>
          </div>

          <div className="space-y-2">
            {retries.map((retry) => (
              <RetryRow key={retry.label} {...retry} />
            ))}
          </div>
        </Card>

        <Card
          className={clsx(
            "relative z-10 flex-1 space-y-4 overflow-hidden border bg-[linear-gradient(220deg,--alpha(var(--success-2)/70%),var(--neutral-1))] p-5 shadow-md",
            "animate-fade-in-right motion-reduce:animate-fade-in animate-delay-250 animate-duration-500 fill-mode-both",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Title>
              <DotIndicator variant="success" />
              Compare retries
            </Title>
            <Badge className="items-center gap-1.5">
              <RefreshCwIcon className="size-3" />
              Same scenario · different outcome
            </Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {screenshots.map((screenshot) => (
              <ScreenshotCard key={screenshot.label} {...screenshot} />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-(--neutral-11)">
            <span>Build #214 · Screenshots pinned</span>
            <span className="font-semibold text-(--success-10)">
              Stable after retry
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SDKBubble(props: { sdk: SDK }) {
  return (
    <div className="bg-app flex size-11 items-center justify-center rounded-full border">
      <ThemeImage
        src={props.sdk.logo}
        alt={props.sdk.name}
        className="size-6"
      />
    </div>
  );
}

function RetryRow(props: {
  label: string;
  status: "pass" | "fail";
  note: string;
}) {
  const { label, status, note } = props;
  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium",
        {
          fail: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
          pass: "bg-app border-(--success-7) text-(--success-11)",
        }[status],
      )}
    >
      {
        {
          fail: <XCircleIcon className="mt-0.5 size-4" />,
          pass: <CheckCircle2Icon className="mt-0.5 size-4" />,
        }[status]
      }
      <div className="min-w-0 flex-1">
        <div className="truncate">{label}</div>
        <div className="text-low text-[11px] font-normal">{note}</div>
      </div>
      <span
        className={clsx(
          "text-[11px] font-semibold",
          { fail: "text-(--danger-10)", pass: "text-(--success-10)" }[status],
        )}
      >
        Screenshot
      </span>
    </div>
  );
}

function ScreenshotCard(props: {
  label: string;
  status: "pass" | "fail";
  caption: string;
  footer: string;
}) {
  const { label, status, caption, footer } = props;
  return (
    <div className="bg-app flex flex-col gap-2 rounded-lg border px-3 py-3 shadow-xs">
      <div className="flex items-center justify-between text-[11px] font-semibold text-(--neutral-12)">
        <span>{label}</span>
        <span
          className={clsx(
            "rounded-full px-2 py-0.5",
            {
              fail: "bg-(--danger-3) text-(--danger-10)",
              pass: "bg-(--success-3) text-(--success-10)",
            }[status],
          )}
        >
          {{ fail: "Failed", pass: "Passed" }[status]}
        </span>
      </div>

      <div
        className={clsx(
          "rounded-lg border px-3 py-3",
          {
            fail: "border-(--danger-7) bg-(--danger-2)",
            pass: "border-(--success-7) bg-(--success-2)",
          }[status],
        )}
      >
        <div className="flex items-center gap-2 text-xs font-medium">
          {
            {
              fail: (
                <XCircleIcon className="size-4 shrink-0 text-(--danger-10)" />
              ),
              pass: (
                <CheckCircle2Icon className="size-4 shrink-0 text-(--success-10)" />
              ),
            }[status]
          }
          {caption}
        </div>
        <div className="mt-3 space-y-2">
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-5/6" />
          <SkeletonLine className="w-2/3" />
        </div>
      </div>

      <div className="text-low text-[11px]">{footer}</div>
    </div>
  );
}

function SkeletonLine(props: { className?: string }) {
  return (
    <div
      className={clsx(
        "h-2.5 rounded-full bg-(--neutral-9)/18",
        props.className,
      )}
      aria-hidden="true"
    />
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
        stroke="var(--success-10)"
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
