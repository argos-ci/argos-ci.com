"use client";

import clsx from "clsx";
import {
  FileCodeIcon,
  FileJsonIcon,
  FileTextIcon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";
import { useInViewport } from "@/components/useInViewport";

type DiffKind = "context" | "removed" | "added";

type DiffLine = { text: string; kind: DiffKind };

type SnapshotFile = {
  key: string;
  label: string;
  icon: LucideIcon;
  filename: string;
  lines: DiffLine[];
};

const FILES: SnapshotFile[] = [
  {
    key: "md",
    label: "Markdown",
    icon: FileTextIcon,
    filename: "README.md",
    lines: [
      { text: "## Checkout", kind: "context" },
      { text: "", kind: "context" },
      { text: "Pay with a saved card", kind: "removed" },
      { text: "Pay with a saved card or wallet", kind: "added" },
      { text: "Apply a discount code at checkout", kind: "added" },
      { text: "", kind: "context" },
      { text: "See the [pricing](/pricing) page.", kind: "context" },
    ],
  },
  {
    key: "json",
    label: "JSON",
    icon: FileJsonIcon,
    filename: "checkout.json",
    lines: [
      { text: "{", kind: "context" },
      { text: '  "plan": "pro",', kind: "context" },
      { text: '  "seats": 5,', kind: "removed" },
      { text: '  "seats": 8,', kind: "added" },
      { text: '  "wallet": true,', kind: "added" },
      { text: '  "trial": false', kind: "context" },
      { text: "}", kind: "context" },
    ],
  },
  {
    key: "html",
    label: "HTML",
    icon: FileCodeIcon,
    filename: "checkout.html",
    lines: [
      { text: '<button class="btn">', kind: "context" },
      { text: "  Pay with card", kind: "removed" },
      { text: "  Pay with card or wallet", kind: "added" },
      { text: "</button>", kind: "context" },
      { text: '<span class="badge">', kind: "added" },
      { text: "  Save 10% today", kind: "added" },
      { text: "</span>", kind: "added" },
    ],
  },
];

const DURATION = 3200;

export function SnapshotFiles() {
  const { ref, inViewport } = useInViewport<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped || !inViewport) {
      return;
    }
    const id = window.setTimeout(() => {
      setActive((index) => (index + 1) % FILES.length);
    }, DURATION);
    return () => window.clearTimeout(id);
  }, [active, stopped, inViewport]);

  const file = FILES[active]!;

  return (
    <div
      ref={ref}
      className="relative flex w-full max-w-md flex-col items-center gap-4 p-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILES.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setStopped(true);
                setActive(index);
              }}
              aria-pressed={isActive}
              className={clsx(
                "text-xxxs inline-flex items-center gap-1.5 rounded-lg border-[0.5px] px-2 py-1 font-medium transition",
                "cursor-pointer hover:border-(--plum-7) hover:text-(--plum-11)",
                isActive
                  ? "border-(--plum-7) bg-(--plum-2) text-(--plum-11)"
                  : "bg-app text-low",
              )}
            >
              <item.icon className="size-3" />
              {item.label}
            </button>
          );
        })}
        <Badge className="text-low">+ JS · CSS · XML · YAML</Badge>
      </div>
      <Card className="w-full overflow-hidden">
        <div className="flex items-center justify-between border-b-[0.5px] px-3 py-1.5">
          <SmallTitle>
            <file.icon className="size-3" />
            {file.filename}
          </SmallTitle>
          <Badge className="text-low text-xxs">
            <DotIndicator variant="primary" />
            Snapshot
          </Badge>
        </div>
        <div
          key={file.key}
          className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-300 fill-mode-both text-xxs space-y-0.5 p-3 font-mono leading-normal"
        >
          {file.lines.map((line, index) => (
            <DiffRow key={index} line={line} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function DiffRow(props: { line: DiffLine }) {
  const { line } = props;
  const tone = {
    context: "text-low",
    removed: "bg-(--danger-2)/60 text-(--danger-11)",
    added: "bg-(--primary-2)/60 text-(--primary-11)",
  }[line.kind];
  const sign = { context: " ", removed: "-", added: "+" }[line.kind];
  return (
    <div className={clsx("flex gap-2 rounded px-1.5 py-0.5", tone)}>
      <span className="w-2 shrink-0 text-center opacity-70">{sign}</span>
      <span className="whitespace-pre-wrap">{line.text || " "}</span>
    </div>
  );
}
