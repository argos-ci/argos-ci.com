import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function SectionHeader(
  props: ComponentPropsWithRef<"div"> & {
    align?: "center";
  },
) {
  const { align, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "flex flex-col gap-10 py-12 md:py-18",
        align === "center" ? "items-center" : "items-start",
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
