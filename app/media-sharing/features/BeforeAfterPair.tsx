import { GlobeIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

import { Storefront } from "./Storefront";

/**
 * The share page with a before/after pair, compressed to its essentials: the
 * mono filename header the real page uses, the two panes labelled by state,
 * and — in the footer — the naming trick that produced them. The two file
 * names are the feature: suffix a name with `-before`/`-after` and the pair
 * shares one identity, one link, one comment row.
 *
 * This is the live example's actual pair — sneakers-listing.png from
 * snkr-shop#5 — so the "See it live" action under the card opens the page
 * this drawing compresses, in the same compare view. The pill says "Public
 * link" rather than the Pro default "Team only" for the same reason: the
 * page it opens is public, and a visitor should not be told otherwise.
 */
export function BeforeAfterPair() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <span className="min-w-0 truncate font-mono text-xs font-medium">
          sneakers-listing.png
        </span>
        <span className="font-mono text-xxs text-low max-sm:hidden">
          2880x2160
        </span>
        <Chip icon={GlobeIcon} className="ml-auto shrink-0 text-xxs">
          Public link
        </Chip>
      </div>
      <div className="grid grid-cols-2 divide-x-[0.5px] bg-subtle">
        <Pane label="Before">
          <Storefront variant="before" />
        </Pane>
        <Pane label="After">
          <Storefront variant="after" />
        </Pane>
      </div>
      {/* The naming trick that produced the pair, and nothing else: the old
          "one link, synced zoom" tag duplicated the copy under the card and
          its space is what let the second file name truncate away. */}
      <div className="flex items-center border-t-[0.5px] px-3 py-2 text-xxs">
        <span className="truncate font-mono text-low">
          sneakers-listing-<span className="text-(--plum-11)">before</span>.png
          · sneakers-listing-<span className="text-(--plum-11)">after</span>
          .png
        </span>
      </div>
    </Card>
  );
}

function Pane(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <span className="text-xxxs font-medium tracking-wide text-low uppercase">
        {props.label}
      </span>
      {props.children}
    </div>
  );
}
