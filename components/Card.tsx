import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Card(
  props: ComponentPropsWithRef<"div"> & { shadow?: "medium" | "high" },
) {
  const { shadow = "medium", ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "bg-app rounded-xl border-[0.5px]",
        { medium: "shadow-xs", high: "shadow-md/7" }[shadow],
        rest.className,
      )}
    />
  );
}
