import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function DotIndicator(
  props: ComponentPropsWithRef<"span"> & {
    variant: "danger" | "success" | "primary";
  },
) {
  const { children, variant, ...rest } = props;
  return (
    <span
      {...rest}
      className={clsx(
        "size-1.5 shrink-0 rounded-full",
        {
          danger: "bg-(--danger-9)",
          success: "bg-(--success-9)",
          primary: "bg-(--primary-9)",
        }[variant],
      )}
      aria-hidden="true"
    />
  );
}
