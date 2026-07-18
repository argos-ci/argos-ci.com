"use client";

import { clsx } from "clsx";
import { ArrowRightIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/Button";
import {
  APP_URL,
  dismissNudge,
  getAlwaysOpen,
  isNudgeDismissed,
  openApp,
  setAlwaysOpen,
} from "@/components/session";

/**
 * Replaces the Login/Sign up actions for logged-in users. Renders an "Open Argos"
 * button and, on desktop, a one-time dismissible nudge offering to always skip
 * the marketing homepage. Choosing "Always open Argos" opts into the "/" → app
 * redirect handled by {@link RedirectIfCookie}.
 */
export function OpenArgosButton() {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [showNudge, setShowNudge] = React.useState(false);

  React.useEffect(() => {
    // Desktop only: the mobile menu renders a second instance inside the burger
    // dialog, and the desktop instance is `display:none` on mobile — skip both.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const isVisible = anchorRef.current?.offsetParent != null;
    if (!isDesktop || !isVisible) {
      return;
    }
    if (getAlwaysOpen() || isNudgeDismissed()) {
      return;
    }
    setShowNudge(true);
  }, []);

  const handleDismiss = React.useCallback(() => {
    setShowNudge(false);
    dismissNudge();
  }, []);

  const handleAlwaysOpen = React.useCallback(() => {
    setAlwaysOpen();
    openApp();
  }, []);

  // Dismiss on outside click / Escape while the nudge is open.
  React.useEffect(() => {
    if (!showNudge) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!anchorRef.current?.contains(event.target as Node)) {
        handleDismiss();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showNudge, handleDismiss]);

  return (
    <div ref={anchorRef} className="relative">
      <Button asChild>
        <a href={APP_URL}>Open Argos</a>
      </Button>
      {showNudge ? (
        <div
          role="dialog"
          aria-label="Always open Argos"
          className={clsx(
            "bg-app absolute top-full right-0 z-50 mt-2 w-72 rounded-lg p-4 text-left shadow-lg outline outline-(--neutral-6)",
            "animate-in fade-in-0 slide-in-from-top-1 duration-200",
          )}
        >
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="text-low hover:text-default absolute top-3 right-3 transition"
          >
            <XIcon className="size-4" />
          </button>
          <p className="pr-6 text-sm font-medium">Skip this page next time?</p>
          <button
            type="button"
            onClick={handleAlwaysOpen}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-(--primary-11) transition hover:underline"
          >
            Always open Argos
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
