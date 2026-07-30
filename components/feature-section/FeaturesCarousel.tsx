"use client";

import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";

import { useInViewport } from "@/components/useInViewport";

import {
  BORDER_BG_COLORS,
  type FeatureColor,
  SUBTLE_BG_COLORS,
  TEXT_COLORS,
} from "./colors";

export type Feature = {
  key: string;
  icon: React.ReactElement<{ className?: string; strokeWidth: number }>;
  title: string;
  text: string;
  main: React.ReactNode;
  href: string;
};

const DURATION = 6000;

function getInitialState() {
  return {
    index: 0,
    direction: [1, 1, 1],
  };
}

export function FeaturesCarousel(props: {
  features: Feature[];
  color: FeatureColor;
}) {
  const { features, color } = props;
  const total = features.length;
  const { ref, inViewport } = useInViewport();
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isStopped, setIsStopped] = useState(false);
  const [start, setStart] = useState(() => Date.now());
  const [state, setState] = useState(getInitialState);
  const move = useCallback((to: number) => {
    setState((state) => {
      if (state.index === to) {
        return state;
      }
      const direction = to > state.index ? -1 : 1;
      return {
        index: to,
        direction:
          to === 0
            ? [direction, direction, direction]
            : to === 2
              ? [direction, direction, direction]
              : direction === 1
                ? [-1, 1, 1]
                : [-1, -1, 1],
      };
    });
  }, []);
  useEffect(() => {
    if (isStopped || !inViewport) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStart(Date.now());
    const timeout = window.setTimeout(() => {
      const next = state.index === total - 1 ? 0 : state.index + 1;
      move(next);
    }, DURATION);
    return () => window.clearTimeout(timeout);
  }, [isStopped, inViewport, state, total, move]);
  // Keep the active caption in view while the carousel advances on its own.
  // Setting `scrollLeft` rather than calling `scrollIntoView`, which would drag
  // the page vertically too. A no-op on desktop, where nothing overflows.
  useEffect(() => {
    const tablist = tablistRef.current;
    const tab = tabRefs.current[state.index];
    if (!tablist || !tab || tablist.scrollWidth <= tablist.clientWidth) {
      return;
    }
    tablist.scrollTo({ left: tab.offsetLeft, behavior: "smooth" });
  }, [state.index]);

  const current = features[state.index];
  if (!current) {
    throw new Error(`Invalid index ${state.index}`);
  }
  return (
    // The tint covers the panel and its captions together, on purpose: the
    // captions are this carousel's tabs, so they are one thing with the
    // illustration they drive. It reads differently from the points rows
    // elsewhere on the page, which sit on white — those are prose, tied to
    // nothing above them.
    //
    // No rule on top: the header above is the same chapter, and the background
    // shift is enough to tell the illustration apart from it. The bottom rule
    // stays — below it the customer story is a different kind of block.
    <div ref={ref} className={clsx("border-b", SUBTLE_BG_COLORS[color])}>
      <div className="relative h-60 overflow-hidden sm:h-110">
        <div className="relative size-full">
          <div className="size-full mask-intersect max-sm:mask-[linear-gradient(black_70%,transparent),linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
            {features.map((feature, index) => {
              return (
                <FeaturePanel
                  key={feature.key}
                  direction={state.direction[index]}
                  isCurrent={index === state.index}
                  isVisible={inViewport}
                >
                  {feature.main}
                </FeaturePanel>
              );
            })}
          </div>
        </div>
      </div>
      {/* A row at every width. Stacked, the three captions ran to roughly 900px
          on a phone — the longest uniform stretch on the page. As a snapping
          scroller they cost one caption's height and stay switchable, which
          showing only the active one would have taken away. */}
      <div
        ref={tablistRef}
        role="tablist"
        className={clsx(
          "relative -ml-px flex snap-x snap-mandatory items-start justify-start overflow-x-auto py-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:ml-0 md:snap-none md:justify-center md:gap-10 md:overflow-x-visible md:py-8",
        )}
      >
        {features.map((feature, index) => {
          const isCurrent = index === state.index;
          return (
            <div
              key={feature.key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              data-current={isCurrent}
              role="button"
              onClick={() => {
                setIsStopped(true);
                move(index);
              }}
              className="relative flex w-[78%] shrink-0 cursor-pointer snap-start flex-col px-6 text-sm transition-opacity duration-300 data-[current=false]:opacity-50 data-[current=false]:hover:opacity-90 md:w-auto md:max-w-56 md:shrink md:pr-0"
            >
              <div
                className={clsx(
                  "absolute inset-y-0 left-0 w-px",
                  isStopped && isCurrent
                    ? BORDER_BG_COLORS[color]
                    : "bg-(--border-color-base)",
                )}
              />
              {isCurrent && !isStopped && (
                <Progress color={color} start={start} />
              )}
              {cloneElement(feature.icon, {
                className: "size-5",
                strokeWidth: 1.5,
              })}
              <div className="mt-2 mb-3 font-medium">{feature.title}</div>
              <p className="text-low">{feature.text}</p>
              <Link
                href={feature.href}
                className={clsx(
                  "group mt-2 inline-block text-sm font-medium",
                  TEXT_COLORS[color],
                )}
              >
                Learn more
                <ChevronRightIcon className="-mt-px ml-0.5 inline size-4 transition group-hover:translate-x-1 group-focus:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeaturePanel(props: {
  isCurrent: boolean;
  direction: number;
  isVisible: boolean;
  children: React.ReactNode;
}) {
  const { isCurrent, children, direction, isVisible } = props;
  const hasBeenVisibleRef = useRef(isVisible);
  const wasCurrent = useRef(isCurrent);
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      hasBeenVisibleRef.current = isVisible;
    }
  }, [isVisible]);

  useEffect(() => {
    if (isCurrent && isVisible) {
      if (!wasCurrent.current) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMountKey((key) => key + 1);
      }
    }
    wasCurrent.current = isCurrent && hasBeenVisibleRef.current;
  }, [isCurrent, isVisible]);
  return (
    <div
      role="tabpanel"
      aria-hidden={!isCurrent}
      data-current={isCurrent}
      style={
        {
          "--direction": direction,
        } as React.CSSProperties
      }
      className="absolute inset-0 flex items-center justify-center transition-[opacity,translate] duration-300 data-[current=false]:pointer-events-none data-[current=false]:translate-x-[calc(var(--direction)*50%)] data-[current=false]:opacity-0"
    >
      <div
        key={mountKey}
        role="presentation"
        className={clsx(
          "absolute inset-0 flex cursor-default items-center justify-center select-none",
          mountKey >= 1 ? null : "opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Progress(props: { start: number; color: FeatureColor }) {
  const { start, color } = props;
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(() => {
        const now = Date.now();
        const elapsed = now - start;
        setValue(Math.min(100, Math.round((elapsed / DURATION) * 100) + 1));
        loop();
      });
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [start]);
  return (
    <div
      className={clsx(
        "absolute inset-y-0 left-0 w-px origin-top",
        BORDER_BG_COLORS[color],
      )}
      style={{
        transform: `scaleY(${value}%)`,
      }}
    />
  );
}
