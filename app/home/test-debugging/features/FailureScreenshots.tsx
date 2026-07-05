"use client";

import { AlertTriangleIcon, CameraIcon, XIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

export function FailureScreenshots() {
  return (
    <Card
      shadow="high"
      className="w-64 rotate-2 overflow-hidden select-none"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-1.5">
        <SmallTitle>
          <DotIndicator variant="danger" />
          <span className="font-mono">checkout.spec.ts</span>
        </SmallTitle>
        <Badge className="text-xxs gap-1 border-(--danger-7) text-(--danger-11)">
          <XIcon className="size-3" />
          Failed
        </Badge>
      </div>

      <div className="p-2.5">
        <div className="relative flex justify-center overflow-hidden rounded-lg border-[0.5px] bg-(--neutral-2) py-2">
          <ApplicationSVG withChanges className="h-24 w-auto" />
          <div className="absolute inset-x-0 top-1.5 flex justify-center">
            <span className="flex items-center gap-1 rounded-md bg-(--danger-9) px-2 py-0.5 text-[0.5rem] font-semibold text-white shadow-sm">
              <AlertTriangleIcon className="size-2.5" />
              Something went wrong
            </span>
          </div>
          <span className="bg-app text-low absolute right-1.5 bottom-1.5 flex items-center gap-1 rounded border-[0.5px] px-1.5 py-0.5 text-[0.5rem] font-medium">
            <CameraIcon className="size-2.5" />
            Captured on failure
          </span>
        </div>
        <div className="mt-2 truncate rounded-md bg-(--danger-2) px-2 py-1 font-mono text-[0.5rem] text-(--danger-11)">
          {"Error: expect(getByText('Order total')).toBeVisible()"}
        </div>
      </div>

      <div className="text-xxs flex items-center justify-between border-t-[0.5px] px-3 py-1.5 text-(--neutral-11)">
        <span>Build #214</span>
        <span className="text-low">Attempt 1 of 3</span>
      </div>
    </Card>
  );
}
