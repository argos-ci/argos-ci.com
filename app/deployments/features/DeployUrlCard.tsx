"use client";

import { CopyIcon, ExternalLinkIcon } from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

export function DeployUrlCard() {
  return (
    <Card
      shadow="high"
      className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-4 py-2.5">
        <ArgosEmblem className="size-4 text-(--teal-11)" />
        <SmallTitle>Argos Deployment</SmallTitle>
        <Badge className="text-xxs ml-auto gap-1 border-(--success-7) text-(--success-11)">
          <DotIndicator variant="success" />
          Deployed
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 rounded-lg border-[0.5px] p-3">
          <span className="bg-app grid size-9 shrink-0 place-items-center rounded-md border-[0.5px]">
            <ThemeImage src={storybook.logo} alt="" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-low text-xxs mb-0.5 uppercase">
              Preview · pull/482
            </div>
            <div className="flex items-center gap-1.5 font-mono text-sm">
              <span className="truncate text-(--teal-11)">
                pr-482.acme.argos.app
              </span>
              <ExternalLinkIcon className="text-low size-3.5 shrink-0" />
            </div>
          </div>
          <CopyIcon className="text-low size-4 shrink-0" />
        </div>
        <div className="text-low flex items-center justify-between px-1 text-xs">
          <span>Immutable deployment URL</span>
          <span className="font-mono">dpl_9f3a…</span>
        </div>
      </div>
    </Card>
  );
}
