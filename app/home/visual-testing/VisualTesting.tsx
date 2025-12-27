import { GitPullRequestIcon, ScanEyeIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

import { mermaidQuote } from "@/app/assets/customers/library/mermaid";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { CIIntegration } from "./features/CIIntegration";
import { FastApprovalFlow } from "./features/FastApprovalFlow";
import { Stabilization } from "./features/Stabilization";

export function VisualTesting() {
  return (
    <FeatureSection
      features={[
        {
          key: "fast-approval-flow",
          icon: <ThumbsUpIcon />,
          title: "Fast approval flow",
          text: "A UX built for speed, review, approve, and ship confidently in seconds.",
          main: <FastApprovalFlow />,
          href: "/visual-testing",
        },
        {
          key: "ci-flow",
          icon: <GitPullRequestIcon />,
          title: "CI integration",
          text: "Visual checks integrated directly into your CI, from commit to deploy.",
          main: <CIIntegration />,
          href: "/visual-testing",
        },
        {
          key: "smart-detection",
          icon: <ScanEyeIcon />,
          title: "Smart detection",
          text: "Built-in stabilization that filters out noise for cleaner, more reliable visual diffs.",
          main: <Stabilization />,
          href: "/visual-testing",
        },
      ]}
      color="blue"
      featureName="Visual Testing"
      title="Spot every change"
      description={`Catch, compare, and review visual changes.\nStay focused on real differences and skip the noise.`}
      story={{
        quote: mermaidQuote,
        href: "/customers/mermaid",
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/visual-testing">Explore Visual Testing</Link>
        </Button>
      }
    />
  );
}
