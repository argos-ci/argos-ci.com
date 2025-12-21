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
        "grid h-5 w-5 place-items-center rounded-lg border",
        {
          danger:
            "border-(--danger-9)/25 bg-(--danger-9)/10 text-(--danger-10)",
          success:
            "border-(--success-9)/25 bg-(--success-9)/10 text-(--success-10)",
          primary:
            "border-(--primary-9)/25 bg-(--primary-9)/10 text-(--primary-10)",
        }[variant],
        rest.className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-3.5" />
    </span>
  );
}
