import clsx from "clsx";
import { ExternalLinkIcon } from "lucide-react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DotIndicator } from "@/components/DotIndicator";
import { SmallTitle } from "@/components/Typography";

/**
 * The four URLs one production deployment answers on, in the order the
 * Deployments tab lists them: custom domain, production domain, branch URL,
 * deployment URL. The first three move as new builds land; the last one never
 * does. Shapes from docs/learn/deployments/urls-and-domains.
 */
const URLS = [
  {
    key: "custom",
    label: "Custom domain",
    url: "storybook.acme.com",
    stability: "Latest production",
    delay: "animate-delay-100",
  },
  {
    key: "production",
    label: "Production domain",
    url: "storybook.argos-ci.live",
    stability: "Latest production",
    delay: "animate-delay-200",
  },
  {
    key: "branch",
    label: "Branch URL",
    url: "storybook-main-acme.argos-ci.live",
    stability: "Latest on main",
    delay: "animate-delay-300",
  },
  {
    key: "deployment",
    label: "Deployment URL",
    url: "storybook-gdhgxamjo-acme.argos-ci.live",
    stability: "Immutable",
    immutable: true,
    delay: "animate-delay-500",
  },
];

export function UrlLadder() {
  return (
    <Card shadow="high" className="w-full max-w-md overflow-hidden">
      <div className="flex items-center gap-2 border-b-[0.5px] px-4 py-2">
        <ArgosEmblem className="size-4 text-(--teal-11)" />
        <SmallTitle>Deployment · main</SmallTitle>
        <Badge className="ml-auto gap-1 border-(--success-7) text-xxs text-(--success-11)">
          <DotIndicator variant="success" />
          Current
        </Badge>
      </div>
      <div className="space-y-1.5 p-3">
        {URLS.map((item) => (
          <div
            key={item.key}
            className={clsx(
              "animate-slide-up-fade rounded-lg border-[0.5px] px-3 py-1.5 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
              item.delay,
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xxs font-medium text-low">
                {item.label}
              </span>
              <span
                className={clsx(
                  "bg-app text-xxxs inline-flex items-center gap-1 rounded-md border-[0.5px] px-1.5 py-0.5 leading-none font-medium",
                  item.immutable
                    ? "border-(--teal-7) text-(--teal-11)"
                    : "text-low",
                )}
              >
                {item.stability}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xxs sm:text-xs">
              <span
                className={clsx(
                  "break-words",
                  item.immutable && "text-(--teal-11)",
                )}
              >
                {item.url}
              </span>
              <ExternalLinkIcon className="size-3 shrink-0 text-low" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
