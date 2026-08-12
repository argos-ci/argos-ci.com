import { CornerDownRightIcon, MessagesSquareIcon } from "lucide-react";

import { ninaAvatar } from "@/app/assets/people/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

import { Storefront } from "./Storefront";

/**
 * The loop that makes uploads more than fire-and-forget: a reviewer pins a
 * comment to a point on the image, and the agent — which cannot see the
 * pixels — reads the coordinates back from the CLI, fixes, and resolves.
 *
 * Three moments stacked in one card: the pin on the image, the words that came
 * with it, and the terminal line the agent answers through. The coordinates
 * appear twice on purpose — under the comment and nowhere else in prose —
 * because "0.62, 0.34" is the whole trick: a spot a blind process can act on.
 *
 * The image is the live example's sneaker grid, so the story stays in one
 * universe across the page — and the demo media really does carry pinned,
 * resolved feedback in its activity log. This exact thread (Nina's, open) is
 * still staged, which is why the card's live link is the share page rather
 * than proof of this thread. The CLI line keeps the docs' numeric media id —
 * the share slug in the page URL is not what `media comment list` takes.
 */
export function PinnedFeedback() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <span className="min-w-0 truncate font-mono text-xs font-medium">
          sneakers-listing.png
        </span>
        <Badge className="ml-auto shrink-0 gap-1 text-xxs">
          <MessagesSquareIcon className="size-3" />1 open thread
        </Badge>
      </div>
      {/* Cropped rather than scaled: the card has to fit the h-72 slot of
          FeatureGridFeature, and the story only needs the grid's upper rows —
          the pin, and the words about it. Three storefront rows fill the crop;
          two would leave the card sitting in dead space. */}
      <div className="relative h-36 overflow-hidden bg-subtle px-3 pt-3">
        <Storefront variant="after" rows={3} className="w-full" />
        {/* The pin, at the coordinates the comment quotes — over the second
            row's add-to-cart button, the thing the comment complains about. */}
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
            Add to cart is misaligned on this card.
          </p>
        </div>
      </div>
      <div className="space-y-1.5 border-t-[0.5px] px-3 py-2.5 font-mono text-xxs">
        <div className="flex gap-1.5 text-low">
          <span aria-hidden className="shrink-0 text-(--plum-11)">
            $
          </span>
          <span className="truncate">argos media comment list 4821</span>
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
