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
 * Step 3, shared rather than tuned per hue. Never step 1: that is Radix's
 * app-background step, white by construction in light — `blue-1` is #fbfdff
 * against a #fcfcfc page, ΔL* 0.2 — so the band only ever showed up in dark,
 * and even there only for blue, whose step 1 is the most saturated of the set.
 *
 * Measured against `--neutral-1`, step 3 puts all seven hues at ΔL* 2.3-4.7 in
 * light and 8.3-11.1 in dark. It is the first step where every hue reads in
 * both themes; step 1 sits at 0.1-0.4 and 0.6-1.5, i.e. nothing.
 *
 * Lightness is not the whole story. Amber has the lowest ΔL* of the set here
 * yet reads loudest, because chroma carries it instead: `amber-2` is #fff7c2,
 * 61 points between channels, where `violet-2` spreads 14. Evening that out
 * needs a colour-mix toward the neutral, not a different step — moving amber
 * down would only make the band it already has the faintest of disappear.
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
