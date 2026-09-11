import clsx from "clsx";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type Verdict = "approved" | "rejected" | "pending";

type Reviewer = {
  name: string;
  /** Local time from the presence card, or where the review came from. */
  meta: string;
  online: boolean;
  verdict: Verdict;
  avatar: ThemeImageProps["src"] | { initial: string };
};

/**
 * Three reviewers, three states, one rule. Andrew's rejection came in through
 * the CLI (an agent ran it with his personal access token, so Argos attributes
 * it to him, not to a bot), and it is enough to block the build whatever Nina
 * decided. Sam was requested and hasn't weighed in yet.
 */
const REVIEWERS: Reviewer[] = [
  {
    name: "Nina",
    meta: "10:24 local",
    online: true,
    verdict: "approved",
    avatar: ninaAvatar,
  },
  {
    name: "Andrew",
    meta: "via CLI · just now",
    online: false,
    verdict: "rejected",
    avatar: andrewAvatar,
  },
  {
    name: "Sam",
    meta: "17:24 local",
    online: true,
    verdict: "pending",
    avatar: { initial: "S" },
  },
];

const VERDICTS: Record<
  Verdict,
  { className: string; icon: React.ReactNode; label: string }
> = {
  approved: {
    className: "border-(--success-7) text-(--success-11)",
    icon: <CheckIcon className="size-3" />,
    label: "Approved",
  },
  rejected: {
    className: "border-(--danger-7) text-(--danger-11)",
    icon: <XIcon className="size-3" />,
    label: "Rejected",
  },
  pending: {
    className: "border-(--amber-7) text-(--amber-11)",
    icon: <ClockIcon className="size-3" />,
    label: "Pending",
  },
};

function VerdictBadge(props: { verdict: Verdict }) {
  const config = VERDICTS[props.verdict];
  return (
    <Badge className={clsx("gap-1 text-xxs", config.className)}>
      {config.icon}
      {config.label}
    </Badge>
  );
}

export function Reviewers() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-sm animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <SmallTitle>Reviewers</SmallTitle>
        <span className="text-xxs text-low">2 online</span>
      </div>
      <ul className="divide-y-[0.5px]">
        {REVIEWERS.map((reviewer) => (
          <li
            key={reviewer.name}
            className="flex items-center gap-3 px-3 py-2.5"
          >
            <span className="relative">
              <Avatar avatar={reviewer.avatar} />
              {reviewer.online ? (
                <span className="absolute -right-0.5 -bottom-0.5">
                  <DotIndicator variant="success" />
                </span>
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{reviewer.name}</div>
              <div className="text-xxs text-low">{reviewer.meta}</div>
            </div>
            <VerdictBadge verdict={reviewer.verdict} />
          </li>
        ))}
      </ul>
      {/* The rule the list illustrates, stated where the eye lands last. */}
      <div className="flex items-center gap-2 border-t-[0.5px] bg-subtle px-3 py-2 text-xxs">
        <DotIndicator variant="danger" />
        <span className="font-medium text-(--danger-11)">Build rejected</span>
        <span className="text-low">· one rejection blocks</span>
      </div>
    </Card>
  );
}

function Avatar(props: { avatar: Reviewer["avatar"] }) {
  const { avatar } = props;
  if (typeof avatar !== "string" && "initial" in avatar) {
    return (
      <span className="grid size-7 place-items-center rounded-full border-[0.5px] bg-(--neutral-3) text-xs font-semibold text-(--neutral-11)">
        {avatar.initial}
      </span>
    );
  }
  return (
    <ThemeImage
      src={avatar}
      alt=""
      className="size-7 rounded-full border object-cover"
    />
  );
}
