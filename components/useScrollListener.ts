"use client";
import * as React from "react";
import { useLiveRef } from "./useLiveRef";

export const useScrollListener = (listener: (event: Event) => void) => {
  const listenerRef = useLiveRef(listener);
  React.useEffect(() => {
    let ticking = false;
    const listener = (ev: Event) => {
      if (ticking) return;
      requestAnimationFrame(() => {
        listenerRef.current(ev);
        ticking = false;
      });
      ticking = true;
    };
    document.addEventListener("scroll", listener, { passive: true });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [listenerRef]);
};
