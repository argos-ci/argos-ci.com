"use client";

import { ArrowRightIcon, GitMergeIcon, GlobeIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";

export function EnvironmentPromotion() {
  return (
    <div className="flex w-full max-w-lg items-center justify-center gap-3 md:gap-4">
      <Card className="flex-1 animate-slide-up-fade p-4 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in">
        <Badge className="mb-3 gap-1 border-(--teal-7) text-xxs text-(--teal-11)">
          <DotIndicator variant="success" />
          Preview
        </Badge>
        <div className="mb-1 text-xs text-low">feat/checkout</div>
        <div className="truncate font-mono text-xs">pr-482.acme.argos.app</div>
        <div className="mt-3 text-xxs text-low">
          A fresh URL per pull request
        </div>
      </Card>
      <div className="flex flex-col items-center gap-1 text-(--primary-11)">
        <GitMergeIcon className="size-4" />
        <ArrowRightIcon className="size-4" />
      </div>
      <Card
        shadow="high"
        className="flex-1 animate-slide-up-fade border-(--primary-6) p-4 animate-delay-150 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
      >
        <Badge className="mb-3 gap-1 border-(--primary-7) text-xxs text-(--primary-11)">
          <GlobeIcon className="size-3" />
          Production
        </Badge>
        <div className="mb-1 text-xs text-low">main</div>
        <div className="truncate font-mono text-xs">storybook.acme.com</div>
        <div className="mt-3 text-xxs text-low">
          Stable domain on every merge
        </div>
      </Card>
    </div>
  );
}
