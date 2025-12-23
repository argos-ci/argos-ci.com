import clsx from "clsx";
import { HardDriveIcon, ShieldCheckIcon, XCircleIcon } from "lucide-react";

import { playwright } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type Tone = "primary" | "success" | "warning" | "neutral";

const FLOW = [
  {
    title: "Playwright captures snapshots",
    meta: "cart.spec.ts · shard 3/6",
    tone: "primary" as Tone,
    pill: "Inside CI",
  },
  {
    title: "Synced straight to Argos",
    meta: "12 screenshots · 18s",
    tone: "success" as Tone,
    pill: "No artifacts",
  },
  {
    title: "Diffs reviewed from the run",
    meta: "Status posted back to PR",
    tone: "neutral" as Tone,
    pill: "No repo noise",
  },
];

const SNAPSHOTS = [
  {
    name: "dashboard.png",
    meta: "desktop · light theme",
    status: "Diff ready",
    tone: "primary" as Tone,
    className: "z-30 translate-y-0 md:translate-y-0",
  },
  {
    name: "checkout.png",
    meta: "mobile · dark theme",
    status: "Approved",
    tone: "success" as Tone,
    className:
      "z-20 -translate-y-3 -rotate-2 md:-translate-y-6 md:-rotate-3",
  },
  {
    name: "profile.png",
    meta: "preview env",
    status: "Pending",
    tone: "warning" as Tone,
    className:
      "z-10 translate-y-3 rotate-2 md:translate-y-6 md:rotate-3",
  },
];

const toneClasses: Record<Tone, string> = {
  primary:
    "border-(--primary-6)/70 bg-[radial-gradient(circle_at_20%_20%,rgba(80,62,255,0.12),transparent_45%),var(--neutral-1)] text-(--neutral-12)",
  success:
    "border-(--success-6)/60 bg-[radial-gradient(circle_at_20%_20%,rgba(39,174,96,0.12),transparent_45%),var(--neutral-1)] text-(--neutral-12)",
  warning:
    "border-(--amber-6)/60 bg-[radial-gradient(circle_at_20%_20%,rgba(248,180,0,0.14),transparent_45%),var(--neutral-1)] text-(--neutral-12)",
  neutral: "border-(--neutral-6)/70 bg-(--neutral-1) text-(--neutral-12)",
};

export function ScreenshotsStayInCI() {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-3">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(80,62,255,0.14),transparent_35%),radial-gradient(circle_at_90%_30%,rgba(80,62,255,0.12),transparent_35%)]" />

      <Card className="relative overflow-hidden border-(--primary-6)/70 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))] shadow-lg">
        <div className="pointer-events-none absolute inset-6 rounded-3xl border border-dashed border-(--primary-6)/60" />

        <div className="relative grid items-center gap-6 px-5 py-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl border border-(--neutral-6)/70 bg-white shadow-xs">
                <ThemeImage src={playwright.logo} alt="" className="size-6" />
              </span>
              <div className="min-w-0">
                <SmallTitle className="leading-tight">
                  Playwright run in CI
                </SmallTitle>
                <p className="text-low text-xs">
                  Screenshots generated where your tests already live.
                </p>
              </div>
              <Chip variant="primary" className="ml-auto px-3 py-[2px] text-[11px]">
                CI workspace
              </Chip>
            </div>

            <Card className="overflow-hidden border-(--neutral-6)/60 bg-white/90 shadow-sm">
              {FLOW.map((flow) => (
                <FlowRow key={flow.title} {...flow} />
              ))}
            </Card>

            <div className="grid gap-3 md:grid-cols-2">
              <Card className="relative overflow-hidden border-(--primary-6)/70 bg-[linear-gradient(135deg,rgba(80,62,255,0.12),transparent_55%),var(--neutral-1)] shadow-sm">
                <div className="flex items-center gap-2 px-4 pt-3">
                  <ArgosEmblem className="size-4 w-auto text-(--primary-10)" />
                  <SmallTitle className="text-sm font-semibold">
                    Review happens inside the run
                  </SmallTitle>
                </div>
                <div className="grid gap-2 px-4 pb-4 text-xs font-semibold text-(--neutral-12)">
                  <MiniStat label="18 snapshots ready" />
                  <MiniStat label="0 files pushed to git" icon="no-commit" />
                </div>
              </Card>

              <Card className="flex items-center gap-3 border-(--neutral-6)/70 bg-white/85 px-4 py-3 shadow-sm">
                <span className="grid size-9 place-items-center rounded-xl border border-dashed border-(--neutral-7)/60 bg-(--neutral-2)">
                  <HardDriveIcon className="size-4 text-(--neutral-11)" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-(--neutral-12)">
                    No artifacts to clean up
                  </div>
                  <p className="text-low text-xs">
                    Screenshots never leave the CI container.
                  </p>
                </div>
                <Chip
                  variant="neutral"
                  className="ml-auto border-dashed px-2 py-[2px] text-[11px]"
                >
                  Ephemeral
                </Chip>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -right-6 top-10 h-32 rounded-full bg-(--primary-5)/15 blur-3xl" />
            <div className="relative h-full min-h-[18rem]">
              {SNAPSHOTS.map((shot) => (
                <ScreenshotCard key={shot.name} {...shot} />
              ))}
              <Badge className="absolute -right-2 -bottom-2 flex items-center gap-2 border-dashed border-(--neutral-6)/70 bg-white/90 text-xs font-semibold text-(--neutral-11) shadow-xs">
                <ShieldCheckIcon className="size-3.5 text-(--primary-10)" />
                Linked to this CI job
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-(--neutral-6)/70 bg-(--neutral-2)/50 px-5 py-3 md:px-10">
          <Chip variant="primary" className="px-3 py-[3px] text-[11px]">
            Screenshots stay inside CI
          </Chip>
          <Chip variant="success" className="px-3 py-[3px] text-[11px]">
            Review without artifact juggling
          </Chip>
          <Chip variant="neutral" className="px-3 py-[3px] text-[11px]">
            No files committed back to git
          </Chip>
        </div>
      </Card>
    </div>
  );
}

