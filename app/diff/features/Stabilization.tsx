"use client";

import clsx from "clsx";
import { AlertTriangleIcon, CheckIcon, type LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ContainedIcon } from "@/components/ContainedIcon";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * What the SDK's capture defaults do to a screenshot: the same page captured
 * raw, full of rendering noise, and captured deterministically, with only the
 * real change left.
 *
 * `compact` fits the illustration in a feature-grid cell: tighter gaps, a
 * smaller engine that only appears from `lg`, and stacked card headers.
 */
export function Stabilization(props: { compact?: boolean }) {
  const { compact = false } = props;
  return (
    <div
      className={clsx(
        "relative flex w-full max-w-4xl items-center justify-center",
        compact ? "gap-2 p-4" : "gap-2 p-5 md:gap-10",
      )}
    >
      <Funnel
        className={clsx(
          "absolute left-1/2 z-0 size-75 -translate-x-1/2 animate-fade-in animate-delay-200 animate-duration-500 fill-mode-both",
          compact ? "hidden lg:flex" : "hidden md:flex",
        )}
      />

      <CaptureCard
        compact={compact}
        icon={AlertTriangleIcon}
        variant="danger"
        title="Raw capture"
        count="34 diffs"
        pulse
      >
        <ApplicationSVG noise={1} withChanges />
      </CaptureCard>

      <Engine
        compact={compact}
        className={compact ? "hidden lg:block" : "hidden md:block"}
      />

      <CaptureCard
        compact={compact}
        icon={CheckIcon}
        variant="success"
        title="Deterministic capture"
        count="2 diffs"
      >
        <ApplicationSVG withChanges="success" />
      </CaptureCard>
    </div>
  );
}

function CaptureCard(props: {
  compact: boolean;
  icon: LucideIcon;
  variant: "danger" | "success";
  title: string;
  count: string;
  pulse?: boolean;
  children: React.ReactNode;
}) {
  const { compact, icon, variant, title, count, pulse, children } = props;
  return (
    <Card className="relative flex flex-1 animate-slide-up-fade flex-col gap-3 p-3 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in">
      <div
        className={clsx(
          "flex gap-2",
          compact
            ? "flex-col items-start"
            : "flex-col items-center justify-between md:flex-row",
        )}
      >
        <SmallTitle className={clsx(compact && "lg:whitespace-nowrap")}>
          <ContainedIcon variant={variant} icon={icon} />
          {title}
        </SmallTitle>
        <Badge
          className={clsx(
            "whitespace-nowrap",
            {
              danger: "border-(--danger-6) text-(--danger-11)",
              success: "border-(--success-6) text-(--success-11)",
            }[variant],
          )}
        >
          <DotIndicator
            variant={variant}
            className={clsx(pulse && "animate-pulse")}
          />
          {count}
        </Badge>
      </div>
      {children}
    </Card>
  );
}

