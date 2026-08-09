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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync the initial scroll position after hydration, SSR renders unscrolled
      setScrolled(true);
    }
  }, []);
  return scrolled;
}
