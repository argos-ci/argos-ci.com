import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "backstopjs",
  name: "BackstopJS",
  fullName: "BackstopJS",
  title: "BackstopJS vs Argos",
  description:
    "Choose Argos if you want baselines from your Git history, a review on the pull request and stable captures from the tests you already have. Choose BackstopJS if everything must stay on your machines and you are fine maintaining it yourself; its last release dates from September 2024.",
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
  chooseArgos: [
    "You want baselines picked from your Git history instead of committed images.",
    "You want a team review on the pull request, with approvals and a GitHub check.",
    "You want your Playwright or Cypress tests to take the screenshots, instead of separate scenario files.",
    "You want a tool that ships updates: the last BackstopJS release is from September 2024.",
  ],
  chooseCompetitor: [
    "Nothing may leave your machines, so a hosted service is not an option.",
    "Your suite is a list of URLs and selectors, and `backstop.json` covers it.",
    "You don't need a team review workflow.",
  ],
  sources: [
    {
      label: "BackstopJS on GitHub",
      href: "https://github.com/garris/BackstopJS",
    },
    {
      label: "BackstopJS releases on npm",
      href: "https://www.npmjs.com/package/backstopjs?activeTab=versions",
    },
  ],
  checkedAt: "2026-10-04",
};
