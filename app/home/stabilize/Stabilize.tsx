import { BugPlayIcon, FlagOffIcon, WavesIcon } from "lucide-react";
import Link from "next/link";

import { permitIoQuote } from "@/app/assets/customers/library/permit-io";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { FlakyIndicator } from "./features/FlakyIndicator";
import { IgnoreChanges } from "./features/IgnoreChanges";
import { PlaywrightTrace } from "./features/PlaywrightTrace";

export function Stabilize() {
  return (
    <FeatureSection
      features={[
        {
          key: "flaky-indicator",
          icon: <WavesIcon />,
          title: "A flaky badge on every change",
          text: "Every changed test in a build review carries the flakiness Argos measured on your auto-approved builds. Select it to open the test's full history.",
          main: <FlakyIndicator />,
          href: "/stabilize",
        },
        {
          key: "ignore-changes",
          icon: <FlagOffIcon />,
          title: "Ignore noise, keep signal",
          text: "Ignore a recurring change in one click, or let Argos do it after it comes back enough times. An ignore is scoped to one diff fingerprint, so a new regression still shows up.",
          main: <IgnoreChanges />,
          href: "/stabilize",
        },
        {
          key: "trace",
          icon: <BugPlayIcon />,
          title: "Debug from the trace",
          text: "The Argos reporter uploads the Playwright trace and the failure screenshot of every attempt. Replay the failure in Argos, with no artifact to download.",
          main: <PlaywrightTrace />,
          href: "/stabilize#debug",
        },
      ]}
      color="amber"
      featureName="Stabilize"
      title="Kill flakes and debug failures"
      description={`Detect, manage and fix flaky tests.\nTrack instability across builds and automatically silence noise.`}
      story={{
        quote: permitIoQuote,
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/stabilize">Explore Stabilize</Link>
        </Button>
      }
    />
  );
}
