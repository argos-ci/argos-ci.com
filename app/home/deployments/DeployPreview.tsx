import clsx from "clsx";
import { GlobeIcon, LockIcon } from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";

const ENVS = [
  {
    key: "preview",
    label: "Preview",
    url: "pr-482.storybook.argos.app",
    tag: "feat/checkout",
    tone: "teal" as const,
    icon: <ThemeImage src={storybook.logo} alt="" className="size-5" />,
  },
  {
    key: "production",
    label: "Production",
    url: "storybook.acme.com",
    tag: "main",
    tone: "primary" as const,
    icon: <GlobeIcon className="size-4 text-(--primary-11)" />,
  },
];

export function DeployPreview() {
  return (
    <div className="bg-app animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden rounded-xl border-[0.5px] shadow-md/7">
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <ArgosEmblem className="size-4 text-(--teal-11)" />
        <span className="text-xs font-medium">Argos Deployment</span>
        <Pill className="ml-auto border-(--success-7) text-(--success-11)">
          <DotIndicator variant="success" className="animate-pulse" />
          Ready
        </Pill>
      </div>
      <div className="space-y-3 p-4">
        {ENVS.map((env) => (
          <div
            key={env.key}
            className="flex items-center gap-3 rounded-lg border-[0.5px] p-2.5"
          >
            <span className="bg-app grid size-8 shrink-0 place-items-center rounded-md border-[0.5px]">
              {env.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{env.label}</span>
                <Pill
                  className={
                    {
                      teal: "border-(--teal-7) text-(--teal-11)",
                      primary: "border-(--primary-7) text-(--primary-11)",
                    }[env.tone]
                  }
                >
                  {env.tag}
                </Pill>
              </div>
              <div className="text-low truncate font-mono text-xs">
                {env.url}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t-[0.5px] px-3 py-2">
        <LockIcon className="text-low size-3" />
        <span className="text-low text-xxs">
          Preview private to your team · Production public
        </span>
      </div>
    </div>
  );
}

function Pill(props: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "bg-app text-xxxs inline-flex items-center gap-1 rounded-md border-[0.5px] px-1.5 py-0.5 leading-none font-medium",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}
