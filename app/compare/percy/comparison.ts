import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "percy",
  name: "Percy",
  fullName: "Percy by Browserstack",
  title: "Percy vs Argos",
  description:
    "Learn how Argos compares to Percy and why Argos is the best alternative for visual testing.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-percy",
  features: {
    pricing: { argos: "$100/mo", competitor: "$599/mo" },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "❌" },
    agentReady: { argos: "✔️", competitor: "❌" },
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
