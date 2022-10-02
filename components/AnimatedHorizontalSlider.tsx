import { useRef, useState } from "react";
import { x } from "@xstyled/styled-components";

export function InfiniteLooper({
  children,
  gap,
  repeat,
}: {
  children: React.ReactNode;
  gap: number;
  repeat: number;
}) {
  const [count] = useState(repeat);

  return (
    <x.div w={1} overflow="hidden">
      <x.div display="flex" justifyContent="center" w="fit-content">
        {Array.from({ length: count }).map((_, ind) => (
          <x.div
            key={ind}
            display="flex"
            w="max-content"
            animation="slide"
            gap={gap}
            pr={gap}
          >
            {children}
          </x.div>
        ))}
      </x.div>
    </x.div>
  );
}
