import clsx from "clsx";
import Link from "next/link";
import type React from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

type BuildStatus = "approved" | "clean";

/**
 * The comment Argos keeps on a pull request, miniaturized: one row per build
 * with its status and the Details column the docs describe ("4 changed,
 * 3 ignored"), and the deployments the same PR shipped, with their URLs.
 */
const BUILDS: Array<{
  name: string;
  status: BuildStatus;
  details: string;
}> = [
  { name: "playwright", status: "approved", details: "4 changed, 3 ignored" },
  { name: "storybook", status: "clean", details: "—" },
];

export function GitHubComment() {
  return (
    <Card
      className="relative mx-auto flex w-full max-w-lg animate-slide-up-fade flex-col animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
      shadow="high"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs">
        <div className="grid size-6 place-items-center rounded border bg-(--primary-2)">
          <ArgosEmblem className="size-3 w-auto" aria-hidden />
        </div>
        <span className="font-semibold">argos-ci</span>
        <Chip className="text-xxs">bot</Chip>
        <span className="truncate font-medium text-low">
          commented · edited
        </span>
      </div>

      <div className="space-y-3 p-3 text-xs">
        <p className="leading-relaxed">
          <span className="font-semibold">
            The latest updates on your projects.
          </span>{" "}
          Learn more about{" "}
          <Link
            className="text-(--primary-10) underline decoration-1 underline-offset-2 transition hover:text-(--primary-11)"
            href="/docs/learn/review-workflow/pull-request-comments"
          >
            Argos notifications
          </Link>
          .
        </p>

        <div className="overflow-hidden rounded border">
          <table className="w-full border-collapse">
            <thead className="bg-(--neutral-2)">
              <tr>
                <Th>Build</Th>
                <Th>Status</Th>
                <Th className="max-sm:hidden">Details</Th>
              </tr>
            </thead>
            <tbody>
              {BUILDS.map((build) => (
                <tr key={build.name} className="bg-app">
                  <Td className="font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{build.name}</span>
                      <span className="font-semibold text-(--primary-10) underline decoration-1 underline-offset-2 max-sm:hidden">
                        Inspect
                      </span>
                    </div>
                  </Td>
                  <Td>
                    <BuildStatusPill status={build.status} />
                  </Td>
                  <Td className="text-low max-sm:hidden">{build.details}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded border max-sm:hidden">
          <table className="w-full border-collapse">
            <thead className="bg-(--neutral-2)">
              <tr>
                <Th>Deployment</Th>
                <Th>Preview</Th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-app">
                <Td className="font-semibold">storybook</Td>
                <Td>
                  <span className="text-(--primary-10) underline decoration-1 underline-offset-2">
                    storybook-fix-price-tag-acme.argos-ci.live
                  </span>
                </Td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function BuildStatusPill(props: { status: BuildStatus }) {
  const { status } = props;
  return (
    <Chip
      variant={
        { approved: "success" as const, clean: "neutral" as const }[status]
      }
      className="whitespace-nowrap"
    >
      {{ approved: "Changes approved", clean: "No changes detected" }[status]}
    </Chip>
  );
}

function Th(props: React.HTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <th
      {...rest}
      className={clsx(
        "border-b p-2 text-left text-xxs font-semibold text-low uppercase",
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
        "p-2 align-middle text-xs not-[tr:last-child_&]:border-b",
        className,
      )}
    />
  );
}
