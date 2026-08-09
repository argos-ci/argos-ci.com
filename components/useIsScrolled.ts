"use client";

import * as React from "react";

import { useScrollListener } from "./useScrollListener";

/**
 * Check if the page is scrolled.
 */
export function useIsScrolled() {
  const [scrolled, setScrolled] = React.useState(false);
  useScrollListener(() => {
    setScrolled(window.scrollY > 0);
  });
  React.useEffect(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    }
  }, []);
  return scrolled;
}
