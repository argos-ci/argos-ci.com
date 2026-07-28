import clsx from "clsx";
import {
  CheckIcon,
  ClockIcon,
  CornerDownRightIcon,
  GitPullRequestArrowIcon,
  XIcon,
} from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { ApplicationSVG } from "@/components/ApplicationSVG";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

/**
 * A single Argos review screen: the baseline and the changes side by side,
 * with the discussion docked next to them.
 */
export function ReviewCanvas() {
  return (
    <Card
      shadow="high"
      className="animate-fade-in-up motion-reduce:animate-fade-in animate-duration-500 fill-mode-both mx-auto w-full max-w-4xl overflow-hidden"
    >
      <Toolbar />
      <div className="grid md:grid-cols-[1fr_17rem]">
        <Panes />
        <Discussion />
      </div>
    </Card>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b-[0.5px] px-3 py-2">
      <SmallTitle className="min-w-0">
        <GitPullRequestArrowIcon className="size-3.5 shrink-0 text-(--plum-11)" />
        <span className="truncate">checkout-summary</span>
        <span className="text-low shrink-0">#482</span>
      </SmallTitle>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-low text-xxs max-sm:hidden">2 of 3 reviewed</span>
        <div className="flex -space-x-1.5">
          <Avatar src={ninaAvatar} />
          <Avatar src={andrewAvatar} />
          <span className="bg-app grid size-6 place-items-center rounded-full border-[0.5px] ring-2 ring-(--neutral-1)">
            <ArgosEmblem className="size-3 text-(--violet-11)" />
          </span>
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

/**
 * Anchored on the card that ApplicationSVG renders as changed,
 * so the comment visibly points at the thing that moved.
 */
function Pin() {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: "50%", top: "73%" }}
      aria-hidden
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-(--plum-9) opacity-40" />
      <span className="text-xxs relative grid size-5 place-items-center rounded-full bg-(--plum-9) font-semibold text-white shadow-md/20 ring-2 ring-(--neutral-1)">
        1
      </span>
    </span>
  );
}

function Discussion() {
  return (
    <div className="flex flex-col divide-y-[0.5px]">
      <div className="flex flex-col gap-3 p-3">
        <div className="flex gap-2.5">
          <Avatar src={ninaAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Nina</span>
              <span className="text-low text-xxs">2m ago</span>
            </div>
            <p className="text-low mt-0.5 text-xs">
              This card shifted 4px right. Intended?{" "}
              <span className="text-(--primary-11)">@andrew</span>
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Badge className="text-xxs">👍 2</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 pl-3">
          <CornerDownRightIcon className="text-low mt-1 size-3 shrink-0" />
          <Avatar src={andrewAvatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Andrew</span>
              <span className="text-low text-xxs">just now</span>
            </div>
            <p className="text-low mt-0.5 text-xs">
              Good catch, pushing a fix now.
            </p>
          </div>
        </div>
      </div>
      <ul className="divide-y-[0.5px]">
        <ReviewerRow
          name="Nina"
          verdict="approved"
          avatar={ninaAvatar}
          online
        />
        <ReviewerRow
          name="Andrew"
          verdict="changes"
          avatar={andrewAvatar}
          online
        />
        <ReviewerRow name="Argos Agent" verdict="pending" agent />
      </ul>
    </div>
  );
}

function ReviewerRow(props: {
  name: string;
  verdict: "approved" | "changes" | "pending";
  avatar?: ThemeImageProps["src"];
  agent?: boolean;
  online?: boolean;
}) {
  const { name, verdict, avatar, agent, online } = props;
  const config = {
    approved: {
      className: "border-(--success-7) text-(--success-11)",
      icon: <CheckIcon className="size-3" />,
      label: "Approved",
    },
    changes: {
      className: "border-(--danger-7) text-(--danger-11)",
      icon: <XIcon className="size-3" />,
      label: "Changes",
    },
    pending: {
      className: "border-(--amber-7) text-(--amber-11)",
      icon: <ClockIcon className="size-3" />,
      label: "Reviewing",
    },
  }[verdict];
  return (
    <li className="flex items-center gap-2.5 px-3 py-2">
      <span className="relative shrink-0">
        {agent ? (
          <span className="grid size-6 place-items-center rounded-full border-[0.5px] bg-(--violet-3)">
            <ArgosEmblem className="size-3 text-(--violet-11)" />
          </span>
        ) : (
          <ThemeImage
            src={avatar!}
            alt=""
            className="size-6 rounded-full border object-cover"
          />
        )}
        {online ? (
          <span className="absolute -right-0.5 -bottom-0.5">
            <DotIndicator variant="success" />
          </span>
        ) : null}
      </span>
      <span className="min-w-0 flex-1 truncate text-xs font-medium">
        {name}
      </span>
      <Badge className={clsx("text-xxs shrink-0 gap-1", config.className)}>
        {config.icon}
        {config.label}
      </Badge>
    </li>
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
