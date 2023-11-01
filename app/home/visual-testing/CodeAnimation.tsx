"use client";
import * as React from "react";
import { CodeEditor } from "./CodeEditor";
import { Terminal } from "./Terminal";
import { useAnimation, useInView } from "framer-motion";

export function CodeAnimation() {
  const ref = React.useRef(null);
  const terminalRef = React.useRef(null);
  const editorCtrls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  React.useEffect(() => {
    const animate = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await editorCtrls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 300));
      await terminalRef.current.animate();
    };
    if (inView) {
      animate();
    }
  }, [inView, editorCtrls]);
  return (
    <div ref={ref} className="pt-8 pb-2 px-2">
      <CodeEditor animate={editorCtrls} />
      <Terminal
        ref={terminalRef}
        className="-mt-8 -ml-2 z-10 mr-2 md:mr-6 relative shadow-lg"
      />
    </div>
  );
}
