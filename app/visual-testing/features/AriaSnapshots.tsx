import clsx from "clsx";
import { ListTreeIcon, SparkleIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

type NodeStatus = "unchanged" | "changed" | "new" | "missing";

type AriaNode = {
  id: string;
  level: number;
  name: string;
  role: string;
  status?: NodeStatus;
  note?: string;
};

const BASELINE_TREE: AriaNode[] = [
  { id: "document", level: 0, name: "Product page", role: "document" },
  { id: "banner", level: 1, name: "Header", role: "banner" },
  { id: "logo", level: 2, name: "Logo", role: "link" },
  { id: "search", level: 1, name: "Search", role: "search" },
  { id: "input", level: 2, name: "Search docs", role: "textbox" },
  { id: "cta", level: 2, name: "Search", role: "button" },
  { id: "main", level: 1, name: "Content", role: "main" },
  { id: "cta-main", level: 2, name: "Get started", role: "button" },
];

const PR_TREE: AriaNode[] = [
  { id: "document", level: 0, name: "Product page", role: "document" },
  { id: "banner", level: 1, name: "Header", role: "banner" },
  { id: "logo", level: 2, name: "Logo", role: "link" },
  { id: "search", level: 1, name: "Search", role: "search" },
  {
    id: "input",
    level: 2,
    name: "Untitled input",
    role: "textbox",
    status: "changed",
    note: "Accessible name removed",
  },
  {
    id: "filter",
    level: 2,
    name: "Filter products",
    role: "combobox",
    status: "new",
    note: "New control detected",
  },
  {
    id: "cta",
    level: 2,
    name: "Search",
    role: "button",
    status: "missing",
    note: "Hidden from ARIA tree",
  },
  { id: "main", level: 1, name: "Content", role: "main" },
  { id: "cta-main", level: 2, name: "Get started", role: "button" },
];

const SUMMARY = [
  {
    status: "changed",
    text: "Accessible name regression on search input",
  },
  { status: "missing", text: "Search button dropped from ARIA tree" },
  { status: "new", text: "New combobox introduced without review" },
] satisfies Array<{ status: NodeStatus; text: string }>;

export function AriaSnapshots() {
  return (
    <div className="relative isolate mx-auto w-full max-w-5xl p-2">
      <Glow position="left" />
      <Glow position="right" />
      <Card className="relative overflow-hidden border bg-[linear-gradient(145deg,--alpha(var(--primary-3)/65%),var(--neutral-1))] shadow-md">
        <div className="grid items-start gap-4 p-4 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:p-6">
          <SnapshotColumn
            label="Baseline snapshot"
            description="Reference ARIA tree"
            nodes={BASELINE_TREE}
            tone="neutral"
          />
          <DiffSummary />
          <SnapshotColumn
            label="PR changes"
            description="Argos-detected differences"
            nodes={PR_TREE}
            tone="accent"
          />
        </div>
      </Card>
    </div>
  );
}

function SnapshotColumn(props: {
  label: string;
  description: string;
  nodes: AriaNode[];
  tone: "neutral" | "accent";
}) {
  const { label, description, nodes, tone } = props;
  return (
    <div className="space-y-3">
      <SmallTitle className="items-start gap-2 text-(--neutral-11)">
        <Badge
          className={clsx(
            "border-(--neutral-6)/60 text-(--neutral-11)",
            tone === "accent"
              ? "border-(--primary-7)/60 bg-(--primary-2)/60"
              : "bg-(--neutral-2)/60",
          )}
        >
          <ListTreeIcon className="size-3.5" aria-hidden />
          {label}
        </Badge>
        <span className="text-[11px] font-semibold text-low">{description}</span>
      </SmallTitle>
      <div className="space-y-2.5">
        {nodes.map((node) => (
          <AriaNodeCard key={node.id} {...node} />
        ))}
      </div>
    </div>
  );
}

function AriaNodeCard(props: AriaNode) {
  const { level, name, role, status = "unchanged", note } = props;

  const statusTone = {
    unchanged: "border-(--neutral-6)/60 bg-white/85 shadow-xs",
    changed:
      "border-(--danger-7)/60 bg-(--danger-2)/35 text-(--danger-11) shadow-[0_22px_60px_-36px_rgba(234,63,90,0.8)]",
    new: "border-(--primary-7)/60 bg-(--primary-2)/40 text-(--primary-11) shadow-sm",
    missing:
      "border-(--amber-7)/60 bg-(--amber-2)/45 text-(--amber-11) shadow-sm",
  }[status];

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg border px-3 py-2.5",
        statusTone,
      )}
      style={{ marginLeft: level * 12 }}
    >
      {level > 0 ? (
        <span
          className="absolute left-1.5 top-0 h-full w-px bg-(--neutral-6)/40"
          aria-hidden
        />
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold leading-5">
            <DotIndicator
              variant={
                { changed: "danger", new: "primary", missing: "warning" }[
                  status
                ] || "neutral"
              }
              className="mt-[3px]"
            />
            <span className="truncate">{name}</span>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-[3px] text-[11px] font-semibold text-(--neutral-10)">
            <span className="rounded-sm bg-(--neutral-3) px-1 py-px text-[10px] font-semibold uppercase text-(--neutral-11)">
              {role}
            </span>
            role
          </div>
          {note ? (
            <div className="text-[11px] font-semibold text-low">{note}</div>
          ) : null}
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

function StatusBadge(props: { status: NodeStatus }) {
  const { status } = props;
  const label = {
    unchanged: "Stable",
    changed: "Changed",
    new: "New",
    missing: "Missing",
  }[status];
  const className = {
    unchanged: "border-(--neutral-6)/60 bg-white text-(--neutral-11)",
    changed: "border-(--danger-7)/60 bg-(--danger-2)/60 text-(--danger-11)",
    new: "border-(--primary-7)/60 bg-(--primary-2)/60 text-(--primary-11)",
    missing: "border-(--amber-7)/60 bg-(--amber-2)/60 text-(--amber-11)",
  }[status];
  return (
    <Badge className={clsx("shrink-0", className)}>
      <SparkleIcon className="size-3" aria-hidden />
      {label}
    </Badge>
  );
}

function DiffSummary() {
  return (
    <div className="relative isolate mx-auto flex max-w-[13rem] flex-col items-center gap-3 rounded-2xl border border-(--neutral-6)/60 bg-white/75 px-4 py-5 text-center shadow-sm">
      <div className="pointer-events-none absolute -left-14 top-6 size-20 rounded-full bg-(--primary-5)/15 blur-3xl" />
      <Badge className="border-(--primary-7)/60 bg-(--primary-2)/60 text-(--primary-11)">
        ARIA diff
      </Badge>
      <div className="text-sm font-semibold text-(--neutral-12)">
        Semantic changes detected
      </div>
      <div className="w-full space-y-2 text-left text-[13px]">
        {SUMMARY.map((item) => (
          <div
            key={item.text}
            className="flex items-start gap-2 rounded-lg border border-(--neutral-6)/40 bg-(--neutral-2)/60 px-2.5 py-2"
          >
            <DotIndicator
              variant={
                { changed: "danger", missing: "warning", new: "primary" }[
                  item.status
                ] || "neutral"
              }
              className="mt-1.5"
            />
            <span className="leading-tight text-(--neutral-11)">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Glow(props: { position: "left" | "right" }) {
  const { position } = props;
  return (
    <div
      className={clsx(
        "pointer-events-none absolute h-48 w-48 rounded-full blur-3xl",
        {
          left: "-left-10 top-4 bg-(--primary-4)/18",
          right: "-right-16 bottom-6 bg-(--blue-4)/18",
        }[position],
      )}
      aria-hidden
    />
  );
}
