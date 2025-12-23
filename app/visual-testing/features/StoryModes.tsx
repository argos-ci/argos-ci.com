import clsx from "clsx";
import {
  Globe2Icon,
  type LucideIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type ModeTone = "primary" | "success" | "danger" | "neutral";
type ModeAccent = Exclude<ModeTone, "neutral">;
type SnapshotStatus = "approved" | "diff" | "pending";

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

const STORY_PREVIEWS = [
  { theme: "Light", viewport: "Desktop", locale: "EN" },
  { theme: "Dark", viewport: "Mobile", locale: "FR" },
];

const SNAPSHOTS: Array<{
  id: string;
  modes: string[];
  status: SnapshotStatus;
}> = [
  {
    id: "light-desktop-en",
    modes: ["Light", "Desktop", "EN"],
    status: "approved",
  },
  {
    id: "dark-mobile-fr",
    modes: ["Dark", "Mobile", "FR"],
    status: "diff",
  },
  {
    id: "light-mobile-en",
    modes: ["Light", "Mobile", "EN"],
    status: "pending",
  },
];

export function StoryModes() {
  return (
    <div className="relative isolate mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-[1.05fr,0.95fr]">
      <Glow position="left" />
      <Glow position="right" />
      <StorybookModes />
      <ArgosSnapshots />
    </div>
  );
}

function StorybookModes() {
  return (
    <Card
      className="relative overflow-hidden border-(--primary-6)/60 bg-[linear-gradient(215deg,--alpha(var(--primary-2)/70%),var(--neutral-1))]"
      shadow="shadow-md"
    >
      <div className="flex items-center justify-between border-b border-(--primary-6)/60 px-4 py-3">
        <SmallTitle className="text-(--neutral-12)">
          <ThemeImage src={storybook.logo} alt="" className="size-5" />
          Storybook story
        </SmallTitle>
        <Chip variant="primary" className="px-3 py-[2px] text-[11px]">
          Story modes on
        </Chip>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[1.05fr,0.95fr]">
        <StoryCanvas />
        <ModeMatrix />
      </div>
    </Card>
  );
}

function StoryCanvas() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-(--neutral-6)/60 bg-white/80 p-3 shadow-inner">
      <div
        aria-hidden
        className="pointer-events-none absolute top-2 -left-24 h-32 w-32 rounded-full bg-(--primary-4)/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-28 w-28 rounded-full bg-(--blue-4)/18 blur-3xl"
      />

      <div className="flex items-center justify-between text-[11px] font-semibold text-(--neutral-11)">
        <div className="inline-flex items-center gap-2 text-(--neutral-12)">
          <ThemeImage src={storybook.logo} alt="" className="size-4" />
          Button / Primary
        </div>
        <Badge className="border-(--primary-6)/60 bg-(--primary-2)/50 text-(--primary-11)">
          <DotIndicator variant="primary" />
          Story modes
        </Badge>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr,0.9fr]">
        {STORY_PREVIEWS.map((preview) => (
          <StoryFrame key={preview.theme} {...preview} />
        ))}
      </div>
    </div>
  );
}

function StoryFrame(props: {
  theme: "Light" | "Dark";
  viewport: "Desktop" | "Mobile";
  locale: "EN" | "FR";
}) {
  const { theme, viewport, locale } = props;
  const isDark = theme === "Dark";
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg border p-3 shadow-xs transition-colors",
        isDark
          ? "border-(--neutral-7)/60 bg-[linear-gradient(180deg,var(--neutral-12),#0f1116)] text-(--neutral-3)"
          : "border-(--neutral-5)/60 bg-[linear-gradient(180deg,var(--neutral-1),white)]",
      )}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold text-(--neutral-11)">
        <div className="flex flex-wrap items-center gap-1.5">
          <ModePill label={theme} tone="primary" compact />
          <ModePill label={viewport} tone="success" compact />
          <ModePill label={locale} tone="danger" compact />
        </div>
        <Badge className="border-(--neutral-6)/60 bg-white/60 text-(--neutral-11)">
          Story preview
        </Badge>
      </div>
      <div className="mt-3 space-y-2">
        <div
          className={clsx(
            "h-2.5 w-[60%] rounded-full",
            isDark ? "bg-white/30" : "bg-(--neutral-4)",
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <div
            className={clsx(
              "h-14 rounded-lg",
              isDark ? "bg-white/10" : "bg-(--neutral-3)",
            )}
          />
          <div
            className={clsx(
              "h-14 rounded-lg",
              isDark ? "bg-white/12" : "bg-(--neutral-3)",
            )}
          />
          <div
            className={clsx(
              "h-14 rounded-lg",
              isDark ? "bg-white/15" : "bg-(--neutral-3)",
            )}
          />
        </div>
        <div className="flex gap-2">
          <div
            className={clsx(
              "h-3 w-16 rounded-full",
              isDark ? "bg-white/25" : "bg-(--neutral-4)",
            )}
          />
          <div
            className={clsx(
              "h-3 flex-1 rounded-full",
              isDark ? "bg-white/12" : "bg-(--neutral-4)/70",
            )}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 border-t border-white/8" />
    </div>
  );
}

