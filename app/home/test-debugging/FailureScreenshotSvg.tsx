"use client";

import { Variants, motion, useAnimation, useInView } from "framer-motion";
import * as React from "react";

const line: Variants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const screenshotBg: Variants = {
  hidden: {
    fillOpacity: 0,
    pathLength: 0,
  },
  visible: {
    fillOpacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const checkIcon: Variants = {
  hidden: {},
  visible: {},
};

const checkIconPath: Variants = {
  hidden: {
    opacity: 0,
    width: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    width: "100%",
    pathLength: 1,
  },
};

const checkRect: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    originX: 0,
  },
};

const screenshot: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const FailureScreenshotSvg = (props: React.SVGProps<SVGSVGElement>) => {
  const ref = React.useRef(null);
  const ctrls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  React.useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
  }, [inView, ctrls]);
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 324"
      {...props}
    >
      <g clipPath="url(#failure-screenshot-a)">
        <motion.g
          variants={checkIcon}
          initial="hidden"
          animate={ctrls}
          transition={{
            staggerChildren: 0.8,
          }}
        >
          <motion.g
            variants={checkIcon}
            transition={{
              staggerChildren: 0.1,
            }}
          >
            <motion.rect
              variants={checkRect}
              width={86}
              height={8}
              x={61}
              y={95}
              rx={2}
              style={{
                transform: "scaleX(0)",
              }}
              className="fill-(--mauve-6)"
            />
            <motion.path
              variants={checkIconPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M41 109c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
              className="stroke-(--grass-10)"
            />
            <motion.path
              variants={checkIconPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m38 99 2 2 4-4"
              className="stroke-(--grass-10)"
            />
          </motion.g>
          <motion.g
            variants={checkIcon}
            transition={{
              staggerChildren: 0.1,
            }}
          >
            <motion.rect
              variants={checkRect}
              width={101}
              height={8}
              x={61}
              y={127}
              rx={2}
              style={{
                transform: "scaleX(0)",
              }}
              className="fill-(--mauve-6)"
            />
            <motion.path
              variants={checkIconPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M41 141c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
              className="stroke-(--grass-10)"
            />
            <motion.path
              variants={checkIconPath}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m38 131 2 2 4-4"
              className="stroke-(--grass-10)"
            />
          </motion.g>
          <motion.g
            variants={checkIcon}
            transition={{
              staggerChildren: 0.1,
            }}
          >
            <motion.rect
              variants={checkRect}
              width={76}
              height={8}
              x={61}
              y={159}
              rx={2}
              style={{
                transform: "scaleX(0)",
              }}
              className="fill-(--mauve-6)"
            />
            <motion.path
              variants={checkIconPath}
              className="stroke-(--red-10)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M41 173c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM44 160l-6 6M38 160l6 6"
            />
          </motion.g>
          <motion.g
            variants={checkIcon}
            transition={{
              staggerChildren: 0.4,
            }}
          >
            <motion.path
              variants={line}
              className="stroke-(--red-10)"
              strokeDasharray="2 2"
              d="M41 173.321s1.765 32.763 7.619 50.781c20.493 63.08 87.181 67.151 111.316 7.652 11.851-29.217 7.694-68.327 28.54-82.084 12.512-8.257 34.525 0 34.525 0"
            />
            <motion.g variants={checkIcon}>
              <motion.path
                variants={screenshotBg}
                className="fill-(--mauve-4)"
                d="M490.64 264.411H240.065a5.967 5.967 0 0 1-5.967-5.966V79.462a5.967 5.967 0 0 1 5.967-5.967h250.576a5.966 5.966 0 0 1 5.966 5.966v178.984a5.967 5.967 0 0 1-5.967 5.966Z"
              />
              <motion.path
                variants={screenshotBg}
                className="fill-(--mauve-1) stroke-(--mauve-6)"
                d="M479.44 251.11H228.865a5.467 5.467 0 0 1-5.467-5.466V66.661a5.467 5.467 0 0 1 5.467-5.466h250.576a5.467 5.467 0 0 1 5.466 5.466v178.983a5.467 5.467 0 0 1-5.467 5.466Z"
              />
            </motion.g>
            <motion.g variants={screenshot}>
              <g clipPath="url(#failure-screenshot-b)">
                <rect
                  width={211}
                  height={177}
                  x={240}
                  y={70}
                  className="fill-(--mauve-1)"
                  rx={2}
                />
                <g clipPath="url(#failure-screenshot-c)">
                  <path
                    fill="#EE9D2B"
                    d="M282.412 110.081c-2.722 0-9.693 5.814-9.693 13.327 0 12.119 4.772 11.944 9.693 11.944 4.921 0 9.693.229 9.693-11.944 0-7.513-6.453-13.327-9.693-13.327Z"
                  />
                  <path
                    fill="#EE9D2B"
                    d="M306.7 151.747c-.654-3.958-2.549-7.577-7.118-16.598-1.287-2.541-9.531-3.985-9.531-3.985s-6.711 3.779-7.535 3.779c-.974 0-8.375-3.779-8.375-3.779s-7.435 1.43-8.691 3.985c-4.148 8.432-6.465 12.64-7.118 16.598-.654 3.959.518 23.701.518 23.701s1.144.038 2.439-.228c1.294-.267 1.825-.99 1.825-.99s.351-18.626.911-20.96c.56-2.335 4.675-8.342 4.675-8.342l1.962 15.447-2.495 16.9c0 2.056 2.623 2.565 5.858 2.565h16.98c3.236 0 5.859-.509 5.859-2.565l-2.495-16.9 1.962-15.447s4.115 6.007 4.675 8.342c.56 2.334.911 20.96.911 20.96s.419.533 1.713.99c1.295.456 2.551.228 2.551.228s1.173-19.742.519-23.701Z"
                  />
                  <path
                    fill="#894500"
                    d="M268.737 142.104c-.038-1.18-.507-3.958-.507-3.958s-.152 4.415.435 6.782c0 0 .11-1.644.072-2.824ZM296.777 138.146s-.47 2.778-.508 3.958c-.037 1.18.073 2.824.073 2.824.587-2.367.435-6.782.435-6.782Z"
                  />
                  <path
                    fill="#F9F8F9"
                    d="M286.259 138.735c0-1.398.487-4.776.487-4.776h-.487s-.486 3.378-.486 4.776c0 1.398 1.054 6.872.973 9.085-.081 2.213-.487 4.542-.487 4.542h.487s.406-2.329.487-4.542c.081-2.213-.974-7.687-.974-9.085Z"
                  />
                  <path
                    fill="#894500"
                    d="M286.462 134.527a.527.527 0 1 0 0-1.054.527.527 0 0 0 0 1.054Z"
                  />
                  <path
                    fill="#F9F8F9"
                    d="M279.075 149.146c.082-2.212.392-8.168.392-9.566 0-1.398-.608-5.621-.608-5.621h-.486s.608 4.223.608 5.621c0 1.398-.311 7.354-.392 9.566-.081 2.213.378 4.703.378 4.703h.487s-.46-2.49-.379-4.703Z"
                  />
                  <path
                    fill="#894500"
                    d="M278.575 134.527a.527.527 0 1 0 0-1.054.527.527 0 0 0 0 1.054ZM282.449 113.475c-4.027 0-7.292 3.452-7.292 9.862 0 6.409 7.292 11.606 7.292 11.606s7.293-5.197 7.293-11.606c0-6.41-3.264-9.862-7.293-9.862Z"
                  />
                  <path
                    fill="#894500"
                    d="m279.611 132.379 2.585 8.696h.494l2.584-8.696h-5.663Z"
                  />
                  <path
                    fill="#894500"
                    d="M282.689 141.074h-.493v38.771h.493v-38.771Z"
                  />
                  <path
                    fill="#F9F8F9"
                    d="M282.365 141.445v38.4h.169v-38.398l-.169-.002Z"
                  />
                  <path
                    fill="#F9F8F9"
                    d="M282.453 140.822c-.232 0-.419.525-.419.93 0 .406.187.538.419.538.231 0 .418-.132.418-.538 0-.405-.187-.93-.418-.93Z"
                  />
                  <path
                    fill="#DCDBDD"
                    d="M282.122 141.75c0 .321.148.426.33.426.183 0 .332-.105.332-.426h-.662Z"
                  />
                </g>
                <rect
                  width={50}
                  height={6}
                  x={352}
                  y={108}
                  className="fill-(--gray-11)"
                  rx={2}
                />
                <circle cx={360} cy={128} r={8} className="fill-(--mauve-12)" />
                <circle cx={380} cy={128} r={8} fill="#EE9D2B" />
                <rect
                  width={50}
                  height={6}
                  x={352}
                  y={152}
                  className="fill-(--gray-11)"
                  rx={2}
                />
                <circle
                  cx={360}
                  cy={172}
                  r={7.5}
                  className="stroke-(--gray-8)"
                />
                <circle
                  cx={380}
                  cy={172}
                  r={7.5}
                  className="stroke-(--gray-8)"
                />
                <circle
                  cx={360}
                  cy={192}
                  r={7.5}
                  className="stroke-(--gray-8)"
                />
                <circle
                  cx={380}
                  cy={192}
                  r={7.5}
                  className="stroke-(--gray-8)"
                />
                <rect
                  width={80}
                  height={16}
                  x={352}
                  y={216}
                  rx={2}
                  className="fill-(--mauve-12)"
                />
                <rect
                  width={31}
                  height={4}
                  x={378}
                  y={222}
                  className="fill-(--mauve-1)"
                  rx={2}
                />
                <rect
                  width={50}
                  height={6}
                  x={245}
                  y={75}
                  className="fill-(--gray-11)"
                  rx={2}
                />
                <rect
                  width={34}
                  height={4}
                  x={245}
                  y={84}
                  className="fill-(--gray-11)"
                  rx={2}
                />
              </g>
            </motion.g>
          </motion.g>
        </motion.g>
      </g>
      <defs>
        <clipPath id="failure-screenshot-a">
          <path fill="#fff" d="M0 0h512v324H0z" />
        </clipPath>
        <clipPath id="failure-screenshot-b">
          <rect
            width={233.791}
            height={219.343}
            x={240.463}
            y={70.045}
            fill="#fff"
            rx={2}
          />
        </clipPath>
        <clipPath id="failure-screenshot-c">
          <path fill="#fff" d="M258 110h49v70h-49z" />
        </clipPath>
      </defs>
    </svg>
  );
};
