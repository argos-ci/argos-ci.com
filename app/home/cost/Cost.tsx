"use client";

import clsx from "clsx";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  type LucideIcon,
  ScanIcon,
  TrendingDownIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { LocalDollar } from "@/components/IntlFormat";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { useInViewport } from "@/components/useInViewport";
import {
  COMPETITORS,
  formatCheckedAt,
  getArgosProPricing,
  getCompetitorPrice,
} from "@/lib/pricing";

const DEFAULT_SCENARIO_ID = "playwright-100k-storybook-100k";

const SCENARIOS = [
  {
    id: DEFAULT_SCENARIO_ID,
    label: "100K E2E snapshots + 100K Storybook snapshots",
    screenshots: 100_000,
    storybookScreenshots: 100_000,
  },
  {
    id: "storybook-100k",
    label: "100K Storybook snapshots",
    screenshots: 0,
    storybookScreenshots: 100_000,
  },
  {
    id: "storybook-300k",
    label: "300K Storybook snapshots",
    screenshots: 0,
    storybookScreenshots: 300_000,
  },
  {
    id: "playwright-100k",
    label: "100K E2E snapshots",
    screenshots: 100_000,
    storybookScreenshots: 0,
  },
] as const;

export function Cost() {
  const [selectedScenarioId, setSelectedScenarioId] =
    React.useState<(typeof SCENARIOS)[number]["id"]>(DEFAULT_SCENARIO_ID);
  const { ref: barRef, inViewport } = useInViewport<HTMLDivElement>();
  const [hasEntered, setHasEntered] = React.useState(false);
  const [shouldAnimateBars, setShouldAnimateBars] = React.useState(false);

  React.useEffect(() => {
    if (inViewport && !hasEntered) {
      setHasEntered(true);
    }
  }, [inViewport, hasEntered]);

  React.useEffect(() => {
    if (!hasEntered) return;
    setShouldAnimateBars(false);
    const id = requestAnimationFrame(() => setShouldAnimateBars(true));
    return () => cancelAnimationFrame(id);
  }, [hasEntered, selectedScenarioId]);

  const scenario =
    SCENARIOS.find((item) => item.id === selectedScenarioId) ?? SCENARIOS[0];
  const prices = React.useMemo(
    () =>
      getScenarioPrices({
        screenshots: scenario.screenshots,
        storybookScreenshots: scenario.storybookScreenshots,
      }),
    [scenario.screenshots, scenario.storybookScreenshots],
  );
  const priceLines = prices.map((priceLine) => ({
    ...priceLine,
    ratio: Math.min(priceLine.price / 1500, 1),
  }));

  return (
    <section className="separator-b relative bg-subtle px-4">
      <Container
        noGutter
        className="relative flex flex-col border-x pb-12 md:pb-18"
      >
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <SectionTitle>Cut visual testing costs, not coverage</SectionTitle>
            <SectionDescription className="max-w-xl">
              Argos gives you reliable snapshots and scalable review flows while
              keeping your testing budget under control.
            </SectionDescription>
          </SectionHeaderTexts>
        </SectionHeader>
        <div className="flex flex-col border-y bg-app shadow-xs md:flex-row-reverse">
          <div className="flex flex-col items-start justify-center gap-6 container-gutter py-6 max-md:border-b md:basis-1/2 md:gap-8 md:border-l md:py-8 lg:basis-2/5">
            <CostFeature
              href="/docs/learn/platform-fundamentals/how-argos-detects-visual-differences"
              icon={ScanIcon}
              title="No AI diffing surcharge"
              description="Argos uses deterministic pixel diffing, so you don’t pay extra AI fees per snapshot."
            />
            <CostFeature
              href="/docs/learn/billing-and-subscription/spend-management"
              icon={BellIcon}
              title="Stay in control of your budget"
              description="Set monthly spend limits and get notified before you exceed your threshold."
            />
            <CostFeature
              href="/docs/learn/billing-and-subscription/pricing-plans"
              icon={TrendingDownIcon}
              title="Cheaper at every volume"
              description="From small teams to millions of snapshots, Argos stays below Chromatic’s published plans."
            />
          </div>
          <div className="flex flex-col md:basis-1/2 lg:basis-3/5">
            <div className="flex flex-1 flex-col gap-6 p-6 md:p-18">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div className="relative w-full">
                    <select
                      id="cost-scenario"
                      className="w-full appearance-none rounded-md border bg-app px-3 py-2 text-xxxs font-medium shadow-xs transition outline-none focus-visible:border-(--primary-8) focus-visible:ring-2 focus-visible:ring-(--primary-5) lg:text-sm"
                      value={selectedScenarioId}
                      onChange={(event) =>
                        setSelectedScenarioId(
                          event.target
                            .value as (typeof SCENARIOS)[number]["id"],
                        )
                      }
                    >
                      {SCENARIOS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-low" />
                  </div>
                </div>
                <div ref={barRef} className="flex flex-col gap-6">
                  {priceLines.map((line) => (
                    <CostLine
                      key={line.name}
                      name={line.name}
                      subtitle={line.subtitle}
                      price={line.price}
                      color={line.color}
                      ratio={line.ratio}
                      animate={shouldAnimateBars}
                    />
                  ))}
                </div>
                <p className="text-xs text-low">
                  Chromatic prices from{" "}
                  <a
                    href={COMPETITORS.chromatic.source}
                    className="underline-offset-2 hover:underline"
                  >
                    chromatic.com/pricing
                  </a>
                  , checked {formatCheckedAt(COMPETITORS.chromatic.checkedAt)}.
                  Percy no longer publishes its paid prices.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 border-t p-6 md:flex-row">
              <p className="flex-1 text-sm font-medium max-md:text-center">
                Ready to see how much you could actually save with Argos?
              </p>
              <Button variant="outline" asChild>
                <Link href="/pricing">Explore Pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 border-t p-4 text-sm max-md:text-center">
              <span className="text-low">Coming from another tool?</span>
              <Link
                href="/compare/percy"
                className="font-medium text-(--primary-11) hover:underline"
              >
                Compare with Percy
              </Link>
              <span className="text-low">·</span>
              <Link
                href="/compare/chromatic"
                className="font-medium text-(--primary-11) hover:underline"
              >
                Chromatic
              </Link>
              <span className="text-low">·</span>
              <Link
                href="/compare/applitools"
                className="font-medium text-(--primary-11) hover:underline"
              >
                Applitools
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CostLine(props: {
  name: string;
  subtitle?: string;
  price: number;
  color: string;
  ratio: number;
  animate: boolean;
}) {
  const { name, subtitle, price, color, ratio, animate } = props;
  return (
    <div className="flex flex-col gap-x-6 gap-y-1 lg:flex-row lg:items-center">
      <div className="flex w-24 flex-col">
        <div className="font-medium">{name}</div>
        {subtitle && <div className="text-xs text-low">{subtitle}</div>}
      </div>
      <div className="relative h-10 flex-1 overflow-hidden rounded-lg bg-(--neutral-5)">
        <div
          className={clsx(
            color,
            "flex h-full items-center justify-end py-1 pr-2 text-xs font-medium text-white transition-[width] duration-700 ease-out md:pr-3 md:text-sm",
          )}
          style={{
            width: `${animate ? ratio * 100 : 0}%`,
            minWidth: "4rem",
          }}
        >
          <LocalDollar value={price} />
        </div>
      </div>
    </div>
  );
}

function CostFeature(props: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  const { title, description, icon: Icon, href } = props;
  return (
    <div>
      <h3 className="font-accent text-lg font-medium">
        <Icon className="mr-2 inline-block size-4 shrink-0 align-[-8%] text-low" />
        {title}
      </h3>
      <p className="text-sm text-low">{description}</p>
      <Link
        href={href}
        className="group mt-2 inline-block text-sm font-medium text-(--primary-11)"
      >
        Learn more
        <ChevronRightIcon className="-mt-px ml-0.5 inline size-4 transition group-hover:translate-x-1 group-focus:translate-x-1" />
      </Link>
    </div>
  );
}

function getScenarioPrices(usage: {
  screenshots: number;
  storybookScreenshots: number;
}) {
  return [
    {
      name: "Argos",
      price: getArgosProPricing(usage).price,
      color: clsx(
        "bg-linear-to-l from-(--primary-9) to-(--primary-11)",
        "shadow-[0_20px_40px_-24px_rgba(80,63,205,0.35)]",
      ),
    },
    {
      name: COMPETITORS.chromatic.name,
      subtitle: COMPETITORS.chromatic.subtitle,
      price: getCompetitorPrice("chromatic", usage),
      color: clsx("bg-linear-to-l from-(--red-9) to-(--red-11)"),
    },
  ];
}
