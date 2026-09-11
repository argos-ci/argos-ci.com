"use client";

import clsx from "clsx";
import {
  AlertTriangleIcon,
  CheckIcon,
  FlagOffIcon,
  MousePointerClickIcon,
} from "lucide-react";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ContainedIcon } from "@/components/ContainedIcon";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * The flow reads left to right on wider screens: the flaky build, the ignore
 * action, the next build. On phones the two builds stack, one above the
 * other, with the action as a pill on a vertical line between them; side by
 * side they were too narrow for their own headers.
 */
export function IgnoreChanges() {
  return (
    <div className="relative flex w-full max-w-4xl flex-col items-center gap-6 p-5 sm:flex-row sm:gap-10">
      <FlowLine
        className={clsx(
          "absolute left-1/2 z-0 hidden size-75 -translate-x-1/2 sm:block",
          "animate-fade-in animate-delay-300 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      />
      {/* An explicit height: an absolutely positioned svg keeps its intrinsic
          150px rather than stretching between top and bottom. */}
      <FlowLine
        vertical
        className={clsx(
          "absolute top-5 left-1/2 z-0 h-[calc(100%-2.5rem)] w-2 -translate-x-1/2 sm:hidden",
          "animate-fade-in animate-delay-300 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      />

      <BuildCard className="animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in">
        <Header>
          <SmallTitle>
            <ContainedIcon variant="danger" icon={AlertTriangleIcon} />
            Flaky build
          </SmallTitle>
          <Badge>
            <DotIndicator variant="danger" />1 diff
          </Badge>
        </Header>

        <ApplicationSVG withChanges />
      </BuildCard>

      {/* Phones: the action alone, on the line between the two builds. */}
      <IgnorePill
        className={clsx(
          "relative z-10 sm:hidden",
          "animate-slide-up-fade animate-delay-100 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      />

      <Card
        className={clsx(
          "relative hidden p-5 md:block",
          "animate-slide-up-fade animate-delay-100 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <IgnoreAction />
        <IgnorePill className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2" />
      </Card>

      <BuildCard
        className={clsx(
          "animate-slide-up-fade animate-delay-200 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <Header>
          <SmallTitle>
            <ContainedIcon variant="success" icon={CheckIcon} />
            Next build
          </SmallTitle>
          {/* The narrow phone card has no room for the full label next to
              the title; "No changes" and the green dot say the same. */}
          <Badge className="shrink-0 whitespace-nowrap">
            <DotIndicator variant="success" />
            <span>
              No changes<span className="max-sm:hidden"> detected</span>
            </span>
          </Badge>
        </Header>

        <div className="relative">
          <ApplicationSVG withChanges="success" />

          <div className="pointer-events-none absolute right-2 bottom-2">
            <Badge>
              <DotIndicator variant="primary" />
              Ignored
            </Badge>
          </div>
        </div>
      </BuildCard>
    </div>
  );
}

/**
 * Narrow and centered on phones, so the stack stays short; a full column of
 * the row above that.
 */
function BuildCard(props: ComponentPropsWithRef<"div">) {
  return (
    <Card
      {...props}
      className={clsx(
        "relative flex w-full max-w-64 flex-col gap-3 p-3 sm:max-w-none sm:flex-1",
        props.className,
      )}
    />
  );
}

function Header(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center justify-between gap-3",
        props.className,
      )}
    />
  );
}

function IgnorePill(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "shadow-xxs flex items-center gap-1 rounded-full border bg-app px-2 py-1 text-xs whitespace-nowrap text-(--neutral-12)",
        props.className,
      )}
    >
      <MousePointerClickIcon
        className="size-4 text-(--primary-9)"
        aria-hidden="true"
        strokeWidth={1}
      />
      Ignore changes
    </div>
  );
}

function IgnoreAction(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "bg-app relative grid size-18 place-items-center rounded-xl border-4 border-(--primary-4)",
        props.className,
      )}
      aria-hidden="true"
    >
      <FlagOffIcon className="size-10 text-(--primary-10)" strokeWidth={1} />
    </div>
  );
}

/**
 * The dashed line the flow runs along, its dashes drifting from the flaky
 * build toward the next one. Drawn in percentages of its box so the same
 * element serves the row and the stack.
 */
function FlowLine(
  props: ComponentPropsWithoutRef<"svg"> & { vertical?: boolean },
) {
  const { vertical = false, ...rest } = props;
  return (
    <svg
      {...rest}
      className={clsx("pointer-events-none", rest.className)}
      aria-hidden="true"
    >
      <line
        x1={vertical ? "50%" : "0"}
        y1={vertical ? "0" : "50%"}
        x2={vertical ? "50%" : "100%"}
        y2={vertical ? "100%" : "50%"}
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
      </line>
    </svg>
  );
}
