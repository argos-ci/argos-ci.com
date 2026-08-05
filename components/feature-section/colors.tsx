export type FeatureColor =
  "blue" | "amber" | "teal" | "violet" | "plum" | "pink" | "green";

export const BORDER_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-9)",
  amber: "bg-(--amber-9)",
  teal: "bg-(--teal-9)",
  violet: "bg-(--violet-9)",
  plum: "bg-(--plum-9)",
  pink: "bg-(--pink-9)",
  green: "bg-(--green-9)",
};

export const TEXT_COLORS: Record<FeatureColor, string> = {
  blue: "text-(--blue-11)",
  amber: "text-(--amber-11)",
  teal: "text-(--teal-11)",
  violet: "text-(--violet-11)",
  plum: "text-(--plum-11)",
  pink: "text-(--pink-11)",
  green: "text-(--green-11)",
};

export const INDICATOR_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-10)",
  amber: "bg-(--amber-10)",
  teal: "bg-(--teal-10)",
  violet: "bg-(--violet-10)",
  plum: "bg-(--plum-10)",
  pink: "bg-(--pink-10)",
  green: "bg-(--green-10)",
};

/**
 * The hue a section's closing band fades up from.
 *
 * Step 2, shared rather than tuned per hue. Never step 1: that is Radix's
 * app-background step, white by construction in light — `blue-1` is #fbfdff
 * against a #fcfcfc page, ΔL* 0.2 — so the band only ever showed up in dark,
 * and even there only for blue, whose step 1 is the most saturated of the set.
 *
 * Measured against `--neutral-1`, the steps land at:
 *
 *     step 1   ΔL* 0.1-0.4 light   0.6-1.5 dark
 *     step 2   ΔL* 0.6-1.1 light   2.6-4.2 dark
 *     step 3   ΔL* 2.3-4.7 light   8.3-11.1 dark
 *
 * Step 2 is the quiet end of what registers. It is a deliberately faint band in
 * light; go to step 3 if it needs to carry from across the room.
 *
 * Lightness is not the whole story. Amber reads warmer than its ΔL* suggests,
 * because chroma carries it instead: `amber-2` is #fefbe9, 21 points between
 * channels, where `violet-2` spreads 7. The gap widens with the step — at 3 it
 * is 61 against 14 — so raising the step makes amber louder faster than the
 * rest. Evening that out needs a color-mix toward the neutral, not a
 * per-hue step.
 */
export const FROM_COLORS: Record<FeatureColor, string> = {
  blue: "from-(--blue-2)",
  amber: "from-(--amber-2)",
  teal: "from-(--teal-2)",
  violet: "from-(--violet-2)",
  plum: "from-(--plum-2)",
  pink: "from-(--pink-2)",
  green: "from-(--green-2)",
};
