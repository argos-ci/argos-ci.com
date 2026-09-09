import clsx from "clsx";
import {
  ArrowUpIcon,
  CheckIcon,
  GitPullRequestArrowIcon,
  XIcon,
} from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

export function ReviewCanvas() {
  return (
    <Card
      shadow="high"
      // On phones the carousel panel is 240px tall and fades out at the
      // bottom: the card sits at the top so the toolbar and the rail (the
      // story) are what shows, and the panes step aside (see Panes).
      className="mx-auto w-full max-w-4xl animate-fade-in-up overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in max-sm:mt-3 max-sm:self-start"
    >
      <Toolbar />
      <div className="grid md:grid-cols-[1fr_17rem]">
        <Panes />
        <Activity />
      </div>
    </Card>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b-[0.5px] px-3 py-2">
      <SmallTitle className="min-w-0">
        <GitPullRequestArrowIcon className="size-3.5 shrink-0 text-(--pink-11)" />
        <span className="truncate">checkout-summary</span>
        <span className="shrink-0 text-low">#482</span>
      </SmallTitle>
      <div className="flex shrink-0 items-center gap-2">
        <Badge className="gap-1.5 border-(--success-7) text-xxs text-(--success-11) max-sm:hidden">
          <DotIndicator variant="success" />
          Approved
        </Badge>
        <div className="flex -space-x-1.5">
          <Avatar src={andrewAvatar} />
          <Avatar src={ninaAvatar} />
        </div>
      </div>
    </div>
  );
}

function Panes() {
  return (
    <div className="grid grid-cols-2 gap-3 bg-subtle p-4 max-md:border-b-[0.5px] max-sm:hidden md:gap-4 md:border-r-[0.5px] md:p-6">
      <Pane tone="baseline" />
      <Pane tone="changes" />
    </div>
  );
}

function Pane(props: { tone: "baseline" | "changes" }) {
  const { tone } = props;
  const isChanges = tone === "changes";
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className={clsx(
          "text-xxs inline-flex items-center justify-center gap-1.5 rounded-lg border-[0.5px] py-0.5 font-semibold md:py-1",
          isChanges ? "border-(--danger-6)" : "border-(--neutral-6)",
        )}
      >
        <DotIndicator variant={isChanges ? "danger" : "neutral"} />
        {isChanges ? "Changes" : "Baseline"}
      </div>
      <div className="relative">
        <ApplicationSVG withChanges={isChanges} className="w-full" />
        {isChanges ? <Pin /> : null}
      </div>
    </div>
  );
}

function Pin() {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: "50%", top: "73%" }}
      aria-hidden
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-(--pink-9) opacity-40" />
      <span className="relative grid size-5 place-items-center rounded-full bg-(--pink-9) text-xxs font-semibold text-white shadow-md/20 ring-2 ring-(--neutral-1)">
        1
      </span>
    </span>
  );
}

/**
 * What each kind of event puts on the rail.
 *
 * The verdicts get a coloured chip on the avatar, a comment gets none: the
 * missing chip is what tells the eye a reply is not a decision.
 */
const EVENT_KINDS = {
  approved: {
    chip: "bg-(--success-9)",
    icon: <CheckIcon className="size-2.5 text-white" strokeWidth={3.5} />,
    text: "text-(--success-11)",
  },
  rejected: {
    chip: "bg-(--danger-9)",
    icon: <XIcon className="size-2.5 text-white" strokeWidth={3.5} />,
    text: "text-(--danger-11)",
  },
  comment: { chip: null, icon: null, text: "text-low" },
};

type ActivityEvent = {
  name: string;
  avatar: ThemeImageProps["src"];
  kind: keyof typeof EVENT_KINDS;
  action: string;
  time: string;
  comment?: React.ReactNode;
  /** Number of the pin on the screenshot this comment is attached to. */
  pin?: number;
  reactions?: string;
};

/**
 * The review rule, told as a thread: one rejection blocks, and only the
 * rejecting reviewer's next review lifts it.
 *
 * Andrew approves, Nina catches what he missed and rejects with a comment
 * pinned to the spot, Andrew replies and pushes a fix, and Nina approves the
 * new build. Every verdict stays on the rail: a last-click-wins model could
 * not show that Andrew's approval never went away, and the badge in the
 * toolbar reads Approved only because Nina's latest review is one.
 */
