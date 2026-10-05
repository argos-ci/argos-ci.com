import { ARGOS_PRO_FLAT_PRICE } from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "chromatic",
  name: "Chromatic",
  fullName: "Chromatic",
  title: "Chromatic vs Argos",
  description:
    "Learn how Argos compares to Chromatic and why Argos is the best alternative for visual testing.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-chromatic",
  features: {
    pricing: { argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`, competitor: "$179/mo" },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "Storybook only" },
    collaborativeReviews: { argos: "✔️", competitor: "✔️" },
    agentReady: { argos: "✔️", competitor: "Docs-only MCP" },
    playwrightDebugging: { argos: "✔️", competitor: "❌" },
    playwrightTestRetries: { argos: "✔️", competitor: "❌" },
    githubSso: { argos: "✔️", competitor: "✔️" },
    openSource: { argos: "✔️", competitor: "❌" },
    beautifulAndIntuitiveUi: { argos: "✔️", competitor: "✔️" },
    bestScreenshotQuality: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "✔️" },
    sensitivityThresholdPerScreenshot: { argos: "✔️", competitor: "✔️" },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
  additionalFeatures: [
    {
      title: "Screenshot in Play function",
      description: "Take screenshots during the test",
      href: "/docs/reference/storybook#interactions-using-the-play-function",
      argos: "✔️",
      competitor: "❌",
    },
    {
      title: "No time-limit for Play function",
      description: "Take screenshots of long-running tests",
      argos: "✔️",
      competitor: "❌",
    },
  ],
  pricingNote:
    "Chromatic prices from chromatic.com/pricing (checked October 2026). The estimate assumes 80% of Storybook snapshots are TurboSnap copies, billed at a fifth.",
};
