"use client";

import clsx from "clsx";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type Verdict = "approved" | "changes" | "pending";

type Reviewer = {
  name: string;
  time: string;
  online: boolean;
  verdict: Verdict;
  avatar?: ThemeImageProps["src"];
  agent?: boolean;
};

const REVIEWERS: Reviewer[] = [
  {
    name: "Nina",
    time: "10:24 local",
    online: true,
    verdict: "approved",
    avatar: ninaAvatar,
  },
  {
    name: "Andrew",
    time: "17:24 local",
    online: true,
    verdict: "changes",
    avatar: andrewAvatar,
  },
  {
    name: "Argos Agent",
    time: "via CLI",
    online: false,
    verdict: "approved",
    agent: true,
  },
];

function VerdictBadge(props: { verdict: Verdict }) {
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
      label: "Pending",
    },
  }[props.verdict];
  return (
    <Badge className={clsx("text-xxs gap-1", config.className)}>
      {config.icon}
      {config.label}
    </Badge>
  );
}

export function Reviewers() {
  return (
    <Card
      shadow="high"
      className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-sm overflow-hidden"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <SmallTitle>Reviewers</SmallTitle>
        <span className="text-low text-xxs">2 online</span>
      </div>
      <ul className="divide-y">
        {REVIEWERS.map((reviewer) => (
          <li key={reviewer.name} className="flex items-center gap-3 px-3 py-2.5">
            <span className="relative">
              {reviewer.agent ? (
                <span className="grid size-7 place-items-center rounded-full border-[0.5px] bg-(--violet-3)">
                  <ArgosEmblem className="size-4 text-(--violet-11)" />
                </span>
              ) : (
                <ThemeImage
                  src={reviewer.avatar!}
                  alt=""
                  className="size-7 rounded-full border object-cover"
                />
              )}
              {reviewer.online ? (
                <span className="absolute -right-0.5 -bottom-0.5">
                  <DotIndicator variant="success" />
                </span>
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{reviewer.name}</div>
              <div className="text-low text-xxs">{reviewer.time}</div>
            </div>
            <VerdictBadge verdict={reviewer.verdict} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
