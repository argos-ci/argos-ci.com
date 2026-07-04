"use client";

import clsx from "clsx";
import {
  BugPlayIcon,
  ImageOffIcon,
  LayersIcon,
  LinkIcon,
  PocketKnifeIcon,
  RepeatIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SplitIcon,
  SunMoonIcon,
  TagIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import Link from "next/link";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";

type FeatureTile = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  featured?: boolean;
};

const FEATURES: FeatureTile[][] = [
  [
    {
      title: "Enhanced Stabilization",
      icon: SparklesIcon,
      href: "/docs/learn/reliability-and-flakiness/flaky-tests",
    },
    {
      title: "Test Context",
      icon: SunMoonIcon,
      href: "/docs/learn/how-to-guides/visual-coverage/adding-screenshot-metadata",
    },
  ],
  [
    {
      title: "Argos Helpers",
      icon: PocketKnifeIcon,
      href: "/docs/learn/reliability-and-flakiness/flaky-tests/argos-helpers",
    },
    {
      title: "Test Retries",
      icon: RotateCcwIcon,
      href: "/changelog/2024-04-29-retried-failures",
    },
    {
      title: "Failure Screenshots",
      icon: ImageOffIcon,
      href: "/docs/sdks-reference/playwright#setup-tests-debugging",
    },
  ],
  [
    {
      title: "Trace Visualizer",
      icon: BugPlayIcon,
      href: "/docs/sdks-reference/playwright#setup-tests-debugging",
    },
    {
      title: "Argos SDK",
      icon: ArgosEmblem,
      href: "/docs/sdks-reference/playwright",
      featured: true,
    },
    {
      title: "Test Sharding",
      icon: LayersIcon,
      href: "/docs/learn/how-to-guides/ci-pipelines/parallel-testing-sharding",
    },
  ],
  [
    {
      title: "Test Projects",
      icon: SplitIcon,
      href: "/docs/sdks-reference/playwright#create-multiple-argos-builds-from-a-single-suite-of-tests",
    },
    {
      title: "Test Annotations",
      icon: TagIcon,
      href: "/docs/sdks-reference/playwright#test-annotations",
    },
    {
      title: "Preview URL linking",
      icon: LinkIcon,
      href: "/docs/sdks-reference/playwright#set-a-preview-url",
    },
  ],
  [
    {
      title: "Repeat-each debunk",
      icon: RepeatIcon,
      href: "/docs/sdks-reference/playwright#debug-flaky-tests",
    },
    {
      title: "CSP integration",
      icon: ShieldCheckIcon,
      href: "/docs/sdks-reference/playwright#configure-content-security-policy-csp",
    },
  ],
];

export function IntegratedRuns() {
  let count = 0;
  return (
    <div className="flex size-fit cursor-default flex-col items-center gap-4 p-3">
      {FEATURES.map((features, index) => {
        return (
          <div
            key={index}
            className="flex transform-[translateZ(0)] items-center gap-4"
          >
            {features.map((feature) => {
              const index = count++;
              return (
                <Tile
                  key={index}
                  {...feature}
                  style={{
                    animationDelay: `${index * 40}ms`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Tile(
  props: FeatureTile & { className?: string; style?: React.CSSProperties },
) {
  const { title, icon: Icon, href, featured, className, style } = props;

  return (
    <Link href={href} aria-label={title}>
      <Card
        className={clsx(
          "animate-zoom-in motion-reduce:animate-fade-in animate-duration-200 fill-mode-both flex cursor-pointer items-center justify-center gap-2 p-3 font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-(--primary-7)",
          featured
            ? "min-w-48 font-mono text-sm ring-4 ring-(--primary-4)"
            : "min-w-40 flex-col text-xs",
          className,
        )}
        style={style}
      >
        {featured ? (
          <div className="rounded-full border-[0.5px] bg-linear-60 from-(--neutral-2) p-2">
            <Icon className={featured ? "size-5" : "size-4"} aria-hidden />
          </div>
        ) : (
          <Icon className="size-4" aria-hidden />
        )}
        <span>{title}</span>
      </Card>
    </Link>
  );
}
