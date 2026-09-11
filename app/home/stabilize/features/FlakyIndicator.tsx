import clsx from "clsx";
import { CheckIcon, MousePointer2Icon, WavesIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

const TOTAL_BUILDS = 28;

/**
 * The changed tests of a build under review. Each one carries the badge Argos
 * computes from the auto-approved builds of the last 7 days: how many of them
 * showed exactly this change. Two flakes, one real change, so the badge reads
 * as a verdict per test rather than a decoration on the list.
 */
const CHANGES = [
  {
    file: "pricing.spec.ts",
    title: "plan toggle",
    device: "Desktop",
    width: "1280px",
    occurrences: 12,
    noise: 0.2,
    seed: 3,
  },
  {
    file: "checkout.spec.ts",
    title: "cart total",
    device: "Desktop",
    width: "1440px",
    occurrences: 4,
    noise: 0.35,
    seed: 7,
  },
  {
    file: "navigation.spec.ts",
    title: "mobile menu",
    device: "Mobile",
    width: "480px",
    occurrences: 0,
    noise: 0,
    seed: 1,
  },
  {
    file: "settings.spec.ts",
    title: "billing form",
    device: "Tablet",
    width: "1024px",
    occurrences: 0,
    noise: 0,
    seed: 2,
  },
];

/**
 * The row whose badge is hovered, its tooltip open. The second one, so the
 * tooltip hangs near the middle of the list rather than off its top corner.
 */
const HOVERED = CHANGES[1]!;

export function FlakyIndicator() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-3 p-4">
      <Card
        shadow="high"
        // Room on the right for the tooltip, which hangs off the hovered
        // badge; the card and that room are centered together.
        className={clsx(
          "relative w-full max-w-108 md:mr-76",
          "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b-[0.5px] px-3 py-2">
          <SmallTitle className="min-w-0">
            <DotIndicator variant="danger" />
            <span className="truncate">{CHANGES.length} changed tests</span>
          </SmallTitle>
          <Badge className="shrink-0">Build #11136</Badge>
        </div>
        <ol className="flex flex-col divide-y-[0.5px] px-1.5 py-1">
          {CHANGES.map((change, index) => (
            <ChangeRow
              key={change.title}
              index={index}
              hovered={change === HOVERED}
              {...change}
            />
          ))}
        </ol>
      </Card>
      {/* On phones the tooltip cannot hang off the list without leaving the
          screen, so it follows the card instead. */}
      <FlakyTooltip
        occurrences={HOVERED.occurrences}
        className={clsx(
          "w-full max-w-108 md:hidden",
          "animate-slide-up-fade animate-delay-500 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      />
    </div>
  );
}

function ChangeRow(
  props: (typeof CHANGES)[number] & {
    index: number;
    hovered: boolean;
  },
) {
  const {
    file,
    title,
    device,
    width,
    occurrences,
    noise,
    seed,
    index,
    hovered,
  } = props;
  const flaky = occurrences > 1;
  return (
    <li
      className={clsx(
        "flex items-center gap-3 rounded-lg px-2 py-2.5",
        hovered && "bg-(--neutral-3)",
        "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        {
          0: "animate-delay-100",
          1: "animate-delay-200",
          2: "animate-delay-300",
          3: "animate-delay-[400ms]",
        }[index],
      )}
    >
      <ApplicationSVG
        withChanges
        noise={noise}
        noiseSeed={seed}
        className="h-12 w-auto shrink-0 rounded border-[0.5px]"
      />
      <div className="min-w-0 flex-1">
        {/* On phones the file and the viewport width would push both lines
            into an ellipsis; the title and the device still name the test. */}
        <div className="truncate text-xs font-medium">
          <span className="max-sm:hidden">{file} › </span>
          {title}
        </div>
        <div className="mt-0.5 truncate text-xxs text-low">
          {device}
          <span className="max-sm:hidden"> · {width}</span>
        </div>
      </div>
      <span className="relative shrink-0">
        <Chip
          icon={flaky ? WavesIcon : CheckIcon}
          variant={flaky ? "danger" : "success"}
          className="text-xs"
        >
          {flaky ? `${occurrences} / ${TOTAL_BUILDS}` : "Stable"}
        </Chip>
        {hovered ? (
          <>
            <MousePointer2Icon
              className={clsx(
                "absolute -right-1.5 -bottom-2 size-4 fill-(--neutral-12) text-(--neutral-1)",
                "animate-fade-in animate-delay-500 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
              )}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <FlakyTooltip
              occurrences={occurrences}
              caret
              className={clsx(
                "absolute top-1/2 left-full z-10 ml-5 hidden w-68 -translate-y-1/2 md:block",
                "animate-fade-in animate-delay-500 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
              )}
            />
          </>
        ) : null}
      </span>
    </li>
  );
}

/**
 * What hovering the badge shows: the same sentence Argos uses, with the
 * numbers the badge abbreviates.
 */
function FlakyTooltip(props: {
  occurrences: number;
  caret?: boolean;
  className?: string;
}) {
  const { occurrences, caret, className } = props;
  return (
    <Card
      shadow="high"
      className={clsx("flex flex-col gap-1.5 p-3 text-xs", className)}
    >
      {caret ? (
        <span
          className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rotate-45 border-b-[0.5px] border-l-[0.5px] bg-app"
          aria-hidden="true"
        />
      ) : null}
      <div className="flex items-center gap-1.5 font-medium">
        <WavesIcon className="size-3.5 text-(--danger-10)" />
        Test is flaky
      </div>
      <p className="text-low">
        <strong className="font-medium text-default">
          {occurrences} / {TOTAL_BUILDS} auto-approved builds
        </strong>{" "}
        showed exactly the same change in the last 7 days.
      </p>
    </Card>
  );
}
