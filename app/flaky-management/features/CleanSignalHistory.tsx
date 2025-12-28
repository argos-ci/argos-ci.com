import { AlertCircleIcon, CheckCircle2Icon, FlagOffIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

export function CleanSignalHistoryIllustration() {
  return (
    <Card className="w-full max-w-70 overflow-hidden" shadow="high">
      <div className="divide-y-[0.5px] text-sm font-medium text-(--neutral-12)">
        <Row
          label="Changed"
          icon={<AlertCircleIcon className="size-4 text-(--danger-10)" />}
          badge="1 / 7"
        />
        <Row
          label="Unchanged"
          icon={<CheckCircle2Icon className="size-4 text-(--success-10)" />}
          badge="416"
        />
        <Row
          label="Ignored"
          icon={<FlagOffIcon className="size-4 text-(--neutral-10)" />}
          badge="22"
        />
      </div>
    </Card>
  );
}

function Row(props: { icon: React.ReactNode; label: string; badge: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-3">
      <div className="flex items-center gap-2">
        {props.icon}
        <span>{props.label}</span>
      </div>
      <Badge className="text-low">{props.badge}</Badge>
    </div>
  );
}
