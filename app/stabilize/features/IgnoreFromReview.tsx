import { FlagOffIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Chip } from "@/components/Chip";

export function IgnoreFromReviewIllustration() {
  return (
    <div className="relative flex w-full flex-col gap-3 p-3 text-xxs">
      <Toolbar />
      <div className="flex gap-2">
        <ApplicationSVG className="rounded border-[0.5px] shadow-md/5" />
        <ApplicationSVG
          withChanges
          className="rounded border-[0.5px] shadow-md/5"
        />
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="flex justify-center gap-1 text-sm">
      <Chip icon={FlagOffIcon} variant="primary">
        Ignore
        <kbd className="rounded-sm border-[0.5px] border-(--primary-7) px-1 font-mono text-[0.7em] leading-4">
          I
        </kbd>
      </Chip>
      <Chip icon={ThumbsUpIcon} variant="success" />
      <Chip icon={ThumbsDownIcon} variant="danger" />
    </div>
  );
}
