"use client";

import clsx from "clsx";
import { CheckIcon, WavesIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

const BUILD_COUNT = 28;

const RECURRING = [5, 12, 13, 21];

export function FlakyIndicator() {
  return (
    <Card
      shadow="high"
      className={clsx(
        "mx-auto w-full max-w-lg divide-y overflow-hidden text-sm",
        "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
      )}
    >
      <TestRow name="sneakers-detail vw-480.png" recurring={RECURRING}>
        <div
          className={clsx(
            "bg-subtle mt-3 rounded-lg border-[0.5px] p-3",
            "animate-fade-in animate-delay-250 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        >
          <div className="flex items-center gap-1.5 font-medium">
            <WavesIcon className="size-4 text-(--danger-10)" />
            Test is flaky
          </div>
          <p className="text-low mt-1">
            <strong className="text-default font-medium">
              4 / 28 auto-approved builds
            </strong>{" "}
            showed exactly the same change in the last 7 days.
          </p>
        </div>
      </TestRow>
      <TestRow
        name="cart vw-480.png"
        recurring={[]}
        className="max-sm:hidden"
      />
    </Card>
  );
}

function TestRow(props: {
  name: string;
  recurring: number[];
  className?: string;
  children?: React.ReactNode;
}) {
  const { name, recurring, className, children } = props;
  const isFlaky = recurring.length > 0;
  return (
    <div className={clsx("p-3 md:p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-medium">{name}</span>
        {isFlaky ? (
          <Chip icon={WavesIcon} variant="danger" className="shrink-0">
            {recurring.length} / {BUILD_COUNT}
          </Chip>
        ) : (
          <Chip icon={CheckIcon} variant="success" className="shrink-0">
            Stable
          </Chip>
        )}
      </div>
      <BuildStrip recurring={recurring} />
      {children}
    </div>
  );
}

function BuildStrip(props: { recurring: number[] }) {
  const { recurring } = props;
  return (
    <div className="mt-3 flex items-end gap-[5px]" aria-hidden>
      {Array.from({ length: BUILD_COUNT }, (_, index) => {
        const isRecurring = recurring.includes(index);
        return (
          <span
            key={index}
            className={clsx(
              "flex-1 rounded-[3px]",
              isRecurring
                ? "h-8 bg-(--danger-9)"
                : "h-5 bg-(--success-9)/40 dark:bg-(--success-9)/55",
            )}
          />
        );
      })}
    </div>
  );
}
