"use client";

import {
  CheckCircle2Icon,
  CornerDownRightIcon,
  MessageSquareIcon,
} from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

function Avatar(props: { src: ThemeImageProps["src"] }) {
  return (
    <ThemeImage
      src={props.src}
      alt=""
      className="size-6 shrink-0 rounded-full border object-cover"
    />
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
          <Avatar src={ninaAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Nina</span>
              <span className="text-low text-xxs">2m ago</span>
            </div>
            <p className="text-low mt-0.5 text-xs">
              The logo shifted 4px right here. Intended? <br />
              <span className="text-(--primary-11)">@andrew</span> can you
              confirm?
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge className="text-xxs">👍 2</Badge>
              <Badge className="text-xxs">🎉 1</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 pl-4">
          <CornerDownRightIcon className="text-low mt-1 size-3 shrink-0" />
          <Avatar src={andrewAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Andrew</span>
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
