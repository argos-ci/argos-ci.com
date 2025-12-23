import clsx from "clsx";
import {
  CheckCircle2Icon,
  Clock3Icon,
  MoreHorizontalIcon,
  XCircleIcon,
} from "lucide-react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { GitHubLogo } from "@/components/GitHubLogo";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

type CheckStatus = "success" | "fail" | "pending" | "muted";
type Provider = "argos" | "github" | "other";

const CHECKS: Array<{
  key: string;
  title: string;
  description: string;
  status: CheckStatus;
  provider: Provider;
  required?: boolean;
}> = [
  {
    key: "argos/playwright",
    title: "argos/playwright",
    description: "15 changed, 2 added — waiting for your decision",
    status: "fail",
    provider: "argos",
    required: true,
  },
  {
    key: "argos/storybook",
    title: "argos/storybook",
    description: "348 snapshots — Everything's good!",
    status: "success",
    provider: "argos",
    required: true,
  },
  {
    key: "browser-tests",
    title: "Playwright Tests",
    description: "Successful in 5m",
    status: "success",
    provider: "github",
    required: true,
  },
  {
    key: "storybook-tests",
    title: "Storybook Tests",
    description: "Successful in 2m",
    status: "success",
    provider: "github",
    required: true,
  },
];

export function GitHubChecks() {
  return (
    <div className="bg-app relative flex flex-col gap-3 rounded-2xl border p-4 shadow-xs md:p-5">
      <div className="flex items-center gap-2 pl-1 text-sm font-semibold">
        <GitHubIcon className="size-4" />
        GitHub checks
      </div>

      <div className="space-y-2">
        {CHECKS.map(({ key, ...check }) => (
          <CheckRow key={key} {...check} />
        ))}
      </div>
    </div>
  );
}

function CheckRow(props: {
  title: string;
  description: string;
  status: CheckStatus;
  provider: Provider;
  required?: boolean;
}) {
  const { title, description, status, provider, required } = props;

  return (
    <div
      className={clsx(
        "flex items-center gap-3 rounded-xl border px-3 py-2 transition",
        {
          success: "border-(--success-7)/50 bg-(--success-2)",
          fail: "border-(--danger-7)/60 bg-(--danger-2)",
          pending: "border-(--amber-6)/40 bg-(--amber-2)",
          muted: "border-(--neutral-6)/40 bg-(--neutral-2)",
        }[status],
      )}
    >
      <ProviderMark provider={provider} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-(--neutral-12)">
          <span className="truncate">{title}</span>
          {required ? (
            <span className="bg-app text-low inline-flex items-center rounded-full border px-2 text-[0.6rem]">
              Required
            </span>
          ) : null}
        </div>
        <div className="text-low mt-0.5 text-xs">{description}</div>
      </div>
      <CheckStatusIcon status={status} />
    </div>
  );
}

function ProviderMark(props: { provider: Provider }) {
  const { provider } = props;
  if (provider === "argos") {
    return (
      <div className="grid size-9 place-items-center rounded-lg border border-(--primary-7)/50 bg-(--primary-2) shadow-[0_10px_30px_-18px_rgba(80,62,255,0.85)]">
        <ArgosEmblem className="size-3 w-auto" aria-hidden />
      </div>
    );
  }
  if (provider === "github") {
    return (
      <div className="grid size-9 place-items-center rounded-lg border border-(--neutral-6)/70 bg-(--neutral-2)">
        <GitHubLogo className="size-4" aria-hidden />
      </div>
    );
  }
  return (
    <div className="grid size-9 place-items-center rounded-lg border border-dashed border-(--neutral-7)/50 bg-(--neutral-2)">
      <Clock3Icon className="size-4 text-(--neutral-10)" aria-hidden />
    </div>
  );
}

function CheckStatusIcon(props: { status: CheckStatus }) {
  const { status } = props;
  if (status === "success") {
    return (
      <div className="text-(--success-10)">
        <CheckCircle2Icon className="size-4" aria-hidden />
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="text-(--amber-10)">
        <Clock3Icon className="size-4" aria-hidden />
      </div>
    );
  }
  if (status === "fail") {
    return (
      <div className="text-(--danger-10)">
        <XCircleIcon className="size-4" aria-hidden />
      </div>
    );
  }
  return (
    <div className="text-(--neutral-10)">
      <CheckCircle2Icon className="size-4" aria-hidden />
    </div>
  );
}
