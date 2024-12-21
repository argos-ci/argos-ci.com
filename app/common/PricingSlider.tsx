"use client";

import clsx from "clsx";
import * as React from "react";

import { LocalDollar, LocalString } from "@/components/IntlFormat";
import { Slider } from "@/components/Slider";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
} from "@/lib/constants";

const MIN_SCREENSHOTS = 15_000;
const MAX_SCREENSHOTS = 1_000_000;
const STEP = 20_000;

function formatCount(props: { max: number; count: number; short?: boolean }) {
  const { max, count, short } = props;
  if (count === MIN_SCREENSHOTS) {
    return (
      <>
        less than <LocalString value={MIN_SCREENSHOTS} />
      </>
    );
  }

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

function getPrice(props: {
  screenshotCount: number;
  screenshotPrice: number;
  flatPrice: number;
  flatScreenshotCount: number;
}) {
  const extraScreenshotsCount = Math.max(
    props.screenshotCount - props.flatScreenshotCount,
    0,
  );
  return Math.floor(
    extraScreenshotsCount * props.screenshotPrice + props.flatPrice,
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
  const [value, setValue] = React.useState([20000]);
  const [count] = value;
  const isMaxScreenshots = count >= MAX_SCREENSHOTS;

  const formattedScreenshotCountShort = formatCount({
    max: MAX_SCREENSHOTS,
    count,
    short: true,
  });

  const formattedScreenshotCount = formatCount({
    max: MAX_SCREENSHOTS,
    count,
  });

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-medium">Screenshots per month</div>
          <div className="text-right font-medium tabular-nums">
            {formattedScreenshotCountShort}
          </div>
        </div>

        <Slider
          defaultValue={value}
          onValueChange={setValue}
          min={MIN_SCREENSHOTS}
          max={MAX_SCREENSHOTS}
          step={STEP}
        />
      </div>

      <div className="mt-4 text-lg leading-relaxed md:text-xl">
        For{" "}
        <strong className="font-medium">
          {formattedScreenshotCount} screenshots
        </strong>{" "}
        per month it will cost{" "}
        <strong className="font-medium">
          {formatPrice(
            getPrice({
              flatPrice: ARGOS_PRO_FLAT_PRICE,
              flatScreenshotCount: ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
              screenshotPrice: ARGOS_SCREENSHOT_PRICE,
              screenshotCount: count,
            }),
            isMaxScreenshots,
          )}
        </strong>
        .
      </div>

      <div className="h-6 text-lg">
        <div
          className={clsx(
            "transition-opacity duration-150 ease-in-out",
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
    </div>
  );
}

const COMPETITORS = {
  percy: {
    name: "Percy Browserstack",
    screenshotPrice: 0.048,
    steps: [
      {
        screenshots: 25_000,
        price: 599,
      },
    ],
  },
  chromatic: {
    name: "Chromatic",
    screenshotPrice: 0.006,
    steps: [
      {
        screenshots: 35_000,
        price: 149,
      },
      {
        screenshots: 85_000,
        price: 349,
      },
      {
        screenshots: 165_000,
        price: 649,
      },
    ],
  },
};

export function ComparePricingSlider(props: {
  competitor: keyof typeof COMPETITORS;
}) {
  const [value, setValue] = React.useState([20000]);
  const [count] = value;
  const isMaxScreenshots = count >= MAX_SCREENSHOTS;

  const formattedScreenshotCountShort = formatCount({
    max: MAX_SCREENSHOTS,
    count,
    short: true,
  });

  const argosPrice = getPrice({
    flatPrice: ARGOS_PRO_FLAT_PRICE,
    flatScreenshotCount: ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
    screenshotPrice: ARGOS_SCREENSHOT_PRICE,
    screenshotCount: count,
  });

  const competitor = COMPETITORS[props.competitor];

  const competitorPrices = competitor.steps.map((step) =>
    getPrice({
      flatPrice: step.price,
      flatScreenshotCount: step.screenshots,
      screenshotPrice: competitor.screenshotPrice,
      screenshotCount: count,
    }),
  );

  // Pick the lowest price
  const competitorPrice = Math.min(...competitorPrices);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="mx-auto flex w-full max-w-lg select-none flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-medium">Screenshots per month</div>
          <div className="text-right font-medium tabular-nums">
            {formattedScreenshotCountShort}
          </div>
        </div>

        <Slider
          defaultValue={value}
          onValueChange={setValue}
          min={MIN_SCREENSHOTS}
          max={MAX_SCREENSHOTS}
          step={STEP}
        />
      </div>

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
