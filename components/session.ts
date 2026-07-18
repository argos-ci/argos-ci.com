"use client";

import * as React from "react";

export const APP_URL = "https://app.argos-ci.com/";

/**
 * Non-HttpOnly "hint" cookie the Argos app sets on the shared `.argos-ci.com`
 * domain alongside the real (HttpOnly) session cookie. The marketing site only
 * reads it to know whether someone is logged in.
 */
const LOGGED_IN_COOKIE = "argos_logged_in=1";

/**
 * Persisted opt-in ("Always open Argos"). When set, logged-in users are
 * redirected from "/" straight to the app. Set from the navbar popover.
 */
const ALWAYS_OPEN_KEY = "argos-always-open-app";

/** Persisted flag so the "Open Argos" nudge is only shown once. */
const NUDGE_DISMISSED_KEY = "argos-open-argos-nudge-dismissed";

export function isLoggedIn(): boolean {
  return (
    typeof document !== "undefined" &&
    document.cookie.includes(LOGGED_IN_COOKIE)
  );
}

function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    // Ignore storage errors (private mode, disabled storage).
    return false;
  }
}

function writeFlag(key: string): void {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    // Ignore storage errors (private mode, disabled storage).
  }
}

export const getAlwaysOpen = () => readFlag(ALWAYS_OPEN_KEY);
export const setAlwaysOpen = () => writeFlag(ALWAYS_OPEN_KEY);

export const isNudgeDismissed = () => readFlag(NUDGE_DISMISSED_KEY);
export const dismissNudge = () => writeFlag(NUDGE_DISMISSED_KEY);

export function openApp(): void {
  window.location.href = APP_URL;
}

/**
 * Returns `false` during SSR and the first client render, then `true` after
 * mount when the user is logged in. Keeping the first client render in sync with
 * the (logged-out) server markup avoids hydration mismatches.
 */
export function useIsLoggedIn(): boolean {
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);
  return loggedIn;
}
