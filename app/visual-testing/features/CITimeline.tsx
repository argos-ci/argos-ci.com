import clsx from "clsx";
import { GitBranchIcon, MessageSquareIcon, RocketIcon } from "lucide-react";

import { gitlab, slack } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";

type TimelineTone = "success" | "danger" | "pending" | "neutral" | "primary";
type IconName = "commit" | "argos" | "comment" | "slack" | "deploy";

const STEPS: Array<{
  key: string;
  title: string;
  meta: string;
  description: string;
  tone: TimelineTone;
  badge: string;
  icon: IconName;
  highlight?: boolean;
}> = [
  {
    key: "commit",
    title: "Commit pushed",
    meta: "GitHub · main",
    description: "CI workflow kicks off automatically with required checks.",
    tone: "success",
    badge: "Checks started",
    icon: "commit",
  },
  {
    key: "visual-check",
    title: "Argos visual checks",
    meta: "argos/playwright · required",
    description: "15 snapshots changed — waiting for your decision.",
    tone: "primary",
    badge: "Visual review",
    icon: "argos",
    highlight: true,
  },
  {
    key: "pr-status",
    title: "Status posted to the pull request",
    meta: "GitHub Checks",
    description:
      "Argos reports the visual result back to GitHub with links to diffs.",
    tone: "success",
    badge: "Reported",
    icon: "comment",
  },
  {
    key: "slack",
    title: "Team notified",
    meta: "Slack · #frontend",
    description: "Channel pinged when diffs are ready so reviews stay fast.",
    tone: "pending",
    badge: "Waiting on approval",
    icon: "slack",
  },
];

const toneStyles: Record<
  TimelineTone,
  { stripe: string; pill: string; icon: string; card: string }
> = {
  success: {
    stripe: "bg-gradient-to-b from-(--success-8) to-(--success-6)",
    pill: "border-(--success-7) bg-(--success-3) text-(--success-11)",
    icon: "border-(--success-7) bg-(--success-2) text-(--success-11)",
    card: "border-(--success-6)/60",
  },
  danger: {
    stripe: "bg-gradient-to-b from-(--danger-8) to-(--danger-6)",
    pill: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
    icon: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
    card: "border-(--danger-6)/60",
  },
  primary: {
    stripe: "bg-gradient-to-b from-(--primary-8) to-(--primary-6)",
    pill: "border-(--primary-7) bg-(--primary-2) text-(--primary-11)",
    icon: "border-(--primary-7) bg-(--primary-2) text-(--primary-11)",
    card: "border-(--primary-6)/60",
  },
  pending: {
    stripe: "bg-gradient-to-b from-(--amber-8) to-(--amber-6)",
    pill: "border-(--amber-7) bg-(--amber-2) text-(--amber-11)",
    icon: "border-(--amber-7) bg-(--amber-2) text-(--amber-11)",
    card: "border-(--amber-6)/60",
  },
  neutral: {
    stripe: "bg-gradient-to-b from-(--neutral-7) to-(--neutral-5)",
    pill: "border-(--neutral-7) bg-(--neutral-2) text-(--neutral-11)",
    icon: "border-(--neutral-7) bg-(--neutral-2) text-(--neutral-11)",
    card: "border-(--neutral-6)/60",
  },
};

export function CITimeline() {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden mask-b-from-80%">
      <div className="space-y-4">
        {STEPS.map(({ key, ...step }) => (
          <TimelineStep key={key} {...step} />
        ))}
      </div>
    </div>
  );
}

function TimelineStep(props: (typeof STEPS)[number]) {
  const { icon, tone, title, meta, description, badge, highlight } = props;
  const toneClass = toneStyles[tone];

  return (
    <div className="relative pl-17">
      <div className="absolute top-0 left-2 flex h-full flex-col items-center sm:left-6">
        <StepMarker tone={tone} icon={icon} />
        <span
          className="-mb-4 block w-px flex-1 bg-(--neutral-6)/60"
          aria-hidden
        />
      </div>

      <Card className={clsx("relative overflow-hidden", toneClass.card)}>
        <div
          className={clsx("absolute inset-y-0 left-0 w-1", toneClass.stripe)}
        />
        <div className="text-low flex flex-wrap items-center gap-2 px-4 pt-3 text-xs">
          <StatusPill tone={tone}>{badge}</StatusPill>
          <span className="text-low">{meta}</span>
        </div>
        <div className="px-4 pt-1 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-(--neutral-12)">
            {highlight ? <DotIndicator variant="primary" /> : null}
            <span>{title}</span>
          </div>
          <p className="text-low mt-1 text-sm leading-relaxed">{description}</p>
          {tone === "danger" ? (
            <div className="mt-3 grid gap-1 text-[11px] font-semibold text-(--neutral-12)">
              <MiniStat label="15 snapshots changed" />
              <MiniStat label="2 added views" />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function StepMarker(props: { tone: TimelineTone; icon: IconName }) {
  const { tone, icon } = props;
  const toneClass = toneStyles[tone];
  return (
    <span
      className={clsx(
        "bg-app grid size-8 place-items-center rounded-full border shadow-[0_14px_35px_-24px_rgba(0,0,0,0.5)]",
        toneClass.icon,
      )}
    >
      <StepIcon icon={icon} />
    </span>
  );
}

function StepIcon(props: { icon: IconName }) {
  const { icon } = props;
  if (icon === "argos") {
    return <ArgosEmblem className="size-3 w-auto" aria-hidden />;
  }
  if (icon === "commit") {
    return <GitBranchIcon className="size-3" aria-hidden />;
  }
  if (icon === "comment") {
    return <MessageSquareIcon className="size-3" aria-hidden />;
  }
  if (icon === "slack") {
    return (
      <ThemeImage src={slack.logo} className="size-3" alt="" aria-hidden />
    );
  }
  if (icon === "deploy") {
    return <RocketIcon className="size-3" aria-hidden />;
  }
  return <ThemeImage src={gitlab.logo} alt="" className="size-3" aria-hidden />;
}

function StatusPill(props: { tone: TimelineTone; children: React.ReactNode }) {
  const { tone, children } = props;
  return <Chip variant={tone}>{children}</Chip>;
}

function MiniStat(props: { label: string }) {
  const { label } = props;
  return (
    <div className="flex items-center gap-2 rounded-lg border border-(--primary-6)/60 bg-(--primary-2)/50 px-3 py-1.5">
      <DotIndicator variant="primary" />
      <span>{label}</span>
    </div>
  );
}
