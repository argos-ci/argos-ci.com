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

export const FROM_COLORS: Record<FeatureColor, string> = {
  blue: "from-(--blue-2)",
  amber: "from-(--amber-2)",
  teal: "from-(--teal-2)",
  violet: "from-(--violet-2)",
  plum: "from-(--plum-2)",
  pink: "from-(--pink-2)",
  green: "from-(--green-2)",
};
