"use client";
import * as React from "react";
import clsx from "clsx";
import { ChangesSvg } from "./ChangesSvg";
import { CiCheck } from "../common/CiCheck";
import { Button } from "@/components/Button2";

export function ReviewChanges({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<
    "approved" | "rejected" | "pending"
  >("pending");
  return (
    <div className={clsx("relative", className)}>
      <div className="relative">
        <ChangesSvg className="border rounded md:w-[50%] mx-auto" />
        <Button
          className="absolute -bottom-2 left-[10%] justify-center w-36 shadow-md"
          onClick={() => {
            setStatus((status) => {
              if (status === "approved") return "rejected";
              return "approved";
            });
          }}
        >
          {status === "approved" ? "Reject changes" : "Approve changes"}
        </Button>
      </div>
      <CiCheck className="mt-5 w-full" status={status} />
    </div>
  );
}
