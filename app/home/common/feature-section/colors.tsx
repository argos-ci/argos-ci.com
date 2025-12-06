export type FeatureColor = "blue" | "amber" | "teal";

export const BORDER_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-9)",
  amber: "bg-(--amber-9)",
  teal: "bg-(--teal-9)",
};

export const INDICATOR_BG_COLORS: Record<FeatureColor, string> = {
  blue: "bg-(--blue-10)",
  amber: "bg-(--amber-10)",
  teal: "bg-(--teal-10)",
};

export const TO_COLORS: Record<FeatureColor, string> = {
  blue: "to-(--blue-12)",
  amber: "to-(--amber-12)",
  teal: "to-(--teal-12)",
};
