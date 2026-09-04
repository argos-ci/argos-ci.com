import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "backstopjs",
  name: "BackstopJS",
  fullName: "BackstopJS",
  title: "BackstopJS vs Argos",
  description:
    "Keep the visit-screenshot-diff workflow, drop the self-hosting. Argos moves your BackstopJS scenarios to cloud baselines reviewed on the pull request.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-backstopjs",
  features: {
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "❌" },
    agentReady: { argos: "✔️", competitor: "❌" },
    playwrightDebugging: { argos: "✔️", competitor: "❌" },
    playwrightTestRetries: { argos: "✔️", competitor: "❌" },
    githubSso: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "✔️" },
    beautifulAndIntuitiveUi: { argos: "✔️", competitor: "Local HTML report" },
    bestScreenshotQuality: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "❌" },
    sensitivityThresholdPerScreenshot: {
      argos: "✔️",
      competitor: "Global only",
    },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
  additionalFeatures: [
    {
      title: "Cloud baselines",
      description: "Selected from Git history, not a local folder",
      href: "/docs/learn/platform-fundamentals/baseline-build",
      argos: "✔️",
      competitor: "❌",
    },
    {
      title: "Pull request review & approval",
      description: "Shared review, not backstop approve on one machine",
      href: "/docs/learn/review-workflow/review-a-build",
      argos: "✔️",
      competitor: "❌",
    },
    {
      title: "Managed infrastructure",
      description: "Browsers, storage, and parallelization handled",
      argos: "✔️",
      competitor: "❌",
    },
  ],
};
