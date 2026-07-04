import { BugPlayIcon, FlagOffIcon, WavesIcon } from "lucide-react";

import { muiQuote } from "@/app/assets/customers/library/mui";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { PlaywrightTrace } from "../test-debugging/features/PlaywrightTrace";
import { FlakyIndicator } from "./features/FlakyIndicator";
import { IgnoreChanges } from "./features/IgnoreChanges";

export function FlakyManagement() {
  return (
    <FeatureSection
      features={[
        {
          key: "flaky-indicator",
          icon: <WavesIcon />,
          title: "Flaky indicator",
          text: "Highlights unstable changes so you know when a test isn’t reliable.",
          main: <FlakyIndicator />,
          href: "/flaky-management",
        },
        {
          key: "ignore-changes",
          icon: <FlagOffIcon />,
          title: "Ignore the noise",
          text: "Silence flaky changes to keep your CI signal clean and focused.",
          main: <IgnoreChanges />,
          href: "/flaky-management",
        },
        {
          key: "test-debugging",
          icon: <BugPlayIcon />,
          title: "Debug every failure",
          text: "Playwright traces, failure and retry screenshots to see why a test broke.",
          main: <PlaywrightTrace />,
          href: "/test-debugging",
        },
      ]}
      color="amber"
      featureName="Reliability"
      title="Keep your CI trustworthy at scale"
      description={`Detect flaky tests, silence the noise, and debug failures fast.\nAs test volume explodes, a green build stays a green build.`}
      cta={
        <Button variant="outline" asChild>
          <Link href="/flaky-management">Explore Reliability</Link>
        </Button>
      }
      story={{
        quote: muiQuote,
        href: "/customers/mui",
      }}
    />
  );
}
