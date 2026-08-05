"use client";

import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";

import { useInViewport } from "@/components/useInViewport";

import { BORDER_BG_COLORS, type FeatureColor, TEXT_COLORS } from "./colors";

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
  const indexRef = useRef(0);
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
  useEffect(() => {
    indexRef.current = state.index;
  }, [state.index]);
  // Where the strip rests once snapped to a caption. Scroll padding holds the
  // caption clear of the section's own border, so the rail that fills reads as
  // the caption's own edge rather than as the frame changing colour.
  const restingScroll = useCallback((index: number) => {
    const tablist = tablistRef.current;
    const tab = tabRefs.current[index];
    if (!tablist || !tab) {
      return null;
    }
    const inset = parseFloat(getComputedStyle(tablist).scrollPaddingLeft) || 0;
    return tab.offsetLeft - inset;
  }, []);
  // Keep the active caption in view while the carousel advances on its own.
  // Setting `scrollLeft` rather than calling `scrollIntoView`, which would drag
  // the page vertically too. A no-op on desktop, where nothing overflows.
  useEffect(() => {
    const tablist = tablistRef.current;
    const left = restingScroll(state.index);
    if (
      !tablist ||
      left === null ||
      tablist.scrollWidth <= tablist.clientWidth
    ) {
      return;
    }
    tablist.scrollTo({ left, behavior: "smooth" });
  }, [state.index, restingScroll]);
  // Scrolling the strip by hand brings its illustration along, and leaves the
  // autoplay running from wherever it lands — the rail keeps filling and the
  // chapter keeps turning. Tapping a caption is the gesture that stops it;
  // swiping is how you look around, and killing the rotation for the rest of
  // the visit is too much to read into it. Landing on a caption restarts the
  // timer, so it holds there a full turn first. The carousel's own scroll
  // settles on the caption that is already current, so it never trips this.
  useEffect(() => {
    const tablist = tablistRef.current;
    if (!tablist) {
      return;
    }
    let settle = 0;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        const middle = tablist.scrollLeft + tablist.clientWidth / 2;
        let nearest = -1;
        let shortest = Infinity;
        tabRefs.current.forEach((tab, index) => {
          if (!tab) {
            return;
          }
          const distance = Math.abs(
            tab.offsetLeft + tab.offsetWidth / 2 - middle,
          );
          if (distance < shortest) {
            shortest = distance;
            nearest = index;
          }
        });
        if (nearest === -1 || nearest === indexRef.current) {
          return;
        }
        move(nearest);
      }, 120);
    };
    tablist.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      tablist.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
    };
  }, [move]);

  const current = features[state.index];
  if (!current) {
    throw new Error(`Invalid index ${state.index}`);
  }
  return (
    <div ref={ref} className="bg-subtle border-y">
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
          "relative flex snap-x snap-mandatory scroll-pl-4 items-start justify-start overflow-x-auto py-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:snap-none md:scroll-pl-0 md:justify-center md:gap-10 md:overflow-x-visible md:py-8",
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
              className="relative flex w-[78%] shrink-0 cursor-pointer snap-start flex-col px-6 text-sm transition-opacity duration-300 first:ml-4 last:mr-[22%] data-[current=false]:opacity-50 data-[current=false]:hover:opacity-90 md:w-auto md:max-w-56 md:shrink md:pr-0 md:first:ml-0 md:last:mr-0"
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
