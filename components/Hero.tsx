import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Hero(
  props: ComponentPropsWithRef<"div"> & {
    /**
     * @default "start"
     */
    align?: "center" | "start";
  },
) {
  const { align = "start", ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "flex flex-col gap-5",
        {
          center: "mx-auto max-w-2xl items-center text-center text-balance",
          start: "items-start",
        }[align],
        rest.className,
      )}
    />
  );
}

export function HeroHeading(props: ComponentPropsWithRef<"h1">) {
  return (
    <h1
      {...props}
      className={clsx(
        "font-accent text-4xl font-medium md:text-5xl",
        props.className,
      )}
    />
  );
}

export function HeroDescription(props: ComponentPropsWithRef<"p">) {
  return (
    <p
      {...props}
      className={clsx(
        "text-low max-w-2xl text-lg font-medium",
        props.className,
      )}
    />
  );
}

export function HeroActions(props: ComponentPropsWithRef<"div">) {
  return (
    <div {...props} className={clsx("mt-5 flex gap-4", props.className)} />
  );
}
