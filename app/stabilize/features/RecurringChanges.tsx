import clsx from "clsx";
import { EyeOffIcon, RepeatIcon, SparkleIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

/**
 * The changes list of a test page. A change is one exact visual difference,
 * however many builds it appeared in, so the list is ordered by how often
 * each one came back: the recurring change is the flakiness to chase.
 */
const CHANGES = [
  {
    kind: "Recurring · 12×",
    icon: RepeatIcon,
    variant: "danger" as const,
    occurrences: 12,
    firstSeen: "#2838",
    lastSeen: "#11136",
    noise: 0.35,
    seed: 7,
  },
  {
    kind: "One-off",
    icon: SparkleIcon,
    variant: "neutral" as const,
    occurrences: 1,
    firstSeen: "#11091",
    lastSeen: "#11091",
    noise: 0,
    seed: 1,
  },
  {
    kind: "Ignored",
    icon: EyeOffIcon,
    variant: "primary" as const,
    occurrences: 5,
    firstSeen: "#9420",
    lastSeen: "#11130",
    noise: 0.15,
    seed: 3,
  },
];

const TOTAL_BUILDS = 28;

export function RecurringChanges() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-xxs">
      <div
        className={clsx(
          "flex items-center justify-between gap-2 px-1 text-low",
          "animate-fade-in motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <span>3 changes · most frequent first</span>
        <div className="flex overflow-hidden rounded-md border-[0.5px] font-medium">
          <span className="bg-subtle px-2 py-0.5 text-default">All</span>
          <span className="border-l-[0.5px] px-2 py-0.5">Ignored</span>
        </div>
      </div>
      {CHANGES.map((change, index) => (
        <ChangeRow key={change.kind} index={index} {...change} />
      ))}
    </div>
  );
}

function ChangeRow(props: (typeof CHANGES)[number] & { index: number }) {
  const {
    kind,
    icon: Icon,
    variant,
    occurrences,
    firstSeen,
    lastSeen,
    noise,
    seed,
    index,
  } = props;
  return (
    <Card
      shadow={index === 0 ? "high" : "medium"}
      className={clsx(
        "flex items-center gap-3 p-2.5",
        index === 0 && "border-(--danger-6)",
        "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        { 0: "", 1: "animate-delay-100", 2: "animate-delay-200" }[index],
      )}
    >
      <ApplicationSVG
        withChanges
        noise={noise}
        noiseSeed={seed}
        className={clsx(
          "h-12 w-auto shrink-0 rounded border-[0.5px]",
          variant === "primary" && "opacity-60",
        )}
      />
      <div className="min-w-0 flex-1">
        <Chip icon={Icon} variant={variant} className="text-[0.65rem]">
          {kind}
        </Chip>
        <div className="mt-1.5 truncate text-low">
          First<span className="max-sm:hidden"> seen</span> {firstSeen} · Last
          <span className="max-sm:hidden"> seen</span> {lastSeen}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm leading-none font-semibold">{occurrences}</div>
        <div className="mt-1 text-xxxs text-low">of {TOTAL_BUILDS} builds</div>
      </div>
    </Card>
  );
}
