import clsx from "clsx";
import { WavesIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

export function FlakyIndicatorScreenshotIllustration() {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 text-xs",
        "animate-fade-in motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
      )}
    >
      <Card
        className={clsx(
          "flex max-w-sm flex-col gap-2 p-3",
          "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
        shadow="high"
      >
        <div className="flex items-center gap-1.5 font-medium">
          <WavesIcon className="size-4 text-(--danger-10)" />
          Test is flaky
        </div>
        <p>
          <strong className="font-medium">4 / 28 auto-approved builds</strong>
           showed exactly the same change in the last 7 days.
        </p>
      </Card>
      <Chip icon={WavesIcon} variant="danger">
        4 / 28
      </Chip>
    </div>
  );
}
