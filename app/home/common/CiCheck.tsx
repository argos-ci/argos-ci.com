import clsx from "clsx";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { GitLabLogo } from "@/components/GitLabLogo";
import { GitHubLogo } from "@/components/GitHubLogo";
import { CheckCircle2Icon, XCircleIcon, AlertCircleIcon } from "lucide-react";

export type Status = "pending" | "approved" | "rejected";

const GitLabMark = () => {
  return (
    <div className="rounded-full bg-[#fefefe] border border-[#E24329] flex items-center justify-center w-8 h-8">
      <GitLabLogo className="w-5" />
    </div>
  );
};

const GitHubMark = () => {
  return (
    <div className="rounded-full bg-[#fefefe] border border-[#1A1523] flex items-center justify-center w-8 h-8">
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
              <CheckCircle2Icon className="text-green-10 w-5 h-5 animate-in zoom-in duration-300" />
            );
          case "rejected":
            return (
              <XCircleIcon className="text-red-10 w-5 h-5 animate-in zoom-in duration-300" />
            );
          case "pending":
          default:
            return <AlertCircleIcon className="text-amber-10 w-5 h-5" />;
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
  status?: Status;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-1 gap-3 p-4 items-center rounded border relative z-10 transition duration-300 overflow-hidden",
        status === "approved" && "bg-grass-2 border-grass-6",
        status === "rejected" && "bg-red-2 border-red-6",
        status === "pending" && "bg-amber-2 border-amber-6",
        className,
      )}
    >
      <CheckIcon status={status} />
      <div className="flex h-6 w-6 items-center justify-center border rounded bg-white">
        <ArgosEmblem className="h-3" />
      </div>
      <div className="text-xs md:text-sm text-low">
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
      <div className="flex flex-col gap-2 relative">
        <GitHubMark />
        <GitLabMark />
        <div className="w-10 absolute top-4 right-8 overflow-hidden">
          <div className="border-t border-t-gray-8 border-dashed w-80 animate-slide" />
        </div>
        <div className="w-10 absolute bottom-4 right-8 overflow-hidden">
          <div className="border-t border-t-amber-8 border-dashed w-80 animate-slide" />
        </div>
      </div>
    </div>
  );
}
