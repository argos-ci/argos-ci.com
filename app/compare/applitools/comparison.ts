import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
} from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "applitools",
  name: "Applitools",
  fullName: "Applitools",
  title: "Applitools vs Argos",
  description:
    "Choose Argos if you want deterministic pixel diffs you can inspect, a published monthly price and open-source code. Choose Applitools if you run very large cross-browser suites, want Visual AI to judge the noise, and an annual contract fits your budget.",
  migrationHref: "/docs/learn/how-to-guides/migrate-to-argos/from-applitools",
  pricingNote:
    "Applitools Starter is $667/month, paid annually, for 100,000 component or 1,000 page checkpoints (applitools.com/pricing, checked October 2026).",
  features: {
    pricing: {
      argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`,
      competitor: "From $667/mo",
    },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    deployments: { argos: "✔️", competitor: "❌" },
    collaborativeReviews: { argos: "✔️", competitor: "✔️" },
    agentReady: { argos: "✔️", competitor: "MCP (Playwright)" },
    playwrightDebugging: { argos: "✔️", competitor: "❌" },
    playwrightTestRetries: { argos: "✔️", competitor: "❌" },
    githubSso: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "❌" },
    githubActionsPartialReRuns: { argos: "✔️", competitor: "❌" },
    githubLight: { argos: "✔️", competitor: "❌" },
    monitoringMode: { argos: "✔️", competitor: "✔️" },
    sensitivityThresholdPerScreenshot: {
      argos: "✔️",
      competitor: "Match levels",
    },
    spendManagement: { argos: "✔️", competitor: "❌" },
  },
  chooseArgos: [
    "You want to see exactly which pixels changed, with a threshold you set.",
    `You want a published price, billed monthly: $${ARGOS_PRO_FLAT_PRICE}/month for ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots.`,
    "You want screenshots captured in your own CI browser.",
    "You want open-source code.",
  ],
  chooseCompetitor: [
    "You run very large suites across many browsers and devices, and want Visual AI to filter rendering noise.",
    "You need an enterprise plan with a dedicated or private cloud.",
    "You want AI-driven functional testing and codeless authoring in the same platform.",
  ],
  sources: [
    { label: "Applitools pricing", href: "https://applitools.com/pricing/" },
    {
      label: "Match levels",
      href: "https://applitools.com/docs/eyes/concepts/best-practices/match-levels",
    },
    {
      label: "Remarks and issues",
      href: "https://applitools.com/docs/eyes/concepts/team-collaboration/remarks-&-issues",
    },
    {
      label: "Applitools MCP server",
      href: "https://applitools.com/docs/eyes/integrations/mcp-servers/applitools-mcp",
    },
  ],
  checkedAt: "2026-10-04",
};
