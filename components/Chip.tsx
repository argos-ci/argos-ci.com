import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
} from "react";

export interface ChipProps extends ComponentPropsWithRef<"div"> {
  icon?: React.ComponentType<{ className?: string }>;
  clickable?: boolean;
  asChild?: boolean;
}

export function Chip({
  ref,
  children,
  clickable,
  asChild,
  icon: Icon,
  className,
  ...props
}: ChipProps) {
  const child = asChild
    ? Children.only(children as ReactElement<{ children: React.ReactNode }>)
    : null;
  const renderProps = {
    className: clsx(
      className,
      "group/chip inline-flex items-center gap-2 text-primary-300 bg-primary-900/50 rounded-2xl text-sm font-medium py-2 px-4 no-underline w-fit",
      clickable && "hover:bg-primary-900 transition",
    ),
    children: (
      <>
        {Icon && <Icon className="h-[1em] w-[1em]" />}
        {child ? child.props.children : children}
        {clickable ? (
          <ChevronRightIcon className="h-[1em] w-[1em] opacity-50 transition group-hover/chip:translate-x-1 group-hover/chip:scale-110 group-hover/chip:opacity-100" />
        ) : null}
      </>
    ),
  };
  if (asChild) {
    return cloneElement(Children.only(children as ReactElement), renderProps);
  }
  return <div ref={ref} {...renderProps} {...props} />;
}
