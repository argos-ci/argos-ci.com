import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import {
  Hero,
  HeroActions,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { ThemeImage } from "@/components/ThemeImage";
import { getMetadata } from "@/lib/metadata";

import { attio } from "../assets/customers/library/attio";
import { businessInsider } from "../assets/customers/library/business-insider";
import { clickhouse } from "../assets/customers/library/clickhouse";
import { doctolib } from "../assets/customers/library/doctolib";
import { finvizGintnerQuote } from "../assets/customers/library/finviz";
import { gitbookQuote } from "../assets/customers/library/gitbook";
import { leMondeQuote } from "../assets/customers/library/le-monde";
import { mermaidQuote } from "../assets/customers/library/mermaid";
import { meta } from "../assets/customers/library/meta";
import { muiQuote } from "../assets/customers/library/mui";
import { noc0Quote } from "../assets/customers/library/noc0";
import { permitIoQuote } from "../assets/customers/library/permit-io";
import { pivotQuote } from "../assets/customers/library/pivot";
import { planable } from "../assets/customers/library/planable";
import { qonto } from "../assets/customers/library/qonto";
import { rapidataQuote } from "../assets/customers/library/rapidata";
import { redis } from "../assets/customers/library/redis";
import { square } from "../assets/customers/library/square";
import { yotpo } from "../assets/customers/library/yotpo";
import type { CustomerCompany, CustomerQuote } from "../assets/customers/types";
import { trackDemoClick, trackSignupClick } from "../google-ads";

export const metadata: Metadata = getMetadata({
  title: "Customers",
  description: "Meet the teams that trust Argos for their frontend testing.",
  pathname: "/customers",
});

type Cell =
  | { type: "logo"; company: CustomerCompany }
  | { type: "quote"; quote: CustomerQuote };

const CELLS: Cell[] = [
  { type: "logo", company: meta },
  { type: "logo", company: qonto },
  { type: "quote", quote: gitbookQuote },
  { type: "quote", quote: muiQuote },
  { type: "logo", company: redis },
  { type: "logo", company: planable },
  { type: "logo", company: clickhouse },
  { type: "logo", company: businessInsider },
  { type: "quote", quote: mermaidQuote },
  { type: "quote", quote: leMondeQuote },
  { type: "logo", company: attio },
  { type: "logo", company: yotpo },
  { type: "logo", company: doctolib },
  { type: "logo", company: square },
  { type: "quote", quote: pivotQuote },
  { type: "quote", quote: permitIoQuote },
  { type: "quote", quote: finvizGintnerQuote },
  { type: "quote", quote: rapidataQuote },
  { type: "quote", quote: noc0Quote },
];

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" />
          <Hero className="relative">
            <HeroHeading>Meet our customers</HeroHeading>
            <HeroDescription>
              From fast-moving startups to large enterprises, teams use Argos to
              catch every change and ship UI with confidence.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link
                  href="https://app.argos-ci.com/signup"
                  onClick={trackSignupClick}
                >
                  Make the switch
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge" onClick={trackDemoClick}>
                  Get a demo
                </Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>
      <section className="px-4">
        <Container noGutter className="border-x">
          <div className="grid grid-flow-row-dense grid-cols-2 gap-px bg-(--neutral-6) md:grid-cols-4">
            {CELLS.map((cell, index) =>
              cell.type === "logo" ? (
                <LogoCell key={index} company={cell.company} />
              ) : (
                <QuoteCell key={index} quote={cell.quote} />
              ),
            )}
          </div>
        </Container>
      </section>
      <CallToActionSection />
    </>
  );
}

function cellHref(company: CustomerCompany) {
  return {
    href: company.storyUrl ?? company.url,
    target: company.storyUrl ? undefined : "_blank",
  };
}

function LogoCell(props: { company: CustomerCompany }) {
  const { company } = props;
  return (
    <Link
      {...cellHref(company)}
      className="bg-app flex items-center justify-center p-8 transition duration-200 hover:bg-(--neutral-3)"
    >
      <ThemeImage
        src={company.logo["140x48"]}
        alt={company.name}
        className="h-9 w-auto md:h-11"
      />
    </Link>
  );
}

function QuoteCell(props: { quote: CustomerQuote }) {
  const { quote } = props;
  return (
    <Link
      {...cellHref(quote.company)}
      className="bg-app group col-span-2 flex flex-col gap-6 p-6 transition duration-200 hover:bg-(--neutral-3) md:p-8"
    >
      <ThemeImage
        src={quote.company.logo.adjusted}
        alt={quote.company.name}
        className="h-6 w-auto self-start"
      />
      <p className="[&_strong]:font-semibold">{quote.text}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ThemeImage
            src={quote.author.avatar}
            className="size-8 rounded-full border"
            alt=""
          />
          <div>
            <div className="text-sm font-medium">{quote.author.name}</div>
            <div className="text-low text-xs font-medium">
              {quote.author.title}
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "rounded-full border p-2 transition duration-200",
            "group-hover:translate-x-1 group-hover:scale-105",
          )}
        >
          <ArrowRightIcon className="size-4" strokeWidth={1.25} />
        </div>
      </div>
    </Link>
  );
}
