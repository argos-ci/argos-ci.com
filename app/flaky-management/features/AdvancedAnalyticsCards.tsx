import { ActivityIcon, BarChart2Icon } from "lucide-react";

import { Card } from "@/components/Card";
import { CircleProgress } from "@/components/CircleProgress";
import { SmallTitle } from "@/components/Typography";

export function AdvancedAnalyticsCardsIllustration() {
  return (
    <div className="relative size-full">
      <Card
        className="absolute top-4 left-4 flex w-40 flex-col gap-3 p-3"
        shadow="high"
      >
        <SmallTitle>
          <ActivityIcon className="size-3 text-(--danger-10)" />
          Flakiness score
        </SmallTitle>
        <CircleProgress
          stroke="var(--danger-10)"
          strokeWidth={8}
          size={96}
          progress={73}
          label="Flakiness"
        />
      </Card>
      <Card
        className="absolute right-4 bottom-4 flex w-40 flex-col gap-1 p-3"
        shadow="high"
      >
        <SmallTitle>
          <BarChart2Icon className="text-low size-3" />
          Build metrics
        </SmallTitle>
        <div className="grid grid-cols-2 text-sm">
          <Metric label="Builds" value="63" />
          <Metric label="Stability" value="51%" />
          <Metric label="Changes" value="31" />
          <Metric label="Consistency" value="3%" />
        </div>
      </Card>
    </div>
  );
}

function Metric(props: { label: string; value: string }) {
  return (
    <div className="py-2">
      <div className="text-xxs text-(--neutral-11)">{props.label}</div>
      <div className="text-lg leading-7 font-semibold text-(--neutral-12)">
        {props.value}
      </div>
    </div>
  );
}
