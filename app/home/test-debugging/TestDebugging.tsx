import { BugPlayIcon, ImageOffIcon, RotateCcwIcon } from "lucide-react";

import { lemondeQuote } from "@/app/assets/customers/library/lemonde";
import { Button } from "@/components/Button";
import { ThemeImage } from "@/components/ThemeImage";

import { FeatureSection } from "../common/feature-section/FeatureSection";
import failureScreenshotsSvg from "./assets/features/failure-screenshots.svg";
import playwrightTracesSvg from "./assets/features/playwright-traces.svg";
import retryScrenshotsSvg from "./assets/features/retry-screenshots.svg";

export function TestDebugging() {
  return (
    <FeatureSection
      features={[
        {
          key: "failure-screenshots",
          icon: <ImageOffIcon />,
          title: "Failure screenshots",
          text: "Capture screenshots on failure to instantly see what went wrong.",
          main: (
            <ThemeImage className="h-full" src={failureScreenshotsSvg} alt="" />
          ),
        },
        {
          key: "playwright-traces",
          icon: <BugPlayIcon />,
          title: "Playwright traces",
          text: "Replay test sessions step by step to understand every action and state.",
          main: (
            <ThemeImage className="h-full" src={playwrightTracesSvg} alt="" />
          ),
        },
        {
          key: "retry-screenshots",
          icon: <RotateCcwIcon />,
          title: "Retry screenshots",
          text: "Compare retries to confirm if issues are consistent or flaky.",
          main: (
            <ThemeImage className="h-full" src={retryScrenshotsSvg} alt="" />
          ),
        },
      ]}
      color="teal"
      featureName="Test Debugging"
      title="See why tests fail"
      description={`Investigate failed tests with full visual context.\nSee what broke, understand why, and fix it instantly.`}
      cta={<Button variant="outline">Explore Test Debugging</Button>}
      story={{
        quote: lemondeQuote,
        href: "/customers/lemonde",
      }}
    />
  );
}
