import { CornerDownRightIcon, MessagesSquareIcon } from "lucide-react";

import { ninaAvatar } from "@/app/assets/people/library";
import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

/**
 * The loop that makes uploads more than fire-and-forget: a reviewer pins a
 * comment to a point on the image, and the agent — which cannot see the
 * pixels — reads the coordinates back from the CLI, fixes, and resolves.
 *
 * Three moments stacked in one card: the pin on the image, the words that came
 * with it, and the terminal line the agent answers through. The coordinates
 * appear twice on purpose — under the comment and nowhere else in prose —
 * because "0.62, 0.34" is the whole trick: a spot a blind process can act on.
 */
export function PinnedFeedback() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <span className="font-mono text-xs font-medium">checkout.png</span>
        <Badge className="ml-auto gap-1 text-xxs">
          <MessagesSquareIcon className="size-3" />1 open thread
        </Badge>
      </div>
      {/* Cropped rather than scaled: the card has to fit the h-72 slot of
          FeatureGridFeature, and the story only needs the image's upper half —
          the pin, and the words about it. */}
      <div className="relative h-36 overflow-hidden bg-subtle px-3 pt-3">
        <ApplicationSVG className="w-full" withChanges="success" />
        {/* The pin, at the coordinates the comment quotes. */}
        <span className="absolute top-[34%] left-[58%]" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-(--plum-8) opacity-60" />
          <span className="relative grid size-4 place-items-center rounded-full border border-(--plum-8) bg-(--plum-9) text-xxxs font-semibold text-white shadow-xs">
            1
          </span>
        </span>
        <div className="absolute top-[48%] right-4 left-[38%] rounded-lg border-[0.5px] bg-app p-2 shadow-md/7 sm:left-[46%]">
          <div className="flex items-center gap-1.5">
            <ThemeImage
              src={ninaAvatar}
              alt=""
              className="size-4 shrink-0 rounded-full border object-cover"
            />
            <span className="text-xxs font-medium">Nina</span>
            <span className="text-xxxs text-low">pinned · 0.62, 0.34</span>
          </div>
          <p className="mt-1 text-xxs text-low">
            The primary button is misaligned here.
          </p>
        </div>
      </div>
      <div className="space-y-1.5 border-t-[0.5px] px-3 py-2.5 font-mono text-xxs">
        <div className="flex gap-1.5 text-low">
          <span aria-hidden className="shrink-0 text-(--plum-11)">
            $
          </span>
          <span>argos media comment list 4821</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CornerDownRightIcon className="size-3 shrink-0 text-low" />
          <span className="truncate text-low">Fixed in abc1234.</span>
          <Chip variant="success" className="ml-auto shrink-0 text-xxs">
            Resolved
          </Chip>
        </div>
      </div>
    </Card>
  );
}
