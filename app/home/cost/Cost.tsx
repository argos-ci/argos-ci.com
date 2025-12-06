import clsx from "clsx";
import {
  BellIcon,
  ChevronRightIcon,
  type LucideIcon,
  ScanIcon,
  TrendingDownIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { LocalDollar } from "@/components/IntlFormat";

import { SectionHeader, SectionHeaderTexts } from "../common/SectionHeader";
import { SectionDescription, SectionTitle } from "../common/Typography";

export function Cost() {
  return (
    <section className="separator-b bg-subtle relative px-4">
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
        <div className="bg-app flex flex-col border-y shadow-xs md:flex-row">
          <div className="container-gutter flex max-w-md flex-1 flex-col items-start justify-center gap-6 py-6 max-md:border-b md:gap-8 md:border-r md:py-8">
            <CostFeature
              icon={ScanIcon}
              title="No AI overhead"
              description="Argos uses pixel diffing so you avoid the extra fees tied to heuristic based engines."
            />
            <CostFeature
              icon={BellIcon}
              title="Stay in control of your budget"
              description="Set monthly spend limits and get notified before you exceed your threshold."
            />
            <CostFeature
              icon={TrendingDownIcon}
              title="Cheaper at every volume"
              description="From small teams to millions of snapshots, Argos stays below competitors."
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-6 p-6 md:p-18">
              <div className="flex flex-col gap-6">
                <CostLine
                  name="Argos"
                  price={497}
                  color={clsx(
                    "bg-linear-to-r from-(--primary-9) to-(--primary-11)",
                  )}
                  ratio={0.2}
                />
                <CostLine
                  name="Chromatic"
                  subtitle="80% Turbosnap"
                  price={942}
                  color={clsx("bg-linear-to-r from-(--red-9) to-(--red-11)")}
                  ratio={0.4}
                />
                <CostLine
                  name="Percy"
                  price={13799}
                  color={clsx("bg-linear-to-r from-(--plum-9) to-(--plum-11)")}
                  ratio={1}
                />
              </div>
              <div className="text-center text-sm font-medium">
                Cost of 300K Storybook snapshots per month
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
}) {
  const { name, subtitle, price, color, ratio } = props;
  return (
    <div className="flex flex-col gap-x-6 gap-y-1 lg:flex-row lg:items-center">
      <div className="flex w-24 flex-col">
        <div className="font-medium">{name}</div>
        {subtitle && <div className="text-low text-xs">{subtitle}</div>}
      </div>
      <div className="relative h-10 flex-1 overflow-hidden rounded-lg bg-(--neutral-5)">
        <div
          className={clsx(
            color,
            "flex h-full min-w-14 items-center justify-end py-1 pr-2 text-xs font-medium text-white md:pr-3 md:text-sm",
          )}
          style={{ width: `${ratio * 100}%` }}
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
  icon: LucideIcon;
}) {
  const { title, description, icon: Icon } = props;
  return (
    <div>
      <h3 className="font-accent text-lg font-medium">
        <Icon className="text-low mr-2 inline-block size-4 shrink-0 align-[-8%]" />
        {title}
      </h3>
      <p className="text-low text-sm">{description}</p>
      <a className="group mt-2 inline-block text-sm font-medium">
        Learn more
        <ChevronRightIcon className="-mt-0.5 ml-0.5 inline size-4 transition group-hover:translate-x-1 group-focus:translate-x-1" />
      </a>
    </div>
  );
}
