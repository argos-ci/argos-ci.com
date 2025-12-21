import { GroupIcon, ScanEyeIcon, ThumbsUpIcon } from "lucide-react";

import { mermaidQuote } from "@/app/assets/customers/library/mermaid";
import { Button } from "@/components/Button";

import { FeatureSection } from "../common/feature-section/FeatureSection";
import { FastApprovalFlow } from "./features/FastApprovalFlow";
import { GroupedDiffs } from "./features/GroupedDiffs";
import { Stabilization } from "./features/Stabilization";

export function VisualTesting() {
  return (
    <FeatureSection
      features={[
        {
          key: "smart-detection",
          icon: <ScanEyeIcon />,
          title: "Smart detection",
          text: "Built-in stabilization that filters out noise for cleaner, more reliable visual diffs.",
          main: <Stabilization />,
        },
        {
          key: "fast-approval-flow",
          icon: <ThumbsUpIcon />,
          title: "Fast approval flow",
          text: "A UX built for speed, review, approve, and ship confidently in seconds.",
          main: <FastApprovalFlow />,
        },
        {
          key: "grouped-diffs",
          icon: <GroupIcon />,
          title: "Grouped diffs",
          text: "Similar changes are grouped, so you review once and move on.",
          main: <GroupedDiffs />,
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
