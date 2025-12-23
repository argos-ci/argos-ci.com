import { BugPlayIcon, ImageOffIcon, RotateCcwIcon } from "lucide-react";

import { leMondeQuote } from "@/app/assets/customers/library/le-monde";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { FailureScreenshots } from "./features/FailureScreenshots";
import { PlaywrightTrace } from "./features/PlaywrightTrace";
import { RetryScreenshots } from "./features/RetryScreenshots";

export function TestDebugging() {
  return (
    <FeatureSection
      features={[
        {
          key: "failure-screenshots",
          icon: <ImageOffIcon />,
          title: "Failure screenshots",
          text: "Capture screenshots on failure to instantly see what went wrong.",
          main: <FailureScreenshots />,
        },
        {
          key: "playwright-traces",
          icon: <BugPlayIcon />,
          title: "Playwright traces",
          text: "Replay test sessions step by step to understand every action and state.",
          main: <PlaywrightTrace />,
        },
        {
          key: "retry-screenshots",
          icon: <RotateCcwIcon />,
          title: "Retry screenshots",
          text: "Compare retries to confirm if issues are consistent or flaky.",
          main: <RetryScreenshots />,
        },
      ]}
      color="teal"
      featureName="Test Debugging"
      title="See why tests fail"
      description={`Investigate failed tests with full visual context.\nSee what broke, understand why, and fix it instantly.`}
      cta={<Button variant="outline">Explore Test Debugging</Button>}
      story={{
        quote: leMondeQuote,
        href: "/customers/lemonde",
      }}
    />
  );
}
