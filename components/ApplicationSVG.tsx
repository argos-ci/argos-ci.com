import { type ComponentPropsWithoutRef, useId } from "react";

type ApplicationSVGProps = ComponentPropsWithoutRef<"svg"> & {
  withChanges?: boolean | "success";
  /**
   * 0 means no noise
   * 1 means a lot of noise
   */
  noise?: number;

  /**
   * Keeps noise deterministic across renders
   */
  noiseSeed?: number;
};

export function ApplicationSVG(props: ApplicationSVGProps) {
  const { withChanges = false, noise = 0, noiseSeed = 1, ...rest } = props;
  const appBgId = useId();
  const appClipId = useId();
  const clampedNoise = clamp01(noise);
  const rng = mulberry32(noiseSeed);

  const dotCount = Math.round(18 * clampedNoise);
  const lineCount = Math.round(10 * clampedNoise);
  const sparkleCount = Math.round(30 * clampedNoise);
  return (
    <svg viewBox="0 0 220 170" {...rest}>
      <defs>
        <linearGradient id={appBgId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--neutral-9)" stopOpacity="0.06" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
        <clipPath id={appClipId}>
          <rect x="0.25" y="0.25" width="219.5" height="169.5" rx="5" />
        </clipPath>
      </defs>

      {/* Card */}
      <rect
        x="0.25"
        y="0.25"
        width="219.5"
        height="169.5"
        rx="5"
        fill={`url(#${appBgId})`}
        stroke="var(--neutral-9)"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />

      {/* Header with only top corners rounded */}
      <path
        d="
          M5.25 0.25
          H214.75
          A5 5 0 0 1 219.75 5.25
          V26.7
          H0.25
          V5.25
          A5 5 0 0 1 5.25 0.25
          Z
        "
        fill="var(--neutral-8)"
        fillOpacity="0.10"
      />
      <line
        x1="0.25"
        y1="26.7"
        x2="219.75"
        y2="26.7"
        stroke="var(--neutral-9)"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />

      {/* Lines */}
      <rect
        x="13"
        y="40"
        width="158"
        height="8"
        rx="4"
        fill="var(--neutral-4)"
      />

      {!withChanges && (
        <rect
          x="13"
          y="55"
          width="128"
          height="8"
          rx="4"
          fill="var(--neutral-4)"
        />
      )}

      {withChanges && (
        <rect
          x="13"
          y="55"
          width="128"
          height="8"
          rx="4"
          fill={
            withChanges === "success" ? "var(--success-8)" : "var(--danger-8)"
          }
          fillOpacity="0.6"
          stroke={
            withChanges === "success" ? "var(--success-10)" : "var(--danger-10)"
          }
          strokeOpacity="0.6"
          strokeWidth="0.5"
        />
      )}

      <rect
        x="13"
        y="70"
        width="145"
        height="8"
        rx="4"
        fill="var(--neutral-4)"
      />

      {/* Cards */}
      <rect
        x="13"
        y="100"
        width="61.3"
        height="48"
        rx="10"
        fill="var(--neutral-3)"
        stroke="var(--neutral-4)"
        strokeWidth="0.5"
      />

      <rect
        x="79.3"
        y="100"
        width="61.3"
        height="48"
        rx="10"
        fill={
          withChanges
            ? withChanges === "success"
              ? "var(--success-8)"
              : "var(--danger-8)"
            : "var(--neutral-3)"
        }
        fillOpacity={withChanges ? 0.6 : 1}
        stroke={
          withChanges
            ? withChanges === "success"
              ? "var(--success-10)"
              : "var(--danger-10)"
            : "var(--neutral-4)"
        }
        strokeOpacity={withChanges ? 0.6 : 1}
        strokeWidth="0.5"
      />

      <rect
        x="145.6"
        y="100"
        width="61.3"
        height="48"
        rx="10"
        fill="var(--neutral-3)"
        stroke="var(--neutral-4)"
        strokeWidth="0.5"
      />

      {/* Noise overlay */}
      {clampedNoise > 0 ? (
        <g clipPath={`url(#${appClipId})`} opacity={0.8}>
          {/* faint jitter lines across the text rows */}
          {range(lineCount).map((i) => {
            const y = pick(rng, [44, 59, 74]) + randRange(rng, -2, 2);
            const x1 = randRange(rng, 10, 30);
            const x2 = x1 + randRange(rng, 50, 150);
            return (
              <line
                key={`nl-${i}`}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y + randRange(rng, -1.2, 1.2)}
                stroke="var(--danger-10)"
                strokeWidth={randRange(rng, 0.6, 1.2)}
                strokeOpacity={randRange(rng, 0.2, 1)}
                strokeLinecap="round"
              />
            );
          })}

          {/* dots that look like speckles */}
          {range(dotCount).map((i) => {
            const region = pick(rng, [
              { x: 13, y: 35, w: 175, h: 55 },
              { x: 13, y: 95, w: 194, h: 60 },
            ]);
            const cx = region.x + randRange(rng, 0, region.w);
            const cy = region.y + randRange(rng, 0, region.h);
            return (
              <circle
                key={`nd-${i}`}
                cx={cx}
                cy={cy}
                r={randRange(rng, 0.6, 1.6)}
                fill="var(--danger-10)"
              />
            );
          })}

          {/* tiny rects to suggest random pixel blocks */}
          {range(sparkleCount).map((i) => {
            const x = randRange(rng, 14, 206);
            const y = randRange(rng, 34, 155);
            const w = randRange(rng, 0.5, 1.5);
            const h = randRange(rng, 0.5, 1.5);
            const opacity = randRange(rng, 0.8, 1);
            return (
              <rect
                key={`nr-${i}`}
                x={x}
                y={y}
                width={w}
                height={h}
                rx={Math.min(1.2, w / 2)}
                fill="var(--danger-10)"
                fillOpacity={opacity}
              />
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function range(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index);
}

function pick<T>(rng: () => number, values: readonly T[]): T {
  return values[Math.floor(rng() * values.length)]!;
}

function randRange(rng: () => number, min: number, max: number): number {
  return min + (max - min) * rng();
}

/**
 * Small fast deterministic PRNG.
 * Same seed gives same noise.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function random(): number {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
