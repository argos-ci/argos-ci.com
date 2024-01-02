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
        "font-accent text-4xl md:text-6xl md:leading-[1.3]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
