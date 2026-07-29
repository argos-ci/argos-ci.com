/**
 * Closes a section by fading its lower third to grey, edge to edge — the tint
 * runs past the container rails, which is what makes the break read.
 *
 * Neutral on purpose: a boundary marker should not carry meaning, and the
 * accent already lives inside the section, under the customer story. Only for
 * sections sitting on the app background; the grey and dark ones have a tone of
 * their own.
 *
 * Kept as a string rather than a `@utility`: `@apply` does not carry the
 * variables that gradient stops rely on, so the utility compiled to nothing.
 */
export const SECTION_FADE =
  "bg-linear-to-b from-transparent from-65% to-(--neutral-3)";