const ACTIVITY: ActivityEvent[] = [
  {
    name: "Andrew",
    avatar: andrewAvatar,
    kind: "approved",
    action: "approved",
    time: "12m ago",
  },
  {
    name: "Nina",
    avatar: ninaAvatar,
    kind: "rejected",
    action: "rejected",
    time: "8m ago",
    comment: (
      <>
        <span className="text-(--violet-11)">@Andrew</span> Price tag is hidden
        on mobile
      </>
    ),
    pin: 1,
    reactions: "👍 1",
  },
  {
    name: "Andrew",
    avatar: andrewAvatar,
    kind: "comment",
    action: "replied",
    time: "5m ago",
    comment: "Good catch, fixing now.",
  },
  {
    name: "Nina",
    avatar: ninaAvatar,
    kind: "approved",
    action: "approved",
    time: "just now",
    comment: "Fixed in 3f2a1c, looks right.",
  },
];

function Activity() {
  return (
    <div className="flex flex-col">
      <div className="border-b-[0.5px] px-3 py-2">
        <SmallTitle className="text-low">Activity</SmallTitle>
      </div>
      <ol className="flex flex-col gap-4 p-3">
        {ACTIVITY.map((event, index) => (
          <ActivityRow
            key={`${event.name}-${event.time}`}
            event={event}
            last={index === ACTIVITY.length - 1}
          />
        ))}
      </ol>
      {/* Pinned to the bottom: the rail is short next to two screenshot panes,
          and the composer is what says the thread is still open. */}
      <div className="mt-auto flex items-center gap-2 border-t-[0.5px] px-3 py-2">
        <span className="text-xs text-subtle">Leave a reply…</span>
        <span className="ml-auto grid size-5 shrink-0 place-items-center rounded-full border-[0.5px]">
          <ArrowUpIcon className="size-3 text-low" />
        </span>
      </div>
    </div>
  );
}

function ActivityRow(props: { event: ActivityEvent; last: boolean }) {
  const { event, last } = props;
  const kind = EVENT_KINDS[event.kind];
  return (
    <li className="relative flex gap-2.5">
      {/* The rail runs from under this avatar into the gap below, so it stops
          at the last event rather than trailing off the end of the list. */}
      {last ? null : (
        <span
          className="absolute top-7 -bottom-4 left-3 w-px -translate-x-1/2 bg-(--neutral-6)"
          aria-hidden
        />
      )}
      {/* `self-start` keeps this box the size of the avatar; stretched to the
          row it would drop the verdict chip to the bottom of the comment. */}
      <span className="relative shrink-0 self-start">
        <ThemeImage
          src={event.avatar}
          alt=""
          className="size-6 rounded-full border-[0.5px] object-cover"
        />
        {kind.chip ? (
          <span
            className={clsx(
              "absolute -right-1 -bottom-1 grid size-3.5 place-items-center rounded-full ring-2 ring-(--neutral-1)",
              kind.chip,
            )}
          >
            {kind.icon}
          </span>
        ) : null}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-xs font-medium">{event.name}</span>
          <span className={clsx("text-xs", kind.text)}>{event.action}</span>
          <span className="text-xxs text-low"> • {event.time}</span>
        </div>
        {event.comment ? (
          <p className="mt-1 text-xs text-low">
            {event.pin ? <PinRef>{event.pin}</PinRef> : null}
            {event.comment}
          </p>
        ) : null}
        {event.reactions ? (
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-(--neutral-3) px-2 py-0.5 text-xxs font-medium text-(--neutral-11)">
            {event.reactions}
          </div>
        ) : null}
      </div>
    </li>
  );
}

/** Ties a comment back to its pin on the screenshot, by number. */
function PinRef(props: { children: React.ReactNode }) {
  return (
    <span className="mr-1 inline-grid size-3.5 translate-y-px place-items-center rounded-full bg-(--pink-9) align-middle text-xxxs font-semibold text-white">
      {props.children}
    </span>
  );
}

function Avatar(props: { src: ThemeImageProps["src"] }) {
  return (
    <ThemeImage
      src={props.src}
      alt=""
      className="size-6 shrink-0 rounded-full border-[0.5px] object-cover ring-2 ring-(--neutral-1)"
    />
  );
}