function Engine(props: { compact: boolean; className?: string }) {
  const { compact, className } = props;
  return (
    <Card
      className={clsx(
        "relative animate-zoom-in animate-delay-100 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        compact ? "p-1.5" : "p-5",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 grid place-items-center"
        aria-hidden="true"
      >
        <div
          className={clsx(
            "animate-pulse rounded-full bg-(--primary-9)/15 blur-xl",
            compact ? "size-16" : "size-24",
          )}
        />
      </div>
      <div
        className={clsx(
          "relative flex items-center justify-center rounded-full border border-(--primary-6) bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,0.25),rgba(124,92,255,0.02)_60%)] shadow-[0_0_0_10px_rgba(124,92,255,0.08)]",
          compact ? "size-16" : "size-24",
        )}
        aria-hidden="true"
      >
        <StabilizationChipIcon size={compact ? "small" : "default"} />
      </div>
      <div
        className={clsx(
          "pointer-events-none absolute left-1/2 -translate-1/2 rounded border-[0.5px] bg-app px-2 py-1 font-mono text-xxxs whitespace-nowrap text-(--primary-9) uppercase",
          compact ? "-bottom-9" : "-bottom-12",
        )}
      >
        Argos SDK
      </div>
    </Card>
  );
}

const DEFAULT_MATRIX = [
  0.25, 0.55, 0.4, 0.7, 0.6, 0.35, 0.5, 0.3, 0.45, 0.65, 0.28, 0.52, 0.38, 0.6,
  0.33, 0.48,
];

function range(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index);
}

function getLinePositions(params: {
  count: number;
  center: number;
  step: number;
  itemSize: number;
}) {
  const span = params.count * params.step - (params.step - params.itemSize);
  const start = params.center - span / 2;

  return range(params.count).map((index) => start + index * params.step);
}

function StabilizationChipIcon(
  props: ComponentPropsWithoutRef<"div"> & {
    /**
     * A stable opacity map, row major.
     * If omitted, uses a nice default.
     */
    matrix?: number[];
    size?: "default" | "small";
  },
) {
  const matrix = props.matrix ?? DEFAULT_MATRIX;

  const svgSize = 56;
  const center = svgSize / 2;

  const chip = {
    x: 10,
    y: 10,
    size: 36,
    outerRadius: 8,
    innerInset: 2,
    innerRadius: 6,
  };

  const pin = {
    count: 7,
    step: 3,
    length: 3,
    thickness: 1,
    gap: 1,
    radius: 0.5,
  };

  const matrixConfig = {
    grid: 4,
    step: 5,
    size: 3,
    radius: 0.75,
  };

  const pinPositions = getLinePositions({
    count: pin.count,
    center,
    step: pin.step,
    itemSize: pin.thickness,
  });

  const pinYTop = chip.y - pin.gap - pin.length;
  const pinYBottom = chip.y + chip.size + pin.gap;

  const pinXLeft = chip.x - pin.gap - pin.length;
  const pinXRight = chip.x + chip.size + pin.gap;

  const matrixPositions = getLinePositions({
    count: matrixConfig.grid,
    center,
    step: matrixConfig.step,
    itemSize: matrixConfig.size,
  });

  const { matrix: _matrix, size = "default", className, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={clsx(
        "bg-(--neutral-9)/05 relative grid place-items-center rounded-2xl border border-(--neutral-9)/10",
        size === "small" ? "size-11 rounded-xl" : "size-16",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 56 56"
        className={size === "small" ? "size-10" : "size-14"}
        fill="none"
      >
        {/* Pins top */}
        {pinPositions.map((x) => (
          <rect
            key={`pt-${x}`}
            x={x}
            y={pinYTop}
            width={pin.thickness}
            height={pin.length}
            rx={pin.radius}
            fill="var(--primary-8)"
          />
        ))}

        {/* Pins bottom */}
        {pinPositions.map((x) => (
          <rect
            key={`pb-${x}`}
            x={x}
            y={pinYBottom}
            width={pin.thickness}
            height={pin.length}
            rx={pin.radius}
            fill="var(--primary-8)"
          />
        ))}

        {/* Pins left */}
        {pinPositions.map((y) => (
          <rect
            key={`pl-${y}`}
            x={pinXLeft}
            y={y}
            width={pin.length}
            height={pin.thickness}
            rx={pin.radius}
            fill="var(--primary-8)"
          />
        ))}

        {/* Pins right */}
        {pinPositions.map((y) => (
          <rect
            key={`pr-${y}`}
            x={pinXRight}
            y={y}
            width={pin.length}
            height={pin.thickness}
            rx={pin.radius}
            fill="var(--primary-8)"
          />
        ))}

        {/* Chip body */}
        <rect
          x={chip.x}
          y={chip.y}
          width={chip.size}
          height={chip.size}
          rx={chip.outerRadius}
          stroke="var(--primary-8)"
        />
        <rect
          x={chip.x + chip.innerInset}
          y={chip.y + chip.innerInset}
          width={chip.size - chip.innerInset * 2}
          height={chip.size - chip.innerInset * 2}
          rx={chip.innerRadius}
          stroke="var(--primary-6)"
          strokeWidth="0.5"
        />

        {/* Internal matrix */}
        {matrixPositions.map((y, row) =>
          matrixPositions.map((x, col) => {
            const index = row * matrixConfig.grid + col;
            const base = matrix[index] ?? 0.45;

            // deterministic variation per cell
            const min = Math.max(0.15, base - 0.15);
            const max = Math.min(0.8, base + 0.15);
            const dur = 1 + (index % 3) * 0.6;
            const delay = -(index * 0.3);

            return (
              <rect
                key={`m-${row}-${col}`}
                x={x}
                y={y}
                width={matrixConfig.size}
                height={matrixConfig.size}
                rx={matrixConfig.radius}
                fill="var(--primary-8)"
                opacity={base}
              >
                <animate
                  attributeName="opacity"
                  values={`${min};${max};${min}`}
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </rect>
            );
          }),
        )}
      </svg>
    </div>
  );
}

const FLOW_IN_TOP = "M 0 105 C 110 105 125 135 150 150";
const FLOW_IN_BOTTOM = "M 0 195 C 110 195 125 165 150 150";
const FLOW_OUT_TOP = "M 150 150 C 175 135 190 105 300 105";
const FLOW_OUT_BOTTOM = "M 150 150 C 175 165 190 195 300 195";

function Funnel(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 300 300"
      className={clsx("pointer-events-none", props.className)}
      aria-hidden="true"
    >
      {/* Funnel guides: noisy on the way in, clean on the way out */}
      {[FLOW_IN_TOP, FLOW_IN_BOTTOM].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--danger-9)"
          strokeWidth="1"
          opacity="0.2"
          strokeLinecap="round"
        />
      ))}
      {[FLOW_OUT_TOP, FLOW_OUT_BOTTOM].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--success-9)"
          strokeWidth="1"
          opacity="0.2"
          strokeLinecap="round"
        />
      ))}

      {/* Thick, noisy inflow */}
      <path
        d="M 0 150 C 95 150 120 150 150 150"
        fill="none"
        stroke="var(--danger-9)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 6"
        opacity="0.85"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-48"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </path>

      {/* Thin, clean outflow */}
      <path
        d="M 150 150 C 180 150 205 150 300 150"
        fill="none"
        stroke="var(--success-9)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 5"
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-49"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Noise particles converging into the engine */}
      <FlowParticle path={FLOW_IN_TOP} color="var(--danger-9)" begin="0s" />
      <FlowParticle
        path={FLOW_IN_BOTTOM}
        color="var(--danger-9)"
        begin="0.6s"
      />
      <FlowParticle path={FLOW_IN_TOP} color="var(--danger-9)" begin="1.1s" />

      {/* Clean pulses spreading out of the engine */}
      <FlowParticle
        path={FLOW_OUT_TOP}
        color="var(--success-9)"
        begin="0.3s"
        radius="1.6"
      />
      <FlowParticle
        path={FLOW_OUT_BOTTOM}
        color="var(--success-9)"
        begin="0.9s"
        radius="1.6"
      />

      {/* Pinch marker at the engine */}
      <circle cx="150" cy="150" r="2.5" fill="var(--primary-9)" opacity="0.5">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function FlowParticle(props: {
  path: string;
  color: string;
  begin: string;
  radius?: string;
}) {
  const { path, color, begin, radius = "2" } = props;
  return (
    <circle r={radius} fill={color}>
      <animateMotion
        path={path}
        dur="1.7s"
        begin={begin}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.75;1"
        dur="1.7s"
        begin={begin}
        repeatCount="indefinite"
      />
    </circle>
  );
}
