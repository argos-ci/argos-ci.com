import clsx from "clsx";
import * as React from "react";

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
        "relative rounded-sm bg-linear-to-b p-px",
        color === "amber" && "from-(--amber-8) to-(--amber-5)",
        color === "crimson" && "from-(--crimson-8) to-(--violet-5)",
        color === "red" && "from-(--red-8) to-(--orange-5)",
        color === "sky" && "from-(--sky-8) to-(--iris-5)",
      )}
    >
      <div
        className={clsx(
          "h-full flex-5 rounded-sm p-8",
          color === "amber" && "bg-amber-app",
          color === "crimson" && "bg-crimson-app",
          color === "red" && "bg-red-app",
          color === "sky" && "bg-sky-app",
        )}
      >
        <div
          className={clsx(
            "mb-2 font-medium",
            color === "amber" && "text-amber-low",
            color === "crimson" && "text-crimson-low",
            color === "red" && "text-red-low",
            color === "sky" && "text-sky-low",
          )}
        >
          {surtitle}
        </div>
        <h3 className="mb-0.5 text-xl font-semibold md:text-2xl">{title}</h3>
        <p>{text}</p>
        <div className="relative -mx-3">{children}</div>
      </div>
    </section>
  );
}
