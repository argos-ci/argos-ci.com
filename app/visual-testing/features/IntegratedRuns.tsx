import clsx from "clsx";
import {
  BinaryIcon,
  GaugeIcon,
  GitMergeIcon,
  LayersIcon,
  RefreshCwIcon,
  RepeatIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UploadCloudIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";

type Tone = "primary" | "success" | "warning" | "neutral";

type FeatureTile = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  tone: Tone;
  featured?: boolean;
};

const FEATURES: FeatureTile[] = [
  { title: "Sharding aware", icon: LayersIcon, tone: "neutral" },
  { title: "Parallel workers", icon: GaugeIcon, tone: "neutral" },
  { title: "Retries stay scoped", icon: RotateCcwIcon, tone: "neutral" },
  { title: "Repeat-each deterministic", icon: RepeatIcon, tone: "neutral" },
  { title: "Seeded snapshots", icon: BinaryIcon, tone: "neutral" },
  {
    title: "Single Argos build",
    icon: ArgosEmblem,
    tone: "neutral",
    featured: true,
  },
  { title: "Baseline locked", icon: ShieldCheckIcon, tone: "neutral" },
  { title: "Uploads merged", icon: UploadCloudIcon, tone: "neutral" },
  { title: "Git checks & queues", icon: GitMergeIcon, tone: "neutral" },
  { title: "Flake resistant", icon: RefreshCwIcon, tone: "neutral" },
  { title: "Deterministic seeds", icon: SparklesIcon, tone: "neutral" },
];

export function IntegratedRuns() {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-(--neutral-6)/70 bg-[linear-gradient(180deg,var(--neutral-1),rgba(248,250,252,0.92))] p-4 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(148,163,184,0.12),rgba(255,255,255,0)),radial-gradient(circle_at_78%_30%,rgba(148,163,184,0.08),rgba(255,255,255,0))]" />
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {FEATURES.map((feature, index) => (
          <Tile key={feature.title} index={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

function Tile(props: FeatureTile & { index: number }) {
  const { title, icon: Icon, tone, featured, index } = props;
  const toneStyles: Record<Tone, string> = {
    primary: "",
    success: "",
    warning: "",
    neutral:
      "border-(--neutral-6)/70 text-(--neutral-12) bg-white/80 backdrop-blur-[1px]",
  };

  return (
    <Card
      className={clsx(
        "flex min-h-20 items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-semibold transition duration-200",
        toneStyles[tone],
        featured &&
          "border-(--neutral-8)/80 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.55)] md:col-span-2",
      )}
      shadow="shadow-md"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="grid size-8 place-items-center rounded-xl border border-(--neutral-6)/60 bg-white/80">
        <Icon className="size-4" aria-hidden />
      </span>
      <span>{title}</span>
    </Card>
  );
}
