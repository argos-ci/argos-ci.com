import clsx from "clsx";
import { Columns2Icon, FocusIcon, ScanSearchIcon } from "lucide-react";

import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";

type PreviewVariant = "baseline" | "changes";

export function InstantDiffInspector() {
  return (
    <Card className="flex flex-col gap-3">
      <SideBySide />
    </Card>
  );
}

function SideBySide() {
  return (
    <Card className="relative flex flex-col gap-3 p-3" shadow="shadow-md">
      <div className="flex gap-2">
        <Badge>
          <Columns2Icon className="size-3" />
          Side by side
        </Badge>
        <Badge>
          <ScanSearchIcon className="size-3" />
          Changes highlighter
        </Badge>
      </div>

      <div className="flex gap-1">
        <DiffPreview variant="baseline" />
        <div className="relative mt-6 w-1 shrink-0 rounded-full bg-(--neutral-3)">
          <div className="mt-10 h-5 w-full bg-(--danger-10)" />
          <div className="mt-5 h-8 w-full bg-(--danger-10)" />
        </div>
        <DiffPreview variant="changes" />
      </div>
    </Card>
  );
}

function DiffPreview(props: { variant: PreviewVariant }) {
  const { variant } = props;
  const tone = variant === "changes" ? "danger" : "neutral";

  return (
    <div className="relative space-y-2">
      <div className="flex items-center justify-between text-[11px] font-semibold text-(--neutral-12)">
        <span className="flex items-center gap-2">
          <DotIndicator variant={tone} />
          {variant === "changes" ? "Changes" : "Baseline"}
        </span>
      </div>

      <div className="bg-app relative overflow-hidden">
        <div>
          <ApplicationSVG
            className="size-full"
            withChanges={variant === "changes"}
            noise={variant === "changes" ? 0.5 : 0}
            noiseSeed={variant === "changes" ? 3 : 2}
          />
          <ZoomLens tone={tone} />
          {variant === "changes" ? <HighlightRibbon /> : null}
        </div>
      </div>
    </div>
  );
}

function ZoomLens(props: { tone: "neutral" | "danger" }) {
  const { tone } = props;
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className={clsx(
          "absolute top-[18%] left-[14%] h-24 w-32 rounded-full border-2 bg-white/3 backdrop-blur-[1px]",
          tone === "danger"
            ? "border-(--danger-8)/70 shadow-[0_14px_40px_-24px_rgba(217,56,86,0.8)]"
            : "border-(--primary-7)/70 shadow-[0_14px_40px_-24px_rgba(124,92,255,0.55)]",
        )}
      >
        <div className="absolute inset-[6px] rounded-[14px] border border-dashed border-(--neutral-7)/70 bg-linear-to-br from-white/6 to-transparent" />
      </div>

      <div className="bg-app absolute top-3 right-3 flex items-center gap-2 rounded-full border border-(--neutral-6)/70 px-2 py-[3px] text-[10px] font-semibold shadow-xs">
        <FocusIcon className="size-3" />
        Synced zoom
      </div>
    </div>
  );
}

function HighlightRibbon() {
  return (
    <div className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-2 rounded-full border border-(--danger-7)/70 bg-(--danger-2)/80 px-2 py-[3px] text-[10px] font-semibold text-(--danger-11) shadow-xs">
      <ScanSearchIcon className="size-3" />
      Highlighter on
    </div>
  );
}
