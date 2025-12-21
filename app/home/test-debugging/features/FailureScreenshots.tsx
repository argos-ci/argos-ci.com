import clsx from "clsx";
import { CheckCircle2Icon, XCircleIcon, XIcon } from "lucide-react";

import { cypress, playwright } from "@/app/assets/sdk/library";
import type { SDK } from "@/app/assets/sdk/types";
import { ThemeImage } from "@/components/ThemeImage";

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
    <div className="relative mx-auto w-full max-w-4xl px-5">
      <div
        className="pointer-events-none absolute inset-x-3 top-6 bottom-2 rounded-[36px] bg-(--danger-2)/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative isolate gap-6">
        <Card
          className={clsx(
            "relative z-0 flex flex-1 flex-col gap-4 p-4 shadow-md md:p-5",
            "lg:w-full lg:max-w-[50%] lg:translate-y-4 lg:self-start lg:rounded-2xl",
            "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        >
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
        </Card>

        <Card
          className={clsx(
            "relative z-10 flex-1 overflow-hidden border bg-[linear-gradient(220deg,--alpha(var(--danger-1)/50%),var(--neutral-1))] p-5 shadow-lg",
            "lg:absolute lg:top-0 lg:right-0 lg:w-[50%] lg:translate-x-8 lg:-translate-y-3 lg:rotate-3 lg:rounded-2xl",
            "animate-slide-up-fade motion-reduce:animate-fade-in animate-delay-300 animate-duration-400 fill-mode-both",
          )}
        >
          <div className="rounded-lg border bg-(--neutral-9)/12 px-3 py-2" />

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

          <div className="mt-5 flex items-center justify-between border-t pt-3 text-[11px] text-(--neutral-11)">
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
