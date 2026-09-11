"use client";

import clsx from "clsx";
import { CheckIcon, ClipboardIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { SmallTitle } from "@/components/Typography";

/**
 * What the test page's "Fix with AI" card hands to a coding agent: the test,
 * the flakiness Argos measured, the two commands that pull the recurring
 * changes and their screenshots, and what to do with them.
 */
const PROMPT = `# Fix the flaky test "cart total" in checkout.spec.ts
flakiness: 73/100 · 12 recurring changes in 28 builds (7 days)

Pull the evidence before editing anything:
  argos test get tst_4k7p2 --json
  argos test changes tst_4k7p2 --json

Find the non-determinism and fix the root cause.
If a change cannot be made deterministic, ignore it instead.`;

const AGENTS = ["Claude Code", "Codex", "Cursor", "any agent"];

export function FixWithAiCard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROMPT).then(
      () => setCopied(true),
      () => {},
    );
  };

  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <SparklesIcon className="size-4 text-(--violet-11)" />
        <SmallTitle>Fix with AI</SmallTitle>
        <button
          type="button"
          onClick={handleCopy}
          className={clsx(
            "text-xxs ml-auto inline-flex cursor-pointer items-center gap-1 rounded-lg border-[0.5px] px-2 py-1 font-medium transition",
            copied
              ? "border-(--success-7) text-(--success-11)"
              : "border-(--violet-7) text-(--violet-11) hover:bg-(--violet-3)",
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="size-3" />
              Copied
            </>
          ) : (
            <>
              <ClipboardIcon className="size-3" />
              Copy prompt
            </>
          )}
        </button>
      </div>
      <div className="space-y-1.5 p-4 font-mono text-xxs leading-relaxed break-words">
        <div className="text-low">
          # Fix the flaky test “cart total” in checkout.spec.ts
        </div>
        <div>
          <span className="text-(--violet-11)">flakiness:</span> 73/100 · 12
          recurring changes in 28 builds
        </div>
        <div className="pt-1 text-low">Pull the evidence before editing:</div>
        <div className="pl-3">argos test get tst_4k7p2 --json</div>
        <div className="pl-3">argos test changes tst_4k7p2 --json</div>
        <div className="pt-1 text-low">
          Find the non-determinism and fix the root cause. If a change cannot be
          made deterministic, ignore it instead.
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-t-[0.5px] px-3 py-2 text-xxs text-low max-sm:hidden">
        Paste into
        {AGENTS.map((agent) => (
          <Badge key={agent}>{agent}</Badge>
        ))}
      </div>
    </Card>
  );
}
