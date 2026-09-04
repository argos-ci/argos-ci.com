import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "playwright",
  name: "Playwright screenshots",
  fullName: "Playwright",
  title: "Playwright screenshots vs Argos",
  description:
    "Keep your Playwright tests, drop the committed PNG baselines. Argos moves toHaveScreenshot() to cloud baselines you review on the pull request.",
  migrationHref:
    "/docs/learn/how-to-guides/migrate-to-argos/from-playwright-native-screenshots",
  features: {
    snapshotTesting: { argos: "✔️", competitor: "Local only" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "❌" },
    agentReady: { argos: "✔️", competitor: "❌" },
    playwrightDebugging: { argos: "✔️", competitor: "Local only" },
    playwrightTestRetries: { argos: "✔️", competitor: "Local only" },
    githubSso: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "✔️" },
    beautifulAndIntuitiveUi: { argos: "✔️", competitor: "❌" },
    bestScreenshotQuality: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "❌" },
    sensitivityThresholdPerScreenshot: {
      argos: "✔️",
      competitor: "Per assertion",
    },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
  additionalFeatures: [
    {
      title: "Cloud baselines",
      description: "No committed *-snapshots/ PNGs in Git",
      href: "/docs/learn/platform-fundamentals/baseline-build",
      argos: "✔️",
      competitor: "❌",
    },
    {
      title: "Review UI on the pull request",
      description: "Approve changes without --update-snapshots",
      href: "/docs/learn/review-workflow/review-a-build",
      argos: "✔️",
      competitor: "❌",
    },
    {
      title: "Cross-platform consistency",
      description: "No -darwin vs -linux baseline mismatches",
      argos: "✔️",
      competitor: "❌",
    },
  ],
};
