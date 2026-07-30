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

/**
 * The ground under a section's illustration.
 *
 * This is the section's largest surface, and it used to be the one place with no
 * colour at all: the hue only showed in the eyebrow, the links and the closing
 * band, so a chapter read grey with a coloured foot.
 *
 * Step 2, which is where the neutral it replaced already sat: `--neutral-2` is
 * #f9f9f9, and blue-2 #f4faff, pink-2 #fef7fb are within ΔL 2 of it. So the hue
 * changes and nothing else does — the illustrations and captions keep exactly
 * the contrast they were drawn against.
 *
 * Step 2 is also forced from above: `SectionGlow` closes the section at step 3,
 * and the band has to stay lighter than that, or the middle of a chapter and its
 * end carry the same value and stop being distinguishable.
 *
 * Amber is the exception, in light only. On a flat field this size what reads as
 * "coloured" is chroma, not luminance, and amber-2 spreads 21 against blue-2's
 * 11 — twice as loud as every other hue. Halving it against the neutral lands it
 * back at ~11. Dark keeps the raw token: there the order reverses, amber-2
 * spreading 14 where blue-2 spreads 22, so mixing would erase it.
 */
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
