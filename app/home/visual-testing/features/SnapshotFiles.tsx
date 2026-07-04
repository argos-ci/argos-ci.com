"use client";

import clsx from "clsx";
import { FileCodeIcon, FileJsonIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

type DiffKind = "context" | "removed" | "added";

type DiffLine = { text: string; kind: DiffKind };

const LINES: DiffLine[] = [
  { text: "## Checkout", kind: "context" },
  { text: "", kind: "context" },
  { text: "- Pay with a saved card", kind: "removed" },
  { text: "+ Pay with a saved card or wallet", kind: "added" },
  { text: "+ Apply a discount code at checkout", kind: "added" },
  { text: "", kind: "context" },
  { text: "See the [pricing](/pricing) page.", kind: "context" },
];

const FILE_TYPES = [
  { icon: FileTextIcon, label: "Markdown", active: true },
  { icon: FileJsonIcon, label: "JSON", active: false },
  { icon: FileCodeIcon, label: "HTML", active: false },
];

export function SnapshotFiles() {
  return (
    <div className="relative flex w-full max-w-md flex-col items-center gap-4 p-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILE_TYPES.map((file) => (
          <Badge
            key={file.label}
            className={clsx(
              "gap-1.5",
              file.active && "border-(--plum-7) text-(--plum-11)",
            )}
          >
            <file.icon className="size-3" />
            {file.label}
          </Badge>
        ))}
        <Badge className="text-low">+ JS · CSS · XML · YAML</Badge>
      </div>
      <Card className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full overflow-hidden">
        <div className="flex items-center justify-between border-b-[0.5px] px-3 py-1.5">
          <SmallTitle>
            <FileTextIcon className="size-3" />
            README.md
          </SmallTitle>
          <Badge className="text-low text-xxs">
            <DotIndicator variant="primary" />
            Snapshot
          </Badge>
        </div>
        <div className="text-xxs space-y-0.5 p-3 font-mono leading-[1.5]">
          {LINES.map((line, index) => (
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
      <span className="whitespace-pre-wrap">{line.text || " "}</span>
    </div>
  );
}
