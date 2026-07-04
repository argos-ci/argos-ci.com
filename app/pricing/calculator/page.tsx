import { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroActions, HeroDescription, HeroHeading } from "@/components/Hero";
import { Link } from "@/components/Link";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
} from "@/lib/constants";
import { getMetadata } from "@/lib/metadata";

import { PricingSlider } from "../../common/PricingSlider";
import { trackSignupClick } from "../../google-ads";
import { PricingTable } from "../PricingTable";

export const metadata: Metadata = getMetadata({
  title: "Pricing calculator",
  description:
    "Estimate your Argos bill with worked examples at 10K, 100K, and 1M screenshots per month. Explicit per-screenshot pricing you can read and verify.",
  pathname: "/pricing/calculator",
});

const numberFormatter = new Intl.NumberFormat("en-US");
const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 10,
});

function num(value: number) {
  return numberFormatter.format(value);
}

function usd(value: number) {
  return dollarFormatter.format(value);
}

function extraScreenshots(count: number) {
  return Math.max(0, count - ARGOS_PRO_FLAT_SCREENSHOT_COUNT);
}

function monthlyCost(count: number) {
  return Math.floor(
    ARGOS_PRO_FLAT_PRICE + extraScreenshots(count) * ARGOS_SCREENSHOT_PRICE,
  );
}

function formula(count: number) {
  if (count <= ARGOS_PRO_FLAT_SCREENSHOT_COUNT) {
    return `${usd(ARGOS_PRO_FLAT_PRICE)} flat (within ${num(
      ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
    )} included)`;
  }
  return `${usd(ARGOS_PRO_FLAT_PRICE)} + (${num(count)} − ${num(
    ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  )}) × ${usd(ARGOS_SCREENSHOT_PRICE)}`;
}

const EXAMPLES = [10_000, 100_000, 1_000_000];

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-96 md:py-24">
          <FullPageGrid height="h-200 md:h-96" />
          <Hero align="center" className="relative">
            <HeroHeading>Pricing calculator</HeroHeading>
            <HeroDescription>
              Argos bills on usage, not seats. Estimate your monthly cost below,
              or read the worked examples for exact numbers.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link
                  href="https://app.argos-ci.com/signup?plan=pro"
                  onClick={trackSignupClick}
                >
                  Start free trial
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="/pricing">View plans</Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>

      <section className="border-b px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mb-4 text-center">
            Estimate your bill
          </SectionTitle>
          <SectionDescription className="mx-auto mb-12 max-w-2xl text-center">
            Drag the sliders to match your monthly volume.
          </SectionDescription>
          <PricingSlider />
        </Container>
      </section>

      <section className="border-b px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mb-4 text-center">
            Worked examples
          </SectionTitle>
          <SectionDescription className="mx-auto mb-10 max-w-2xl text-center">
            On the Pro plan, {num(ARGOS_PRO_FLAT_SCREENSHOT_COUNT)} screenshots
            are included for {usd(ARGOS_PRO_FLAT_PRICE)} / mo. Every extra
            screenshot is {usd(ARGOS_SCREENSHOT_PRICE)}.
          </SectionDescription>

          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Argos Pro plan monthly cost at 10K, 100K, and 1M screenshots
              </caption>
              <thead>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="text-default px-4 py-3 font-semibold"
                  >
                    Screenshots / month
                  </th>
                  <th
                    scope="col"
                    className="text-default px-4 py-3 font-semibold"
                  >
                    Calculation
                  </th>
                  <th
                    scope="col"
                    className="text-default px-4 py-3 text-right font-semibold"
                  >
                    Monthly cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((count) => (
                  <tr key={count} className="border-b last:border-b-0">
                    <th
                      scope="row"
                      className="text-default px-4 py-3 font-medium whitespace-nowrap tabular-nums"
                    >
                      {num(count)}
                    </th>
                    <td className="text-low px-4 py-3 tabular-nums">
                      {formula(count)}
                    </td>
                    <td className="text-default px-4 py-3 text-right font-semibold whitespace-nowrap tabular-nums">
                      {usd(monthlyCost(count))} / mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-low mt-4 px-4 text-sm">
              At {num(1_000_000)} screenshots and beyond,{" "}
              <Link href="mailto:contact@argos-ci.com" className="underline">
                contact us
              </Link>{" "}
              for a custom volume rate below the list price. Storybook
              screenshots are billed at a lower rate. Only successful builds
              count toward usage.
            </p>
          </div>
        </Container>
      </section>

      <section className="px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mb-4 text-center">
            Pricing reference
          </SectionTitle>
          <SectionDescription className="mx-auto mb-10 max-w-2xl text-center">
            The complete per-plan and per-screenshot rate card.
          </SectionDescription>
          <div className="mx-auto max-w-3xl border-y md:rounded-lg md:border">
            <PricingTable />
          </div>
        </Container>
      </section>
    </>
  );
}
