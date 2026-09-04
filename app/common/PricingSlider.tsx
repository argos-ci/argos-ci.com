"use client";

import clsx from "clsx";
import * as React from "react";

import { LocalDollar, LocalString } from "@/components/IntlFormat";
import { Slider } from "@/components/Slider";
import {
  COMPETITORS,
  CUSTOM_PLAN_SCREENSHOT_COUNT,
  type CompetitorSlug,
  getArgosProPricing,
  getCompetitorPrice,
} from "@/lib/pricing";

const MAX_SCREENSHOTS = CUSTOM_PLAN_SCREENSHOT_COUNT;
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
  const { price } = getArgosProPricing({ screenshots, storybookScreenshots });

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
          {formatPrice(price, isMaxScreenshots)}
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

export function ComparePricingSlider(props: { competitor: CompetitorSlug }) {
  const [screenshots, setScreenshots] = React.useState(0);
  const [storybookScreenshots, setStorybookScreenshots] = React.useState(0);
  const isMaxScreenshots = screenshots >= MAX_SCREENSHOTS;

  const usage = { screenshots, storybookScreenshots };
  const argosPrice = getArgosProPricing(usage).price;
  const competitor = COMPETITORS[props.competitor];
  const competitorPrice = getCompetitorPrice(props.competitor, usage);

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
