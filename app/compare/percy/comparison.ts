import { ARGOS_PRO_FLAT_PRICE } from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "percy",
  name: "Percy",
  fullName: "Percy by Browserstack",
  title: "Percy vs Argos",
  description:
    "Choose Argos if you want the diff to show what your test rendered, published prices and open-source code. Choose Percy if you already pay for BrowserStack and want each snapshot re-rendered across browsers and widths in its cloud.",
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
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "✔️" },
    sensitivityThresholdPerScreenshot: { argos: "✔️", competitor: "❌" },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
  chooseArgos: [
    "You want the diff to show exactly what your test rendered, captured in your own CI browser.",
    `You want prices you can read: free for personal projects, $${ARGOS_PRO_FLAT_PRICE}/month flat for teams.`,
    "You want Playwright traces and failure screenshots next to the visual review.",
    "You also want text diffs of Markdown, JSON or HTML, and preview deployments.",
    "You want open-source code.",
  ],
  chooseCompetitor: [
    "Your company already has a BrowserStack contract.",
    "You want one capture re-rendered across many browsers and widths without running them in CI.",
    "You want AI help reviewing diffs from Percy's Visual Review Agent.",
  ],
  sources: [
    {
      label: "Percy plans and billing",
      href: "https://www.browserstack.com/docs/percy/overview/plans-and-billing",
    },
    {
      label: "How Percy renders snapshots",
      href: "https://www.browserstack.com/docs/percy/integrate/percy-sdk-workflow",
    },
    {
      label: "Percy tools in the BrowserStack MCP server",
      href: "https://www.browserstack.com/docs/browserstack-mcp-server/tools/percy",
    },
  ],
  checkedAt: "2026-10-04",
};
