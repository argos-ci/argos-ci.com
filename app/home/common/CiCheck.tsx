import clsx from "clsx";
import { AlertCircleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { GitHubLogo } from "@/components/GitHubLogo";
import { GitLabLogo } from "@/components/GitLabLogo";

export type Status = "pending" | "approved" | "rejected";

const GitLabMark = () => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E24329] bg-[#fefefe]">
      <GitLabLogo className="w-5" />
    </div>
  );
};

const GitHubMark = () => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1A1523] bg-[#fefefe]">
      <GitHubLogo className="w-5" />
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
              <CheckCircle2Icon className="h-5 w-5 text-green-10 duration-300 animate-in zoom-in" />
            );
          case "rejected":
            return (
              <XCircleIcon className="h-5 w-5 text-red-10 duration-300 animate-in zoom-in" />
            );
          case "pending":
          default:
            return <AlertCircleIcon className="h-5 w-5 text-amber-10" />;
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
        "relative z-10 flex flex-1 items-center gap-3 overflow-hidden rounded border p-4 transition duration-300",
        status === "approved" && "border-grass-6 bg-grass-2",
        status === "rejected" && "border-red-6 bg-red-2",
        status === "pending" && "border-amber-6 bg-amber-2",
        className,
      )}
      data-visual-test="blackout"
    >
      <CheckIcon status={status} />
      <div className="flex h-6 w-6 items-center justify-center rounded border bg-white">
        <ArgosEmblem className="h-3" />
      </div>
      <div className="text-xs text-low md:text-sm">
        {(() => {
          switch (status) {
            case "approved":
              return (
                <span key="approved" className="inline-block">
                  <span className="font-medium text">Argos</span> — Changes
                  approved
                </span>
              );
            case "rejected":
              return (
                <span key="rejected" className="inline-block">
                  <span className="font-medium text">Argos</span> — Changes
                  rejected
                </span>
              );
            case "pending":
            default:
              return (
                <span key="pending" className="inline-block">
                  <span className="font-medium text">Argos</span> — 1 change —
                  waiting for your decision
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
    <div className={clsx("flex items-center gap-10", className)}>
      <Check status={status} />
      <div className="relative flex flex-col gap-2">
        <GitHubMark />
        <GitLabMark />
        <div className="absolute right-8 top-4 w-10 overflow-hidden">
          <div className="w-80 animate-slide border-t border-dashed border-t-gray-8" />
        </div>
        <div className="absolute bottom-4 right-8 w-10 overflow-hidden">
          <div className="w-80 animate-slide border-t border-dashed border-t-amber-8" />
        </div>
      </div>
    </div>
  );
}
