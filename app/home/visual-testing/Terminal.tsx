"use client";

import clsx from "clsx";
import { Variants, motion, useAnimation } from "framer-motion";
import * as React from "react";

import { WordAnimation } from "./WordAnimation";

const successAnimation: Variants = {
  hidden: {
    opacity: 0,
    x: "-1em",
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export function Terminal({
  className,
  ref,
}: {
  className?: string;
  ref?: React.Ref<{ animate: () => Promise<void> }>;
}) {
  const text = `argos upload ./screenshots`;
  const windowCtrls = useAnimation();
  const cliCtrls = useAnimation();
  const successCtrls = useAnimation();
  React.useImperativeHandle(ref, () => ({
    animate: async () => {
      await windowCtrls.start({ opacity: 1, y: 0 });
      await cliCtrls.start("visible");
      await cliCtrls.start("enter");
      await successCtrls.start("visible");
    },
  }));
  return (
    <motion.div
      animate={windowCtrls}
      initial={{ opacity: 0, y: "1rem" }}
      className={clsx("bg-app rounded-sm border select-none", className)}
    >
      <div className="flex gap-2 p-2">
        <div className="h-2 w-2 rounded-full bg-(--mauve-7)" />
        <div className="h-2 w-2 rounded-full bg-(--mauve-7)" />
        <div className="h-2 w-2 rounded-full bg-(--mauve-7)" />
      </div>
      <div className="h-24 px-2 font-mono text-xs leading-relaxed! md:text-sm">
        <div>
          <span className="text-low">$ ~ project</span>{" "}
          {text.split(" ").map((word, index) => {
            return (
              <WordAnimation
                key={index}
                delay={0.25 * index}
                className="mr-1 inline-block"
                initial="hidden"
                animate={cliCtrls}
              >
                {word}
              </WordAnimation>
            );
          })}
        </div>
        <motion.div
          className="text-(--grass-11)"
          initial="hidden"
          variants={successAnimation}
          animate={successCtrls}
          transition={{ delay: 0.2 }}
        >
          ✔ 52 screenshots uploaded
          <br />
          <a
            href="https://app.argos-ci.com/argos-ci/argos-ci.com/builds/20/"
            className="underline"
          >
            → Build #20
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
