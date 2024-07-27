"use client";

import clsx from "clsx";
import * as React from "react";

import { LocalDollar, LocalString } from "@/components/IntlFormat";
import { Slider } from "@/components/Slider";
import {
  ADDITIONAL_SCREENSHOT_PRICE,
  PRO_PLAN_FLAT_PRICE,
  PRO_PLAN_SCREENSHOT_COUNT,
} from "@/lib/constants";

const MIN_SCREENSHOTS = 0;
const MAX_SCREENSHOTS = 1_000_000;
const MAX_PRICE = 2_500;
const STEP = 20_000;

function formatCount(props: { max: number; count: number; short?: boolean }) {
  const { max, count, short } = props;
  if (count === 0) {
    return (
      <>
        less than <LocalString value={props.max} />
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

  const price = (() => {
    const extraScreenshotsCount = Math.max(
      count - PRO_PLAN_SCREENSHOT_COUNT,
      0,
    );
    const priceAmount = isMaxScreenshots
      ? MAX_PRICE
      : Math.floor(
          extraScreenshotsCount * ADDITIONAL_SCREENSHOT_PRICE +
            PRO_PLAN_FLAT_PRICE,
        );
    return (
      <>
        {isMaxScreenshots ? "+" : ""}
        <LocalDollar value={priceAmount} />
      </>
    );
  })();

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-medium">Screenshots per month?</div>
          <div className="text-right text-sm font-medium text-hover">
            {formattedScreenshotCountShort} screenshots
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
        <span className="text-hover">
          {formattedScreenshotCount} screenshots
        </span>{" "}
        per month it will cost <span className="font-semibold">{price}</span>.
      </div>

      <div className="h-6 text-lg">
        <div
          className={clsx(
            "transition-opacity duration-150 ease-in-out",
            isMaxScreenshots ? "opacity-100" : "opacity-0",
          )}
        >
          You should{" "}
          <a
            href="mailto:contact@argos-ci.com"
            className="text-hover underline"
          >
            contact us
          </a>{" "}
          to discuss a custom plan.
        </div>
      </div>
    </div>
  );
}
