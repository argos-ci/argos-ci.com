import clsx from "clsx";
import {
  ArrowRightIcon,
  CheckIcon,
  type LucideIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { PILLARS, type PillarSlug } from "@/lib/pillars";

/**
 * The hero's visual: the four pillars as four cards in the order a pull
 * request goes through them, each carrying one artifact that looks like the
 * product — a preview URL, a file list with its diff, a verdict, a flakiness
 * curve. It names the same four things the headline does.
 */
export function PillarFlow() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-2 md:flex-row md:items-stretch">
      {PILLARS.map((pillar, index) => (
        <Fragment key={pillar.slug}>
          {index > 0 ? (
            <div
              aria-hidden
              className="flex items-center justify-center text-(--neutral-8)"
            >
              <ArrowRightIcon className="size-4 max-md:rotate-90" />
            </div>
          ) : null}
          <Link
            href={pillar.href}
            className={clsx(
              "group min-w-0 flex-1 no-underline",
              "animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
              [
                "animate-delay-150",
                "animate-delay-300",
                "animate-delay-500",
                "animate-delay-700",
              ][index],
            )}
          >
            <Card
              shadow="high"
              className="flex h-full flex-col gap-4 p-4 text-left transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-lg/10"
            >
              <div className="flex items-center justify-between gap-2">
                <FeatureIndicator color={pillar.color}>
                  {pillar.name}
                </FeatureIndicator>
                <span className="font-mono text-xxxs text-low">
                  0{index + 1}
                </span>
              </div>
              <div className="flex min-h-18 items-center">
                {ARTIFACTS[pillar.slug]}
              </div>
              <p className="text-xs leading-relaxed font-medium text-low">
                {pillar.description}
              </p>
            </Card>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

function DeployArtifact() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center gap-1.5 rounded-md border-[0.5px] bg-(--neutral-2) px-2 py-1 font-mono text-xxxs text-low">
        <span className="size-1.5 shrink-0 rounded-full bg-(--teal-9)" />
        <span className="truncate">ui-checkout-acme.argos-ci.live</span>
      </div>
      <div className="flex items-center gap-2 text-xxxs text-low">
        <Chip variant="success" className="text-xxxs">
          Ready
        </Chip>
        Preview · PR #482
      </div>
    </div>
  );
}

function FileRow(props: {
  name: string;
  dot: string;
  status: React.ReactNode;
}) {
  const { name, dot, status } = props;
  return (
    <li className="flex items-center gap-1.5 rounded-md border-[0.5px] px-2 py-0.5">
      <span className={clsx("size-1.5 shrink-0 rounded-full", dot)} />
      <span className="truncate">{name}</span>
      <span className="ml-auto shrink-0">{status}</span>
    </li>
  );
}

function DiffArtifact() {
  return (
    <ul className="flex w-full flex-col gap-1 font-mono text-xxxs">
      <FileRow
        name="checkout.png"
        dot="bg-(--danger-9)"
        status={<span className="text-(--danger-11)">2 changes</span>}
      />
      <FileRow
        name="README.md"
        dot="bg-(--blue-9)"
        status={
          <span>
            <span className="text-(--success-11)">+4</span>{" "}
            <span className="text-(--danger-11)">−1</span>
          </span>
        }
      />
      <FileRow
        name="schema.json"
        dot="bg-(--neutral-7)"
        status={<span className="text-low">unchanged</span>}
      />
    </ul>
  );
}

function Avatar(props: {
  initials?: string;
  icon?: LucideIcon;
  className: string;
}) {
  const { initials, icon: Icon, className } = props;
  return (
    <span
      className={clsx(
        "flex size-6 items-center justify-center rounded-full border-2 border-(--color-app,white) font-mono text-[0.55rem] font-semibold",
        className,
      )}
    >
      {Icon ? <Icon className="size-3" /> : initials}
    </span>
  );
}

function ReviewArtifact() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          <Avatar initials="NB" className="bg-(--pink-4) text-(--pink-11)" />
          <Avatar
            initials="AC"
            className="bg-(--violet-4) text-(--violet-11)"
          />
          <Avatar icon={TerminalIcon} className="bg-(--neutral-3) text-low" />
        </div>
        <Chip variant="success" icon={CheckIcon} className="text-xxxs">
          Approved
        </Chip>
      </div>
      <div className="text-xxxs text-low">
        3 / 3 reviewed · one from the CLI
      </div>
    </div>
  );
}

function StabilizeArtifact() {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-end justify-between text-xxxs">
        <span className="text-low">Flakiness · 7 days</span>
        <span className="font-mono">
          <span className="text-(--amber-11)">63</span>
          <span className="text-low"> → </span>
          <span className="text-(--success-11)">4</span>
        </span>
      </div>
      <svg viewBox="0 0 120 28" className="h-7 w-full" aria-hidden>
        <defs>
          <linearGradient id="pillar-flow-flakiness" x1="0" x2="1">
            <stop offset="0" stopColor="var(--amber-9)" />
            <stop offset="1" stopColor="var(--grass-9)" />
          </linearGradient>
        </defs>
        <path
          d="M0 6 L14 10 L28 4 L42 12 L56 9 L70 18 L84 22 L98 24 L120 25 V28 H0 Z"
          fill="url(#pillar-flow-flakiness)"
          opacity="0.12"
        />
        <path
          d="M0 6 L14 10 L28 4 L42 12 L56 9 L70 18 L84 22 L98 24 L120 25"
          fill="none"
          stroke="url(#pillar-flow-flakiness)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex gap-1.5 text-xxxs">
        <Chip variant="neutral" className="text-xxxs">
          3 ignored
        </Chip>
        <Chip variant="neutral" className="text-xxxs">
          trace attached
        </Chip>
      </div>
    </div>
  );
}

const ARTIFACTS: Record<PillarSlug, React.ReactNode> = {
  deploy: <DeployArtifact />,
  diff: <DiffArtifact />,
  review: <ReviewArtifact />,
  stabilize: <StabilizeArtifact />,
};
