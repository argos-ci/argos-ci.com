import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Title(
  props: ComponentPropsWithRef<"div"> & {
    children: React.ReactNode;
  },
) {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center gap-2 text-xs font-semibold",
        props.className,
      )}
    />
  );
}
