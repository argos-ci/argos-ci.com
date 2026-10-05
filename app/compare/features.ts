/**
 * The compare pages' data model, shared by the HTML tables
 * (`comparison-table.tsx`) and their markdown twins (`lib/markdown.ts`) so the
 * two always list the same features with the same wording.
 */

export const COMPARE_SLUGS = [
  "applitools",
  "percy",
  "chromatic",
  "backstopjs",
  "playwright",
  "lost-pixel",
] as const;

export type CompareSlug = (typeof COMPARE_SLUGS)[number];

export function isCompareSlug(value: string): value is CompareSlug {
  return (COMPARE_SLUGS as readonly string[]).includes(value);
}

/** A cell: "✔️", "❌", or a short qualifier such as "Storybook only". */
export type FeatureRow = { argos: string; competitor: string };

export type Features = {
  pricing?: FeatureRow;
  snapshotTesting: FeatureRow;
  deployments: FeatureRow;
  collaborativeReviews: FeatureRow;
  agentReady: FeatureRow;
  playwrightDebugging: FeatureRow;
  playwrightTestRetries: FeatureRow;
  githubSso: FeatureRow;
  spendManagement: FeatureRow;
  openSource: FeatureRow;
  githubLight: FeatureRow;
  sensitivityThresholdPerScreenshot: FeatureRow;
  githubActionsPartialReRuns: FeatureRow;
  monitoringMode: FeatureRow;
};

type FeatureDefinition = {
  key: keyof Features;
  title: string;
  description: string;
  href?: string;
  /** Opens in a new tab (external documentation). */
  external?: boolean;
};

/** The table rows, in display order. */
export const FEATURE_DEFINITIONS: FeatureDefinition[] = [
  {
    key: "pricing",
    title: "Monthly pricing",
    description: "How much it costs per month",
    href: "/pricing",
  },
  {
    key: "snapshotTesting",
    title: "Snapshot testing for any file",
    description: "Diff Markdown, JSON, HTML and more, not just images",
    href: "/diff",
  },
  {
    key: "deployments",
    title: "Deployments & PR previews",
    description: "Host Storybook or any static build on a live URL",
    href: "/deploy",
  },
  {
    key: "collaborativeReviews",
    title: "Collaborative reviews",
    description: "Pinned comments, threads, reactions, real-time presence",
    href: "/review",
  },
  {
    key: "agentReady",
    title: "Agent-ready CLI & API",
    description: "Agents inspect and review builds from the CLI and REST API",
    href: "/ai-agents",
  },
  {
    key: "playwrightDebugging",
    title: "Playwright debugging",
    description: "Playwright trace viewer and failure screenshots",
    href: "/stabilize#debug",
  },
  {
    key: "playwrightTestRetries",
    title: "Playwright test retries",
    description: "Separate test retries to have a clear overview",
    href: "/changelog/2024-04-29-retried-failures",
  },
  {
    key: "githubSso",
    title: "GitHub SSO",
    description: "Synchronize your GitHub users with Argos",
    href: "/changelog/2024-02-28-github-sso",
  },
  {
    key: "spendManagement",
    title: "Spend Management",
    description: "Control your spendings by setting a budget limit",
    href: "/docs/learn/billing-and-subscription/spend-management",
  },
  {
    key: "openSource",
    title: "Open Source",
    description: "SDK and platform code available",
    href: "https://github.com/argos-ci",
    external: true,
  },
  {
    key: "githubLight",
    title: "GitHub integration without code access",
    description: "Offer a mode without content permission required",
    href: "https://argos-ci.com/docs/learn/integrations/github-integration",
    external: true,
  },
  {
    key: "sensitivityThresholdPerScreenshot",
    title: "Sensitivity threshold per screenshot",
    description: "Set a threshold by screenshot to reduce flakiness",
    href: "/changelog/2024-07-09-sensitivity-threshold",
  },
  {
    key: "githubActionsPartialReRuns",
    title: "GitHub Actions partial re-runs",
    description: "Save time and resources with partial re-runs",
    href: "/changelog/2024-06-17-partial-re-runs-github-actions",
  },
  {
    key: "monitoringMode",
    title: "Monitoring mode",
    description: "Run periodic checks on your website",
    href: "/changelog/2024-05-28-monitoring-mode",
  },
];

/** Competitor-specific rows are inserted after this one. */
export const ADDITIONAL_FEATURES_AFTER: keyof Features = "agentReady";

export type AdditionalFeature = FeatureRow & {
  title: string;
  description: string;
  href?: string;
};

export type Comparison = {
  slug: CompareSlug;
  /** Short name, as in the table header. */
  name: string;
  /** Name for alternative texts, e.g. "Percy by Browserstack". */
  fullName: string;
  /** Hero title, e.g. "Percy vs Argos". */
  title: string;
  /** Hero description. */
  description: string;
  migrationHref: string;
  /** Rows we can't state for a competitor are left out, not guessed. */
  features: Partial<Features>;
  additionalFeatures?: AdditionalFeature[];
  /** Caveat shown under the pricing estimate. */
  pricingNote?: string;
  /**
   * The verdict, one reason per item, in inline markdown: who should pick
   * Argos, and who is better served by the competitor. A comparison that
   * never says when the other tool wins reads as an ad, to people and to
   * the assistants that quote it.
   */
  chooseArgos: string[];
  chooseCompetitor: string[];
  /** Heading over `chooseCompetitor`; defaults to "Choose <name> if". */
  chooseCompetitorTitle?: string;
  /** Where the competitor facts on the page come from. */
  sources: { label: string; href: string }[];
  /** When those facts were last checked (YYYY-MM-DD). */
  checkedAt: string;
};
