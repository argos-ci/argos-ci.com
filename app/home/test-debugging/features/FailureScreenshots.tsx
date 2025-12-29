"use client";

import clsx from "clsx";
import { XIcon } from "lucide-react";

import { Card } from "@/components/Card";

export function FailureScreenshots() {
  return (
    <Card className="w-70 rotate-3">
      <div className="p-4">
        <div className="rounded-lg border-[0.5px] bg-(--neutral-3) px-3 py-2" />

        <div className="flex flex-col items-center gap-4 px-4 pt-2 text-center">
          <div className="text-low flex size-16 items-center justify-center rounded-full border">
            <XIcon className="size-7" />
          </div>
          <div className="text-base font-medium">Page not found</div>
          <div className="w-full space-y-2">
            <SkeletonLine className="w-4/5" />
            <SkeletonLine className="w-3/5" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-11/12" />
        </div>
      </div>

      <div className="text-xxs mt-5 flex items-center justify-between border-t-[0.5px] p-3 text-(--neutral-11)">
        <span>Build #214</span>
        <span className="font-semibold text-(--danger-10)">
          Failure screenshot
        </span>
      </div>
    </Card>
  );
}

function SkeletonLine(props: { className?: string }) {
  return (
    <div
      className={clsx(
        "h-2.5 rounded border-[0.5px] bg-(--neutral-3)",
        props.className,
      )}
      aria-hidden="true"
    />
  );
}
