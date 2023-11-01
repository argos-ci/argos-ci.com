"use client";
import * as React from "react";
import clsx from "clsx";
import { HTMLMotionProps, Variants, motion } from "framer-motion";

const wordAnimation: Variants = {
  hidden: {},
  visible: {},
};

const characterAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.08,
    },
  },
};

export function WordAnimation({
  className,
  children,
  delay = 0,
  ...props
}: {
  className?: string;
  children: string;
  delay?: number;
} & HTMLMotionProps<"span">) {
  return (
    <motion.span
      className={clsx("inline-block", className)}
      variants={wordAnimation}
      transition={{
        delayChildren: delay,
        staggerChildren: 0.05,
      }}
      {...props}
    >
      {children.split("").map((character, index) => {
        return (
          <motion.span
            key={index}
            className="inline-block"
            aria-hidden="true"
            variants={characterAnimation}
          >
            {character}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
