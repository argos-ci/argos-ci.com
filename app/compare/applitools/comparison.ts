import { ARGOS_PRO_FLAT_PRICE } from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "applitools",
  name: "Applitools",
  fullName: "Applitools",
  title: "Applitools vs Argos",
  description:
    "Learn how Argos compares to Applitools and why Argos is the best alternative for visual testing.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-applitools",
  pricingNote:
    "Applitools Starter is $667/month, paid annually, for 100,000 component or 1,000 page checkpoints (applitools.com/pricing, checked October 2026).",
  features: {
    pricing: {
      argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`,
      competitor: "From $667/mo",
    },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "✔️" },
    agentReady: { argos: "✔️", competitor: "MCP (Playwright)" },
    playwrightDebugging: { argos: "✔️", competitor: "❌" },
    playwrightTestRetries: { argos: "✔️", competitor: "❌" },
    githubSso: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "❌" },
    beautifulAndIntuitiveUi: { argos: "✔️", competitor: "❌" },
    bestScreenshotQuality: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "✔️" },
    sensitivityThresholdPerScreenshot: {
      argos: "✔️",
      competitor: "Match levels",
    },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
};
