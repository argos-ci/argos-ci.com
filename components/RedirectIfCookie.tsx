"use client";

import { useEffect } from "react";

/**
 * Session flag set when the user explicitly opens `/homepage`. It opts the user
 * out of the "logged in → app" redirect for the rest of the browser session, so
 * logged-in users (and the team) can still browse the marketing site.
 */
const STAY_KEY = "argos-stay-on-marketing";

/**
 * Redirect logged-in users from the marketing homepage to the Argos app.
 *
 * Login is detected with the `argos_logged_in` hint cookie, a zero-privilege,
 * non-HttpOnly cookie Argos sets on the shared `.argos-ci.com` domain alongside
 * the real (HttpOnly) session cookie. Visiting `/homepage` opts out.
 */
export function RedirectIfCookie() {
  useEffect(() => {
    const { pathname } = window.location;

    // Explicitly opening /homepage means "let me see the marketing site".
    if (pathname === "/homepage") {
      try {
        window.sessionStorage.setItem(STAY_KEY, "1");
      } catch {
        // Ignore storage errors (private mode, disabled storage).
      }
      return;
    }

    if (pathname !== "/") {
      return;
    }

    let stay = false;
    try {
      stay = window.sessionStorage.getItem(STAY_KEY) === "1";
    } catch {
      // Ignore storage errors.
    }
    if (stay) {
      return;
    }

    if (document.cookie.includes("argos_logged_in=1")) {
      window.location.href = "https://app.argos-ci.com/";
    }
  }, []);
  return null;
}
