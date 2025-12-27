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

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";

type FeatureTile = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  featured?: boolean;
};

const FEATURES: FeatureTile[][] = [
  [
    { title: "Enhanced Stabilization", icon: SparklesIcon },
    { title: "Test Context", icon: SunMoonIcon },
  ],
  [
    { title: "Argos Helpers", icon: PocketKnifeIcon },
    { title: "Test Retries", icon: RotateCcwIcon },
    { title: "Failure Screenshots", icon: ImageOffIcon },
  ],
  [
    { title: "Trace Visualizer", icon: BugPlayIcon },
    {
      title: "Argos SDK",
      icon: ArgosEmblem,
      featured: true,
    },
    { title: "Test Sharding", icon: LayersIcon },
  ],
  [
    { title: "Test Projects", icon: SplitIcon },
    { title: "Test Annotations", icon: TagIcon },
    { title: "Preview URL linking", icon: LinkIcon },
  ],
  [
    { title: "Repeat-each debunk", icon: RepeatIcon },
    { title: "CSP integration", icon: ShieldCheckIcon },
  ],
];

export function IntegratedRuns() {
  let count = 0;
  return (
    <div className="flex size-fit flex-col items-center gap-4 p-3">
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
  const { title, icon: Icon, featured, className, style } = props;

  return (
    <Card
      className={clsx(
        "animate-zoom-in motion-reduce:animate-fade-in animate-duration-200 fill-mode-both flex items-center justify-center gap-2 p-3 font-semibold",
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
  );
}
