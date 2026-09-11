"use client";

import { CopyIcon, ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

/**
 * The deployment URL a pull request gets: `<project>-<random>-<account>` under
 * `argos-ci.live`, the shape documented in docs/learn/deployments/urls-and-domains.
 */
export function DeployUrlCard() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-4 py-2.5">
        <ArgosEmblem className="size-4 text-(--teal-11)" />
        <SmallTitle>Argos Deployment</SmallTitle>
        <Badge className="ml-auto gap-1 border-(--success-7) text-xxs text-(--success-11)">
          <DotIndicator variant="success" />
          Deployed
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 rounded-lg border-[0.5px] p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border-[0.5px] bg-app">
            <ThemeImage src={storybook.logo} alt="" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 text-xxs text-low uppercase">
              Preview · pull/482
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="break-words text-(--teal-11)">
                storybook-gdhgxamjo-acme.argos-ci.live
              </span>
              <ExternalLinkIcon className="size-3.5 shrink-0 text-low" />
            </div>
          </div>
          <CopyIcon className="size-4 shrink-0 text-low max-sm:hidden" />
        </div>
        <div className="flex items-center justify-between gap-3 px-1 text-xs text-low">
          <span>Immutable URL, always this build</span>
          <span className="flex items-center gap-1 font-mono text-xxs">
            <GitBranchIcon className="size-3" />
            feat/checkout
          </span>
        </div>
      </div>
    </Card>
  );
}
