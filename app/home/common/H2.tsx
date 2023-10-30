import clsx from "clsx";

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={clsx(
        "text-4xl md:text-6xl md:leading-[1.1] font-accent",
        className,
      )}
    >
      {children}
    </h2>
  );
}
