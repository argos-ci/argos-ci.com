import clsx from "clsx";
import { ArrowRightIcon, CheckCircle2Icon, Clock3Icon } from "lucide-react";
import type { snapshot } from "node:test";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type SnapshotStatus =
  | "diff"
  | "diff-strong"
  | "approved"
  | "pending"
  | "neutral";

const STORIES = [
  { key: "button", title: "Button", subtitle: "Primary" },
  { key: "modal", title: "Modal", subtitle: "Open" },
  { key: "card", title: "Card", subtitle: "Hover" },
  { key: "tooltip", title: "Tooltip", subtitle: "Info" },
  { key: "avatar", title: "Avatar", subtitle: "Group" },
  { key: "table", title: "Table", subtitle: "Dense" },
];

const SNAPSHOTS: Array<{
  key: string;
  title: string;
  subtitle: string;
  status: SnapshotStatus;
}> = [
  { key: "button", title: "Button", subtitle: "Primary", status: "approved" },
  { key: "modal", title: "Modal", subtitle: "Open", status: "diff-strong" },
  { key: "card", title: "Card", subtitle: "Hover", status: "diff" },
  // { key: "tooltip", title: "Tooltip", subtitle: "Info", status: "diff" },
  // { key: "avatar", title: "Avatar", subtitle: "Group", status: "pending" },
  // { key: "table", title: "Table", subtitle: "Dense", status: "neutral" },
];

