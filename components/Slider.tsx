import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import * as React from "react";

export function Slider({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={clsx(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary-active">
        <SliderPrimitive.Range className="absolute h-full bg-primary-solid" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border bg-app shadow-sm transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}
