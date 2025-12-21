import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export function ContainedIcon(
  props: ComponentPropsWithRef<"span"> & {
    variant: "primary" | "danger" | "success";
    icon: LucideIcon;
  },
) {
  const { variant, icon: Icon, ...rest } = props;
  return (
    <span
      {...rest}
      className={clsx(
        "shrink-0 rounded-full border p-1",
        {
          danger: "border-(--danger-6) bg-(--danger-2) text-(--danger-9)",
          success: "border-(--success-6) bg-(--success-2) text-(--success-9)",
          primary: "border-(--primary-6) bg-(--primary-2) text-(--primary-9)",
        }[variant],
        rest.className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-3" />
    </span>
  );
}
