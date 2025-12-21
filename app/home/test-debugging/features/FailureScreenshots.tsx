import clsx from "clsx";
import { CheckCircle2Icon, XCircleIcon, XIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cypress, playwright } from "@/app/assets/sdk/library";
import type { SDK } from "@/app/assets/sdk/types";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";

const scenarios = [
  { label: "Product → list page", status: "pass" as const },
  { label: "Product → detail page", status: "pass" as const },
  { label: "Product → checkout", status: "fail" as const },
  { label: "Settings → Account", status: "pass" as const },
];

export function FailureScreenshots() {
  return (
    <div className="relative mx-auto w-full max-w-4xl p-5">
      <Line className="absolute top-1/2 left-1/2 z-0 size-75 -translate-1/2" />
      <div className="relative flex gap-12">
        <Card className="relative z-10 flex flex-1 flex-col gap-4 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SDKBubble sdk={playwright} />
              <SDKBubble sdk={cypress} />
            </div>
            <Badge className="hidden text-[11px] md:inline-flex">
              Run #214 · 4 specs
            </Badge>
          </div>

          <div className="space-y-2">
            {scenarios.map((scenario) => (
              <ScenarioRow
                key={scenario.label}
                label={scenario.label}
                status={scenario.status}
              />
            ))}
          </div>

          <div className="text-low text-xs leading-relaxed">
            Argos captures a screenshot the instant a step fails, so you can see
            the exact UI state without rerunning the suite.
          </div>
        </Card>

        <Card className="relative z-10 flex-1 overflow-hidden border border-(--neutral-6) bg-[linear-gradient(180deg,--alpha(var(--neutral-2)/80%),--alpha(var(--neutral-1)/90%))] p-5 shadow-md">
          <div className="rounded-lg border border-(--neutral-6) bg-(--neutral-9)/12 px-3 py-2" />

          <div className="flex flex-col items-center gap-4 px-4 py-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-(--neutral-7) text-(--neutral-11)">
              <XIcon className="size-7" />
            </div>
            <div className="text-base font-semibold">Page not found</div>
            <div className="w-full space-y-2">
              <SkeletonLine className="w-4/5" />
              <SkeletonLine className="w-3/5" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-11/12" />
            <SkeletonLine className="w-10/12" />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-(--neutral-6) pt-3 text-[11px] text-(--neutral-11)">
            <span>Captured at 10:14 · Build #214</span>
            <span className="font-semibold text-(--danger-10)">
              Failure screenshot
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

function ScenarioRow(props: { label: string; status: "pass" | "fail" }) {
  const { label, status } = props;
  return (
    <div
      className={clsx(
        "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium",
        {
          fail: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
          pass: "bg-app border-(--success-7) text-(--success-11)",
        }[status],
      )}
    >
      {
        {
          fail: <XCircleIcon className="size-4" />,
          pass: <CheckCircle2Icon className="size-4" />,
        }[status]
      }
      <span className="flex-1">{label}</span>
      <span
        className={clsx(
          "text-[11px] font-semibold",
          { fail: "text-(--danger-10)", pass: "text-(--success-10)" }[status],
        )}
      >
        {{ fail: "Captured", pass: "Passed" }[status]}
      </span>
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
        stroke="var(--danger-10)"
        strokeWidth="2"
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
