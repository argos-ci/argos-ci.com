import clsx from "clsx";
import { LucideIcon } from "lucide-react";

export function Feature(props: {
  title: React.ReactNode;
  icon: LucideIcon;
  text: React.ReactNode;
}) {
  return (
    <section className="max-w-sm flex-1 py-6 md:max-w-none md:py-12">
      <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
        <props.icon className="h-7 w-7 text-(--violet-11)" strokeWidth={1} />{" "}
        {props.title}
      </h3>
      <p>{props.text}</p>
    </section>
  );
}

export function FeatureSeparator(props: {
  orientation: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={props.orientation}
      className={clsx(
        "hidden self-stretch border-dashed border-(--violet-6) md:block",
        props.orientation === "vertical" && "border-l",
        props.orientation === "horizontal" && "border-b",
      )}
    />
  );
}

export function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center md:gap-12">
      {children}
    </div>
  );
}
