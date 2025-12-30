import clsx from "clsx";
import { CheckCircle2Icon, RefreshCwIcon, XCircleIcon } from "lucide-react";

import { cypress, playwright } from "@/app/assets/brands/library";
import type { Brand } from "@/app/assets/brands/types";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ThemeImage } from "@/components/ThemeImage";

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

export function RetryScreenshotsLeftIllustration() {
  return (
    <Card className="relative z-10 flex flex-col gap-4 border p-4 shadow-lg backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SDKBubble sdk={playwright} />
          <SDKBubble sdk={cypress} />
        </div>
        <Badge className="text-xxs items-center gap-1.5">
          <RefreshCwIcon className="text-low size-3" />
          Retry enabled
        </Badge>
      </div>

      <div className="space-y-2">
        {retries.map((retry) => (
          <RetryRow key={retry.label} {...retry} />
        ))}
      </div>
    </Card>
  );
}

function SDKBubble(props: { sdk: Brand }) {
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
        "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-xs font-medium shadow-xs",
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
        <div className="text-low text-xxs font-normal">{note}</div>
      </div>
      <span
        className={clsx(
          "text-xxs font-semibold",
          { fail: "text-(--danger-10)", pass: "text-(--success-10)" }[status],
        )}
      >
        Screenshot
      </span>
    </div>
  );
}
