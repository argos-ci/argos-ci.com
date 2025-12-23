import clsx from "clsx";
import Link from "next/link";
import type React from "react";

import { Card } from "@/app/home/common/Card";
import { ArgosEmblem } from "@/components/ArgosEmblem";

type BuildStatus = "approved" | "clean";

const BUILDS: Array<{
  name: string;
  status: BuildStatus;
  details: string;
}> = [
  {
    name: "playright",
    status: "approved",
    details: "9 changed",
  },
  {
    name: "storybook",
    status: "clean",
    details: "-",
  },
];

export function GitHubComment() {
  return <CommentCard />;
}

function CommentCard() {
  return (
    <Card className="relative flex flex-col" shadow="shadow-lg">
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded border bg-(--primary-2)">
            <ArgosEmblem className="size-3 w-auto" aria-hidden />
          </div>
          <span className="truncat font-semibold">argos-ci</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-low font-medium">
            commented on Nov 12 · edited
          </span>
        </div>
      </div>

      <div className="space-y-3 p-3 text-xs">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">
            The latest updates on your projects.
          </span>{" "}
          Learn more about{" "}
          <Link
            className="text-(--primary-10) underline decoration-1 underline-offset-2 transition hover:text-(--primary-11)"
            href="/docs/github"
          >
            Argos notifications
          </Link>
          .
        </p>

        <div className="overflow-hidden rounded border shadow-xs">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-(--neutral-2)">
              <tr>
                <Th>Build</Th>
                <Th>Status</Th>
                <Th className="hidden sm:table-cell">Details</Th>
              </tr>
            </thead>
            <tbody>
              {BUILDS.map((build) => (
                <tr key={build.name} className="bg-app">
                  <Td className="font-semibold">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{build.name}</span>
                      <Link
                        href="https://app.argos-ci.com/jsfez/snkr-shop-2/builds/98/96709653"
                        className="font-semibold text-(--primary-10) underline decoration-1 underline-offset-2 hover:text-(--primary-11)"
                      >
                        Inspect
                      </Link>
                    </div>
                  </Td>
                  <Td>
                    <BuildStatusPill status={build.status} />
                  </Td>
                  <Td className="text-low hidden sm:table-cell">
                    {build.details}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function BuildStatusPill(props: { status: BuildStatus }) {
  const { status } = props;

  const pillStyle = {
    approved: "text-(--success-11) bg-(--success-3) border-(--success-7)",
    clean: "text-(--success-11) bg-(--success-3) border-(--success-7)",
  }[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs font-semibold",
        pillStyle,
      )}
    >
      {{ approved: "Changes approved", clean: "No changes detected" }[status]}
    </span>
  );
}

function Th(props: React.HTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <th
      {...rest}
      className={clsx(
        "text-low border-b p-2 text-left text-xs font-semibold uppercase",
        className,
      )}
    />
  );
}

function Td(props: React.HTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <td
      {...rest}
      className={clsx(
        "p-2 align-top text-sm not-[tr:last-child_&]:border-b",
        className,
      )}
    />
  );
}
