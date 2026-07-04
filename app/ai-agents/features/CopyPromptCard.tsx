"use client";

import { ClipboardCheckIcon } from "lucide-react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { SmallTitle } from "@/components/Typography";

export function CopyPromptCard() {
  return (
    <Card
      shadow="high"
      className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <ArgosEmblem className="size-4 text-(--violet-11)" />
        <SmallTitle>Build #1234 · snkr-shop</SmallTitle>
        <Badge className="text-xxs ml-auto gap-1 border-(--violet-7) text-(--violet-11)">
          <ClipboardCheckIcon className="size-3" />
          Copy prompt
        </Badge>
      </div>
      <div className="text-xxs space-y-1.5 p-4 font-mono leading-relaxed">
        <div className="text-low"># Review this Argos build</div>
        <div>
          <span className="text-(--violet-11)">build:</span>{" "}
          argos-ci.com/…/builds/1234
        </div>
        <div>
          <span className="text-(--violet-11)">pr:</span> feat/checkout — “Add
          wallet payments”
        </div>
        <div>
          <span className="text-(--violet-11)">changed:</span> 3 snapshots · 1
          text diff
        </div>
        <div className="text-low pt-1">
          Compare each diff against the PR intent and approve or request changes.
        </div>
      </div>
    </Card>
  );
}
