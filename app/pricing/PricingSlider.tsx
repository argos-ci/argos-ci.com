"use client";

import clsx from "clsx";
import * as React from "react";

import { Slider } from "../../components/Slider";
import { dollarFormatter } from "./formatters";

const MIN_SCREENSHOTS = 5000;
const MAX_SCREENSHOTS = 1000000;
const MAX_PRICE = 2500;

const getScreenshotCountStr = ({
  isMaxScreenshots,
  screenshotCount,
}: {
  isMaxScreenshots: boolean;
  screenshotCount: number;
}) => `${isMaxScreenshots ? "+" : ""} ${screenshotCount.toLocaleString()}`;

export const PricingSlider = ({
  additionalScreenshotPrice,
  proPlanScreenshotCount,
  proPlanFlatPrice,
  minScreenshots = MIN_SCREENSHOTS,
  maxScreenshots = MAX_SCREENSHOTS,
  maxPrice = MAX_PRICE,
}: {
  additionalScreenshotPrice: number;
  proPlanFlatPrice: number;
  proPlanScreenshotCount: number;
  minScreenshots?: number;
  maxScreenshots?: number;
  maxPrice?: number;
}) => {
  const [value, setValue] = React.useState([proPlanScreenshotCount]);
  const screenshotCount = value[0];
  const extraScreenshots = Math.max(
    screenshotCount - proPlanScreenshotCount,
    0,
  );
  const isMaxScreenshots = screenshotCount === maxScreenshots;
  const price = isMaxScreenshots
    ? maxPrice
    : extraScreenshots * additionalScreenshotPrice + proPlanFlatPrice;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
        <div className="flex justify-between">
          <div className="text-on text-lg font-semibold">
            Screenshots per month?
          </div>
          <div>
            {getScreenshotCountStr({ isMaxScreenshots, screenshotCount })}{" "}
            screenshots
          </div>
        </div>

        <Slider
          defaultValue={value}
          onValueChange={setValue}
          min={minScreenshots}
          max={maxScreenshots}
          step={10000}
        />
      </div>

      <div className="mt-2 text-balance text-lg leading-relaxed md:text-xl">
        For {getScreenshotCountStr({ isMaxScreenshots, screenshotCount })}{" "}
        screenshots per month it will cost{" "}
        <span className="font-semibold">
          {isMaxScreenshots ? "+" : ""} {dollarFormatter.format(price)}
        </span>
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
};
