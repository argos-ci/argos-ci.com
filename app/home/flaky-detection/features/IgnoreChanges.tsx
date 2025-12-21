"use client";

import clsx from "clsx";
import {
  AlertTriangleIcon,
  CheckIcon,
  FlagOffIcon,
  MousePointerClickIcon,
} from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ApplicationSVG } from "../../common/ApplicationSVG";
import { Badge } from "../../common/Badge";
import { Card } from "../../common/Card";
import { ContainedIcon } from "../../common/ContainedIcon";
import { DotIndicator } from "../../common/DotIndicator";
import { Title } from "../../common/Title";

export function IgnoreChanges() {
  return (
    <div className="relative flex w-full max-w-4xl items-center gap-10 p-5">
      <Line
        className={clsx(
          "absolute left-1/2 z-0 size-75 -translate-x-1/2",
          "animate-fade-in animate-delay-300 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      />

      <Card
        className={clsx(
          "relative flex flex-1 flex-col gap-3 p-3",
          "animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <div className="flex items-center justify-between">
          <Title>
            <ContainedIcon variant="danger" icon={AlertTriangleIcon} />
            Flaky build
          </Title>
          <Badge>
            <DotIndicator variant="danger" />1 diff
          </Badge>
        </div>

        <ApplicationSVG withChanges />
      </Card>

      <Card
        className={clsx(
          "relative p-5",
          "animate-slide-up-fade animate-delay-100 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <IgnoreAction />
        <div className="bg-app shadow-xxs pointer-events-none absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1 text-xs whitespace-nowrap text-(--neutral-12)">
          <MousePointerClickIcon
            className="size-4 text-(--primary-9)"
            aria-hidden="true"
            strokeWidth={1}
          />
          Ignore changes
        </div>
      </Card>

      <Card
        className={clsx(
          "relative flex flex-1 flex-col gap-3 p-3",
          "animate-slide-up-fade animate-delay-200 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
        )}
      >
        <div className="flex items-center justify-between">
          <Title>
            <ContainedIcon variant="success" icon={CheckIcon} />
            Next build
          </Title>
          <Badge>
            <DotIndicator variant="success" />
            No changes detected
          </Badge>
        </div>

        <div className="relative">
          <ApplicationSVG withChanges="success" />

          <div className="pointer-events-none absolute right-2 bottom-2">
            <Badge>
              <DotIndicator variant="primary" />
              Ignored previously
            </Badge>
          </div>
        </div>
      </Card>
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

function Line(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 300 300"
      className={clsx("pointer-events-none", props.className)}
      aria-hidden="true"
    >
      <path
        d="M 0 150 C 180 150 205 150 300 150"
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
    </svg>
  );
}
