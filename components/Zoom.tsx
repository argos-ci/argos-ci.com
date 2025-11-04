"use client";

import mediumZoom from "medium-zoom";
import * as React from "react";

export function Zoom(props: {
  children: React.ReactElement<{ ref?: React.Ref<HTMLImageElement> }>;
}) {
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      mediumZoom(ref.current, {
        margin: 24,
        background: "rgba(0, 0, 0, 0.9)",
      });
    }
  }, []);

  // eslint-disable-next-line react-hooks/refs
  return React.cloneElement(props.children, { ref });
}
