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
 * Step 3, not step 1. Step 1 is Radix's app-background step: in dark mode it
 * reads as a tint, but in light mode it is white by construction — which is why
 * the wash under each story used to show up only in dark.
 */
export const FROM_COLORS: Record<FeatureColor, string> = {
  blue: "from-(--blue-3)",
  amber: "from-(--amber-3)",
  teal: "from-(--teal-3)",
  violet: "from-(--violet-3)",
  plum: "from-(--plum-3)",
  green: "from-(--green-3)",
};
