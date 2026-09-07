import clsx from "clsx";
import { CopyIcon, GlobeIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * A custom domain in Settings → Deployments → Domains: the domain, the one
 * CNAME to create, and the three states it goes through. Record value and
 * status names from docs/learn/deployments/urls-and-domains#custom-domain.
 */
const STATUSES = ["DNS not configured", "Issuing certificate", "Active"];

export function CustomDomainCard() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-4 py-2.5">
        <GlobeIcon className="size-4 text-(--teal-11)" />
        <SmallTitle>Domains</SmallTitle>
        <Badge className="ml-auto gap-1 border-(--success-7) text-xxs text-(--success-11)">
          <DotIndicator variant="success" className="animate-pulse" />
          Active
        </Badge>
      </div>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3 rounded-lg border-[0.5px] px-3 py-2">
          <div className="min-w-0">
            <div className="text-xxs text-low uppercase">Custom domain</div>
            <div className="truncate font-mono text-sm">storybook.acme.com</div>
          </div>
          <Badge>Production</Badge>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 rounded-lg border-[0.5px] px-3 py-2 text-xxs sm:grid-cols-[auto_1fr_1fr] sm:gap-y-0">
          <div>
            <div className="text-low uppercase">Type</div>
            <div className="mt-0.5 font-mono">CNAME</div>
          </div>
          <div className="min-w-0">
            <div className="text-low uppercase">Name</div>
            <div className="mt-0.5 truncate font-mono">storybook.acme.com</div>
          </div>
          <div className="min-w-0 max-sm:col-span-2">
            <div className="text-low uppercase">Value</div>
            <div className="mt-0.5 flex items-center gap-1 font-mono">
              <span className="truncate">cname.argos-ci.live</span>
              <CopyIcon className="size-3 shrink-0 text-low" />
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2 px-1 pt-1">
          <div
            aria-hidden
            className="absolute top-3 right-[16.67%] left-[16.67%] h-px bg-(--teal-7)"
          />
          {STATUSES.map((status, index) => {
            const isCurrent = index === STATUSES.length - 1;
            return (
              <div
                key={status}
                className="relative flex flex-col items-center gap-1.5 text-center"
              >
                <span
                  className={clsx(
                    "grid size-4 place-items-center rounded-full border-[0.5px]",
                    isCurrent
                      ? "border-(--teal-9) bg-(--teal-9)"
                      : "border-(--teal-7) bg-app",
                  )}
                >
                  <span
                    className={clsx(
                      "size-1.5 rounded-full",
                      isCurrent ? "bg-white" : "bg-(--teal-9)",
                    )}
                  />
                </span>
                <span
                  className={clsx(
                    "text-xxxs leading-tight",
                    isCurrent ? "font-medium text-(--teal-11)" : "text-low",
                  )}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
