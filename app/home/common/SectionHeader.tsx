import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function SectionHeader(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col items-start gap-10 py-12 md:py-18",
        props.className,
      )}
    />
  );
}

export function SectionHeaderTexts(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx("flex flex-col gap-2.5", props.className)}
    />
  );
}
