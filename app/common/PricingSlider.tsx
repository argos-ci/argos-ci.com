"use client";

import clsx from "clsx";
import * as React from "react";

import { LocalDollar, LocalString } from "@/components/IntlFormat";
import { Slider } from "@/components/Slider";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

const MAX_SCREENSHOTS = 1_000_000;
const STEP = 10_000;

function formatCount(props: { max: number; count: number; short?: boolean }) {
  const { max, count, short } = props;

  if (count >= max && short) {
    return (
      <>
        <span className="hidden md:inline-block">
          more than <LocalString value={max} />
        </span>
        <span className="md:hidden">
          + <LocalString value={max} />
        </span>
      </>
    );
  }

  if (count >= max) {
    return (
      <>
        more than <LocalString value={max} />
      </>
    );
  }

  return <LocalString value={count} />;
}

function computeAdditionalScreenshots(screenshots: {
  neutral: number;
  storybook: number;
  included: number;
}) {
  const storybookOverhead = Math.max(
    Math.min(screenshots.storybook, screenshots.included - screenshots.neutral),
    0,
  );
  return {
    neutral: Math.max(
      0,
      screenshots.neutral + storybookOverhead - screenshots.included,
    ),
    storybook: screenshots.storybook - storybookOverhead,
  };
}

function getPrice(props: {
  screenshotCount: number;
  storybookScreenshotCount: number;
  screenshotPrice: number;
  storybookScreenshotPrice: number;
  flatPrice: number;
  flatScreenshotCount: number;
}) {
  const extraScreenshotsCount = computeAdditionalScreenshots({
    neutral: props.screenshotCount,
    storybook: props.storybookScreenshotCount,
    included: props.flatScreenshotCount,
  });
  return Math.floor(
    extraScreenshotsCount.neutral * props.screenshotPrice +
      extraScreenshotsCount.storybook * props.storybookScreenshotPrice +
      props.flatPrice,
  );
}

function formatPrice(price: number, isMax: boolean) {
  return (
    <>
      {isMax ? "+" : ""}
      <LocalDollar value={price} />
    </>
  );
}

export function PricingSlider() {
  const [screenshots, setScreenshots] = React.useState(0);
  const [storybookScreenshots, setStorybookScreenshots] = React.useState(0);
  const isMaxScreenshots = screenshots >= MAX_SCREENSHOTS;

  return (
    <div className="flex flex-col items-center gap-4">
      <ScreenshotSlider
        label="Screenshots per month"
        value={screenshots}
        onChange={setScreenshots}
      />
      <ScreenshotSlider
        label="Storybook screenshots per month"
        value={storybookScreenshots}
        onChange={setStorybookScreenshots}
      />

      <div className="mt-4 text-lg leading-relaxed md:text-xl">
        For{" "}
        <strong className="font-medium">
          {formatCount({
            max: MAX_SCREENSHOTS,
            count: screenshots,
          })}{" "}
          screenshots
        </strong>{" "}
        and{" "}
        <strong className="font-medium">
          {formatCount({
            max: MAX_SCREENSHOTS,
            count: storybookScreenshots,
          })}{" "}
          Storybook screenshots
        </strong>{" "}
        per month it will cost{" "}
        <strong className="font-medium">
          {formatPrice(
            getPrice({
              flatPrice: ARGOS_PRO_FLAT_PRICE,
              flatScreenshotCount: ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
              screenshotPrice: ARGOS_SCREENSHOT_PRICE,
              screenshotCount: screenshots,
              storybookScreenshotPrice: ARGOS_STORYBOOK_SCREENSHOT_PRICE,
              storybookScreenshotCount: storybookScreenshots,
            }),
            isMaxScreenshots,
          )}
        </strong>
        .
      </div>

      <div
        className={clsx(
          "text-lg transition-opacity duration-150 ease-in-out",
          isMaxScreenshots ? "opacity-100" : "opacity-0",
        )}
      >
        You should{" "}
        <a href="mailto:contact@argos-ci.com" className="underline">
          contact us
        </a>{" "}
        to discuss a custom plan.
      </div>
    </div>
  );
}

function ScreenshotSlider(props: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const { label, value, onChange } = props;
  const formatted = formatCount({
    max: MAX_SCREENSHOTS,
    count: value,
    short: true,
  });
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-medium">{label}</div>
        <div className="text-right font-medium tabular-nums">{formatted}</div>
      </div>

      <Slider
        defaultValue={[value]}
        onValueChange={(value) => onChange(value[0])}
        min={0}
        max={MAX_SCREENSHOTS}
        step={STEP}
      />
    </div>
  );
}

const TURBO_SNAP_RATIO = 1 / 5;

const COMPETITORS = {
  percy: {
    name: "Percy Browserstack",
    screenshotPrice: 0.048,
    storybookScreenshotPrice: 0.048,
    steps: [
      {
        screenshots: 25_000,
        price: 599,
      },
    ],
  },
  chromatic: {
    name: "Chromatic",
    screenshotPrice: 0.008,
    storybookScreenshotPrice: 0.008 * 0.2 + 0.008 * TURBO_SNAP_RATIO * 0.8, // 80% Turbosnap
    steps: [
      {
        screenshots: 35_000,
        price: 179,
      },
      {
        screenshots: 85_000,
        price: 399,
      },
    ],
  },
};

export function ComparePricingSlider(props: {
  competitor: keyof typeof COMPETITORS;
}) {
  const [screenshots, setScreenshots] = React.useState(0);
  const [storybookScreenshots, setStorybookScreenshots] = React.useState(0);
  const isMaxScreenshots = screenshots >= MAX_SCREENSHOTS;

  const argosPrice = getPrice({
    flatPrice: ARGOS_PRO_FLAT_PRICE,
    flatScreenshotCount: ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
    screenshotPrice: ARGOS_SCREENSHOT_PRICE,
    screenshotCount: screenshots,
    storybookScreenshotPrice: ARGOS_STORYBOOK_SCREENSHOT_PRICE,
    storybookScreenshotCount: storybookScreenshots,
  });

  const competitor = COMPETITORS[props.competitor];

  const competitorPrices = competitor.steps.map((step) =>
    getPrice({
      flatPrice: step.price,
      flatScreenshotCount: step.screenshots,
      screenshotPrice: competitor.screenshotPrice,
      screenshotCount: screenshots,
      storybookScreenshotPrice: competitor.storybookScreenshotPrice,
      storybookScreenshotCount: storybookScreenshots,
    }),
  );

  // Pick the lowest price
  const competitorPrice = Math.min(...competitorPrices);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ScreenshotSlider
        label="Screenshots per month"
        value={screenshots}
        onChange={setScreenshots}
      />
      <ScreenshotSlider
        label="Storybook screenshots per month"
        value={storybookScreenshots}
        onChange={setStorybookScreenshots}
      />

      <div className="mt-4 w-full max-w-lg text-center text-lg">
        <div className="flex">
          <div className="flex-1 border-r border-dashed">
            <h4 className="font-medium">{competitor.name}</h4>
            <div>{formatPrice(competitorPrice, isMaxScreenshots)}</div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Argos</h4>
            <div>{formatPrice(argosPrice, isMaxScreenshots)}</div>
          </div>
        </div>
        <div className="mt-4 text-balance">
          Save{" "}
          <strong className="font-semibold">
            {formatPrice(competitorPrice - argosPrice, isMaxScreenshots)}
          </strong>{" "}
          per month with Argos
        </div>
      </div>
    </div>
  );
}
