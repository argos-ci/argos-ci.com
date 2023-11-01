"use client";
import * as React from "react";
import clsx from "clsx";
import { ChangesSvg } from "./ChangesSvg";
import { CiCheck } from "../common/CiCheck";
import { Button } from "@/components/Button";

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
    <div className={clsx("relative", className)}>
      <div className="relative">
        <ChangesSvg className="border rounded md:w-[50%] mx-auto" />
      </div>
      <CiCheck className="mt-5 w-full" status={status} />
    </div>
  );
}
