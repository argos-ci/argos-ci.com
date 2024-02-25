"use client";

import * as React from "react";
import { z } from "zod";

const statusEnum = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
  "incident",
]);

type Status = z.infer<typeof statusEnum>;

const statusSchema = z.object({ status: statusEnum });

async function fetchStatus() {
  const res = await fetch("/api/openstatus");
  const data = await res.json();
  return statusSchema.parse(data);
}

const statusDictionary: Record<Status, { label: string; color: string }> = {
  operational: {
    label: "All systems normal",
    color: "bg-green-10",
  },
  degraded_performance: {
    label: "Degraded Performance",
    color: "bg-yellow-10",
  },
  partial_outage: {
    label: "Partial Outage",
    color: "bg-yellow-10",
  },
  major_outage: {
    label: "Major Outage",
    color: "bg-red-10",
  },
  unknown: {
    label: "Unknown",
    color: "bg-gray-10",
  },
  incident: {
    label: "Incident",
    color: "bg-yellow-10",
  },
  under_maintenance: {
    label: "Under Maintenance",
    color: "bg-gray-10",
  },
} as const;

const slug = "argos";

export function StatusWidget() {
  const [status, setStatus] = React.useState<Status | null>(null);
  React.useEffect(() => {
    fetchStatus().then(({ status }) => {
      setStatus(status);
    });
  }, []);
  if (!status) {
    return (
      <div aria-busy className="py-1 text-xs text-low">
        Loading status...
      </div>
    );
  }
  const { label, color } = statusDictionary[status];
  return (
    <a
      className="-mx-2 inline-flex max-w-fit items-center gap-2 rounded border border-transparent px-2 py-1 text-xs font-medium text-low transition hover:border-hover"
      href={`https://${slug}.openstatus.dev`}
      target="_blank"
      rel="noreferrer"
    >
      <span className="relative flex h-2 w-2">
        {status === "operational" ? (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75 duration-1000`}
          />
        ) : null}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${color}`}
        />
      </span>
      {label}
    </a>
  );
}
