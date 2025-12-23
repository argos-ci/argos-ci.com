import clsx from "clsx";
import { ComponentPropsWithRef } from "react";

export interface ChipProps extends ComponentPropsWithRef<"div"> {
  icon?: React.ComponentType<{ className?: string }>;
  variant?: ChipVariant;
}

type ChipVariant =
  | "success"
  | "danger"
  | "primary"
  | "pending"
  | "warning"
  | "neutral";

const variantClassNames: Record<ChipVariant, string> = {
  success: "border-(--success-7) bg-(--success-2) text-(--success-11)",
  danger: "border-(--danger-7) bg-(--danger-2) text-(--danger-11)",
  primary: "border-(--primary-7) bg-(--primary-2) text-(--primary-11)",
  neutral: "border-(--neutral-7) bg-(--neutral-2) text-(--neutral-11)",
  pending: "border-(--amber-7) bg-(--amber-2) text-(--amber-11)",
  warning: "border-(--amber-7) bg-(--amber-2) text-(--amber-11)",
};

export function Chip(props: ChipProps) {
  const {
    variant = "neutral",
    children,
    icon: Icon,
    className,
    ...rest
  } = props;
  return (
    <div
      className={clsx(
        "group/chip inline-flex w-fit items-center gap-[0.5em] rounded-[0.8em] border-[0.5px] px-[0.75em] py-[0.15em] font-medium no-underline",
        variantClassNames[variant],
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="h-[1em] w-[1em]" />}
      {children}
    </div>
  );
}
