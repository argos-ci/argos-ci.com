"use client";

import clsx from "clsx";
import { CheckIcon, WavesIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

export function FlakyIndicator() {
  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-8 p-4 text-sm">
      <div
        className={clsx(
          "flex flex-col items-center gap-3 self-start",
          "animate-fade-in motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <Card
          className={clsx(
            "flex max-w-sm flex-col gap-2 p-3",
            "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
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
      <div
        className={clsx(
          "hidden flex-col items-center gap-3 self-end sm:flex",
          "animate-fade-in animate-delay-250 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <Card
          className={clsx(
            "flex max-w-sm flex-col gap-2 p-3",
            "animate-slide-up-fade animate-delay-250 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        >
          <div className="flex items-center gap-1.5 font-medium">
            <CheckIcon className="size-4 text-(--success-10)" />
            Stable
          </div>
          <p>This test has been 100% stable over the last 7 days.</p>
        </Card>
        <Chip icon={CheckIcon} variant="success">
          Stable
        </Chip>
      </div>
    </div>
  );
}
