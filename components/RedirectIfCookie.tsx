"use client";

import { useEffect } from "react";

export function RedirectIfCookie() {
  useEffect(() => {
    if (document.cookie.includes("argos_jwt")) {
      window.location.href = "https://app.argos-ci.com/";
    }
  }, []);
  return null;
}
