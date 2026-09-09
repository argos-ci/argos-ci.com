import clsx from "clsx";
import { CheckCircle2Icon, Clock3Icon, XCircleIcon } from "lucide-react";

import { github } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

type CheckStatus = "success" | "fail" | "pending";
type Provider = "argos" | "github";

/**
 * The status contexts Argos really posts, as GitHub lists them: the summary
 * check that combines the two named builds (the one to require in branch
 * protection), then each build, then the team's own CI. Only the summary is
 * marked required: that is the point of it, one requirement that survives
 * adding or renaming builds.
 */
const CHECKS: Array<{
  key: string;
  title: string;
  description: string;
  status: CheckStatus;
  provider: Provider;
  required?: boolean;
  /** The row that only gives context, dropped where height is short. */
  secondary?: boolean;
}> = [
  {
    key: "summary",
    title: "argos/summary",
    description: "1 of 2 builds is waiting for your decision",
    status: "fail",
    provider: "argos",
    required: true,
  },
  {
    key: "playwright",
    title: "argos/playwright",
    description: "4 changed, 3 ignored — waiting for your decision",
    status: "fail",
    provider: "argos",
  },
  {
    key: "storybook",
    title: "argos/storybook",
    description: "Everything's good!",
    status: "success",
    provider: "argos",
  },
  {
    key: "ci",
    title: "Playwright Tests",
    description: "Successful in 5m",
    status: "success",
    provider: "github",
    secondary: true,
  },
];

export function GitHubChecks() {
  return (
    <div className="mx-auto w-full max-w-md space-y-2 px-3 sm:space-y-3">
      {CHECKS.map(({ key, secondary, ...check }, index) => (
        <div
          key={key}
          className={clsx(
            "animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
            { 0: "", 1: "animate-delay-100", 2: "animate-delay-200" }[index] ??
              "animate-delay-300",
            secondary && "max-sm:hidden",
          )}
        >
          <CheckRow {...check} />
        </div>
      ))}
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
        "flex items-center gap-3 rounded-xl border px-3 py-2 shadow-xs",
        {
          success: "border-(--success-7)/50 bg-(--success-2)",
          fail: "border-(--danger-7)/60 bg-(--danger-2)",
          pending: "border-(--amber-6)/40 bg-(--amber-2)",
        }[status],
      )}
    >
      <ProviderMark provider={provider} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-(--neutral-12)">
          <span className="truncate font-mono text-xs">{title}</span>
          {required ? <Chip className="text-xxxs">Required</Chip> : null}
        </div>
        <div className="mt-0.5 truncate text-xs text-low">{description}</div>
      </div>
      <CheckStatusIcon status={status} />
    </div>
  );
}

function ProviderMark(props: { provider: Provider }) {
  const { provider } = props;
  if (provider === "argos") {
    return (
      <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-(--primary-7)/50 bg-(--primary-2)">
        <ArgosEmblem className="size-3 w-auto" aria-hidden />
      </div>
    );
  }
  return (
    <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-(--neutral-6)/70 bg-(--neutral-2)">
      <ThemeImage alt="" src={github.logo} className="size-4" aria-hidden />
    </div>
  );
}

function CheckStatusIcon(props: { status: CheckStatus }) {
  const { status } = props;
  const { icon: Icon, className } = {
    success: { icon: CheckCircle2Icon, className: "text-(--success-10)" },
    pending: { icon: Clock3Icon, className: "text-(--amber-10)" },
    fail: { icon: XCircleIcon, className: "text-(--danger-10)" },
  }[status];
  return <Icon className={clsx("size-4 shrink-0", className)} aria-hidden />;
}
