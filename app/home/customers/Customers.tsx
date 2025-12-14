import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import clickhouse from "@/app/assets/customers/140x48/clickhouse.svg";
import mermaid from "@/app/assets/customers/140x48/mermaid.svg";
import meta from "@/app/assets/customers/140x48/meta.svg";
import qonto from "@/app/assets/customers/140x48/qonto.svg";
import { gitbookQuote } from "@/app/assets/customers/library/gitbook";
import { muiQuote } from "@/app/assets/customers/library/mui";
import type { CustomerQuote } from "@/app/assets/customers/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

import { SectionHeader, SectionHeaderTexts } from "../common/SectionHeader";
import { SectionDescription, SectionTitle } from "../common/Typography";

export function Customers() {
  return (
    <section className="separator-b relative px-4">
      <Container noGutter className="border-x">
        <div className="border-b">
          <SectionHeader
            align="center"
            className="container-gutter text-center text-balance"
          >
            <SectionHeaderTexts>
              <SectionTitle>
                Chosen by fast-moving startups and enterprise teams
              </SectionTitle>
              <SectionDescription>
                Hundreds of companies rely on Argos to catch visual bugs early,
                speed up reviews and ship UI changes with confidence.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <Link href="/customers">View all customers</Link>
            </Button>
          </SectionHeader>
        </div>
        <div className="grid grid-cols-2 gap-px bg-(--neutral-6) md:grid-cols-4">
          <CustomerLogo company={{ name: "Meta", logo: meta }} />
          <CustomerLogo company={{ name: "Qonto", logo: qonto }} />
          <CustomerCase quote={gitbookQuote} href="/customers/gitbook" />
          <CustomerCase quote={muiQuote} href="/customers/mui" />
          <CustomerLogo company={{ name: "Mermaid", logo: mermaid }} />
          <CustomerLogo company={{ name: "Clickhouse", logo: clickhouse }} />
        </div>
        <div className="h-12 border-t" />
      </Container>
    </section>
  );
}

type Company = {
  name: string;
  logo: ThemeImageProps["src"];
};

function CustomerLogo(props: { company: Company; className?: string }) {
  const { company, className } = props;
  return (
    <div
      className={clsx(
        "bg-app relative flex items-center justify-center px-2 py-4",
        className,
      )}
    >
      <div className="mx-auto h-10 md:h-16">
        <ThemeImage src={company.logo} alt={company.name} className="h-full" />
      </div>
    </div>
  );
}

function CustomerCase(props: {
  quote: CustomerQuote;
  href: string;
  className?: string;
}) {
  const { quote, href, className } = props;
  return (
    <Link
      href={href}
      className={clsx(
        "bg-app group col-span-2 flex flex-col gap-8 p-6 transition duration-200 hover:bg-(--neutral-3) md:p-10",
        className,
      )}
    >
      <ThemeImage
        src={quote.company.logo.adjusted}
        alt={quote.company.name}
        className="h-7"
      />
      <p className="[&_strong]:font-semibold">{quote.text}</p>
      <div className="flex items-center justify-end md:justify-between">
        <div className="text-low flex items-center gap-1 text-sm max-md:hidden">
          Read the full story
          <ArrowRightIcon className="size-4 transition duration-200 group-hover:translate-x-1" />
        </div>
        <div className="flex items-center gap-2.5 self-end text-right">
          <div>
            <div className="text-sm font-medium">{quote.author.name}</div>
            <div className="text-low text-xs font-medium">
              {quote.author.title}
            </div>
          </div>
          <ThemeImage
            src={quote.author.avatar}
            className="size-10 rounded-full border"
            alt=""
          />
        </div>
      </div>
    </Link>
  );
}
