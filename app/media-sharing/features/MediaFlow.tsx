import clsx from "clsx";
import { GitPullRequestIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { AgentTerminal, Ref } from "@/components/AgentTerminal";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { SmallTitle } from "@/components/Typography";

/**
 * The whole story in one glance: an agent uploading from the branch it is
 * working on, the pull request that receives the media, and the event that
 * connects them — the pull request opening — sitting on the line between them.
 *
 * The line matters more than either card. Staging and publishing are not two
 * features to compare; they are one flow with a wait in the middle, and the
 * badge on the line is the actor: Argos publishes, not the agent. Nothing on
 * the right card is something the uploader did.
 *
 * The left card is a Claude Code session rather than a shell prompt, because
 * the page claims an agent does this and nobody hand-types `argos media
 * upload`. What the command prints belongs to the CLI card further down, which
 * shows the real output format — this panel only has to be a credible session.
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

      <AgentSession className="relative z-10 order-first w-full max-w-sm md:flex-1" />
      <PullRequestCard className="w-full max-w-sm md:flex-1" />
    </div>
  );
}

/**
 * One turn, ending on the thing the section is about: the branch has no pull
 * request yet, and the screenshot is already shareable. The tool line names the
 * call and not its result, so the Argos CLI is visibly doing the work without
 * the panel turning into a transcript.
 */
function AgentSession(props: { className?: string }) {
  return (
    <AgentTerminal
      prompt="Redesign the checkout page"
      activeKey="upload"
      conversations={[
        {
          key: "upload",
          lines: [
            {
              kind: "assistant",
              text: "Done. The new checkout is a single column with the summary on top.",
            },
            {
              kind: "tool",
              text: "argos media upload checkout.png --branch feat/checkout",
            },
            {
              kind: "assistant",
              text: (
                <>
                  Screenshot here: <Ref>app.argos-ci.com/m/kQ8vN2pX</Ref>. No
                  pull request yet, so it is staged on the branch and will be
                  posted there when you open one.
                </>
              ),
            },
          ],
        },
      ]}
      className={clsx(
        "animate-fade-in-up animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        props.className,
      )}
    />
  );
}

/**
 * The pull request, not just the comment. Without a PR header the panel reads
 * as an Argos screen, and the one thing this illustration has to prove is that
 * the media landed on GitHub — so the card is the pull request, and Argos'
 * comment sits inside it.
 *
 * The screenshot is rendered rather than listed, because the payoff is that a
 * reviewer *sees* the picture, not that a file was uploaded. One plain image,
 * and nothing beside it: a before/after pair reads as a baseline diff, which
 * is what the copy above says this is not, and an unrendered video row teaches
 * the opposite of the rendered screenshot it sits under. Both have their own
 * card further down the page.
 */
function PullRequestCard(props: { className?: string }) {
  return (
    <Card
      shadow="high"
      className={clsx(
        // A column all the way down, so the screenshot takes whatever height
        // the agent session on the other side asks for. Growing the picture is
        // the right way to spend that space: seeing it is the whole point.
        "relative z-10 flex flex-col overflow-hidden",
        "animate-fade-in-right animate-delay-250 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        props.className,
      )}
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <Chip variant="success" className="gap-1 text-xxs">
          <GitPullRequestIcon className="size-2.5" />
          Open
        </Chip>
        <SmallTitle className="min-w-0 truncate">Checkout redesign</SmallTitle>
        <span className="ml-auto shrink-0 font-mono text-xxs text-low">
          #482
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-2 text-xs">
          <div className="grid size-5 shrink-0 place-items-center rounded border bg-(--plum-2)">
            <ArgosEmblem className="size-2.5 w-auto" aria-hidden />
          </div>
          <span className="font-semibold">argos-ci</span>
          <Chip className="text-xxs">bot</Chip>
          <span className="truncate font-medium text-low">commented</span>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden rounded border">
          <ScreenshotPreview />
          <div className="flex items-center gap-2 border-t-[0.5px] bg-app px-2.5 py-1.5">
            <span className="min-w-0 truncate font-mono text-xxs">
              checkout.png
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * A stand-in for the rendered screenshot. A flat gradient reads as a color
 * swatch; the skeleton is what makes it read as a captured interface — and it
 * is the page the agent just said it built, a single column with the summary
 * on top, so the picture and the conversation agree.
 *
 * The summary block is the one that grows, so the capture fills whatever
 * height the session on the other side asks for without opening a gap in the
 * middle. Marks are drawn in the foreground color at low opacity to hold up in
 * both themes; only the submit button is a solid brand color.
 */
function ScreenshotPreview() {
  return (
    <div
      aria-hidden
      className="flex min-h-24 flex-1 flex-col gap-1.5 bg-linear-to-br from-(--neutral-2) to-(--plum-3) p-2.5"
    >
      <span className="h-1.5 w-1/3 rounded-full bg-(--neutral-12)/25" />
      <span className="min-h-5 flex-1 rounded-xs bg-(--neutral-12)/10" />
      <span className="h-2 w-full rounded-xs bg-(--neutral-12)/10" />
      <span className="h-2 w-full rounded-xs bg-(--neutral-12)/10" />
      <span className="h-2.5 w-2/5 rounded-xs bg-(--plum-9)" />
    </div>
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
