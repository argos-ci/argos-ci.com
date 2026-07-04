import { FileDiffIcon, ScanEyeIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

import { mermaidQuote } from "@/app/assets/customers/library/mermaid";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { FastApprovalFlow } from "./features/FastApprovalFlow";
import { SnapshotFiles } from "./features/SnapshotFiles";
import { Stabilization } from "./features/Stabilization";

export function VisualTesting() {
  return (
    <FeatureSection
      features={[
        {
          key: "fast-approval-flow",
          icon: <ThumbsUpIcon />,
          title: "Confidence to merge",
          text: "See exactly what a PR changes, then review, approve, and ship in seconds.",
          main: <FastApprovalFlow />,
          href: "/visual-testing",
        },
        {
          key: "any-file",
          icon: <FileDiffIcon />,
          title: "Any file, not just pixels",
          text: "Snapshot screenshots, Markdown, JSON, HTML, CSS — anything your app or your agents produce.",
          main: <SnapshotFiles />,
          href: "/visual-testing",
        },
        {
          key: "smart-detection",
          icon: <ScanEyeIcon />,
          title: "Smart detection",
          text: "Built-in stabilization filters out noise for cleaner, more reliable diffs.",
          main: <Stabilization />,
          href: "/visual-testing",
        },
      ]}
      color="blue"
      featureName="Change Detection"
      title="See exactly what changed"
      description={`Catch, compare, and review every change — pixels or any file.\nStay focused on real differences and skip the noise.`}
      story={{
        quote: mermaidQuote,
        href: "/customers/mermaid",
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/visual-testing">Explore Change Detection</Link>
        </Button>
      }
    />
  );
}
