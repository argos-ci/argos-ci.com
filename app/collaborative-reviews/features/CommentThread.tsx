"use client";

import clsx from "clsx";
import {
  CheckCircle2Icon,
  CornerDownRightIcon,
  MessageSquareIcon,
} from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { SmallTitle } from "@/components/Typography";

function Avatar(props: { initials: string; className?: string }) {
  return (
    <span
      className={clsx(
        "grid size-6 shrink-0 place-items-center rounded-full border-[0.5px] text-[0.6rem] font-semibold",
        props.className,
      )}
    >
      {props.initials}
    </span>
  );
}

export function CommentThread() {
  return (
    <Card
      shadow="high"
      className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <SmallTitle>
          <MessageSquareIcon className="size-3" />
          Header.tsx · line 42
        </SmallTitle>
        <Badge className="text-xxs gap-1 border-(--success-7) text-(--success-11)">
          <CheckCircle2Icon className="size-3" />
          Resolve
        </Badge>
      </div>
      <div className="space-y-3 p-3">
        <div className="flex gap-2.5">
          <Avatar
            initials="JD"
            className="bg-(--primary-3) text-(--primary-11)"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Jane</span>
              <span className="text-low text-xxs">2m ago</span>
            </div>
            <p className="text-low mt-0.5 text-xs">
              The logo shifted 4px right here. Intended? <br />
              <span className="text-(--primary-11)">@sam</span> can you confirm?
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge className="text-xxs">👍 2</Badge>
              <Badge className="text-xxs">🎉 1</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 pl-4">
          <CornerDownRightIcon className="text-low mt-1 size-3 shrink-0" />
          <Avatar initials="SM" className="bg-(--teal-3) text-(--teal-11)" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Sam</span>
              <span className="text-low text-xxs">just now</span>
            </div>
            <p className="text-low mt-0.5 text-xs">
              Good catch, pushing a fix now.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-[0.5px] px-3 py-2">
        <div className="text-low bg-subtle rounded-md border-[0.5px] px-2.5 py-1.5 text-xs">
          Reply, or type <span className="font-mono text-default">/</span> for
          commands…
        </div>
      </div>
    </Card>
  );
}
