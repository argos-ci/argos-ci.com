import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

import type { Comparison } from "../features";

export const comparison: Comparison = {
  slug: "happo",
  name: "Happo",
  fullName: "Happo",
  title: "Happo vs Argos",
  description:
    "Choose Argos if you want the diff to show what your test rendered, lower overage rates and open-source code for the whole platform. Choose Happo if you need every component rendered in Safari, iOS Safari and Edge on each run, without running those browsers yourself.",
  features: {
    pricing: { argos: `$${ARGOS_PRO_FLAT_PRICE}/mo`, competitor: "$149/mo" },
    snapshotTesting: { argos: "✔️", competitor: "❌" },
    openSource: { argos: "✔️", competitor: "Client only (MIT)" },
  },
  additionalFeatures: [
    {
      title: "Where screenshots are rendered",
      description: "The browser that produces the image",
      argos: "Your CI browser, during the test",
      competitor: "Happo's servers, in each target browser",
    },
    {
      title: "Browsers",
      description: "Which browsers the plan covers",
      argos: "The ones your tests run in",
      competitor:
        "Chrome and Firefox; Safari, iOS Safari and Edge on higher plans",
    },
    {
      title: "Integrations",
      description: "What you can capture from",
      href: "/integrations",
      argos: "Playwright, Storybook, Vitest, Cypress, CLI",
      competitor: "Storybook, Playwright, Cypress, pages",
    },
    {
      title: "Extra snapshot",
      description: "Price beyond the plan",
      href: "/pricing",
      argos: `$${ARGOS_SCREENSHOT_PRICE} ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} Storybook)`,
      competitor: "$0.006",
    },
  ],
  pricingNote:
    "Happo prices from happo.io/pricing (checked October 2026). Happo counts one snapshot per component variant and browser; the estimate assumes one browser.",
  chooseArgos: [
    "You want the diff to show exactly what your test rendered, captured in your own CI browser.",
    `You want lower overage rates: $${ARGOS_SCREENSHOT_PRICE} per extra screenshot, $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook, against $0.006 per extra snapshot on Happo.`,
    "You want text diffs of JSON, Markdown or HTML next to your screenshots.",
    "You want preview deployments of your Storybook or static site.",
    "You want open-source code for the whole platform, not only the client.",
  ],
  chooseCompetitor: [
    "You need Safari, iOS Safari or Edge renders on every run without running those browsers in CI.",
    "You want accessibility testing in the same tool.",
    "You want one snapshot rendered in several browsers from a single upload.",
  ],
  sources: [
    { label: "Happo pricing", href: "https://happo.io/pricing" },
    {
      label: "Happo getting started",
      href: "https://docs.happo.io/docs/getting-started",
    },
    { label: "happo on npm", href: "https://www.npmjs.com/package/happo" },
  ],
  checkedAt: "2026-10-05",
};
