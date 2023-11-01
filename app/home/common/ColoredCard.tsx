import * as React from "react";
import clsx from "clsx";

export function ColoredCard({
  color,
  surtitle,
  title,
  text,
  children,
}: {
  color: "amber" | "crimson" | "red" | "sky";
  surtitle: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        "bg-gradient-to-b p-px rounded relative",
        color === "amber" && "from-amber-8 to-amber-5",
        color === "crimson" && "from-crimson-8 to-violet-5",
        color === "red" && "from-red-8 to-orange-5",
        color === "sky" && "from-sky-8 to-iris-5",
      )}
    >
      <div
        className={clsx(
          "flex-5 rounded p-8 h-full",
          color === "amber" && "bg-amber-1",
          color === "crimson" && "bg-crimson-1",
          color === "red" && "bg-red-1",
          color === "sky" && "bg-sky-1",
        )}
      >
        <div
          className={clsx(
            "font-medium mb-2",
            color === "amber" && "text-amber-11",
            color === "crimson" && "text-crimson-11",
            color === "red" && "text-red-11",
            color === "sky" && "text-sky-11",
          )}
        >
          {surtitle}
        </div>
        <h3 className="font-semibold text-xl md:text-2xl mb-0.5">{title}</h3>
        <p>{text}</p>
        <div className="-mx-3 relative">{children}</div>
      </div>
    </section>
  );
}
