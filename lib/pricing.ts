import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "./constants";

/**
 * Pricing arithmetic, shared by the pricing sliders, the compare pages'
 * markdown and the WebMCP cost estimator so every surface quotes the same
 * number for the same usage.
 */

type Usage = {
  /** Screenshots per month, Storybook excluded (media uploads included). */
  screenshots: number;
  /** Storybook screenshots per month, billed at their own rate. */
  storybookScreenshots: number;
};

type Plan = {
  flatPrice: number;
  flatScreenshotCount: number;
  screenshotPrice: number;
  storybookScreenshotPrice: number;
};

/**
 * Screenshots billed above the allowance, by rate. The allowance absorbs
 * regular screenshots first, then Storybook ones.
 */
function computeAdditionalScreenshots(screenshots: {
  neutral: number;
  storybook: number;
  included: number;
}) {
  const storybookOverhead = Math.max(
    Math.min(screenshots.storybook, screenshots.included - screenshots.neutral),
    0,
  );
  return {
    neutral: Math.max(
      0,
      screenshots.neutral + storybookOverhead - screenshots.included,
    ),
    storybook: screenshots.storybook - storybookOverhead,
  };
}

/** Monthly price of a plan for a usage, rounded down to the dollar. */
function getPlanPricing(plan: Plan, usage: Usage) {
  const extra = computeAdditionalScreenshots({
    neutral: usage.screenshots,
    storybook: usage.storybookScreenshots,
    included: plan.flatScreenshotCount,
  });
  return {
    price: Math.floor(
      extra.neutral * plan.screenshotPrice +
        extra.storybook * plan.storybookScreenshotPrice +
        plan.flatPrice,
    ),
    extraScreenshots: extra.neutral,
    extraStorybookScreenshots: extra.storybook,
  };
}

const ARGOS_PRO_PLAN: Plan = {
  flatPrice: ARGOS_PRO_FLAT_PRICE,
  flatScreenshotCount: ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  screenshotPrice: ARGOS_SCREENSHOT_PRICE,
  storybookScreenshotPrice: ARGOS_STORYBOOK_SCREENSHOT_PRICE,
};

/** What the Pro plan costs for a usage, with the extras it bills. */
export function getArgosProPricing(usage: Usage) {
  return getPlanPricing(ARGOS_PRO_PLAN, usage);
}

/**
 * From this volume on, the sliders stop quoting a price and point to sales
 * for a custom plan.
 */
export const CUSTOM_PLAN_SCREENSHOT_COUNT = 1_000_000;

const TURBO_SNAP_RATIO = 1 / 5;

/**
 * The competitors whose published prices the homepage and compare pages
 * estimate against, as read on `source` at `checkedAt`. Re-check them before
 * changing anything here, and say where they come from wherever they show.
 *
 * Percy is deliberately absent: BrowserStack no longer publishes paid Percy
 * prices (only the 5,000-screenshot free plan), so any figure would be a guess.
 */
export const COMPETITORS = {
  chromatic: {
    name: "Chromatic",
    subtitle: "80% TurboSnap",
    source: "https://www.chromatic.com/pricing",
    checkedAt: "2026-10-04",
    screenshotPrice: 0.008,
    storybookScreenshotPrice: 0.008 * 0.2 + 0.008 * TURBO_SNAP_RATIO * 0.8, // 80% TurboSnap
    steps: [
      { screenshots: 35_000, price: 179 },
      { screenshots: 85_000, price: 399 },
    ],
  },
} satisfies Record<
  string,
  {
    name: string;
    /** The assumption behind the estimate, shown next to the name. */
    subtitle?: string;
    /** The pricing page the numbers were read from. */
    source: string;
    /** When they were last checked (YYYY-MM-DD). */
    checkedAt: string;
    screenshotPrice: number;
    storybookScreenshotPrice: number;
    /** Published tiers: a flat price with an included volume. */
    steps: { screenshots: number; price: number }[];
  }
>;

/** "October 2026", the same on the server and in every browser. */
export function formatCheckedAt(checkedAt: string) {
  return new Date(`${checkedAt}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type CompetitorSlug = keyof typeof COMPETITORS;

/** The cheapest of a competitor's tiers for a usage. */
export function getCompetitorPrice(slug: CompetitorSlug, usage: Usage) {
  const competitor = COMPETITORS[slug];
  return Math.min(
    ...competitor.steps.map(
      (step) =>
        getPlanPricing(
          {
            flatPrice: step.price,
            flatScreenshotCount: step.screenshots,
            screenshotPrice: competitor.screenshotPrice,
            storybookScreenshotPrice: competitor.storybookScreenshotPrice,
          },
          usage,
        ).price,
    ),
  );
}
