"use client";

import clsx from "clsx";
import { cloneElement, useCallback, useEffect, useState } from "react";

import { useInViewport } from "@/components/useInViewport";

import { BORDER_BG_COLORS, type FeatureColor } from "./colors";

export type Feature = {
  key: string;
  icon: React.ReactElement<{ className?: string; strokeWidth: 1 }>;
  title: string;
  text: string;
  main: React.ReactNode;
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
  const current = features[state.index];
  if (!current) {
    throw new Error(`Invalid index ${state.index}`);
  }
  return (
    <div ref={ref} className="bg-subtle border-y">
      <div className="relative h-60 overflow-hidden sm:h-110">
        <div className="relative size-full">
          {features.map((feature, index) => {
            return (
              <FeaturePanel
                key={feature.key}
                direction={state.direction[index]}
                isCurrent={index === state.index}
              >
                {feature.main}
              </FeaturePanel>
            );
          })}
        </div>
      </div>
      <div
        role="tablist"
        className="relative -ml-px flex flex-col items-start justify-center gap-10 py-8 md:ml-0 md:flex-row"
      >
        {features.map((feature, index) => {
          const isCurrent = index === state.index;
          return (
            <div
              key={feature.key}
              data-current={isCurrent}
              role="button"
              onClick={() => {
                setIsStopped(true);
                move(index);
              }}
              className="relative flex cursor-pointer flex-col px-6 text-sm transition-opacity duration-300 data-[current=false]:opacity-50 data-[current=false]:hover:opacity-90 md:max-w-56 md:pr-0"
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
                strokeWidth: 1,
              })}
              <h3 className="mt-2 mb-3 font-medium">{feature.title}</h3>
              <p className="text-low">{feature.text}</p>
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
  children: React.ReactNode;
}) {
  const { isCurrent, children, direction } = props;
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
      {children}
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
        const ellapsed = now - start;
        setValue(Math.min(100, Math.round((ellapsed / DURATION) * 100) + 1));
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
