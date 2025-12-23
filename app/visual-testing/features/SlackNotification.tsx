import { CheckCircleIcon, type LucideIcon, ZapIcon } from "lucide-react";

import { slack } from "@/app/assets/brands/library";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

export function SlackNotification() {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute top-12 -right-12 -left-12 -z-10 h-28 rounded-full bg-[radial-gradient(circle_at_center,var(--primary-3),transparent_60%)] blur-3xl"
      />
      <AutomationBuilder />
    </div>
  );
}

function AutomationBuilder() {
  return (
    <Card className="overflow-hidden border" shadow="shadow-lg">
      <div className="border-b-[0.5px] px-3 py-2 text-sm font-semibold">
        Automations builder
      </div>

      <div className="space-y-3 p-3">
        <BuilderRow icon={ZapIcon} label="Trigger" value="Build completes" />
        <BuilderRow
          icon={CheckCircleIcon}
          label="Conclusion"
          value="Changes detected"
          tone="warning"
        />

        <div className="space-y-2">
          <ActionRow channel="engineering" workspace="Acme" />
          <GhostSelect label="Add action..." />
        </div>
      </div>
    </Card>
  );
}

function GhostSelect(props: { label: string }) {
  const { label } = props;
  return (
    <div className="text-low rounded-md border border-dashed border-(--neutral-6) px-3 py-2 text-sm font-semibold">
      {label}
    </div>
  );
}

function ActionRow(props: { channel: string; workspace: string }) {
  const { channel, workspace } = props;
  return (
    <div className="bg-app space-y-2 rounded-md border px-3 py-2 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="bg-app grid place-items-center rounded border-[0.5px] p-1.5">
          <ThemeImage src={slack.logo} className="size-4" alt="" />
        </div>
        <div className="text-sm font-semibold">Send notification to Slack</div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <Chip variant="primary">{workspace} workspace</Chip>
        <Chip>#{channel}</Chip>
      </div>
    </div>
  );
}

function BuilderRow(props: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "primary" | "success" | "warning";
  disabled?: boolean;
}) {
  const { icon: Icon, label, value, tone } = props;

  return (
    <div className="bg-app flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="grid size-7 place-items-center rounded-full border bg-(--neutral-1) text-lg leading-none">
          <Icon className="size-4" />
        </span>
        <div className="font-semibold">{label}</div>
      </div>
      <Chip variant={tone} className="text-xs sm:text-sm">
        {value}
      </Chip>
    </div>
  );
}
