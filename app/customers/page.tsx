import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import * as React from "react";

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

import { businessInsider } from "../assets/customers/library/business-insider";
import { clickhouse } from "../assets/customers/library/clickhouse";
import { doctolib } from "../assets/customers/library/doctolib";
import { finvizGintnerQuote } from "../assets/customers/library/finviz";
import { gitbookQuote } from "../assets/customers/library/gitbook";
import { leMondeQuote } from "../assets/customers/library/le-monde";
import { mermaidQuote } from "../assets/customers/library/mermaid";
import { meta } from "../assets/customers/library/meta";
import { muiQuote } from "../assets/customers/library/mui";
import { permitIoQuote } from "../assets/customers/library/permit-io";
import { pivotQuote } from "../assets/customers/library/pivot";
import { planable } from "../assets/customers/library/planable";
import { qonto } from "../assets/customers/library/qonto";
import { rapidataQuote } from "../assets/customers/library/rapidata";
import { yotpo } from "../assets/customers/library/yotpo";
import type { CustomerCompany, CustomerQuote } from "../assets/customers/types";

export const metadata: Metadata = getMetadata({
  title: "Customers",
  description: "Meet the teams that trust Argos for their frontend testing.",
  pathname: "/customers",
});

export default function Page() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" />
          <Hero className="relative">
            <HeroHeading>Meet our customers</HeroHeading>
            <HeroDescription>
              From fast moving startups to large enterprises, teams use Argos to
              prevent visual regressions and keep UI quality high.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link href="https://app.argos-ci.com/signup">
                  Make the switch
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge">Get a demo</Link>
              </Button>
            </HeroActions>
          </Hero>
        </Container>
      </div>
      <div className="px-4">
        <Container className="grid grid-cols-1 gap-8 border-x py-16 pt-4 md:grid-cols-3 md:pt-10">
          <Column>
            <CustomerCard company={meta} />
            <QuoteCard quote={mermaidQuote} />
            <CustomerCard company={planable} />
            <QuoteCard quote={muiQuote} />
            <CustomerCard company={businessInsider} />
          </Column>
          <Column>
            <QuoteCard quote={leMondeQuote} />
            <CustomerCard company={yotpo} />
            <QuoteCard quote={pivotQuote} />
            <QuoteCard quote={permitIoQuote} />
          </Column>

          <Column>
            <CustomerCard company={doctolib} />
            <QuoteCard quote={gitbookQuote} />
            <CustomerCard company={qonto} />
            <QuoteCard quote={rapidataQuote} />
            <CustomerCard company={clickhouse} />
            <QuoteCard quote={finvizGintnerQuote} />
          </Column>
        </Container>
      </div>
      <CallToActionSection />
    </>
  );
}

function Column(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-8">{props.children}</div>;
}

function CardLink(props: {
  href: string;
  target?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={clsx(
        "group block rounded-lg border shadow-xs outline-hidden transition duration-300",
        "hover:border-primary-hover hover:shadow-lg",
        "focus:border-primary-hover focus:shadow-lg",
      )}
      {...props}
    />
  );
}

function CardImage(props: { company: CustomerCompany }) {
  return (
    <div className="flex items-center justify-center p-8">
      <ThemeImage
        className="h-16 w-auto"
        src={props.company.logo["140x48"]}
        alt={props.company.name}
      />
    </div>
  );
}

function CustomerCard(props: {
  company: CustomerCompany;
  children?: React.ReactNode;
}) {
  const { company, children } = props;
  return (
    <CardLink
      href={company.storyUrl ?? company.url}
      target={company.storyUrl ? undefined : "_blank"}
    >
      <CardImage company={company} />
      {children}
    </CardLink>
  );
}

function QuoteCard(props: { quote: CustomerQuote }) {
  const { quote } = props;
  return (
    <CustomerCard company={quote.company}>
      <div className="border-t p-8">
        <div className="text-lg [&_strong]:font-semibold">{quote.text}</div>
        <div className="mt-8 flex justify-between text-sm">
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
          <div>
            <div
              className={clsx(
                "rounded-full border p-2 transition duration-300",
                "group-hover:translate-x-1 group-hover:scale-105",
                "group-focus:translate-x-1 group-focus:scale-105",
              )}
            >
              <ArrowRightIcon className="size-5" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </CustomerCard>
  );
}
