"use client";

import { ArrowRightIcon, GitMergeIcon, GlobeIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";

export function EnvironmentPromotion() {
  return (
    <div className="flex w-full max-w-lg items-center justify-center gap-3 md:gap-4">
      <Card className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both flex-1 p-4">
        <Badge className="text-xxs mb-3 gap-1 border-(--teal-7) text-(--teal-11)">
          <DotIndicator variant="success" />
          Preview
        </Badge>
        <div className="text-low mb-1 text-xs">feat/checkout</div>
        <div className="truncate font-mono text-xs">pr-482.acme.argos.app</div>
        <div className="text-low mt-3 text-xxs">
          A fresh URL per pull request
        </div>
      </Card>
      <div className="flex flex-col items-center gap-1 text-(--primary-11)">
        <GitMergeIcon className="size-4" />
        <ArrowRightIcon className="size-4" />
      </div>
      <Card
        shadow="high"
        className="animate-slide-up-fade motion-reduce:animate-fade-in animate-delay-150 animate-duration-500 fill-mode-both flex-1 border-(--primary-6) p-4"
      >
        <Badge className="text-xxs mb-3 gap-1 border-(--primary-7) text-(--primary-11)">
          <GlobeIcon className="size-3" />
          Production
        </Badge>
        <div className="text-low mb-1 text-xs">main</div>
        <div className="truncate font-mono text-xs">storybook.acme.com</div>
        <div className="text-low mt-3 text-xxs">
          Stable domain on every merge
        </div>
      </Card>
    </div>
  );
}
