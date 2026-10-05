import { ARGOS_PRO_FLAT_PRICE } from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "percy",
  name: "Percy",
  fullName: "Percy by Browserstack",
  title: "Percy vs Argos",
  description:
    "Learn how Argos compares to Percy and why Argos is the best alternative for visual testing.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-percy",
  pricingNote:
    "Percy's free plan includes 5,000 screenshots a month. BrowserStack no longer publishes paid Percy prices; they are quoted by sales (browserstack.com/docs/percy/overview/plans-and-billing, checked October 2026).",
  features: {
    pricing: {
      argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`,
      competitor: "Not published",
    },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "❌" },
    agentReady: { argos: "✔️", competitor: "Via BrowserStack MCP" },
    playwrightDebugging: { argos: "✔️", competitor: "❌" },
    playwrightTestRetries: { argos: "✔️", competitor: "❌" },
    githubSso: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "❌" },
    beautifulAndIntuitiveUi: { argos: "✔️", competitor: "❌" },
    bestScreenshotQuality: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "✔️" },
    sensitivityThresholdPerScreenshot: { argos: "✔️", competitor: "❌" },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
};
