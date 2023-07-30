import { clsx } from "clsx";

export type ContainerProps = React.ComponentProps<"div">;

export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx("container mx-auto px-4 sm:px-8 max-w-5xl", className)}
      {...props}
    />
  );
};
