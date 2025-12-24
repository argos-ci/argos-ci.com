import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function SmallTitle(
  props: ComponentPropsWithRef<"div"> & {
    children: React.ReactNode;
  },
) {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center gap-2 text-xs font-medium",
        props.className,
      )}
    />
  );
}

export function SectionTitle(props: ComponentPropsWithRef<"h2">) {
  return (
    <h2
      {...props}
      className={clsx(
        "font-accent text-3xl font-medium md:text-[2.625rem] md:leading-[1.1]",
        props.className,
      )}
    />
  );
}

export function SectionDescription(props: ComponentPropsWithRef<"p">) {
  return (
    <p
      {...props}
      className={clsx(
        "text-low text-base font-medium md:text-lg md:leading-[1.4]",
        props.className,
      )}
    />
  );
}
