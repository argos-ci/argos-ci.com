import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import {
  Children,
  HTMLAttributes,
  cloneElement,
  forwardRef,
  memo,
} from "react";

export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "base" | "small" | "large";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "focus-visible:ring-primary text-white border-transparent bg-primary-solid [&:not([aria-disabled])]:hover:bg-primary-solid-hover [&:not([aria-disabled])]:active:bg-primary-solid-active aria-expanded:bg-primary-solid-active",
  outline:
    "focus-visible:ring-default text border border-mauve-6 bg-app [&:not([aria-disabled])]:hover:border-mauve-10",
};

const sizeClassNames: Record<ButtonSize, string> = {
  base: "rounded-lg py-1.5 px-3 text-sm",
  small: "rounded py-1 px-2 text-xs",
  large:
    "rounded-lg py-2 px-4 md:rounded-xl md:py-2 md:px-6 text-base md:text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "base",
      children,
      className,
      asChild,
      ...props
    },
    ref,
  ) => {
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
          "focus:outline-none focus-visible:ring-4",
          "align-center aria-disabled:opacity-disabled inline-flex select-none whitespace-nowrap border font-sans font-medium transition [&:is(button)]:cursor-default",
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
