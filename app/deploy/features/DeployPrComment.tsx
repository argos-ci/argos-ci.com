import clsx from "clsx";
import Link from "next/link";
import type React from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

const LINK_CLASS =
  "font-semibold text-(--primary-10) underline decoration-1 underline-offset-2 hover:text-(--primary-11)";

/**
 * The single pull request comment Argos posts when `deploy` and `upload` run
 * on the same commit: the deployment first, the visual build under it.
 */
export function DeployPrComment() {
  return (
    <Card
      shadow="high"
      className="relative flex w-full max-w-lg animate-slide-up-fade flex-col animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded border bg-(--primary-2)">
            <ArgosEmblem className="size-3 w-auto" aria-hidden />
          </div>
          <span className="font-semibold">argos-ci</span>
        </div>
        <span className="font-medium text-low">
          commented on Nov 12 · edited
        </span>
      </div>

      <div className="space-y-3 p-3 text-xs">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">
            The latest updates on your projects.
          </span>
          <span className="max-sm:hidden">
            {" "}
            Learn more about{" "}
            <Link
              className={LINK_CLASS}
              href="/docs/learn/review-workflow/pull-request-comments"
            >
              Argos notifications
            </Link>
            .
          </span>
        </p>

        <Table columns={["Deployment", "Status", "Details"]}>
          <tr className="bg-app">
            <Td className="font-semibold">
              <div className="flex items-center gap-2 text-sm">
                <span>storybook</span>
                <span className={clsx(LINK_CLASS, "max-sm:hidden")}>Visit</span>
              </div>
            </Td>
            <Td>
              <Chip variant="success" className="text-xs">
                Ready
              </Chip>
            </Td>
            <Td className="hidden text-low sm:table-cell">
              Preview · feat/checkout
            </Td>
          </tr>
        </Table>

        <Table columns={["Build", "Status", "Details"]}>
          <tr className="bg-app">
            <Td className="font-semibold">
              <div className="flex items-center gap-2 text-sm">
                <span>storybook</span>
                <span className={clsx(LINK_CLASS, "max-sm:hidden")}>
                  Inspect
                </span>
              </div>
            </Td>
            <Td>
              <Chip variant="success" className="text-xs">
                Changes approved
              </Chip>
            </Td>
            <Td className="hidden text-low sm:table-cell">3 changed</Td>
          </tr>
        </Table>
      </div>
    </Card>
  );
}

function Table(props: {
  columns: [string, string, string];
  children: React.ReactNode;
}) {
  const { columns, children } = props;
  return (
    <div className="overflow-hidden rounded border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-(--neutral-2)">
          <tr>
            <Th>{columns[0]}</Th>
            <Th>{columns[1]}</Th>
            <Th className="hidden sm:table-cell">{columns[2]}</Th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
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
