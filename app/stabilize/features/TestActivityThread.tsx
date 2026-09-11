"use client";

import {
  BellIcon,
  CornerDownRightIcon,
  MessagesSquareIcon,
  WavesIcon,
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

/**
 * The Activity section of a test page: the test's own thread, separate from
 * any build review. It opens with when Argos first saw the test, then every
 * thread, oldest first, and a comment posts the moment it is sent.
 */
export function TestActivityThread() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <SmallTitle>
          <MessagesSquareIcon className="size-3" />
          Activity · cart total
        </SmallTitle>
        <Badge className="gap-1 border-(--primary-7) text-xxs text-(--primary-11)">
          <BellIcon className="size-3" />
          Following
        </Badge>
      </div>
      <div className="space-y-3 p-3">
        <div className="flex items-center gap-2 text-xxs text-low max-sm:hidden">
          <WavesIcon className="size-3 shrink-0" />
          Argos first saw this test 4 months ago, in build #2838.
        </div>
        <div className="flex gap-2.5">
          <Avatar src={ninaAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Nina</span>
              <span className="text-xxs text-low">3 days ago</span>
            </div>
            <p className="mt-0.5 text-xs text-low">
              Flaky since we added the carousel. Waiting on the upstream fix,{" "}
              <span className="text-(--primary-11)">@andrew</span> fyi.
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge className="text-xxs">👍 2</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 pl-4">
          <CornerDownRightIcon className="mt-1 size-3 shrink-0 text-low" />
          <Avatar src={andrewAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Andrew</span>
              <span className="text-xxs text-low">just now</span>
            </div>
            <p className="mt-0.5 text-xs text-low">
              Ignored the recurring change until it lands. Anything new still
              shows.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-[0.5px] px-3 py-2">
        <div className="rounded-md border-[0.5px] bg-subtle px-2.5 py-1.5 text-xs text-low">
          Comment on this test…{" "}
          <span className="font-mono text-default">/</span> for commands,{" "}
          <span className="font-mono text-default">@</span> to mention
        </div>
      </div>
    </Card>
  );
}
