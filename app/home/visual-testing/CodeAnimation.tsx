"use client";

import { useAnimation, useInView } from "motion/react";
import * as React from "react";

import { CodeEditor } from "./CodeEditor";
import { Terminal } from "./Terminal";

export function CodeAnimation() {
  const terminalRef = React.useRef<{
    animate: () => Promise<void>;
  }>(null);
  const editorCtrls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  React.useEffect(() => {
    const animate = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await editorCtrls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 300));
      await terminalRef.current?.animate();
    };
    if (inView) {
      animate();
    }
  }, [inView, editorCtrls]);
  return (
    <div ref={ref} className="px-2 pt-8 pb-2">
      <CodeEditor animate={editorCtrls} />
      <Terminal
        ref={terminalRef}
        className="relative z-10 -mt-8 mr-2 -ml-2 shadow-lg md:mr-6"
      />
    </div>
  );
}
