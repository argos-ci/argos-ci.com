import clsx from "clsx";
import { LinkIcon, MessageSquareIcon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";

const VERSIONS = [
  { number: "v3", when: "just now", size: "25 KB", current: true },
  { number: "v2", when: "2h ago", size: "24 KB", commented: true },
  { number: "v1", when: "yesterday", size: "26 KB" },
];

/**
 * Identity over bytes: the URL pinned in the header never changes, the
 * versions stack up under it. v2 keeps its comment marker — the review that
 * happened there survives the re-upload — and the footer shows the only thing
 * a new version costs: running the same command again.
 */
export function VersionStack() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-sm animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <LinkIcon className="size-3 shrink-0 text-(--plum-11)" />
        <span className="truncate font-mono text-xxs">
          app.argos-ci.com/m/kQ8vN2pX…
        </span>
        <Chip variant="primary" className="ml-auto shrink-0 text-xxs">
          Same link
        </Chip>
      </div>
      <div className="space-y-1.5 p-3">
        {VERSIONS.map((version, index) => (
          <div
            key={version.number}
            className={clsx(
              "flex items-center gap-2 rounded-lg border-[0.5px] px-2.5 py-1.5",
              "animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
              index === 0 && "animate-delay-100",
              index === 1 && "animate-delay-150",
              index === 2 && "animate-delay-200",
              version.current
                ? "border-(--plum-7) bg-(--plum-2)/50"
                : "opacity-80",
            )}
          >
            <span className="font-mono text-xxs font-medium">
              {version.number}
            </span>
            <span className="text-xxs text-low">{version.when}</span>
            {version.commented ? (
              <Badge className="gap-1 text-xxxs">
                <MessageSquareIcon className="size-2.5" />
                review
              </Badge>
            ) : null}
            <span className="ml-auto font-mono text-xxs text-low">
              {version.size}
            </span>
            {version.current ? (
              <Chip variant="primary" className="text-xxxs">
                current
              </Chip>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t-[0.5px] px-3 py-2 font-mono text-xxs text-low">
        <span aria-hidden className="shrink-0 text-(--plum-11)">
          $
        </span>
        <span className="truncate">argos media upload checkout.png</span>
        <Badge className="ml-auto shrink-0 text-xxs">+ v4</Badge>
      </div>
    </Card>
  );
}
