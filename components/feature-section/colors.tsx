export type FeatureColor =
  "blue" | "amber" | "teal" | "violet" | "plum" | "green";

export const BORDER_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-9)",
  amber: "bg-(--amber-9)",
  teal: "bg-(--teal-9)",
  violet: "bg-(--violet-9)",
  plum: "bg-(--plum-9)",
  green: "bg-(--green-9)",
};

export const TEXT_COLORS: Record<FeatureColor, string> = {
  blue: "text-(--blue-11)",
  amber: "text-(--amber-11)",
  teal: "text-(--teal-11)",
  violet: "text-(--violet-11)",
  plum: "text-(--plum-11)",
  green: "text-(--green-11)",
};

export const INDICATOR_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-10)",
  amber: "bg-(--amber-10)",
  teal: "bg-(--teal-10)",
  violet: "bg-(--violet-10)",
  plum: "bg-(--plum-10)",
  green: "bg-(--green-10)",
};

/**
 * The wash closing a section, under its customer story.
 *
 * Never step 1: that is Radix's app-background step, tinted in dark mode but
 * white by construction in light, so the wash only ever showed up in dark.
 *
 * The step is picked per hue rather than shared, because Radix steps are not
 * perceptually equal across scales. Measured as the spread between channels at
 * step 2: blue 11, amber 21, teal 8, plum 6. Plum at step 2 is all but grey —
 * and the section fade underneath ends on #f0f0f0, darker than plum-2, so the
 * grey swallowed it. Plum therefore sits one step further out.
 */
export const FROM_COLORS: Record<FeatureColor, string> = {
  blue: "from-(--blue-2)",
  amber: "from-(--amber-2)",
  teal: "from-(--teal-2)",
  violet: "from-(--violet-3)",
  plum: "from-(--plum-3)",
  green: "from-(--green-2)",
};
