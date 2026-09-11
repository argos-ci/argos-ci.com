import clsx from "clsx";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type ReviewerName = "andrew" | "nina";

/**
 * Newest first, and consistent with how Argos decides a build: only each
 * reviewer's latest review counts, and one rejection blocks. Nina rejected,
 * Andrew approved, then Nina came back and approved, so the build is
 * approved, and the rejection stays in the record without deciding anything.
 */
const REVIEWS: Array<{
  status: "Approved" | "Rejected";
  tone: "success" | "danger";
  time: string;
  author: string;
  name: ReviewerName;
  summary?: string;
}> = [
  {
    status: "Approved",
    tone: "success",
    time: "2 minutes ago",
    author: "Nina",
    name: "nina",
    summary: "Fixed in 3f2a1c, matches the design.",
  },
  {
    status: "Approved",
    tone: "success",
    time: "1 hour ago",
    author: "Andrew",
    name: "andrew",
  },
  {
    status: "Rejected",
    tone: "danger",
    time: "3 hours ago",
    author: "Nina",
    name: "nina",
    summary: "Price tag is clipped on mobile.",
  },
];

export function ReviewHistory() {
  return (
    <div className="relative flex w-full flex-col items-center gap-3">
      <Chip
        variant="success"
        icon={ThumbsUpIcon}
        className="animate-slide-up-fade px-4 py-2 text-base animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
      >
        <span className="flex items-center gap-3">
          Approved
          <AvatarStack />
        </span>
      </Chip>

      <Card
        className="w-full max-w-md animate-slide-up-fade p-3 text-sm animate-delay-150 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
        shadow="high"
      >
        <div className="flex items-center justify-between gap-2">
          <SmallTitle>History of reviews</SmallTitle>
          <Badge>3 / 3 reviewed</Badge>
        </div>
        <div className="mt-2 divide-y-[0.5px]">
          {REVIEWS.map((review) => (
            <HistoryRow key={`${review.name}-${review.time}`} {...review} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function HistoryRow(props: {
  status: string;
  tone: "success" | "danger";
  time: string;
  author: string;
  name: ReviewerName;
  summary?: string;
}) {
  const { name, status, tone, time, author, summary } = props;

  return (
    <div className="px-1 py-2 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <Chip
          variant={tone}
          icon={{ success: ThumbsUpIcon, danger: ThumbsDownIcon }[tone]}
        >
          {status}
        </Chip>
        <div className="flex flex-wrap items-center gap-1.5 text-low">
          <span className="font-medium text-(--neutral-10)">{time} by</span>
          <span className="flex items-center gap-1">
            <Avatar name={name} />
            <span className="font-semibold text-(--neutral-12)">{author}</span>
          </span>
        </div>
      </div>
      {summary ? (
        <p className="mt-1 truncate text-xxs text-low">{summary}</p>
      ) : null}
    </div>
  );
}

function AvatarStack() {
  return (
    <span className="-mr-1 ml-1 flex items-center">
      <Avatar name="andrew" />
      <Avatar name="nina" className="-ml-1.5" />
    </span>
  );
}

function Avatar(props: { name: ReviewerName; className?: string }) {
  const { name, className } = props;
  return (
    <ThemeImage
      className={clsx(
        "size-4 rounded-full border border-(--neutral-1)",
        className,
      )}
      src={{ andrew: andrewAvatar, nina: ninaAvatar }[name]}
      alt=""
    />
  );
}
