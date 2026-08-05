import clsx from "clsx";
import { CheckIcon, GitPullRequestArrowIcon, XIcon } from "lucide-react";

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
      className="animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both mx-auto w-full max-w-4xl overflow-hidden"
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
        <span className="text-low shrink-0">#482</span>
      </SmallTitle>
      <div className="flex shrink-0 items-center gap-2">
        <Badge className="text-xxs gap-1.5 border-(--danger-7) text-(--danger-11) max-sm:hidden">
          <DotIndicator variant="danger" />
          Changes requested
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
    <div className="bg-subtle grid grid-cols-2 gap-3 p-4 max-md:border-b-[0.5px] md:gap-4 md:border-r-[0.5px] md:p-6">
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
      <span className="text-xxs relative grid size-5 place-items-center rounded-full bg-(--pink-9) font-semibold text-white shadow-md/20 ring-2 ring-(--neutral-1)">
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
  changes: {
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
 * An approval that a later verdict does not erase, then a handoff.
 *
 * Andrew signs off, Nina catches what he missed and requests changes, and
 * Andrew hands the thread to his agent. Both decisions stay on the rail — that
 * is the section's second point, and a last-click-wins model could not show it.
 *
 * The reply is written as the `@mention` the product actually accepts rather
 * than as the `Handle with AI` menu item: the mention is what a reviewer types,
 * so it reads without having to draw a menu that is closed in real life.
 */
const ACTIVITY: ActivityEvent[] = [
  {
    name: "Andrew",
    avatar: andrewAvatar,
    kind: "approved",
    action: "approved",
    time: "14m ago",
  },
  {
    name: "Nina",
    avatar: ninaAvatar,
    kind: "changes",
    action: "requested changes",
    time: "4m ago",
    comment: "This card shifted 4px right, the total is cut off.",
    pin: 1,
    reactions: "👍 2",
  },
  {
    name: "Andrew",
    avatar: andrewAvatar,
    kind: "comment",
    action: "replied",
    time: "just now",
    comment: (
      <>
        Good catch — <span className="text-(--violet-11)">@Claude</span> handle
        this comment
      </>
    ),
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
          <span className="text-low text-xxs">{event.time}</span>
        </div>
        {event.comment ? (
          <p className="text-low mt-1 text-xs">
            {event.pin ? <PinRef>{event.pin}</PinRef> : null}
            {event.comment}
          </p>
        ) : null}
        {event.reactions ? (
          <Badge className="mt-1.5">{event.reactions}</Badge>
        ) : null}
      </div>
    </li>
  );
}

/** Ties a comment back to its pin on the screenshot, by number. */
function PinRef(props: { children: React.ReactNode }) {
  return (
    <span className="text-xxxs mr-1 inline-grid size-3.5 translate-y-px place-items-center rounded-full bg-(--pink-9) align-middle font-semibold text-white">
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
