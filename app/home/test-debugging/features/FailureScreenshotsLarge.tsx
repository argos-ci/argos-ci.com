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
      className="w-80 max-w-full cursor-default overflow-hidden select-none"
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

      <div className="p-4">
        <div className="relative flex justify-center overflow-hidden rounded-lg border-[0.5px] bg-(--neutral-2) py-4">
          <ApplicationSVG withChanges className="h-36 w-auto" />
          <div className="absolute inset-x-0 top-2.5 flex justify-center">
            <span className="flex items-center gap-1.5 rounded-md bg-(--danger-9) px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <AlertTriangleIcon className="size-3" />
              Something went wrong
            </span>
          </div>
          <span className="bg-app text-low absolute right-2 bottom-2 flex items-center gap-1 rounded border-[0.5px] px-2 py-0.5 text-[0.625rem] font-medium">
            <CameraIcon className="size-3" />
            Captured on failure
          </span>
        </div>

        <div className="mt-3 rounded-md bg-(--danger-2) px-3 py-2 font-mono text-xs text-(--danger-11)">
          {"Error: expect(getByText('Order total')).toBeVisible()"}
        </div>

        <div className="mt-4 flex items-center gap-2">
          {ATTEMPTS.map((attempt, index) => (
            <div
              key={attempt.label}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1.5 rounded-lg border-[0.5px] p-2",
                index === 0
                  ? "border-(--danger-6) bg-(--danger-2)"
                  : "bg-(--neutral-2)",
              )}
            >
              <div className="flex w-full items-center justify-center overflow-hidden rounded bg-(--neutral-3) py-1.5">
                <ApplicationSVG withChanges className="h-8 w-auto opacity-80" />
              </div>
              <span className="text-low flex items-center gap-1 text-[0.625rem] font-medium">
                <XIcon className="size-2.5 text-(--danger-11)" />
                {attempt.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t-[0.5px] px-4 py-2.5 text-xs text-(--neutral-11)">
        <span>Build #214</span>
        <span className="text-low">Failed after 3 attempts</span>
      </div>
    </Card>
  );
}
