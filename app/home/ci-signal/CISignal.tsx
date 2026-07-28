import { BugPlayIcon, FlagOffIcon, WavesIcon } from "lucide-react";

import { muiQuote } from "@/app/assets/customers/library/mui";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { FlakyIndicator } from "../flaky-management/features/FlakyIndicator";
import { IgnoreChanges } from "../flaky-management/features/IgnoreChanges";
import { PlaywrightTrace } from "../test-debugging/features/PlaywrightTrace";

/**
 * Flaky management and test debugging both answer the same objection — "can I
 * trust a red build?" — so they share one section instead of two.
 */
export function CISignal() {
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
          title: "Automatic noise silencing",
          text: "Ignore recurring flaky changes to keep your CI signal clean and focused.",
          main: <IgnoreChanges />,
          href: "/flaky-management",
        },
        {
          key: "playwright-traces",
          icon: <BugPlayIcon />,
          title: "Traces on every failure",
          text: "Replay a failed run step by step, with the Playwright trace and failure screenshots attached.",
          main: <PlaywrightTrace />,
          href: "/test-debugging",
        },
      ]}
      color="amber"
      featureName="CI Signal"
      title="A CI signal you can actually trust"
      description={`Argos flags unstable tests, silences recurring noise, and attaches the trace and failure screenshots to every failed run.\nSo a red build always means something real.`}
      cta={
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/flaky-management">Explore Flaky Management</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/test-debugging">Explore Test Debugging</Link>
          </Button>
        </div>
      }
      story={{
        quote: muiQuote,
        href: "/customers/mui",
      }}
    />
  );
}
