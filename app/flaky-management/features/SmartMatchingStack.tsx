import clsx from "clsx";
import { BellOffIcon, EyeOffIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

const builds = [
  {
    screenshot: "cart-page.png",
    build: "#1842 · main",
    status: "Ignored",
    variant: "warning" as const,
    icon: EyeOffIcon,
  },
  {
    screenshot: "cart-page.png",
    build: "#1843 · main",
    status: "Silenced",
    variant: "primary" as const,
    icon: BellOffIcon,
  },
];

export function SmartMatchingStackIllustration() {
  return (
    <div className="relative mx-auto w-full">
      {builds.map((build, index) => (
        <BuildCard key={build.build} elevation={index} {...build} />
      ))}
    </div>
  );
}

function BuildCard(props: {
  screenshot: string;
  build: string;
  status: string;
  variant: "warning" | "primary";
  icon: typeof EyeOffIcon;
  elevation: number;
}) {
  const { screenshot, build, status, variant, icon: Icon, elevation } = props;
  return (
    <Card
      shadow="high"
      className={clsx(
        "relative flex flex-col gap-2 border px-3 py-3",
        {
          warning: "border-(--amber-6) bg-(--amber-2)",
          primary: "border-(--primary-6) bg-(--primary-2)",
        }[variant],
        elevation === 0 && "scale-95",
        elevation === 1 && "translate-y-2",
      )}
    >
      <div className="text-xxs flex items-center justify-between gap-2 font-semibold text-(--neutral-12)">
        <span className="truncate">{screenshot}</span>
        <Chip
          icon={Icon}
          variant={variant === "warning" ? "warning" : "primary"}
          className="text-[0.65rem] leading-tight"
        >
          {status}
          {variant === "primary" && (
            <span className="text-(--neutral-11)"> · auto</span>
          )}
        </Chip>
      </div>

      <MiniDiffStack />

      <div className="text-xxs font-medium text-(--neutral-11)">
        Build {build}
      </div>
    </Card>
  );
}

function MiniDiffStack() {
  return (
    <div className="bg-app space-y-1 rounded-lg border p-2">
      <DiffRow emphasis="high" />
      <DiffRow emphasis="med" />
    </div>
  );
}

function DiffRow(props: { emphasis: "high" | "med" | "low" }) {
  const diffTone = {
    high: "bg-(--primary-9)/16 border-(--primary-9)/30",
    med: "bg-(--primary-9)/12 border-(--primary-9)/24",
    low: "bg-(--primary-9)/10 border-(--primary-9)/20",
  }[props.emphasis];

  return (
    <div className="flex items-center gap-2 rounded border-[0.5px] px-2 py-1.5">
      <div className="h-2 w-8 shrink-0 rounded border-[0.5px] bg-(--neutral-4)/60" />
      <div className="h-2 w-[62%] rounded bg-(--neutral-4)" />
      <div className={clsx("h-2 w-12 shrink-0 rounded border", diffTone)} />
    </div>
  );
}
