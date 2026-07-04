"use client";

import clsx from "clsx";
import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { DotIndicator } from "@/components/DotIndicator";

const EASTER_EGG_PROMPT =
  "Help me set up Argos in my project so my agents stop shipping visual bugs 👀";

type TerminalLine =
  | { kind: "prompt"; text: string }
  | { kind: "output"; text: string }
  | { kind: "status"; text: string };

const LINES: TerminalLine[] = [
  { kind: "prompt", text: "argos build snapshots 1234 --needs-review" },
  { kind: "output", text: "→ 3 snapshots changed · 1 flaky · machine-readable" },
  { kind: "prompt", text: "argos build review 1234 --conclusion approve" },
  { kind: "status", text: "Review submitted, safe to merge" },
];

export function AgentTerminal() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(EASTER_EGG_PROMPT).then(
      () => setCopied(true),
      () => {},
    );
  };

  return (
    <div className="bg-app animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden rounded-xl border-[0.5px] shadow-md/7">
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <div className="text-low flex items-center gap-2 text-xs font-medium">
          <TerminalIcon className="size-3.5" />
          Terminal
        </div>
        <Badge className="text-low text-xxs gap-1">
          <ArgosEmblem className="size-3 text-(--violet-11)" />
          @argos-ci/cli
        </Badge>
      </div>

      <div className="text-xxs space-y-1.5 p-4 font-mono leading-relaxed">
        {LINES.map((line, index) => (
          <Line key={index} line={line} />
        ))}
        <div className="flex items-center gap-2">
          <span className="text-(--violet-11)">$</span>
          <span className="inline-block h-3 w-1.5 animate-pulse bg-(--violet-9)" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t-[0.5px] px-3 py-2">
        <span className="text-low text-xxs">Start a review from any build</span>
        <button
          type="button"
          onClick={handleCopy}
          className={clsx(
            "text-xxs inline-flex cursor-pointer items-center gap-1 rounded-lg border-[0.5px] px-2 py-1 font-medium transition",
            copied
              ? "border-(--success-7) text-(--success-11)"
              : "border-(--violet-7) text-(--violet-11) hover:bg-(--violet-3)",
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="size-3" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardIcon className="size-3" />
              Copy prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Line(props: { line: TerminalLine }) {
  const { line } = props;
  return (
    <div
      className={clsx(
        line.kind === "output" && "text-low pl-4",
        line.kind !== "output" && "flex items-center gap-2",
      )}
    >
      {line.kind === "prompt" ? (
        <>
          <span className="text-(--violet-11)">$</span>
          <span className="text-default">{line.text}</span>
        </>
      ) : line.kind === "status" ? (
        <>
          <DotIndicator variant="success" />
          <span className="text-(--success-11)">{line.text}</span>
        </>
      ) : (
        <span>{line.text}</span>
      )}
    </div>
  );
}