export function StorybookSnapshots() {
  return (
    <div className="relative isolate mx-auto w-full max-w-5xl mask-b-from-80% p-4">
      <Glow position="left" />
      <Glow position="right" />

      <div className="relative grid gap-5 lg:grid-cols-2">
        <Card
          className={clsx(
            "relative overflow-hidden border bg-[linear-gradient(220deg,--alpha(var(--plum-3)/70%),var(--neutral-1))] p-5 shadow-md",
            "animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both",
          )}
        >
          <SmallTitle>
            <ThemeImage
              alt=""
              src={storybook.logo}
              className="size-5"
              aria-hidden
            />
            Stories in Storybook
          </SmallTitle>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {STORIES.map((story) => (
              <StoryCard
                key={story.key}
                title={story.title}
                subtitle={story.subtitle}
                highlight={["modal", "card", "tooltip"].includes(story.key)}
              />
            ))}
          </div>
        </Card>

        <Card
          className={clsx(
            "relative space-y-4 overflow-hidden border bg-[linear-gradient(210deg,--alpha(var(--primary-2)/60%),var(--neutral-1))] p-5 shadow-md",
            "animate-fade-in-right motion-reduce:animate-fade-in animate-delay-150 animate-duration-500 fill-mode-both",
          )}
        >
          <SmallTitle>
            <ArgosEmblem className="size-3 w-auto text-(--primary-10)" />
            Snapshots in Argos
          </SmallTitle>
          <div className="space-y-2.5">
            {SNAPSHOTS.map(({ key, ...snapshot }) => (
              <SnapshotTile key={key} {...snapshot} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StoryCard(props: {
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  const { title, subtitle, highlight } = props;

  return (
    <Card
      className={clsx(
        "relative overflow-hidden border-(--neutral-6)/50 p-3 shadow-xs",
        highlight
          ? "border-(--primary-7)/60 bg-(--primary-2)/30 shadow-sm"
          : "bg-(--neutral-1)",
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold text-(--neutral-11)">
        <div className="grid size-7 place-items-center rounded-md border border-(--neutral-6)/50 bg-white shadow-xs">
          <ThemeImage
            alt=""
            src={storybook.logo}
            className="size-3.5"
            aria-hidden
          />
        </div>
        <span>Story</span>
        {highlight ? <DotIndicator variant="primary" /> : null}
      </div>
      <div className="mt-2 text-sm font-semibold text-(--neutral-12)">
        {title}
      </div>
      <div className="text-low text-xs">{subtitle}</div>
    </Card>
  );
}

function SnapshotTile(props: {
  title: string;
  subtitle: string;
  status: SnapshotStatus;
}) {
  const { title, subtitle, status } = props;

  return (
    <div
      className={clsx(
        "bg-app relative overflow-hidden rounded-xl border p-3 shadow-xs",
        {
          "border-(--danger-7)/50 bg-(--danger-2)/30 shadow-[0_18px_46px_-28px_rgba(234,63,90,0.8)]":
            status.includes("diff"),
          "border-(--primary-7)/50 bg-(--primary-2)/20 shadow-sm":
            status === "approved",
          "border-(--amber-7)/50 bg-(--amber-2)/25 shadow-sm":
            status === "pending",
        },
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-start gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-(--neutral-12)">
              <DotIndicator
                variant={
                  {
                    approved: "success" as const,
                    diff: "danger" as const,
                    "diff-strong": "danger" as const,
                    neutral: "neutral" as const,
                    pending: "warning" as const,
                  }[status]
                }
              />
              {title}
            </div>
            <div className="text-low text-xs">{subtitle}</div>
            <div className="mt-2">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
        <Preview status={status} />
      </div>
    </div>
  );
}

function StatusBadge(props: { status: SnapshotStatus }) {
  const { status } = props;
  if (status === "approved") {
    return (
      <Badge className="border-(--success-7)/60 bg-(--success-2)/60 text-(--success-11)">
        <CheckCircle2Icon className="size-3" aria-hidden />
        Approved
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="border-(--amber-7)/60 bg-(--amber-2)/60 text-(--amber-11)">
        <Clock3Icon className="size-3" aria-hidden />
        Pending
      </Badge>
    );
  }
  if (status.startsWith("diff")) {
    return (
      <Badge className="border-(--danger-7)/60 bg-(--danger-2)/60 text-(--danger-11)">
        Changes detected
      </Badge>
    );
  }
  return (
    <Badge className="border-(--neutral-6)/60 bg-(--neutral-1) text-(--neutral-11)">
      Baseline
    </Badge>
  );
}

function Preview(props: { status: SnapshotStatus }) {
  const { status } = props;
  return (
    <div
      className={clsx(
        "relative hidden w-24 shrink-0 rounded-lg border border-(--neutral-6)/60 bg-(--neutral-2)/60 p-2 md:block",
        {
          "border-(--danger-7)/60":
            status === "diff" || status === "diff-strong",
          "border-(--primary-7)/60": status === "approved",
          "border-(--amber-7)/60": status === "pending",
        },
      )}
    >
      {status.startsWith("diff") ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg border-(--danger-7)/60"
          style={{
            background:
              "repeating-linear-gradient(135deg, rgba(234,63,90,0.14), rgba(234,63,90,0.14) 8px, rgba(234,63,90,0.06) 8px, rgba(234,63,90,0.06) 16px)",
            mixBlendMode: "multiply",
          }}
          aria-hidden
        />
      ) : null}
      <div className="space-y-1.5">
        <div className="h-2 w-[70%] rounded bg-(--neutral-4)" />
        <div className="grid grid-cols-3 gap-1">
          <div className="h-6 rounded-md bg-(--neutral-3)" />
          <div className="h-6 rounded-md bg-(--neutral-3)" />
          <div className="h-6 rounded-md bg-(--neutral-3)" />
        </div>
        <div className="flex gap-1">
          <div className="h-2 w-10 rounded bg-(--neutral-4)/80" />
          <div className="h-2 flex-1 rounded bg-(--neutral-4)/60" />
        </div>
      </div>
    </div>
  );
}

function Glow(props: { position: "left" | "right" }) {
  const { position } = props;
  return (
    <div
      className={clsx(
        "pointer-events-none absolute h-52 w-52 rounded-full blur-3xl",
        {
          left: "top-6 -left-20 bg-(--primary-5)/12",
          right: "-right-12 bottom-0 bg-(--blue-4)/12",
        }[position],
      )}
      aria-hidden
    />
  );
}
