import clsx from "clsx";

import type { FeatureColor } from "./colors";

/**
 * The step every hue closes on.
 *
 * Step 3, shared rather than tuned per hue. Radix steps are not equal in chroma
 * across scales — amber-3 spreads 61 between its channels where violet-3
 * spreads 14 — which tempts you to compensate by moving amber down a step. That
 * is the wrong axis. What tells the eye a band is there is luminance, and
 * luminance is already even at a fixed step: against `--neutral-1`, step 3 lands
 * within ΔL 7-14 in light and 15-22 in dark, for all six hues. Chasing equal
 * chroma instead drops amber to ΔL 2, i.e. no band at all.
 *
 * Amber therefore reads a little warmer than violet reads cool. That is the
 * scale's character, not an imbalance to correct.
 *
 * Step 3 and not 4: at 4 the band is twice as dark (ΔL 16-24 in light) and
 * amber's chroma hits 99, which shouts. Never step 1: that is Radix's
 * app-background step, tinted in dark mode but white by construction in light,
 * so it only ever showed up in dark.
 *
 * Pink is the one exception, at step 4. Its band closes the reviews chapter
 * directly above the dark AI band — the only closing band on the page that
 * meets #111 instead of white — and simultaneous contrast against that edge
 * reads a pale tint as plain white. Its low chroma (21, against amber's 61)
 * gives the eye nothing else to catch. Step 4 takes it from ΔL 14 to 24 in
 * light, which is what it takes to survive the neighbour.
 *
 * That is not an overshoot in dark: pink's scale is compressed, so step 4 lands
 * it at chroma 55 / ΔL 18 there, level with blue at step 3 (58 / 19).
 */
const GLOW_COLORS: Record<FeatureColor, string> = {
  blue: "text-(--blue-3)",
  amber: "text-(--amber-3)",
  teal: "text-(--teal-3)",
  violet: "text-(--violet-3)",
  pink: "text-(--pink-4)",
  green: "text-(--green-3)",
};

/**
 * Closes a section with a wide arc of its own hue, edge to edge.
 *
 * The gradient is a circle whose centre sits far below the section end, so only
 * its crown clears the boundary: brightest at the bottom, fading as the arc
 * falls away on both sides. That leaves the tint strongest where the section
 * ends and gone by the rails' outer margin, which is what makes the break read.
 *
 * The geometry is tied to the layer box: the vertical radius equals the centre
 * offset (320%), so the arc's top lands exactly on the layer's top edge and the
 * layer height is the crown height. Colour runs to 68% of the radius, i.e. just
 * under the section boundary, so the visible band is all falloff.
 *
 * This is the section's only tint. A story or quote sitting inside the closing
 * band must not paint a wash of its own: an opaque wash stops at the rails while
 * the arc runs past them, and the two levels never match, so the rail turns into
 * a visible step — with the dead margin louder than the content.
 *
 * The hue rides on `currentColor` so the gradient stays one static class.
 */
export function SectionGlow(props: { color: FeatureColor }) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-x-0 bottom-0 h-72",
        "bg-[radial-gradient(75%_320%_at_50%_320%,currentColor_68%,transparent_100%)]",
        GLOW_COLORS[props.color],
      )}
    />
  );
}
