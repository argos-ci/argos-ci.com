import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

// export function Feature(props: {
//   title: React.ReactNode;
//   icon: LucideIcon;
//   text: React.ReactNode;
// }) {
//   return (
//     <section className="flex-1 border-b p-6 sm:max-lg:nth-[2n]:border-r md:p-10 lg:not-nth-[3n]:border-r">
//       <props.icon className="mb-3 size-5 text-(--primary-11)" />
//       <h3 className="font-accent mb-1 flex items-center gap-3 font-medium">
//         {props.title}
//       </h3>
//       <p>{props.text}</p>
//     </section>
//   );
// }

export function Feature(props: ComponentPropsWithRef<"section">) {
  return (
    <section
      {...props}
      className={clsx(
        "flex-1 border-b p-6 sm:max-lg:nth-[2n]:border-r md:p-10 lg:not-nth-[3n]:border-r",
        props.className,
      )}
    />
  );
}

export function FeatureIcon(props: { icon: LucideIcon }) {
  return <props.icon className="mb-3 size-5 text-(--primary-11)" />;
}

export function FeatureHeading(props: ComponentPropsWithRef<"h3">) {
  return (
    <h3
      {...props}
      className={clsx(
        "font-accent mb-1 flex items-center gap-3 font-medium",
        props.className,
      )}
    />
  );
}

export function FeatureText(props: ComponentPropsWithRef<"p">) {
  return <p {...props} className={clsx("text-low", props.className)} />;
}

export function FeatureGrid(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        props.className,
      )}
    />
  );
}
