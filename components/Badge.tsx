import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Badge(props: ComponentPropsWithRef<"div">) {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "bg-app text-xxxs inline-flex items-center gap-1.5 rounded-lg border-[0.5px] px-2 py-1 font-medium",
        rest.className,
      )}
    >
      {children}
    </div>
  );
}
