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
        "container mx-auto",
        noGutter ? null : "container-gutter",
        tight ? "max-w-max-content-tight" : "max-w-max-content",
        className,
      )}
      {...props}
    />
  );
}

export function SideBorder() {
  return (
    <div className="pointer-events-none absolute inset-0 -mt-4 border-x mask-[linear-gradient(transparent,black_40%)]" />
  );
}
