import { SVGProps } from "react";

/**
 * `#D97757` is Anthropic's terracotta, baked in rather than read from a token:
 * the site's `--orange-9` is `#f76b15`, a vivid orange that is nobody's brand
 * color, and a mark in the wrong color is worse than no mark.
 *
 * No `<title>`: the mark is always rendered beside a "Claude Code" label, so
 * naming it here made a screen reader announce the product twice. An icon that
 * repeats its own caption is decoration, and decoration is hidden.
 */
export function ClaudeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={props.className}
      {...props}
    >
      <path
        fill="#D97757"
        fillRule="evenodd"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0v-3.1h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
        clipRule="evenodd"
      />
    </svg>
  );
}
