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
        "relative flex w-full touch-none items-center select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-primary-active relative h-1 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-primary-solid absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="bg-app focus-visible:ring-ring block h-4 w-4 rounded-full border shadow-sm transition-colors focus:outline-hidden focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}
