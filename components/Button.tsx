import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { ComponentPropsWithRef } from "react";

export type ButtonVariant = "primary" | "outline" | "outline-primary";
export type ButtonSize = "base" | "small" | "large";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-linear-to-t from-(--primary-11) dark:from-(--primary-4) to-(--primary-9) dark:to-(--primary-6) text-white",
    "shadow-[0_0_0_1px_var(--primary-11)_inset,0_2px_0_0_rgba(255,255,255,0.18)_inset]",
    "dark:shadow-[0_0_0_1px_var(--primary-1)_inset,0_2px_0_0_rgba(255,255,255,0.18)_inset]",
    "not-aria-disabled:hover:to-(--primary-8) not-aria-disabled:active:to-(--primary-8)",
    "focus-visible:ring-(--primary-a7)",
  ),

  outline: clsx(
    "bg-(--neutral-1) shadow-[0_0_0_1px_var(--neutral-8)]",
    "not-aria-disabled:hover:bg-(--neutral-4) not-aria-disabled:hover:shadow-[0_0_0_1px_var(--neutral-8)]",
    "focus-visible:ring-(--neutral-a7)",
  ),

  "outline-primary": clsx(
    "bg-(--primary-1) shadow-[0_0_0_1px_var(--primary-8)]",
    "not-aria-disabled:hover:bg-(--primary-4) not-aria-disabled:hover:shadow-[0_0_0_1px_var(--primary-8)]",
    "focus-visible:ring-(--primary-a7)",
  ),
};

const sizeClassNames: Record<ButtonSize, string> = {
  small: "rounded-sm py-1 px-2 text-xs",
  base: "rounded-md py-1.5 px-3 text-sm",
  large: "rounded-lg py-1.5 px-4 text-base",
};

export function Button({
  ref,
  variant = "primary",
  size = "base",
  children,
  className,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const variantClassName = variantClassNames[variant];
  if (!variantClassName) {
    throw new Error(`Invalid variant: ${variant}`);
  }
  const sizeClassName = sizeClassNames[size];
  if (!sizeClassName) {
    throw new Error(`Invalid size: ${size}`);
  }
  return (
    <Comp
      ref={ref}
      className={clsx(
        className,
        variantClassName,
        sizeClassName,
        "focus:outline-hidden focus-visible:ring-4",
        "[&>svg]:mr-[0.5em] [&>svg]:size-[1em]",
        "aria-disabled:opacity-disabled inline-flex items-center font-sans font-medium whitespace-nowrap transition select-none [button]:cursor-default",
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