function FlowRow(props: (typeof FLOW)[number]) {
  const { title, meta, tone, pill } = props;
  return (
    <div className="flex items-start gap-3 border-b border-(--neutral-6)/60 px-4 py-3 last:border-none">
      <span className="grid size-8 place-items-center rounded-full border border-(--neutral-6)/60 bg-(--neutral-2)">
        <DotIndicator variant={tone === "warning" ? "warning" : tone} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-(--neutral-12)">
            {title}
          </span>
          <Chip variant={tone} className="px-2 py-[2px] text-[11px]">
            {pill}
          </Chip>
        </div>
        <div className="text-low text-xs">{meta}</div>
      </div>
    </div>
  );
}

function ScreenshotCard(props: (typeof SNAPSHOTS)[number]) {
  const { name, meta, status, tone, className } = props;
  return (
    <Card
      className={clsx(
        "absolute left-1/2 w-full max-w-96 -translate-x-1/2 overflow-hidden shadow-md transition-transform duration-500",
        toneClasses[tone],
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-(--neutral-6)/60 px-4 py-2 text-xs font-semibold text-(--neutral-12)">
        <span className="truncate">{name}</span>
        <span className="inline-flex items-center gap-2">
          <Badge className="border-(--neutral-6)/70 bg-white/80 text-[11px] font-semibold">
            CI-only path
          </Badge>
          <ArgosEmblem className="size-3.5 w-auto text-(--primary-10)" />
        </span>
      </div>

      <div className="space-y-3 px-4 py-3">
        <div className="rounded-lg border border-(--neutral-6)/60 bg-[linear-gradient(145deg,var(--neutral-1),var(--neutral-2))] p-2 shadow-xs">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-(--neutral-11)">
            <span>{meta}</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-(--primary-8)" />
              viewport.png
            </span>
          </div>
          <div className="h-24 rounded-md border border-(--neutral-6)/70 bg-[linear-gradient(120deg,rgba(80,62,255,0.09),transparent_55%),linear-gradient(90deg,var(--neutral-3) 0%,var(--neutral-1) 60%)] shadow-inner">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_35%,rgba(80,62,255,0.18),transparent_32%),radial-gradient(circle_at_70%_60%,rgba(80,62,255,0.16),transparent_36%)]" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-(--neutral-12)">
          <div className="flex items-center gap-2">
            <DotIndicator variant={tone === "warning" ? "warning" : tone} />
            {status}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-(--neutral-6)/60 bg-white/80 px-2 py-[2px]">
            <XCircleIcon className="size-3 text-(--neutral-10)" />
            <span className="text-[11px]">Not committed</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MiniStat(props: { label: string; icon?: "no-commit" }) {
  const { label, icon } = props;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-(--primary-6)/60 bg-white/90 px-3 py-2 shadow-xs">
      {icon === "no-commit" ? (
        <XCircleIcon className="size-4 text-(--neutral-11)" aria-hidden />
      ) : (
        <ShieldCheckIcon className="size-4 text-(--primary-10)" aria-hidden />
      )}
      <span>{label}</span>
    </div>
  );
}
