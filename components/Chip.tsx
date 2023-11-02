import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import {
  Children,
  ComponentProps,
  ReactElement,
  cloneElement,
  forwardRef,
} from "react";

export interface ChipProps extends ComponentProps<"div"> {
  icon?: React.ComponentType<{ className?: string }>;
  clickable?: boolean;
  asChild?: boolean;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ children, clickable, asChild, icon: Icon, className, ...props }, ref) => {
    const child = asChild ? Children.only(children as ReactElement) : null;
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
  },
);
