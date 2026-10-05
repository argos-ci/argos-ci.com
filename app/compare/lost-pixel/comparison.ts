import type { Comparison } from "../features";

/**
 * Lost Pixel was archived in April 2026 (its team joined Figma), so the
 * table only states what the archived project and its announcement confirm.
 */
export const comparison: Comparison = {
  slug: "lost-pixel",
  name: "Lost Pixel",
  fullName: "Lost Pixel",
  title: "Lost Pixel vs Argos",
  description:
    "Lost Pixel is being sunset: its team joined Figma in April 2026 and the repository is archived. Argos keeps what Lost Pixel users came for, open-source visual testing for Storybook and pages, and adds baselines from your Git history and a review on every pull request.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-lost-pixel",
  features: {
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    agentReady: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "Yes (archived)" },
  },
  additionalFeatures: [
    {
      title: "Maintained",
      description: "New releases and support",
      argos: "✔️",
      competitor: "Archived in April 2026",
    },
    {
      title: "Baselines",
      description: "Where the reference images come from",
      href: "/docs/learn/platform-fundamentals/baseline-build",
      argos: "Git history",
      competitor: "Committed in .lostpixel/baseline/",
    },
    {
      title: "Pull request review",
      description: "Approve or reject changes on the pull request",
      href: "/review",
      argos: "✔️",
      competitor: "Hosted platform, being sunset",
    },
    {
      title: "Storybook",
      description: "Capture every story",
      href: "/integrations/storybook",
      argos: "✔️",
      competitor: "✔️",
    },
    {
      title: "Ladle and Histoire",
      description: "Capture stories from these workshops",
      href: "/docs/learn/how-to-guides/migrate-to-argos/from-lost-pixel",
      argos: "With a Playwright test",
      competitor: "✔️",
    },
  ],
  chooseArgos: [
    "You use Lost Pixel today and want a maintained, open-source replacement before something breaks.",
    "You want baselines picked from your Git history instead of images committed under `.lostpixel/baseline/`.",
    "You want changes reviewed and approved on the pull request, with a GitHub check.",
    "You also run Playwright, Cypress or Vitest tests, and want one visual review for all of them.",
  ],
  chooseCompetitorTitle: "Keep Lost Pixel for now if",
  chooseCompetitor: [
    "Your open-source setup works and you can pin its Node and browser versions.",
    "You rely on its built-in Ladle or Histoire runner and can't write the Playwright test that replaces it yet.",
  ],
  sources: [
    {
      label: "The Lost Pixel Team Is Joining Figma",
      href: "https://lost-pixel.com/blog/lost-pixel-team-is-joining-figma",
    },
    {
      label: "lost-pixel on GitHub (archived)",
      href: "https://github.com/lost-pixel/lost-pixel",
    },
  ],
  checkedAt: "2026-10-05",
};
