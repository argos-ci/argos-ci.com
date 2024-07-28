"use client";

import clsx from "clsx";
import * as React from "react";

import { LocalDollar, LocalString } from "@/components/IntlFormat";
import { Slider } from "@/components/Slider";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  PERCY_FLAT_PRICE,
  PERCY_FLAT_SCREENSHOT_COUNT,
  PERCY_SCREENSHOT_PRICE,
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
  const isMax = props.screenshotCount >= MAX_SCREENSHOTS;
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

export function PercyPricingSlider() {
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

  const percyPrice = getPrice({
    flatPrice: PERCY_FLAT_PRICE,
    flatScreenshotCount: PERCY_FLAT_SCREENSHOT_COUNT,
    screenshotPrice: PERCY_SCREENSHOT_PRICE,
    screenshotCount: count,
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

      <div className="mt-4 text-lg">
        <table>
          <tbody>
            <tr>
              <th className="px-10 py-1 text-left font-normal">Percy</th>
              <td className="w-40">
                {formatPrice(percyPrice, isMaxScreenshots)}
              </td>
            </tr>
            <tr>
              <th className="px-10 py-1 text-left font-normal">Argos</th>
              <td className="w-40">
                {formatPrice(argosPrice, isMaxScreenshots)}
              </td>
            </tr>
            <tr className="text-xl">
              <th className="px-10 py-1 text-left font-medium">Savings</th>
              <td className="w-40">
                {formatPrice(percyPrice - argosPrice, isMaxScreenshots)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
