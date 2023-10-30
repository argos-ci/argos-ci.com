import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  tight?: boolean;
};

export const Container = ({
  className,
  asChild,
  tight,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={clsx(
        "container mx-auto px-4 sm:px-8",
        tight ? "max-w-4xl" : "max-w-6xl",
        className,
      )}
      {...props}
    />
  );
};
