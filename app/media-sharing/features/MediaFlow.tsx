import clsx from "clsx";
import { GitPullRequestIcon, PlayIcon, TerminalIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * The whole story in one glance: an upload staged on a branch on the left, the
 * managed pull request comment on the right, and the event that connects them
 * — the pull request opening — sitting on the line between the two.
 *
 * The line matters more than either card. Staging and publishing are not two
 * features to compare; they are one flow with a wait in the middle, and the
 * badge on the line is the actor: Argos publishes, not the user. Nothing on
 * the right card is something the uploader did.
 */
export function MediaFlow() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 p-4 md:flex-row md:items-stretch md:justify-center md:gap-28">
      <FlowLine
        className={clsx(
          "absolute top-1/2 left-1/2 z-0 hidden h-20 w-100 -translate-1/2 md:block",
          "animate-fade-in animate-delay-500 animate-duration-500 fill-mode-both",
        )}
      />
      {/* The trigger, drawn over the line. On mobile the cards stack and the
          badge sits between them, so the sequence still reads top to bottom.
          The label shortens on md, where it has to fit the gap between the
          cards rather than a full row of its own. */}
      <div className="z-20 md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2">
        <Badge className="items-center gap-1.5 bg-app py-1.5 whitespace-nowrap shadow-xs">
          <GitPullRequestIcon className="size-3 text-(--plum-11)" />
          <span className="md:hidden">Pull request opens</span>
          <span aria-hidden className="max-md:hidden">
            PR opens
          </span>
        </Badge>
      </div>

      <TerminalCard className="order-first w-full max-w-sm md:flex-1" />
      <PullRequestCard className="w-full max-w-sm md:flex-1" />
    </div>
  );
}

function TerminalCard(props: { className?: string }) {
  return (
    <Card
      shadow="high"
      className={clsx(
        "relative z-10 overflow-hidden",
        "animate-fade-in-up animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        props.className,
      )}
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <TerminalIcon className="size-3 text-low" />
        <SmallTitle>Terminal</SmallTitle>
        <Badge className="ml-auto font-mono text-xxs">feat/checkout</Badge>
      </div>
      <div className="space-y-1.5 p-3 font-mono text-xxs">
        <div className="flex gap-1.5">
          <span aria-hidden className="shrink-0 text-(--plum-11)">
            $
          </span>
          {/* `--branch` must not break between its own hyphens — a flag split
              across lines reads as a typo. */}
          <span className="text-default">
            argos media upload *.png demo.mp4{" "}
            <span className="whitespace-nowrap">--branch feat/checkout</span>
          </span>
        </div>
        <div className="text-low">3 media uploaded</div>
        <div className="truncate text-low">
          URL:{" "}
          <span className="text-(--plum-11)">
            https://app.argos-ci.com/m/kQ8vN2pX…
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t-[0.5px] px-3 py-2">
        <Chip variant="pending" className="text-xxs">
          <DotIndicator variant="warning" />
          Staged on branch
        </Chip>
        <span className="text-xxs text-low">shareable from the start</span>
      </div>
    </Card>
  );
}

/**
 * The managed comment, compressed: Argos' avatar tile, the fixed title, and
 * one row per media — the before/after pair shares a row, exactly as the real
 * comment groups them.
 */
function PullRequestCard(props: { className?: string }) {
  return (
    <Card
      shadow="high"
      className={clsx(
        "relative z-10 overflow-hidden",
        "animate-fade-in-right animate-delay-250 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        props.className,
      )}
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs">
        <div className="grid size-5 place-items-center rounded border bg-(--plum-2)">
          <ArgosEmblem className="size-2.5 w-auto" aria-hidden />
        </div>
        <span className="font-semibold">argos-ci</span>
        <span className="font-medium text-low">commented just now</span>
        <Chip variant="success" className="ml-auto text-xxs max-sm:hidden">
          Published
        </Chip>
      </div>
      <div className="space-y-2 p-3">
        <p className="text-xs font-semibold">Media uploaded by Argos</p>
        <div className="overflow-hidden rounded border">
          <MediaRow
            name="checkout.png"
            note="before / after"
            preview={
              <span className="flex gap-0.5">
                <PreviewTile />
                <PreviewTile changed />
              </span>
            }
          />
          <MediaRow
            name="demo.mp4"
            note="video"
            preview={
              <PreviewTile>
                <PlayIcon
                  aria-hidden
                  className="size-2.5 fill-current text-(--neutral-12)/70"
                />
              </PreviewTile>
            }
          />
        </div>
      </div>
    </Card>
  );
}

function MediaRow(props: {
  name: string;
  note: string;
  preview: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-app px-2.5 py-2 not-last:border-b">
      {props.preview}
      <span className="min-w-0 truncate font-mono text-xxs">{props.name}</span>
      <span className="ml-auto shrink-0 text-xxs text-low">{props.note}</span>
    </div>
  );
}

/**
 * A stand-in thumbnail: the gradient reads as "an image" at 20px where a real
 * screenshot would read as noise. The changed variant shifts hue, so the
 * before/after pair visibly differs.
 */
function PreviewTile(props: { changed?: boolean; children?: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "grid size-5 shrink-0 place-items-center rounded-sm border-[0.5px]",
        props.changed
          ? "bg-linear-to-br from-(--plum-4) to-(--plum-6)"
          : "bg-linear-to-br from-(--neutral-3) to-(--plum-4)",
      )}
    >
      {props.children}
    </span>
  );
}

function FlowLine(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className={clsx("pointer-events-none", props.className)}
      aria-hidden="true"
    >
      <path
        d="M 0 40 H 400"
        fill="none"
        stroke="var(--plum-10)"
        strokeWidth="1"
        strokeLinecap="square"
        strokeDasharray="2 5"
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-49"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
