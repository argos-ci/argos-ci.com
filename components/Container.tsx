import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  tight?: boolean;
  noGutter?: boolean;
};

export function Container({
  className,
  asChild,
  tight,
  noGutter,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={clsx(
        "container mx-auto px-4 sm:px-7",
        tight ? "max-w-max-content-tight" : "max-w-max-content",
        className,
      )}
      {...props}
    />
  );
}
