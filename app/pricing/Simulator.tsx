"use client";

import clsx from "clsx";
import * as React from "react";

import { EditInline } from "@/components/EditInline";

import {
  ADDITIONAL_SCREENSHOT_PRICE,
  PRO_PLAN_BASE_PRICE,
  PRO_PLAN_SCREENSHOT_COUNT,
} from "./constants";

const strToNum = (str: string) => (str === "" ? 0 : parseInt(str, 10));

const InlineNumber = ({
  formatNum,
  value,
  setValue,
}: {
  formatNum: (value: number) => string;
  value: number;
  setValue: (value: number) => void;
}) => {
  return (
    <EditInline
      value={String(value)}
      placeholder={String(value)}
      onChange={(value) => {
        setValue(strToNum(value));
      }}
      renderValue={(value) => formatNum(strToNum(value))}
    />
  );
};

const getFormatters = (propLocale?: string) => {
  const locale = propLocale ?? window.navigator.language;
  const numberFormatter = new Intl.NumberFormat(locale);
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });
  return {
    formatNum: (value: number) => numberFormatter.format(value),
    formatCurrency: (value: number) => currencyFormatter.format(value),
    ready: !propLocale,
  };
};

export const Simulator = () => {
  const [{ formatNum, formatCurrency, ready }, setFormatters] = React.useState(
    () => getFormatters("en-US"),
  );
  React.useEffect(() => {
    setFormatters(() => getFormatters());
  }, []);
  const [teamSize, setTeamSize] = React.useState(5);
  const [dailyPushFrequency, setDailyPushFrequency] = React.useState(3);
  const [screenshotCount, setScreenshotCount] = React.useState(170);
  const workingDays = 20;
  const dailyUsage = teamSize * dailyPushFrequency * screenshotCount;
  const monthlyUsage = dailyUsage * workingDays;
  const customPlanThreshold = 1e6;
  const totalPrice =
    PRO_PLAN_BASE_PRICE +
    Math.max(
      (monthlyUsage - PRO_PLAN_SCREENSHOT_COUNT) * ADDITIONAL_SCREENSHOT_PRICE,
      0,
    );

  return (
    <div
      className={clsx(
        "w-full max-w-3xl self-center transition",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="text-on mx-auto max-w-xl text-xl leading-loose md:text-2xl">
        <span className="text-low">A team of </span>
        <InlineNumber
          value={teamSize}
          setValue={setTeamSize}
          formatNum={formatNum}
        />{" "}
        developers
        <span className="text-low"> each pushing</span>{" "}
        <InlineNumber
          value={dailyPushFrequency}
          setValue={setDailyPushFrequency}
          formatNum={formatNum}
        />{" "}
        times daily, <span className="text-low">on a project with</span>{" "}
        <InlineNumber
          value={screenshotCount}
          setValue={setScreenshotCount}
          formatNum={formatNum}
        />{" "}
        screenshots.
      </div>

      <div className="my-6 flex flex-wrap justify-center gap-4 py-4 text-left text-lg text-low md:justify-between">
        <div>
          <div className="mb-2 text-center font-medium text">Daily usage</div>
          <div className="flex gap-4">
            <div className="text-left">
              {formatNum(teamSize)} x {formatNum(dailyPushFrequency)} x{" "}
              {formatNum(screenshotCount)}
            </div>
            <div>=</div>
            <div className="text">
              {formatNum(dailyUsage)} <small>screenshots</small>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-center font-medium text">Monthly usage</div>
          <div className="flex gap-4">
            <div className="text-left">
              {formatNum(teamSize)} x {formatNum(dailyPushFrequency)} x{" "}
              {formatNum(screenshotCount)} x {formatNum(workingDays)}
            </div>
            <div>=</div>
            <div className="text">
              {formatNum(monthlyUsage)} <small>screenshots</small>
            </div>
          </div>
        </div>
      </div>

      <div className="leading-loose text-low">
        <div className="mb-2 text-2xl font-medium text">Total cost</div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div>
            {formatCurrency(PRO_PLAN_BASE_PRICE)} + ({formatNum(monthlyUsage)} -{" "}
            {formatNum(PRO_PLAN_SCREENSHOT_COUNT)}) ×{" "}
            {formatCurrency(ADDITIONAL_SCREENSHOT_PRICE)}
          </div>
          <div>=</div>
          <div className="whitespace-nowrap text-2xl font-semibold text">
            {formatCurrency(totalPrice)} <small>per month</small>
          </div>
        </div>
      </div>

      <div className="mt-4 text-lg">
        {monthlyUsage >= customPlanThreshold && (
          <>
            You should{" "}
            <a
              href="mailto:contact@argos-ci.com"
              className="text-primary-300 hover:underline"
            >
              contact us
            </a>{" "}
            to discuss a custom plan.
          </>
        )}
      </div>
    </div>
  );
};
