"use client";

import clsx from "clsx";
import { AnimationProps, Variants, motion } from "framer-motion";
import * as React from "react";
import type { CSSProperties } from "react";

import { TypeScriptLogo } from "@/components/TypeScriptLogo";

import { WordAnimation } from "./WordAnimation";

function Line({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={clsx("relative py-1.5", className)} style={style}>
      <div className="h-2 w-full rounded-sm bg-mauve-5"></div>
    </div>
  );
}

const lineVariants: Variants = {
  hidden: {
    height: 0,
  },
  visible: {
    height: "1.25rem",
  },
};

export function CodeEditor({
  className,
  animate,
}: {
  className?: string;
  animate?: AnimationProps["animate"];
}) {
  return (
    <div
      className={clsx(
        "select-none overflow-hidden rounded border bg-app",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b bg-subtle px-4 py-2 text-sm text-low">
        <TypeScriptLogo className="h-3 w-3 text-mauve-9" />
        purchase.spec.ts
      </div>
      <div className="flex">
        <div className="flex shrink-0 select-none flex-col border-r bg-subtle px-1.5 py-1 font-mono text-[0.625rem] leading-5">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="overflow-x-auto px-2 py-1">
          <Line style={{ width: 148 }} />
          <Line className="pl-2" style={{ width: 160 }} />
          <Line className="pl-4" style={{ width: 280 }} />
          <motion.div
            animate={animate}
            initial="hidden"
            variants={lineVariants}
            transition={{
              delayChildren: 0.4,
              staggerChildren: 0.05,
            }}
            className="whitespace-nowrap pl-4 font-mono text-xs leading-5 md:text-sm"
          >
            <WordAnimation delay={0} className="text-pink-11">
              await
            </WordAnimation>{" "}
            <WordAnimation delay={0.25} className="text-amber-11">
              argosScreenshot
            </WordAnimation>
            <WordAnimation delay={1} className="text-yellow-11">
              (
            </WordAnimation>
            <WordAnimation delay={1.05} className="text-blue-11">
              page
            </WordAnimation>
            <WordAnimation delay={1.2} className="text-blue-11">
              ,
            </WordAnimation>{" "}
            <WordAnimation delay={1.3} className="text-jade-11">
              "purchase"
            </WordAnimation>
            <WordAnimation delay={1.8} className="text-yellow-11">
              )
            </WordAnimation>
            <WordAnimation delay={1.85} className="text-low">
              ;
            </WordAnimation>
          </motion.div>
          <Line className="pl-4" style={{ width: 172 }} />
          <Line className="pl-4" style={{ width: 246 }} />
          <Line className="pl-2" style={{ width: 200 }} />
          <Line style={{ width: 240 }} />
          <Line style={{ width: 126 }} />
        </div>
      </div>
    </div>
  );
}
