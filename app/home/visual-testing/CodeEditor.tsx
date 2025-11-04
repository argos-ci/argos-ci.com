"use client";

import clsx from "clsx";
import { type LegacyAnimationControls, Variants, motion } from "motion/react";
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
      <div className="h-2 w-full rounded-xs bg-(--mauve-5)"></div>
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
  animate?: LegacyAnimationControls;
}) {
  return (
    <div
      className={clsx(
        "bg-app overflow-hidden rounded-sm border select-none",
        className,
      )}
    >
      <div className="bg-subtle text-low flex items-center gap-2 border-b px-4 py-2 text-sm">
        <TypeScriptLogo className="text-subtle h-3 w-3" />
        purchase.spec.ts
      </div>
      <div className="flex">
        <div className="bg-subtle flex shrink-0 flex-col border-r px-1.5 py-1 font-mono text-[0.625rem] leading-5 select-none">
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
            className="pl-4 font-mono text-xs leading-5 whitespace-nowrap md:text-sm"
          >
            <WordAnimation delay={0} className="text-pink-low">
              await
            </WordAnimation>{" "}
            <WordAnimation delay={0.25} className="text-amber-low">
              argosScreenshot
            </WordAnimation>
            <WordAnimation delay={1} className="text-yellow-low">
              (
            </WordAnimation>
            <WordAnimation delay={1.05} className="text-blue-low">
              page
            </WordAnimation>
            <WordAnimation delay={1.2} className="text-blue-low">
              ,
            </WordAnimation>{" "}
            <WordAnimation delay={1.3} className="text-jade-low">
              &quot;purchase&quot;
            </WordAnimation>
            <WordAnimation delay={1.8} className="text-yellow-low">
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
