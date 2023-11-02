"use client";

import * as React from "react";

import { CiCheck, Status } from "../common/CiCheck";

export function AutomaticCheck({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status>("pending");
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
  return <CiCheck status={status} className={className} />;
}
