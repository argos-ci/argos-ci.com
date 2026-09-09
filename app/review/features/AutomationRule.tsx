import { WorkflowIcon } from "lucide-react";

import { slack } from "@/app/assets/brands/library";
import msteams from "@/app/home/integrations/assets/msteams.svg";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

/**
 * One automation as the docs describe it (when, if, then) with the real
 * labels from the Automations tab: the "Build Completed" event, a build
 * conclusion condition, and the two channel actions most teams pair.
 */
export function AutomationRule() {
  return (
    <div className="relative mx-auto w-full max-w-md px-3">
      <div
        aria-hidden
        className="absolute top-12 -right-12 -left-12 -z-10 h-28 rounded-full bg-[radial-gradient(circle_at_center,var(--pink-3),transparent_60%)] blur-3xl"
      />
      <Card
        className="animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
        shadow="high"
      >
        <div className="flex items-center justify-between gap-2 border-b-[0.5px] px-3 py-2">
          <SmallTitle className="min-w-0">
            <WorkflowIcon className="size-3 shrink-0" />
            <span className="truncate">Notify the review channel</span>
          </SmallTitle>
          <Chip variant="success" className="shrink-0 text-xxs">
            Active
          </Chip>
        </div>

        <div className="space-y-2.5 p-3 text-xs">
          <Step label="When">
            <Chip variant="primary">Build Completed</Chip>
          </Step>
          <Step label="If">
            <Chip>Build conclusion</Chip>
            <span className="text-low">is</span>
            <Chip variant="warning">changes detected</Chip>
          </Step>
          <Step label="Then">
            <div className="w-full space-y-2">
              <ActionRow
                logo={slack.logo}
                title="Post in Slack channel"
                target="#frontend-reviews"
              />
              <ActionRow
                logo={msteams}
                title="Post in Microsoft Teams channel"
                target="Design review"
              />
            </div>
          </Step>
        </div>
      </Card>
    </div>
  );
}

function Step(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props;
  return (
    <div className="flex items-start gap-3">
      <span className="w-9 shrink-0 pt-1 text-xxs font-semibold tracking-wide text-low uppercase">
        {label}
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        {children}
      </div>
    </div>
  );
}

function ActionRow(props: {
  logo: ThemeImageProps["src"];
  title: string;
  target: string;
}) {
  const { logo, title, target } = props;
  return (
    <div className="flex items-center gap-2.5 rounded-lg border-[0.5px] bg-app px-2.5 py-2 shadow-xs">
      <div className="grid size-6 shrink-0 place-items-center rounded border-[0.5px] bg-app">
        <ThemeImage src={logo} className="size-3.5" alt="" />
      </div>
      <span className="min-w-0 flex-1 truncate font-medium">{title}</span>
      <Chip className="shrink-0 text-xxs max-sm:hidden">{target}</Chip>
    </div>
  );
}
