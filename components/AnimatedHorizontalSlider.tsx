import { useRef, useState } from "react";
import { useUp, x } from "@xstyled/styled-components";
import { Container } from "./Container";

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
    <>
      <Container
        display={{ _: "none", lg: "flex" }}
        justifyContent="space-between"
      >
        {children}
      </Container>

      <x.div w={1} overflow="hidden" display={{ _: "block", lg: "none" }}>
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
    </>
  );
}
