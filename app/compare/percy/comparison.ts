import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
} from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "percy",
  name: "Percy",
  fullName: "Percy by Browserstack",
  title: "Percy vs Argos",
  description:
    "Choose Argos if you want the diff to show what your test rendered, a lower flat price and open-source code. Choose Percy if you already pay for BrowserStack and want each snapshot re-rendered across browsers and widths in its cloud.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-percy",
  pricingNote:
    "Percy prices from browserstack.com/pricing?product=percy (checked October 2026). The estimate uses Percy's Desktop plan billed annually: $199/month for 10,000 screenshots or $449 for 25,000 ($249 and $549 month to month), then $0.036 per extra screenshot. Percy counts each browser and width a snapshot renders in as one screenshot.",
  features: {
    pricing: {
      argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`,
      competitor: "$199/mo, billed yearly",
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
    `You want a lower price: $${ARGOS_PRO_FLAT_PRICE}/month flat for ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots, where Percy's Desktop plan is $199/month, billed yearly, for 10,000.`,
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
      label: "Percy pricing",
      href: "https://www.browserstack.com/pricing?product=percy",
    },
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
  checkedAt: "2026-10-21",
};
