import { ChartSplineIcon, FlagOffIcon, WavesIcon } from "lucide-react";

import { muiQuote } from "@/app/assets/customers/library/mui";
import { Button } from "@/components/Button";

import { FeatureSection } from "../common/feature-section/FeatureSection";
import { AdvancedAnalytics } from "./features/AdvancedAnalytics";
import { FlakyIndicator } from "./features/FlakyIndicator";
import { IgnoreChanges } from "./features/IgnoreChanges";

export function FlakyDetection() {
  return (
    <FeatureSection
      features={[
        {
          key: "flaky-indicator",
          icon: <WavesIcon />,
          title: "Flaky indicator",
          text: "Highlights unstable changes to know when a test isn’t reliable.",
          main: <FlakyIndicator />,
        },
        {
          key: "advanced-analytics",
          icon: <ChartSplineIcon />,
          title: "Advanced analytics",
          text: "Track instability trends across builds to uncover recurring issues.",
          main: <AdvancedAnalytics />,
        },
        {
          key: "ignore-changes",
          icon: <FlagOffIcon />,
          title: "Ignore changes",
          text: "Ignore flaky changes to keep your CI signal clean and focused.",
          main: <IgnoreChanges />,
        },
      ]}
      color="amber"
      featureName="Flaky Detection"
      title="Keep flakiness under control"
      description={`Detect, manage and fix flaky tests.\nTrack instability across builds and automatically silence flaky noise.`}
      cta={<Button variant="outline">Explore Flaky Detection</Button>}
      story={{
        quote: muiQuote,
        href: "/customers/gitbook",
      }}
    />
  );
}
