import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "playwright",
  name: "Playwright screenshots",
  fullName: "Playwright",
  title: "Playwright screenshots vs Argos",
  description:
    "Choose Argos when visual tests run in a team: baselines from your Git history, comparisons made in CI only and a review on the pull request. Stay with toHaveScreenshot() on a solo project where committing PNGs and regenerating them in Docker is fine.",
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
  chooseArgos: [
    "Several people update baselines, and PNG merge conflicts slow you down.",
    "Screenshots differ between macOS and Linux CI, and you regenerate baselines in Docker.",
    "You want designers or product people to review changes on the pull request.",
    "You want Playwright traces, retries and flaky test detection next to the review.",
  ],
  chooseCompetitorTitle: "Stay with toHaveScreenshot() if",
  chooseCompetitor: [
    "You work alone or on a small project, and committed PNGs aren't a problem.",
    "Everything has to run offline, with no external service.",
    "You already generate baselines in a pinned Docker image and review them in Git.",
  ],
  sources: [
    {
      label: "Playwright visual comparisons",
      href: "https://playwright.dev/docs/test-snapshots",
    },
  ],
  checkedAt: "2026-10-05",
};
