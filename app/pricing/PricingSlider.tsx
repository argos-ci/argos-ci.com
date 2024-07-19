"use client";

import clsx from "clsx";
import * as React from "react";

import { Slider } from "../../components/Slider";
import { LocalDollar, LocalString } from "./FormattersComponents";

const MIN_SCREENSHOTS = 0;
const MAX_SCREENSHOTS = 1_000_000;
const MAX_PRICE = 2_500;
const STEP = 20_000;

const usePrice = ({
  screenshotCount,
  additionalScreenshotPrice,
  proPlanFlatPrice,
  proPlanScreenshotCount,
  maxPrice,
  isMaxScreenshots,
}: {
  screenshotCount: number;
  additionalScreenshotPrice: number;
  proPlanFlatPrice: number;
  proPlanScreenshotCount: number;
  maxPrice: number;
  isMaxScreenshots: boolean;
}) => {
  const extraScreenshotsCount = Math.max(
    screenshotCount - proPlanScreenshotCount,
    0,
  );
  const priceAmount = isMaxScreenshots
    ? maxPrice
    : Math.floor(
        extraScreenshotsCount * additionalScreenshotPrice + proPlanFlatPrice,
      );
  return (
    <>
      {isMaxScreenshots ? "+" : ""}
      <LocalDollar value={priceAmount} />
    </>
  );
};

const useDisplayableScreenshotCount = ({
  isMaxScreenshots,
  maxScreenshots,
  screenshotCount,
  proPlanScreenshotCount,
  short,
}: {
  isMaxScreenshots: boolean;
  maxScreenshots: number;
  screenshotCount: number;
  proPlanScreenshotCount: number;
  short?: boolean;
}) => {
  if (screenshotCount === 0) {
    return (
      <>
        less than <LocalString value={proPlanScreenshotCount} />
      </>
    );
  }

  if (isMaxScreenshots && short) {
    return (
      <>
        <span className="hidden md:inline-block">
          more than <LocalString value={maxScreenshots} />
        </span>
        <span className="md:hidden">
          + <LocalString value={maxScreenshots} />
        </span>
      </>
    );
  }

  if (isMaxScreenshots) {
    return (
      <>
        more than <LocalString value={maxScreenshots} />
      </>
    );
  }

  return <LocalString value={screenshotCount} />;
};

export const PricingSlider = ({
  additionalScreenshotPrice,
  proPlanScreenshotCount,
  proPlanFlatPrice,
  minScreenshots = MIN_SCREENSHOTS,
  maxScreenshots = MAX_SCREENSHOTS,
  maxPrice = MAX_PRICE,
  step = STEP,
}: {
  additionalScreenshotPrice: number;
  proPlanFlatPrice: number;
  proPlanScreenshotCount: number;
  minScreenshots?: number;
  maxScreenshots?: number;
  maxPrice?: number;
  step?: number;
}) => {
  const [value, setValue] = React.useState([20000]);
  const isMaxScreenshots = value[0] >= maxScreenshots;

  const formattedScreenshotCountShort = useDisplayableScreenshotCount({
    isMaxScreenshots,
    maxScreenshots,
    screenshotCount: value[0],
    proPlanScreenshotCount,
    short: true,
  });

  const formattedScreenshotCount = useDisplayableScreenshotCount({
    isMaxScreenshots,
    maxScreenshots,
    screenshotCount: value[0],
    proPlanScreenshotCount,
  });

  const price = usePrice({
    screenshotCount: value[0],
    additionalScreenshotPrice,
    proPlanFlatPrice,
    proPlanScreenshotCount,
    maxPrice,
    isMaxScreenshots,
  });

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
          min={minScreenshots}
          max={maxScreenshots}
          step={step}
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
};
