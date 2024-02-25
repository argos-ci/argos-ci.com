"use client";

import clsx from "clsx";
import * as React from "react";

import { CiCheck } from "../common/CiCheck";
import { ChangesSvg } from "./ChangesSvg";

export function ReviewChanges({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<
    "approved" | "rejected" | "pending"
  >("pending");
  React.useEffect(() => {
    const id = setInterval(() => {
      setStatus((status) => {
        if (status === "approved") return "rejected";
        if (status === "rejected") return "pending";
        return "approved";
      });
    }, 2500);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className={clsx("relative", className)} data-visual-test="removed">
      <div className="relative">
        <ChangesSvg className="mx-auto rounded border md:w-[50%]" />
      </div>
      <CiCheck className="mt-5 w-full" status={status} />
    </div>
  );
}
