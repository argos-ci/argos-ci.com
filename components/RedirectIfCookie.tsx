"use client";

import { useEffect } from "react";

import { getAlwaysOpen, isLoggedIn, openApp } from "@/components/session";

/**
 * Redirect logged-in users who opted into "Always open Argos" straight to the
 * app — but only from the marketing root ("/"). Everywhere else (including
 * "/homepage", which the navbar links to for logged-in users) they can browse
 * the marketing site freely.
 *
 * The opt-in lives in localStorage and is set from the navbar's "Open Argos"
 * popover. Login is detected with the non-HttpOnly `argos_logged_in` hint cookie
 * Argos sets on the shared `.argos-ci.com` domain.
 */
export function RedirectIfCookie() {
  useEffect(() => {
    if (window.location.pathname !== "/") {
      return;
    }
    if (isLoggedIn() && getAlwaysOpen()) {
      openApp();
    }
  }, []);
  return null;
}
