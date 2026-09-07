"use client";

import clsx from "clsx";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";
import { SmallTitle } from "@/components/Typography";

const PROMPT = `# Review this Argos build
build: argos-ci.com/…/builds/1234
pr: feat/checkout · "Add wallet payments"
changed: 3 snapshots · 1 text diff

Compare each diff against the PR intent and approve or request changes.`;

export function CopyPromptCard() {
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
        <ArgosEmblem className="size-4 text-(--violet-11)" />
        <SmallTitle>Build #1234 · snkr-shop</SmallTitle>
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
      <div className="space-y-1.5 p-4 font-mono text-xxs leading-relaxed">
        <div className="text-low"># Review this Argos build</div>
        <div>
          <span className="text-(--violet-11)">build:</span>{" "}
          argos-ci.com/…/builds/1234
        </div>
        <div>
          <span className="text-(--violet-11)">pr:</span> feat/checkout · “Add
          wallet payments”
        </div>
        <div>
          <span className="text-(--violet-11)">changed:</span> 3 snapshots · 1
          text diff
        </div>
        <div className="pt-1 text-low">
          Compare each diff against the PR intent and approve or request
          changes.
        </div>
      </div>
    </Card>
  );
}
