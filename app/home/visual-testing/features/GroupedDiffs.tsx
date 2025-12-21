"use client";
import clsx from "clsx";
import {
  ImageIcon,
  ImagesIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";

import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { ContainedIcon } from "../../common/ContainedIcon";
import { DotIndicator } from "../../common/DotIndicator";
import { Title } from "../../common/Title";

export function GroupedDiffs() {
  return (
    <div className="animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both relative w-full max-w-4xl p-5">
      <Connectors />
      <div className="relative grid items-center gap-2 sm:gap-8 md:grid-cols-2">
        <div>
          <Card
            className={clsx(
              "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both flex flex-col gap-3 p-3",
              "h-22 overflow-hidden max-md:mask-b-from-80% sm:h-40 md:h-auto",
            )}
          >
            <div className="flex items-center justify-between">
              <Title>
                <ContainedIcon variant="danger" icon={ImageIcon} />
                Ungrouped
              </Title>
              <Badge>
                <DotIndicator variant="danger" />
                13 snapshots
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <DiffRow tone="danger" emphasis="high" />
              <DiffRow tone="danger" emphasis="med" />
              <DiffRow tone="danger" emphasis="low" />
              <DiffRow tone="danger" emphasis="med" />
              <DiffRow tone="danger" emphasis="low" />
              <DiffRow tone="danger" emphasis="low" />
              <DiffRow tone="danger" emphasis="low" />
            </div>
          </Card>
        </div>

        <Card
          className={clsx(
            "animate-slide-up-fade animate-delay-150 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both flex h-30 flex-col gap-3 p-3",
            "h-22 overflow-hidden max-md:mask-b-from-80% sm:h-40 md:h-auto",
          )}
        >
          <div className="flex items-center justify-between">
            <Title>
              <ContainedIcon variant="primary" icon={ImagesIcon} />
              Grouped
            </Title>
            <Badge>
              <DotIndicator variant="primary" />3 reviews
            </Badge>
          </div>

          <div className="flex flex-col gap-1">
            <GroupCard count={9} selected={true} accent="primary" />
            <GroupCard count={3} selected={false} accent="primary" />
            <DiffRow tone="danger" emphasis="high" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Connectors() {
  return (
    <svg
      className="animate-fade-in animate-delay-100 animate-duration-400 fill-mode-both pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 860 460"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.32" stopColor="rgba(124,92,255,0.28)" />
          <stop offset="0.68" stopColor="rgba(124,92,255,0.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path
        d="M388 156 C 454 156, 458 118, 520 118"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M388 204 C 454 204, 458 170, 520 170"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M388 252 C 454 252, 458 222, 520 222"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />

      <path
        d="M388 268 C 454 268, 458 242, 520 242"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M388 302 C 454 302, 458 306, 520 306"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M388 332 C 454 332, 458 334, 520 334"
        stroke="url(#g)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

function DiffRow(props: { tone: "danger"; emphasis: "high" | "med" | "low" }) {
  const emphasisOpacity = {
    high: "bg-(--danger-9)/16 border-(--danger-9)/30",
    med: "bg-(--danger-9)/12 border-(--danger-9)/24",
    low: "bg-(--danger-9)/10 border-(--danger-9)/20",
  }[props.emphasis];

  return (
    <div className="bg-(--neutral-9)/03 flex items-center gap-2 rounded border border-(--neutral-9)/10 px-2 py-2">
      <div className="bg-(--neutral-9)/08 h-2 w-10 shrink-0 rounded-lg border border-(--neutral-9)/10" />
      <div className="h-2.5 w-[72%] rounded-full bg-(--neutral-9)/12" />

      <div
        className={clsx(
          "h-2 w-14 shrink-0 rounded-full border backdrop-blur-[2px]",
          emphasisOpacity,
        )}
        aria-hidden="true"
      />
      <ApprovalButtons />
    </div>
  );
}

function GroupCard(props: {
  count: number;
  selected: boolean;
  accent: "primary";
}) {
  return (
    <div className={clsx("rounded border border-(--primary-7)/30 p-3")}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <span
            className={clsx(
              "h-2.5 w-2.5 rounded-full",
              props.selected
                ? "bg-(--primary-8) shadow-[0_0_0_4px_rgba(124,92,255,0.14)]"
                : "bg-(--primary-8)/70 shadow-[0_0_0_4px_rgba(124,92,255,0.10)]",
            )}
            aria-hidden="true"
          />
          <div
            className={clsx("h-2.5 flex-1 rounded-full bg-(--neutral-9)/12")}
          />
        </div>

        <Badge>
          <DotIndicator variant="primary" />
          {props.count} similar
        </Badge>
        <ApprovalButtons />
      </div>
    </div>
  );
}

function ApprovalButtons() {
  return (
    <div className="flex gap-1">
      <div className="rounded-full border-[0.5px] p-1 text-(--success-9)">
        <ThumbsUpIcon className="size-2.5" />
      </div>
      <div className="rounded-full border-[0.5px] p-1 text-(--danger-9)">
        <ThumbsDownIcon className="size-2.5" />
      </div>
    </div>
  );
}
