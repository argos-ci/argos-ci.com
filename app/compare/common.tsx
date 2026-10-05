import clsx from "clsx";
import { ArrowRight, ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { InlineMarkdown } from "@/components/InlineMarkdown";
import { SectionTitle } from "@/components/Typography";
import { formatCheckedAt } from "@/lib/pricing";

import type { Comparison } from "./features";

type EmblemProps = {
  emblemSrc: string;
  emblemSrcDark?: string;
  emblemAlt: string;
};

function Emblem(props: EmblemProps) {
  return (
    <>
      <Image
        src={props.emblemSrc}
        alt={props.emblemAlt}
        className={clsx(
          "aspect-square size-full",
          props.emblemSrcDark && "dark:hidden",
        )}
      />
      {props.emblemSrcDark && (
        <Image
          src={props.emblemSrcDark}
          alt={props.emblemAlt}
          className="hidden aspect-square size-full dark:block"
        />
      )}
    </>
  );
}

function HeroEmblem(props: { children: React.ReactNode }) {
  return (
    <div className="relative w-40 px-[3%] max-md:hidden">
      <div className="rounded-full border border-dashed border-(--primary-6) p-4">
        {props.children}
      </div>
    </div>
  );
}

export function HeroSection(
  props: {
    title: React.ReactNode;
    description: React.ReactNode;
    migrationHref?: string;
  } & EmblemProps,
) {
  return (
    <section className="overflow-hidden border-b px-4">
      <Container className="relative py-16 md:h-75 md:py-24">
        <FullPageGrid height="h-200 md:h-75" />
        <div className="relative flex items-center gap-4">
          <HeroEmblem>
            <Emblem {...props} />
          </HeroEmblem>
          <Hero align="center">
            <HeroHeading>{props.title}</HeroHeading>
            <HeroDescription>{props.description}</HeroDescription>
            {props.migrationHref ? (
              <Link
                href={props.migrationHref}
                className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-(--primary-11)"
              >
                Read the migration guide
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </Hero>
          <HeroEmblem>
            <ArgosEmblem className="aspect-square size-full" />
          </HeroEmblem>
        </div>
      </Container>
    </section>
  );
}

export function TrySection(props: EmblemProps) {
  return (
    <CallToActionSection description="Ready to switch to Argos? Get started for free today. No credit card required.">
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="size-14 rounded-full border border-dashed border-(--violet-6) p-2">
          <Emblem {...props} />
        </div>
        <ArrowRight className="text-low" />
        <div className="size-14 rounded-full border border-dashed border-(--violet-6) p-2">
          <ArgosEmblem className="aspect-square size-full" />
        </div>
      </div>
    </CallToActionSection>
  );
}

export function VerdictSection(props: { comparison: Comparison }) {
  const { comparison } = props;
  return (
    <section className="border-b px-4">
      <Container
        noGutter
        className="grid grid-cols-1 border-x max-md:divide-y md:grid-cols-2 md:divide-x"
      >
        <VerdictColumn
          title="Choose Argos if"
          items={comparison.chooseArgos}
          highlight
        />
        <VerdictColumn
          title={
            comparison.chooseCompetitorTitle ?? `Choose ${comparison.name} if`
          }
          items={comparison.chooseCompetitor}
        />
      </Container>
    </section>
  );
}

function VerdictColumn(props: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className="container-gutter py-10 md:py-12">
      <h2
        className={clsx(
          "font-accent text-xl font-medium",
          props.highlight && "text-(--primary-11)",
        )}
      >
        {props.title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {props.items.map((item) => (
          <li key={item} className="flex gap-2 text-low">
            <CheckIcon
              aria-hidden
              className={clsx(
                "mt-1 size-4 shrink-0",
                props.highlight ? "text-(--primary-10)" : "text-low",
              )}
            />
            <span>
              <InlineMarkdown>{item}</InlineMarkdown>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Where the competitor facts come from, under the table. */
export function SourcesNote(props: { comparison: Comparison }) {
  const { comparison } = props;
  return (
    <p className="mt-6 text-xs text-low">
      Sources for {comparison.name}:{" "}
      {comparison.sources.map((source, index) => (
        <span key={source.href}>
          {index > 0 ? ", " : null}
          <a href={source.href} className="underline-offset-2 hover:underline">
            {source.label}
          </a>
        </span>
      ))}
      . Checked {formatCheckedAt(comparison.checkedAt)}.
    </p>
  );
}

export function TableSection(props: { children: React.ReactNode }) {
  return (
    <section className="px-4">
      <Container className="overflow-auto border-x py-20">
        {props.children}
      </Container>
    </section>
  );
}

export function PricingSection(props: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <section className="border-y px-4">
      <Container className="border-x py-8 md:py-16">
        <SectionTitle className="mb-10 text-center">{props.title}</SectionTitle>
        {props.children}
      </Container>
    </section>
  );
}

export function FAQSection(props: { children: React.ReactNode }) {
  return (
    <section className="px-4">
      <Container className="border-x py-12 md:py-18">
        <SectionTitle className="mx-auto mb-10 max-w-2xl">
          Frequently Asked Questions
        </SectionTitle>
        {props.children}
      </Container>
    </section>
  );
}
