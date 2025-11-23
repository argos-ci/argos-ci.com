import { type ComponentPropsWithRef, useId } from "react";

export function Grid(
  props: ComponentPropsWithRef<"svg"> & {
    position?: "left" | "right";
  },
) {
  const { position = "left", ...rest } = props;
  const id = useId();
  const patternId = `grid-pattern-${id}`;
  return (
    <svg width="100%" height="100%" {...rest}>
      <defs>
        <pattern
          id={patternId}
          x={{ left: 0, right: -1 }[position]}
          y={0}
          width={60}
          height={60}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="transparent"
            stroke="currentColor"
            strokeWidth={2}
          ></path>
        </pattern>
      </defs>
      <rect fill={`url(#${patternId})`} width="100%" height="100%"></rect>
    </svg>
  );
}
