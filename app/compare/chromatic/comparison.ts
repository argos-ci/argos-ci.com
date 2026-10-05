import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "chromatic",
  name: "Chromatic",
  fullName: "Chromatic",
  title: "Chromatic vs Argos",
  description:
    "Choose Argos if your visual tests run in Playwright, Cypress or Vitest as well as Storybook, if you want screenshots taken in your own CI browser, or a lower flat price. Choose Chromatic if your team works entirely in Storybook and wants the tool built by its maintainers.",
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
  chooseArgos: [
    "Your visual tests run in Playwright, Cypress or Vitest, not only Storybook.",
    "You want screenshots taken in your own CI browser, the one your tests already run in.",
    `You want a flat price: $${ARGOS_PRO_FLAT_PRICE}/month for ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots, then $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} per Storybook screenshot.`,
    "You want preview deployments for any static build, not only Storybook.",
    "You want open-source code you can read and audit.",
  ],
  chooseCompetitor: [
    "Your UI work happens entirely in Storybook, and you want the tool made by its maintainers.",
    "You want stories rendered in several cloud browsers without running them in your CI.",
    "You rely on TurboSnap to bill unchanged stories at a fraction of a snapshot.",
  ],
  sources: [
    { label: "Chromatic pricing", href: "https://www.chromatic.com/pricing" },
    {
      label: "Chromatic billing",
      href: "https://www.chromatic.com/docs/billing/",
    },
    {
      label: "Diff threshold",
      href: "https://www.chromatic.com/docs/threshold/",
    },
    {
      label: "Interaction tests",
      href: "https://www.chromatic.com/docs/interactions/",
    },
    {
      label: "Collaborators",
      href: "https://www.chromatic.com/docs/collaborators/",
    },
    { label: "Chromatic MCP", href: "https://www.chromatic.com/docs/mcp" },
  ],
  checkedAt: "2026-10-04",
};
