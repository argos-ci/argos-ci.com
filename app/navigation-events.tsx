"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    sendGTMEvent({
      event: "conversion",
      send_to: "AW-847457408/e6s6CMGhwe8YEIDZjJQD",
    });
  }, [pathname, searchParams]);

  return null;
}
