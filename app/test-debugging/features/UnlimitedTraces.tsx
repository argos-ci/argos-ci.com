import { InfinityIcon, BugPlayIcon } from "lucide-react";

import { Chip } from "@/components/Chip";

export function UnlimitedTracesIllustration() {
  return (
    <div className="bg-app/80 relative flex h-36 w-36 items-center justify-center rounded-2xl border border-(--primary-4) shadow-lg/5">
      <div className="absolute -inset-4 rounded-3xl border border-(--primary-3)/60" />
      <BugPlayIcon className="size-12 text-(--primary-10)" strokeWidth={1.5} />
      <Chip
        icon={InfinityIcon}
        variant="primary"
        className="absolute -right-8 bottom-1"
      >
        Unlimited
      </Chip>
    </div>
  );
}
