import clsx from "clsx";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { andrewAvatar, ninaAvatar } from "@/app/assets/people/library";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

const REVIEWS = [
  {
    status: "Approved",
    tone: "success" as const,
    time: "2 minutes ago",
    author: "Andrew",
    name: "andrew" as const,
  },
  {
    status: "Rejected",
    tone: "danger" as const,
    time: "3 hours ago",
    author: "Nina",
    name: "nina" as const,
  },
];

export function ReviewHistory() {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <Chip
        variant="success"
        icon={ThumbsUpIcon}
        className="px-4 py-2 text-base"
      >
        <span className="flex items-center gap-3">
          Approved
          <AvatarStack />
        </span>
      </Chip>

      <Card className="w-full max-w-3xl p-3 text-sm" shadow="high">
        <SmallTitle>History of reviews</SmallTitle>
        <div className="mt-3 divide-y-[0.5px]">
          {REVIEWS.map((review) => (
            <HistoryRow
              key={review.author}
              tone={review.tone}
              status={review.status}
              time={review.time}
              author={review.author}
              name={review.name}
            />
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
  name: "andrew" | "nina";
}) {
  const { name, status, tone, time, author } = props;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-2 text-xs">
      <Chip
        variant={tone}
        icon={
          {
            success: ThumbsUpIcon,
            danger: ThumbsDownIcon,
          }[tone]
        }
      >
        {status}
      </Chip>

      <div className="text-low flex flex-wrap items-center gap-2">
        <span className="font-medium text-(--neutral-10)">{time} by</span>
        <span className="flex items-center gap-1">
          <Avatar name={name} />
          <span className="font-semibold text-(--neutral-12)">{author}</span>
        </span>
      </div>
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

function Avatar(props: { name: "andrew" | "nina"; className?: string }) {
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
