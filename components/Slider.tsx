"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import * as React from "react";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={clsx(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary-active">
      <SliderPrimitive.Range className="absolute h-full bg-primary-solid" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="focus-visible:ring-ring block h-4 w-4 rounded-full border bg-app shadow transition-colors focus:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
