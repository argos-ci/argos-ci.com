import {
  GroupIcon,
  type LucideIcon,
  ScanEyeIcon,
  ThumbsUpIcon,
} from "lucide-react";

import { Button } from "@/components/Button";
import { ThemeImage } from "@/components/ThemeImage";

import { HomeSection } from "../common/HomeSection";
import fastApprovalFlowSvg from "./assets/fast-approval-flow.svg";

export function VisualTesting() {
  return (
    <HomeSection>
      <div className="relative border-x">
        <div className="flex flex-col gap-10 px-4 py-16 sm:px-10">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="h-1.5 w-3 rounded bg-(--blue-10)" />
              Visual Testing
            </div>
            <h2 className="font-accent text-[2.625rem] leading-[1.1] font-medium">
              Spot every change
            </h2>
            <p className="text-low text-lg leading-[1.4] font-medium">
              Catch, compare, and review visual changes.
              <br />
              Stay focused on real differences and skip the noise.
            </p>
          </div>
          <div>
            <Button variant="outline">Explore Visual Testing</Button>
          </div>
        </div>
        <div className="bg-subtle border-y">
          <ThemeImage src={fastApprovalFlowSvg} alt="Fast approval flow" />
          <div className="relative -ml-px flex flex-col items-start justify-center gap-10 py-8 md:ml-0 md:flex-row">
            <Feature
              icon={ScanEyeIcon}
              title="Smart detection"
              text="Built-in stabilization that filters out noise for cleaner, more reliable visual diffs."
            />
            <Feature
              icon={ThumbsUpIcon}
              title="Fast approval flow"
              text="A UX built for speed, review, approve, and ship confidently in seconds."
            />
            <Feature
              icon={GroupIcon}
              title="Grouped diffs"
              text="Similar changes are grouped, so you review once and move on."
            />
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

function Feature(props: { icon: LucideIcon; title: string; text: string }) {
  const { icon: Icon, title, text } = props;
  return (
    <div className="flex flex-col border-l pl-6 text-sm md:max-w-56">
      <Icon strokeWidth={1} className="size-5" />
      <h3 className="mt-2 mb-3 font-medium">{title}</h3>
      <p className="text-low">{text}</p>
    </div>
  );
}
