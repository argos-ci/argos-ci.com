"use client";

import mediumZoom from "medium-zoom";
import * as React from "react";

export function Zoom(props: { children: React.ReactElement }) {
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      mediumZoom(ref.current, {
        margin: 24,
        background: "rgba(0, 0, 0, 0.9)",
      });
    }
  }, []);

  return React.cloneElement(props.children, { ref });
}
