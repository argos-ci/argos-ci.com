export type FeatureColor =
  "blue" | "amber" | "teal" | "violet" | "pink" | "green";

export const BORDER_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-9)",
  amber: "bg-(--amber-9)",
  teal: "bg-(--teal-9)",
  violet: "bg-(--violet-9)",
  pink: "bg-(--pink-9)",
  green: "bg-(--green-9)",
};

export const TEXT_COLORS: Record<FeatureColor, string> = {
  blue: "text-(--blue-11)",
  amber: "text-(--amber-11)",
  teal: "text-(--teal-11)",
  violet: "text-(--violet-11)",
  pink: "text-(--pink-11)",
  green: "text-(--green-11)",
};

export const SUBTLE_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-2)",
  amber:
    "bg-[color-mix(in_oklab,var(--amber-2)_50%,var(--neutral-2))] dark:bg-(--amber-2)",
  teal: "bg-(--teal-2)",
  violet: "bg-(--violet-2)",
  pink: "bg-(--pink-2)",
  green: "bg-(--green-2)",
};

export const INDICATOR_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-10)",
  amber: "bg-(--amber-10)",
  teal: "bg-(--teal-10)",
  violet: "bg-(--violet-10)",
  pink: "bg-(--pink-10)",
  green: "bg-(--green-10)",
};