function ModeMatrix() {
  return (
    <div className="space-y-3 rounded-xl border border-(--neutral-6)/60 bg-white/70 p-3 shadow-xs">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-(--neutral-11)">
        <DotIndicator variant="primary" />
        Modes applied per story
      </div>
      <div className="space-y-2.5">
        {MODES.map((mode) => (
          <ModeRow key={mode.key} {...mode} />
        ))}
      </div>
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
    <div className="rounded-lg border border-(--neutral-6)/60 bg-white/80 p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-(--neutral-12)">
          <Icon className="size-3.5 text-(--neutral-10)" />
          <DotIndicator variant={tone} />
          {label}
        </div>
        <span className="text-[11px] font-semibold tracking-wide text-(--neutral-10) uppercase">
          Auto
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

function ArgosSnapshots() {
  return (
    <Card
      className="relative overflow-hidden border-(--primary-6)/60 bg-[linear-gradient(200deg,var(--neutral-1),--alpha(var(--primary-2)/50%))]"
      shadow="shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-(--primary-6)/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg border border-(--primary-6)/60 bg-(--primary-2)/60 shadow-[0_12px_28px_-16px_rgba(80,62,255,0.9)]">
            <ArgosEmblem
              className="size-5 w-auto text-(--primary-10)"
              aria-hidden
            />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-(--neutral-12)">
              Argos snapshots
            </div>
            <div className="text-[11px] font-semibold text-(--neutral-10)">
              One story, multiple modes
            </div>
          </div>
        </div>
        <Badge className="border-(--success-7)/60 bg-(--success-2)/60 text-(--success-11)">
          <DotIndicator variant="success" />
          Captured in CI
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        {SNAPSHOTS.map((snapshot) => (
          <SnapshotRow key={snapshot.id} {...snapshot} />
        ))}
        <div className="rounded-lg border border-(--neutral-6)/60 bg-white/70 px-3 py-2 text-[11px] font-semibold text-(--neutral-11)">
          Mode coverage without duplicating stories or tests.
        </div>
      </div>
    </Card>
  );
}

function SnapshotRow(props: { modes: string[]; status: SnapshotStatus }) {
  const { modes, status } = props;
  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-lg border px-3 py-2 shadow-xs",
        {
          approved: "border-(--primary-7)/60 bg-(--primary-2)/35",
          pending: "border-(--amber-7)/60 bg-(--amber-2)/35",
          diff: "border-(--danger-7)/60 bg-(--danger-2)/35 shadow-[0_18px_46px_-28px_rgba(234,63,90,0.6)]",
        }[status],
      )}
    >
      <div className="flex-1">
        <div className="text-sm font-semibold text-(--neutral-12)">
          Button / Primary
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {modes.map((mode) => (
            <ModePill
              key={mode}
              label={mode}
              tone={getModeTone(mode)}
              icon={getModeIcon(mode)}
              compact
            />
          ))}
        </div>
      </div>
      <SnapshotPreview status={status} />
      <StatusBadge status={status} />
    </div>
  );
}

function SnapshotPreview(props: { status: SnapshotStatus }) {
  const { status } = props;
  return (
    <div
      className={clsx(
        "relative hidden w-20 shrink-0 rounded-md border border-(--neutral-6)/60 bg-white/80 p-2 md:block",
        status === "diff" && "border-(--danger-7)/60",
      )}
    >
      {status === "diff" ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-md border-(--danger-7)/60"
          style={{
            background:
              "repeating-linear-gradient(135deg, rgba(234,63,90,0.14), rgba(234,63,90,0.14) 8px, rgba(234,63,90,0.06) 8px, rgba(234,63,90,0.06) 16px)",
            mixBlendMode: "multiply",
          }}
          aria-hidden
        />
      ) : null}
      <div className="space-y-1">
        <div className="h-2 w-[70%] rounded bg-(--neutral-4)/70" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 rounded bg-(--neutral-3)" />
          <div className="h-6 rounded bg-(--neutral-3)" />
        </div>
        <div className="h-2 w-[80%] rounded bg-(--neutral-4)/60" />
      </div>
    </div>
  );
}

function StatusBadge(props: { status: SnapshotStatus }) {
  const { status } = props;
  if (status === "approved") {
    return (
      <Badge className="border-(--success-7)/60 bg-(--success-2)/60 text-(--success-11)">
        <DotIndicator variant="success" />
        Approved
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="border-(--amber-7)/60 bg-(--amber-2)/60 text-(--amber-11)">
        Pending
      </Badge>
    );
  }
  return (
    <Badge className="border-(--danger-7)/60 bg-(--danger-2)/60 text-(--danger-11)">
      Needs review
    </Badge>
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
      <span className={clsx("size-1.5 rounded-full", dotClasses[tone])} />
      {Icon ? <Icon className="size-3" aria-hidden /> : null}
      {label}
    </span>
  );
}

function getModeTone(mode: string): ModeTone {
  if (mode === "Light" || mode === "Dark") return "primary";
  if (mode === "Desktop" || mode === "Mobile") return "success";
  if (mode === "EN" || mode === "FR") return "danger";
  return "neutral";
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

const dotClasses: Record<ModeTone, string> = {
  primary: "bg-(--primary-9)",
  success: "bg-(--success-9)",
  danger: "bg-(--danger-9)",
  neutral: "bg-(--neutral-8)",
};

function Glow(props: { position: "left" | "right" }) {
  const { position } = props;
  return (
    <div
      className={clsx(
        "pointer-events-none absolute h-44 w-44 rounded-full blur-3xl",
        {
          left: "top-6 -left-16 bg-(--primary-5)/14",
          right: "-right-12 bottom-4 bg-(--blue-4)/14",
        }[position],
      )}
      aria-hidden
    />
  );
}
