import { ImageIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * The four stages of a comparison, in the order the docs give them: both
 * images are normalized, several diff passes run at different thresholds,
 * pixels are clustered to separate noise from change, and a mask and a score
 * come out.
 */
const STEPS = ["Normalize", "Diff passes", "Cluster", "Mask + score"];

/** Seconds the rail spends on each step. */
const STEP_DURATION = 1;
const CYCLE = `${STEPS.length * STEP_DURATION}s`;

export function DiffMaskScore() {
  return (
    <Card
      shadow="high"
      className="relative flex w-full max-w-lg animate-slide-up-fade flex-col gap-3 p-3 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center justify-between gap-2">
        <SmallTitle>
          <ImageIcon className="size-3" aria-hidden />
          checkout-payment.png
        </SmallTitle>
        <Badge className="border-(--danger-6) text-(--danger-11)">
          <DotIndicator variant="danger" />
          Score 0.02
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Pane label="Baseline" tone="neutral">
          <ApplicationSVG className="w-full" />
        </Pane>
        <Pane label="Changes" tone="danger">
          <ApplicationSVG
            className="w-full"
            withChanges
            noise={0.3}
            noiseSeed={7}
          />
        </Pane>
        <Pane label="Diff mask" tone="primary">
          <DiffMaskSVG className="w-full" />
        </Pane>
      </div>
      <Rail />
    </Card>
  );
}

function Pane(props: {
  label: string;
  tone: "neutral" | "danger" | "primary";
  children: React.ReactNode;
}) {
  const { label, tone, children } = props;
  return (
    <div className="min-w-0 space-y-1.5">
      <div className="flex items-center gap-1.5 text-xxxs font-semibold text-(--neutral-12)">
        <DotIndicator variant={tone} />
        {label}
      </div>
      {children}
    </div>
  );
}

/** Speckles the clustering pass drops: rendering noise, not a change. */
const NOISE: Array<[number, number]> = [
  [30, 42],
  [96, 47],
  [150, 44],
  [58, 73],
  [170, 76],
  [24, 110],
  [52, 138],
  [160, 118],
  [190, 140],
  [120, 160],
  [80, 90],
  [200, 60],
];

/**
 * The mask Argos outputs for the `ApplicationSVG` change: same geometry, the
 * two real changes kept, the noise fading out as the clustering pass runs,
 * then the clusters outlined.
 */
function DiffMaskSVG(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 220 170" aria-hidden {...props}>
      <rect
        x="0.25"
        y="0.25"
        width="219.5"
        height="169.5"
        rx="5"
        fill="var(--neutral-3)"
        stroke="var(--neutral-9)"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />
      {/* Ghost of the layout, so the mask reads as the same screen */}
      <g fill="var(--neutral-6)" fillOpacity="0.5">
        <rect x="13" y="40" width="158" height="8" rx="4" />
        <rect x="13" y="70" width="145" height="8" rx="4" />
        <rect x="13" y="100" width="61.3" height="48" rx="10" />
        <rect x="145.6" y="100" width="61.3" height="48" rx="10" />
      </g>
      {/* Noise */}
      <g fill="var(--danger-9)">
        {NOISE.map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r="1.2" fillOpacity="0.9">
            <animate
              attributeName="fill-opacity"
              values="0.9;0.9;0;0"
              keyTimes="0;0.5;0.62;1"
              dur={CYCLE}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
      {/* The two real changes */}
      <g fill="var(--danger-9)">
        <rect x="13" y="55" width="128" height="8" rx="4" />
        <rect x="79.3" y="100" width="61.3" height="48" rx="10" />
      </g>
      {/* Cluster outlines, drawn once the noise is gone */}
      <g
        fill="none"
        stroke="var(--danger-9)"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0"
      >
        <rect x="9" y="51" width="136" height="16" rx="6" />
        <rect x="75.3" y="96" width="69.3" height="56" rx="12" />
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.6;0.7;0.95;1"
          dur={CYCLE}
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

/** The four stages, lit one after the other as the comparison runs. */
function Rail() {
  return (
    <div className="relative">
      <svg
        className="absolute inset-x-[12.5%] top-[9px] h-0.5 w-3/4"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="var(--primary-9)"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-8"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
      <div className="relative grid grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-app">
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                <circle
                  cx="10"
                  cy="10"
                  r="4.5"
                  fill="var(--primary-9)"
                  fillOpacity="0.2"
                  stroke="var(--primary-9)"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="fill-opacity"
                    values="0.2;1;1;0.2;0.2"
                    keyTimes="0;0.05;0.2;0.3;1"
                    dur={CYCLE}
                    begin={`${index * STEP_DURATION}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
            <span className="truncate px-0.5 text-xxxs font-medium text-low">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
