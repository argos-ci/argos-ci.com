import { GroupIcon, ScanEyeIcon, ThumbsUpIcon } from "lucide-react";

import { mermaidQuote } from "@/app/assets/customers/library/mermaid";
import { Button } from "@/components/Button";
import { ThemeImage } from "@/components/ThemeImage";

import { FeatureSection } from "../common/feature-section/FeatureSection";
import fastApprovalFlowSvg from "./assets/features/fast-approval-flow.svg";
import groupSvg from "./assets/features/group.svg";
import smartDetectionSvg from "./assets/features/smart-detection.svg";

export function VisualTesting() {
  return (
    <FeatureSection
      features={[
        {
          key: "smart-detection",
          icon: <ScanEyeIcon />,
          title: "Smart detection",
          text: "Built-in stabilization that filters out noise for cleaner, more reliable visual diffs.",
          main: (
            <ThemeImage className="h-full" src={smartDetectionSvg} alt="" />
          ),
        },
        {
          key: "fast-approval-flow",
          icon: <ThumbsUpIcon />,
          title: "Fast approval flow",
          text: "A UX built for speed, review, approve, and ship confidently in seconds.",
          main: (
            <ThemeImage className="h-full" src={fastApprovalFlowSvg} alt="" />
          ),
        },
        {
          key: "grouped-diffs",
          icon: <GroupIcon />,
          title: "Grouped diffs",
          text: "Similar changes are grouped, so you review once and move on.",
          main: <ThemeImage className="h-full" src={groupSvg} alt="" />,
        },
      ]}
      color="blue"
      featureName="Visual Testing"
      title="Spot every change"
      description={`Catch, compare, and review visual changes.\nStay focused on real differences and skip the noise.`}
      cta={<Button variant="outline">Explore Visual Testing</Button>}
      story={{
        quote: mermaidQuote,
        href: "/customers/mermaid",
      }}
    />
  );
}
