import { LockIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

/**
 * The share page with a before/after pair, compressed to its essentials: the
 * mono filename header the real page uses, the two panes labelled by state,
 * and — in the footer — the naming trick that produced them. The two file
 * names are the feature: suffix a name with `-before`/`-after` and the pair
 * shares one identity, one link, one comment row.
 */
export function BeforeAfterPair() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <span className="font-mono text-xs font-medium">checkout.png</span>
        <span className="font-mono text-xxs text-low max-sm:hidden">
          1440x900 · 25 KB
        </span>
        <Chip icon={LockIcon} className="ml-auto text-xxs">
          Team only
        </Chip>
      </div>
      <div className="grid grid-cols-2 divide-x-[0.5px] bg-subtle">
        <Pane label="Before">
          <ApplicationSVG className="w-full" />
        </Pane>
        <Pane label="After">
          <ApplicationSVG className="w-full" withChanges="success" />
        </Pane>
      </div>
      <div className="flex items-center justify-between gap-2 border-t-[0.5px] px-3 py-2 text-xxs">
        <span className="truncate font-mono text-low">
          checkout-<span className="text-(--plum-11)">before</span>.png ·
          checkout-<span className="text-(--plum-11)">after</span>.png
        </span>
        <span className="shrink-0 text-low max-sm:hidden">
          one link, synced zoom
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
