"use client";

import { ArrowRightIcon, GitMergeIcon, GlobeIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";

/**
 * Preview on the pull request, production on the domain you own. The preview
 * shows its branch URL (`<project>-<branch>-<account>.argos-ci.live`), the
 * one that follows the pull request as it evolves. The two cards sit side by
 * side and stack on narrow screens, where the arrow turns downward.
 */
export function EnvironmentPromotion() {
  return (
    <div className="flex w-full max-w-lg items-center justify-center gap-3 max-sm:flex-col md:gap-4">
      <Card className="w-full min-w-0 flex-1 animate-slide-up-fade p-3 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in sm:p-4">
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <Badge className="gap-1 border-(--teal-7) text-xxs text-(--teal-11)">
            <DotIndicator variant="success" />
            Preview
          </Badge>
          <span className="truncate text-xs text-low">feat/checkout</span>
        </div>
        <div className="font-mono text-xs break-words">
          storybook-feat-checkout-acme.argos-ci.live
        </div>
        <div className="mt-2 text-xxs text-low sm:mt-3">
          Branch URL, follows the pull request
        </div>
      </Card>
      <div className="flex items-center gap-1 text-(--primary-11) sm:flex-col">
        <GitMergeIcon className="size-4" />
        <ArrowRightIcon className="size-4 max-sm:rotate-90" />
      </div>
      <Card
        shadow="high"
        className="w-full min-w-0 flex-1 animate-slide-up-fade border-(--primary-6) p-3 animate-delay-150 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in sm:p-4"
      >
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <Badge className="gap-1 border-(--primary-7) text-xxs text-(--primary-11)">
            <GlobeIcon className="size-3" />
            Production
          </Badge>
          <span className="truncate text-xs text-low">main</span>
        </div>
        <div className="font-mono text-xs break-words">storybook.acme.com</div>
        <div className="mt-2 text-xxs text-low sm:mt-3">
          Your domain, promoted on every merge
        </div>
      </Card>
    </div>
  );
}
