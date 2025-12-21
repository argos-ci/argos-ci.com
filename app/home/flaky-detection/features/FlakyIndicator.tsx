"use client";
import { CheckIcon, WavesIcon } from "lucide-react";

import { Card } from "../../common/Card";
import { Title } from "../../common/Title";

export function FlakyIndicator() {
  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col items-center gap-3 self-start">
        <Card className="flex max-w-sm flex-col gap-2 p-3">
          <Title>
            <WavesIcon className="size-4 text-(--danger-10)" />
            Test is flaky
          </Title>
          <div className="text-sm">
            <strong className="font-medium">4 / 28 auto-approved builds</strong>
             showed exactly the same change in the last 7 days.
          </div>
        </Card>
        <div className="flex items-center gap-1.5 rounded-xl border border-(--danger-6) bg-(--danger-2) px-2.5 text-sm font-medium text-(--danger-10)">
          <WavesIcon className="size-4" /> 4 / 28
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 self-end">
        <Card className="flex max-w-sm flex-col gap-2 p-3">
          <Title>
            <CheckIcon className="size-4 text-(--success-10)" />
            Stable
          </Title>
          <div className="text-sm">
            This test has been 100% stable over the last 7 days.
          </div>
        </Card>
        <div className="flex items-center gap-1.5 rounded-xl border border-(--success-6) bg-(--success-2) px-2.5 text-sm font-medium text-(--success-10)">
          <CheckIcon className="size-4" /> Stable
        </div>
      </div>
    </div>
  );
}
