import { type ComponentPropsWithRef, useId } from "react";

export function Grid(
  props: ComponentPropsWithRef<"svg"> & {
    x?: number;
    y?: number;
    size?: number;
  },
) {
  const { x, y, size = 60, ...rest } = props;
  const id = useId();
  const patternId = `grid-pattern-${id}`;
  return (
    <svg aria-hidden width="100%" height="100%" {...rest}>
      <defs>
        <pattern
          id={patternId}
          x={x}
          y={y}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
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
