import { FileDiffIcon, ScanEyeIcon, ScanTextIcon } from "lucide-react";
import Link from "next/link";

import { pivotAlexQuote } from "@/app/assets/customers/library/pivot";
import { AriaSnapshots } from "@/app/diff/features/AriaSnapshots";
import { SnapshotFiles } from "@/app/diff/features/SnapshotFiles";
import { Stabilization } from "@/app/diff/features/Stabilization";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

export function Diff() {
  return (
    <FeatureSection
      color="blue"
      featureName="Diff"
      title="See exactly what changed"
      description={`Deterministic diffs for screenshots; text diffs for Markdown, JSON, YAML, HTML and ARIA snapshots.\nEvery diff is structured data your agents read from the CLI or MCP.`}
      features={[
        {
          key: "real-changes",
          icon: <ScanEyeIcon />,
          title: "Only the real changes",
          text: "The SDK waits for fonts and images, hides carets and scrollbars and pauses GIFs before it captures. A deterministic pixel diff then separates change from rendering noise.",
          main: <Stabilization />,
          href: "/diff#screenshots",
        },
        {
          key: "any-file",
          icon: <FileDiffIcon />,
          title: "Any file, not just pixels",
          text: "Upload Markdown, JSON, YAML, HTML, CSS or JavaScript with the CLI and Argos diffs it as text against its baseline, in the same build as your screenshots.",
          main: <SnapshotFiles />,
          href: "/diff#any-file",
        },
        {
          key: "aria",
          icon: <ScanTextIcon />,
          title: "ARIA snapshots, diffed like code",
          text: "Capture the accessibility tree next to the screenshot and catch a renamed heading or a lost landmark even when the pixels don't move.",
          main: <AriaSnapshots />,
          href: "/diff#any-file",
        },
      ]}
      story={{
        quote: pivotAlexQuote,
        href: "/customers/pivot",
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/diff">Explore Diff</Link>
        </Button>
      }
    />
  );
}
