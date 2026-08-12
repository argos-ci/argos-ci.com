import clsx from "clsx";
import { ArrowUpRightIcon, GitPullRequestIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { AgentTerminal } from "@/components/AgentTerminal";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { SmallTitle } from "@/components/Typography";

import { LIVE_EXAMPLE_PR_URL, LIVE_EXAMPLE_SHARE_URL } from "../live-example";
import { Storefront } from "./Storefront";

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
 * Nothing here is invented: this is snkr-shop#5, a real public pull request,
 * drawn. The session's share link opens the actual share page and the pull
 * request card opens the actual PR, so every claim the drawing makes is one
 * click from being checked — the caption under it, in page.tsx, says so.
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
 *
 * The share link is the live example's real URL and actually opens it — the
 * one place in the session where the reader can step out of the illustration
 * and into the product. It is underlined for that reason; the plain accent
 * `Ref` used elsewhere marks a reference, and this is an exit.
 *
 * It stops before the payoff on purpose. That the media reaches the pull
 * request is drawn twice already — the badge on the line and the card it points
 * at — and a panel that narrates what the illustration around it shows is the
 * same thing told three times.
 */
function AgentSession(props: { className?: string }) {
  return (
    <AgentTerminal
      prompt="Add quick add-to-cart to the product grid"
      activeKey="upload"
      conversations={[
        {
          key: "upload",
          lines: [
            {
              kind: "assistant",
              text: "Done. Uploading a screenshot of the new grid.",
            },
            {
              kind: "tool",
              text: "argos media upload sneakers-listing.png --branch feat/quick-add-to-cart",
            },
            {
              kind: "assistant",
              text: (
                <>
                  No pull request yet, so it&apos;s staged on the branch:{" "}
                  <a
                    href={LIVE_EXAMPLE_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--violet-11) underline decoration-(--violet-8) underline-offset-2 hover:decoration-(--violet-11)"
                  >
                    app.argos-ci.com/m/mp21qmkhpe…
                  </a>
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
 * The comment is the real one, miniaturized: its bold "2 screenshots uploaded
 * by Argos" first line, one before/after pair rendered as the row GitHub
 * shows, and the second pair reduced to a file name — proof there are two
 * without drawing two of everything. An earlier version rendered a single
 * plain screenshot to avoid reading as a baseline diff, but the card now
 * opens the actual pull request, and matching what the reader finds there is
 * worth more than the abstraction; the "uploaded by Argos" header line is
 * what keeps the pair reading as media rather than visual testing.
 *
 * The whole card is the link. The arrow next to the PR number is the only
 * chrome admitting it — anything louder and the card stops reading as a pull
 * request and starts reading as a button.
 */
function PullRequestCard(props: { className?: string }) {
  return (
    <a
      href={LIVE_EXAMPLE_PR_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open pull request snkr-shop#5 on GitHub"
      className={clsx("group", props.className)}
    >
      <Card
        shadow="high"
        className={clsx(
          // A column all the way down, so the comment takes whatever height
          // the agent session on the other side asks for. Growing the panes is
          // the right way to spend that space: seeing them is the whole point.
          "relative z-10 flex h-full flex-col overflow-hidden",
          "transition group-hover:border-(--plum-8)",
          "animate-fade-in-right animate-delay-250 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
        )}
      >
        <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
          <Chip variant="success" className="gap-1 text-xxs">
            <GitPullRequestIcon className="size-2.5" />
            Open
          </Chip>
          <SmallTitle className="min-w-0 truncate">
            Quick add-to-cart from the product grid
          </SmallTitle>
          <span className="ml-auto shrink-0 font-mono text-xxs text-low">
            #5
          </span>
          <ArrowUpRightIcon className="size-3 shrink-0 text-low transition group-hover:text-(--plum-11)" />
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
            <div className="px-2.5 pt-2 pb-1.5 text-xxs font-semibold">
              2 screenshots uploaded by Argos
            </div>
            <div className="grid flex-1 grid-cols-2 divide-x-[0.5px] border-y-[0.5px] bg-subtle">
              <Pane label="Before">
                <Storefront variant="before" />
              </Pane>
              <Pane label="After">
                <Storefront variant="after" />
              </Pane>
            </div>
            <div className="flex items-center gap-2 bg-app px-2.5 py-1.5 font-mono text-xxs">
              <span className="min-w-0 truncate">sneakers-listing.png</span>
              <span className="ml-auto shrink-0 text-low max-sm:hidden">
                + sneakers-detail.png
              </span>
              <span className="ml-auto shrink-0 text-low sm:hidden">
                + 1 more
              </span>
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}

function Pane(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <span className="text-xxxs font-medium tracking-wide text-low uppercase">
        {props.label}
      </span>
      {props.children}
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
