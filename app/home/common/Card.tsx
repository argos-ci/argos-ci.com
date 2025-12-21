import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Card(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "bg-app rounded-xl border-[0.5px] shadow-xs",
        props.className,
      )}
    />
  );
}
