"use client";
import clsx from "clsx";
import {
  ActivityIcon,
  BarChart2Icon,
  HistoryIcon,
  TrendingUpIcon,
} from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { Card } from "../../common/Card";
import { Title } from "../../common/Title";

const chartData = [
  { x: 18, y: 12, a: 6, b: 6 },
  { x: 96, y: 6, a: 3, b: 3 },
  { x: 122, y: 4, a: 2, b: 2 },
  { x: 148, y: 3, a: 2, b: 1 },
  { x: 254, y: 2, a: 1, b: 1 },
  { x: 276, y: 2, a: 1, b: 1 },
  { x: 356, y: 8, a: 4, b: 4 },
  { x: 430, y: 5, a: 2, b: 3 },
  { x: 454, y: 6, a: 3, b: 3 },
  { x: 496, y: 2, a: 1, b: 1 },
  { x: 520, y: 2, a: 1, b: 1 },
  { x: 544, y: 8, a: 4, b: 4 },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function AdvancedAnalytics(props: { className?: string }) {
  return (
    <section
      className={clsx("max-w-4xl", props.className)}
      aria-label="Flakiness widgets"
    >
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:p-0">
        <FlakinessScoreCard
          className={clsx(
            "col-span-1 hidden sm:block",
            "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        />
        <GraphCard
          className={clsx(
            "col-span-2",
            "animate-slide-up-fade animate-delay-100 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        />
        <FirstLastSeenCard
          className={clsx(
            "col-span-2 hidden sm:block",
            "animate-slide-up-fade animate-delay-200 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        />
        <StatsCard
          className={clsx(
            "col-span-1 hidden sm:block",
            "animate-slide-up-fade animate-delay-300 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        />
      </div>
    </section>
  );
}

function FlakinessScoreCard(props: { className?: string }) {
  const value = 73;
  const ring = { size: 90, stroke: 8 };
  const r = (ring.size - ring.stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = clamp(value / 100, 0, 1);
  const dash = c * progress;
  const gap = c - dash;

  return (
    <Card className={clsx("flex flex-col", props.className)}>
      <CardHeader>
        <Title>
          <ActivityIcon className="text-low size-3" />
          Flakiness score
        </Title>
        <Description>Instantely see if a test is flaky or not.</Description>
      </CardHeader>
      <div className="flex flex-1 items-center justify-center">
        <svg
          width={ring.size}
          height={ring.size}
          viewBox={`0 0 ${ring.size} ${ring.size}`}
          aria-hidden="true"
        >
          <circle
            cx={ring.size / 2}
            cy={ring.size / 2}
            r={r}
            fill="none"
            stroke="var(--neutral-6)"
            strokeWidth={ring.stroke}
          />
          <circle
            cx={ring.size / 2}
            cy={ring.size / 2}
            r={r}
            fill="none"
            stroke="var(--danger-10)"
            strokeWidth={ring.stroke}
            strokeDasharray={`${dash} ${gap}`}
            transform={`rotate(-90 ${ring.size / 2} ${ring.size / 2})`}
          />
        </svg>

        <div className="absolute text-center">
          <div className="text-low text-[0.65rem]">Flakiness</div>
          <div className="text-2xl leading-7 font-semibold">{value}</div>
        </div>
      </div>
    </Card>
  );
}

function CardHeader(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col items-start gap-0.5 border-b-[0.5px] p-3 text-balance",
        props.className,
      )}
    />
  );
}

export function Description(props: ComponentPropsWithRef<"p">) {
  return <p {...props} className={clsx("text-low text-xs", props.className)} />;
}

function StatsCard(props: { className?: string }) {
  return (
    <Card className={clsx("flex flex-col", props.className)}>
      <CardHeader className="text-balance">
        <Title>
          <BarChart2Icon className="text-low size-3" />
          Build metrics
        </Title>
        <Description>
          Aggregated stability metrics across all builds.
        </Description>
      </CardHeader>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-5 py-3">
        <Metric label="Builds" value="63" />
        <Metric label="Stability" value="51%" />
        <Metric label="Changes" value="31" />
        <Metric label="Consistency" value="3%" />
      </div>
    </Card>
  );
}

function GraphCard(props: { className?: string }) {
  return (
    <Card className={clsx("flex flex-col", props.className)}>
      <CardHeader>
        <Title>
          <TrendingUpIcon className="text-low size-3" />
          Instability over time
        </Title>
        <Description>
          Tracks when and how often this snapshot becomes unstable.
        </Description>
      </CardHeader>
      <div className="flex flex-1 items-center justify-center p-3">
        <MiniTimelineChart />
      </div>
    </Card>
  );
}

function FirstLastSeenCard(props: { className?: string }) {
  return (
    <Card className={clsx(props.className)}>
      <CardHeader>
        <Title>
          <HistoryIcon className="text-low size-3" />
          Change history
        </Title>
        <Description>
          When this snapshot first appeared and when it last changed.
        </Description>
      </CardHeader>
      <div className="grid gap-2 p-3">
        <RightInfo
          title="First seen"
          value="4 months ago"
          sub="In build #2838"
        />
        <div className="h-px bg-(--neutral-6)" />
        <RightInfo
          title="Last seen"
          value="6 minutes ago"
          sub="In build #11136"
        />
      </div>
    </Card>
  );
}

function Metric(props: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-low text-[0.7rem] font-medium">{props.label}</div>
      <div className="text-xl leading-6 font-semibold">{props.value}</div>
    </div>
  );
}

function RightInfo(props: { title: string; value: string; sub: string }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <div className="text-xs font-semibold">{props.title}</div>
        <div className="text-xs font-semibold underline decoration-(--neutral-10) decoration-dotted underline-offset-2">
          {props.value}
        </div>
      </div>
      <div className="text-low mt-1 text-xs">{props.sub}</div>
    </div>
  );
}

function MiniTimelineChart() {
  const width = 440;
  const height = 92;

  const padLeft = 20;
  const padRight = 10;
  const padTop = 10;
  const padBottom = 26;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const yMax = 12;

  function yToPx(v: number) {
    const t = clamp(v / yMax, 0, 1);
    return padTop + (1 - t) * plotH;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="self-start md:h-28"
      role="img"
      aria-label="Flakiness timeline"
      preserveAspectRatio="none"
    >
      {[12, 6, 0].map((v) => (
        <text
          key={v}
          x={padLeft - 8}
          y={yToPx(v) + 4}
          textAnchor="end"
          fontSize="10"
          fill="var(--neutral-11)"
        >
          {v}
        </text>
      ))}

      <line
        x1={padLeft}
        y1={yToPx(0)}
        x2={width - padRight}
        y2={yToPx(0)}
        stroke="var(--neutral-6)"
        strokeWidth="1"
      />

      {chartData.map((d, i) => {
        const x = padLeft + (d.x / 560) * plotW;
        const barW = 10;

        const totalTop = yToPx(d.y);
        const totalBottom = yToPx(0);

        const aTop = yToPx(d.a);
        const aBottom = totalBottom;

        const bTop = totalTop;
        const bBottom = yToPx(d.a);

        return (
          <g key={i}>
            <rect
              x={x}
              y={bTop}
              width={barW}
              height={Math.max(0, bBottom - bTop)}
              fill="var(--neutral-7)"
            />
            <rect
              x={x}
              y={aTop}
              width={barW}
              height={Math.max(0, aBottom - aTop)}
              fill="var(--amber-10)"
            />
          </g>
        );
      })}

      <text
        x={padLeft + 70}
        y={height - 8}
        fontSize="10"
        fill="var(--neutral-11)"
      >
        20 Jun
      </text>
      <text
        x={padLeft + 320}
        y={height - 8}
        fontSize="10"
        fill="var(--neutral-11)"
      >
        24 Jun
      </text>
    </svg>
  );
}
