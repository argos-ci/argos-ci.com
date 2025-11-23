import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { ComponentPropsWithRef } from "react";

export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "base" | "small" | "large";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-linear-to-t from-(--primary-11) to-(--primary-9) text-white",
    "shadow-[0_0_0_1px_var(--primary-11)_inset,0_2px_0_0_rgba(255,255,255,0.18)_inset]",
    "not-aria-disabled:hover:to-(--primary-8) not-aria-disabled:active:to-(--primary-8)",
    "focus-visible:ring-(--primary-a7)",
  ),

  outline: clsx(
    "bg-(--neutral-1) shadow-[0_0_0_1px_var(--neutral-8)]",
    "not-aria-disabled:hover:bg-(--neutral-4) not-aria-disabled:hover:shadow-[0_0_0_1px_var(--neutral-8)]",
    "focus-visible:ring-(--neutral-a7)",
  ),
};

const sizeClassNames: Record<ButtonSize, string> = {
  base: "rounded-md py-1.5 px-3 text-sm",
  small: "rounded-sm py-1 px-2 text-xs",
  large:
    "rounded-lg py-2 px-4 md:rounded-xl md:py-2 md:px-6 text-base md:text-lg",
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
        "align-center aria-disabled:opacity-disabled inline-flex font-sans font-medium whitespace-nowrap transition select-none [button]:cursor-default",
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
