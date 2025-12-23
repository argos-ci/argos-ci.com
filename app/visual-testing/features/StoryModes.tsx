import clsx from "clsx";
import {
  Globe2Icon,
  type LucideIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

import { DotIndicator } from "@/components/DotIndicator";

type ModeTone = "primary" | "success" | "danger" | "neutral";
type ModeAccent = Exclude<ModeTone, "neutral">;

const MODES: Array<{
  key: string;
  label: string;
  tone: ModeAccent;
  options: string[];
  icon: LucideIcon;
}> = [
  {
    key: "theme",
    label: "Theme",
    tone: "primary",
    options: ["Light", "Dark"],
    icon: SunIcon,
  },
  {
    key: "viewport",
    label: "Viewport",
    tone: "success",
    options: ["Desktop", "Mobile"],
    icon: MonitorSmartphoneIcon,
  },
  {
    key: "locale",
    label: "Locale",
    tone: "danger",
    options: ["EN", "FR"],
    icon: Globe2Icon,
  },
];

export function StoryModes() {
  return (
    <div className="w-full space-y-3">
      {MODES.map(({ key, ...mode }) => (
        <ModeRow key={key} {...mode} />
      ))}
    </div>
  );
}

function ModeRow(props: {
  label: string;
  tone: ModeAccent;
  options: string[];
  icon: LucideIcon;
}) {
  const { label, tone, options, icon: Icon } = props;
  return (
    <div className="bg-app rounded-lg border-[0.5px] p-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-(--neutral-12)">
          <Icon className="size-3.5 text-(--neutral-10)" />
          <DotIndicator variant={tone} />
          {label}
        </div>
        <span className="text-[11px] font-semibold tracking-wide text-(--neutral-10) uppercase">
          Enabled
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <ModePill
            key={option}
            label={option}
            tone={tone}
            icon={getModeIcon(option)}
          />
        ))}
      </div>
    </div>
  );
}

function ModePill(props: {
  label: string;
  tone: ModeTone;
  compact?: boolean;
  icon?: LucideIcon;
}) {
  const { label, tone, compact = false, icon: Icon } = props;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 font-semibold",
        compact ? "py-[3px] text-[10px]" : "py-[6px] text-[11px]",
        toneClasses[tone],
      )}
    >
      {Icon ? <Icon className="size-3" aria-hidden /> : null}
      {label}
    </span>
  );
}

function getModeIcon(mode: string): LucideIcon | undefined {
  if (mode === "Light") return SunIcon;
  if (mode === "Dark") return MoonIcon;
  if (mode === "Desktop" || mode === "Mobile") return MonitorSmartphoneIcon;
  if (mode === "EN" || mode === "FR") return Globe2Icon;
  return undefined;
}

const toneClasses: Record<ModeTone, string> = {
  primary: "border-(--primary-6)/70 bg-(--primary-2)/70 text-(--primary-11)",
  success: "border-(--success-6)/70 bg-(--success-2)/70 text-(--success-11)",
  danger: "border-(--danger-6)/70 bg-(--danger-2)/70 text-(--danger-11)",
  neutral: "border-(--neutral-6)/70 bg-(--neutral-2)/70 text-(--neutral-11)",
};
