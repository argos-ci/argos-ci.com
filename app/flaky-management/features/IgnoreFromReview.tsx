import { FlagOffIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Chip } from "@/components/Chip";

export function IgnoreFromReviewIllustration() {
  return (
    <div className="text-xxs relative flex w-full flex-col gap-3 p-3">
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
      </Chip>
      <Chip icon={ThumbsUpIcon} variant="success" />
      <Chip icon={ThumbsDownIcon} variant="danger" />
    </div>
  );
}
