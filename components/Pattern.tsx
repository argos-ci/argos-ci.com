import { type ComponentPropsWithRef, useId } from "react";

export function Pattern(props: ComponentPropsWithRef<"svg">) {
  const id = useId();
  const patternId = `grid-pattern-${id}`;
  return (
    <>
      <svg width="100%" height="100%" {...props}>
        <defs>
          <pattern
            id={patternId}
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <circle fill="currentColor" cx="1" cy="1" r="2"></circle>
          </pattern>
        </defs>
        <rect fill={`url(#${patternId})`} width="100%" height="100%"></rect>
      </svg>
    </>
  );
}
