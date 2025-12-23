import clsx from "clsx";
import { AlertCircleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";

import { github, gitlab } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";

import { ThemeImage } from "./ThemeImage";

export type Status = "pending" | "approved" | "rejected";

const GitLabMark = () => {
  return (
    <div className="flex size-8 items-center justify-center rounded-full border border-[#E24329] bg-[#fefefe]">
      <ThemeImage src={gitlab.logo} alt={gitlab.name} className="size-5" />
    </div>
  );
};

const GitHubMark = () => {
  return (
    <div className="flex size-8 items-center justify-center rounded-full border border-[#1A1523] bg-[#fefefe]">
      <ThemeImage src={github.logo} alt={github.name} className="size-5" />
    </div>
  );
};

const CheckIcon = ({ status }: { status: Status }) => {
  return (
    <div className="flex">
      {(() => {
        switch (status) {
          case "approved":
            return (
              <CheckCircle2Icon className="text-green-icon animate-in zoom-in h-5 w-5 duration-300" />
            );
          case "rejected":
            return (
              <XCircleIcon className="text-red-icon animate-in zoom-in h-5 w-5 duration-300" />
            );
          case "pending":
          default:
            return <AlertCircleIcon className="text-amber-icon h-5 w-5" />;
        }
      })()}
    </div>
  );
};

const Check = ({
  className,
  status,
}: {
  className?: string;
  status: Status;
}) => {
  return (
    <div
      className={clsx(
        "relative z-10 flex flex-1 items-center gap-3 overflow-hidden rounded-sm border p-4 transition duration-300",
        status === "approved" && "border-(--grass-6) bg-(--grass-2)",
        status === "rejected" && "border-(--red-6) bg-(--red-2)",
        status === "pending" && "border-(--amber-6) bg-(--amber-2)",
        className,
      )}
    >
      <CheckIcon status={status} />
      <div className="flex h-6 w-6 items-center justify-center rounded-sm border bg-white">
        <ArgosEmblem className="h-3" />
      </div>
      <div className="text-low text-xs md:text-sm">
        {(() => {
          switch (status) {
            case "approved":
              return (
                <span key="approved" className="inline-block">
                  <span className="text-default font-medium">Argos</span> —
                  Changes approved
                </span>
              );
            case "rejected":
              return (
                <span key="rejected" className="inline-block">
                  <span className="text-default font-medium">Argos</span> —
                  Changes rejected
                </span>
              );
            case "pending":
            default:
              return (
                <span key="pending" className="inline-block">
                  <span className="text-default font-medium">Argos</span> — 1
                  change — waiting for your decision
                </span>
              );
          }
        })()}
      </div>
    </div>
  );
};

export function CiCheck({
  className,
  status = "pending",
}: {
  className?: string;
  status?: Status;
}) {
  return (
    <div
      className={clsx("flex items-center gap-10", className)}
      data-visual-test="blackout"
    >
      <Check status={status} data-visual-test="blackout" />
      <div className="relative flex flex-col gap-2">
        <GitHubMark />
        <GitLabMark />
        <div className="absolute top-4 right-8 w-10 overflow-hidden">
          <div className="animate-slide w-80 border-t border-dashed border-t-(--gray-8)" />
        </div>
        <div className="absolute right-8 bottom-4 w-10 overflow-hidden">
          <div className="animate-slide w-80 border-t border-dashed border-t-(--amber-8)" />
        </div>
      </div>
    </div>
  );
}
