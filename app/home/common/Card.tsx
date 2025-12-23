import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Card(
  props: ComponentPropsWithRef<"div"> & { shadow?: string },
) {
  const { shadow = "shadow-xs", ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "bg-app rounded-xl border-[0.5px]",
        shadow,
        rest.className,
      )}
    />
  );
}
