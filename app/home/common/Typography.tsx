import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

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
