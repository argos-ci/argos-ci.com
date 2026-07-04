"use client";

import clsx from "clsx";
import { AlertTriangleIcon, CameraIcon, XIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

const ATTEMPTS = [
  { label: "Attempt 1", state: "failed" as const },
  { label: "Attempt 2", state: "failed" as const },
  { label: "Attempt 3", state: "failed" as const },
];

export function FailureScreenshotsLarge() {
  return (
    <Card
      shadow="high"
      className="w-120 max-w-full cursor-default overflow-hidden select-none"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-4 py-2.5">
        <SmallTitle className="text-sm">
          <DotIndicator variant="danger" />
          <span className="font-mono">checkout.spec.ts</span>
        </SmallTitle>
        <Badge className="gap-1 border-(--danger-7) text-xs text-(--danger-11)">
          <XIcon className="size-3" />
          Failed
        </Badge>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1.4fr_1fr]">
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-[0.5px] bg-(--neutral-2) py-3">
          <ApplicationSVG withChanges className="h-28 w-auto" />
          <div className="absolute inset-x-0 top-2 flex justify-center">
            <span className="flex items-center gap-1.5 rounded-md bg-(--danger-9) px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <AlertTriangleIcon className="size-3" />
              Something went wrong
            </span>
          </div>
          <span className="bg-app text-low absolute right-2 bottom-2 flex items-center gap-1 rounded border-[0.5px] px-2 py-0.5 text-xxxs font-medium">
            <CameraIcon className="size-3" />
            Captured on failure
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-md bg-(--danger-2) px-3 py-2 font-mono text-xxxs leading-relaxed text-(--danger-11)">
            {"Error: expect(getByText('Order total')).toBeVisible()"}
          </div>
          <div className="flex flex-col gap-1.5">
            {ATTEMPTS.map((attempt, index) => (
              <div
                key={attempt.label}
                className={clsx(
                  "flex items-center gap-2 rounded-md border-[0.5px] px-2.5 py-1.5 text-xs",
                  index === 0
                    ? "border-(--danger-6) bg-(--danger-2)"
                    : "bg-(--neutral-2)",
                )}
              >
                <XIcon className="size-3 shrink-0 text-(--danger-11)" />
                <span className="font-medium">{attempt.label}</span>
                <span className="text-low ml-auto">Failed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t-[0.5px] px-4 py-2.5 text-xs text-(--neutral-11)">
        <span>Build #214</span>
        <span className="text-low">Failed after 3 attempts</span>
      </div>
    </Card>
  );
}
