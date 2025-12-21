"use client";
import clsx from "clsx";
import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ApplicationSVG } from "../../common/ApplicationSVG";
import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { ContainedIcon } from "../../common/ContainedIcon";
import { DotIndicator } from "../../common/DotIndicator";
import { Title } from "../../common/Title";

export function Stabilization() {
  return (
    <div className="relative flex w-full max-w-4xl items-center gap-10 p-5">
      <Funnel className="absolute left-1/2 z-0 size-75 -translate-x-1/2 animate-fade-in animate-duration-500 fill-mode-both" />

      <Card className="relative flex flex-1 flex-col gap-3 p-3 animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both">
        <div className="flex items-center justify-between">
          <Title>
            <ContainedIcon variant="danger" icon={AlertTriangleIcon} />
            Before stabilization
          </Title>
          <Badge>
            <DotIndicator variant="danger" />
            34 diffs
          </Badge>
        </div>

        <ApplicationSVG noise={1} withChanges />
      </Card>

      <Card className="relative p-5 animate-zoom-in motion-reduce:animate-fade-in animate-delay-100 animate-duration-500 fill-mode-both">
        <div
          className="flex size-24 items-center justify-center rounded-full border border-(--primary-6) bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,0.25),rgba(124,92,255,0.02)_60%)] shadow-[0_0_0_10px_rgba(124,92,255,0.08)]"
          aria-hidden="true"
        >
          <StabilizationChipIcon />
        </div>
        <div className="bg-app pointer-events-none absolute -bottom-12 left-1/2 -translate-1/2 rounded border-[0.5px] px-2 py-1 font-mono text-[0.65rem] whitespace-nowrap text-(--primary-9) uppercase">
          Stabilization engine
        </div>
      </Card>

      <Card className="relative flex flex-1 flex-col gap-3 p-3 animate-slide-up-fade animate-delay-150 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both">
        <div className="flex items-center justify-between">
          <Title>
            <ContainedIcon variant="primary" icon={CheckIcon} />
            Stabilized
          </Title>
          <Badge>
            <DotIndicator variant="primary" />2 diffs
          </Badge>
        </div>

        <ApplicationSVG withChanges="success" />
      </Card>
    </div>
  );
}

export function Counter(props: {
  count: React.ReactNode;
  unit: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-baseline justify-center gap-1.5",
        props.className,
      )}
    >
      <strong className="text-sm font-semibold">{props.count}</strong>
      <span className="text-low text-[0.65rem] tracking-wider uppercase">
        {props.unit}
      </span>
    </div>
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

  const { matrix: _matrix, className, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={clsx(
        "bg-(--neutral-9)/05 relative grid h-16 w-16 place-items-center rounded-2xl border border-(--neutral-9)/10",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 56 56" className="h-14 w-14" fill="none">
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

function Funnel(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 300 300"
      className={clsx("pointer-events-none", props.className)}
      aria-hidden="true"
    >
      {/* Outer funnel hint */}
      <path
        d="M 0 105 C 110 105 125 135 150 150 C 175 165 190 195 300 195"
        fill="none"
        stroke="var(--primary-8)"
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
      />
      <path
        d="M 0 195 C 110 195 125 165 150 150 C 175 135 190 105 300 105"
        fill="none"
        stroke="var(--primary-8)"
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
      />

      {/* Thick in */}
      <path
        d="M 0 150 C 95 150 120 150 150 150"
        fill="none"
        stroke="var(--primary-8)"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeDasharray="2 6"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-48"
          dur="1.25s"
          repeatCount="indefinite"
        />
      </path>

      {/* Thin out */}
      <path
        d="M 150 150 C 180 150 205 150 300 150"
        fill="none"
        stroke="var(--primary-8)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 5"
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-49"
          dur="1.25s"
          repeatCount="indefinite"
        />
      </path>

      {/* Pinch marker */}
      <circle cx="150" cy="150" r="2" fill="var(--primary-8)" opacity="0.35" />
    </svg>
  );
}
