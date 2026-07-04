import clsx from "clsx";
import { TerminalIcon } from "lucide-react";

export function Terminal(props: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const { title = "Terminal", right, children, className } = props;
  return (
    <div
      className={clsx(
        "bg-app w-full max-w-md overflow-hidden rounded-xl border-[0.5px] shadow-md/7",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b-[0.5px] px-3 py-2">
        <div className="text-low flex items-center gap-2 text-xs font-medium">
          <TerminalIcon className="size-3.5" />
          {title}
        </div>
        {right}
      </div>
      <div className="p-4 text-left">{children}</div>
    </div>
  );
}
