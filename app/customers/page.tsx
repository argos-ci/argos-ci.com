import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { BRANDS } from "@/components/BrandTestimonials";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container, SideBorder } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import {
  Hero,
  HeroActions,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { getMetadata } from "@/lib/metadata";

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
            <CustomerCard brand={BRANDS.meta} />
            <QuoteCard
              href="/customers/mermaid"
              brand={BRANDS.mermaid}
              author="Sidharth Vinod"
              authorRole="Core maintainer"
              quote={
                <>
                  Argos has been a game-changer for us. It catches even the
                  smallest visual changes in our diagram rendering, giving us
                  peace of mind before every release.
                </>
              }
            />
            <CustomerCard brand={BRANDS.pivot} />
            <CustomerCard brand={BRANDS.planable} />
            <CustomerCard brand={BRANDS.businessInsider} />
            <QuoteCard
              href={BRANDS.mui.url}
              brand={BRANDS.mui}
              author="Olivier Tassinari"
              authorRole="Co-founder & CEO"
              quote={
                <>Argos CI is very helpful for us to maintain Material UI!</>
              }
            />
          </Column>
          <Column>
            <QuoteCard
              href="/customers/lemonde"
              brand={BRANDS.lemonde}
              author="Paul Laleu"
              authorRole="CTO/CIO"
              quote={
                <>
                  Thanks to Argos, we can confidently deploy updates to Sirius
                  without worrying about unexpected issues disrupting our
                  editorial workflows.
                </>
              }
            />
            <CustomerCard brand={BRANDS.handsontable} />
            <CustomerCard brand={BRANDS.yotpo} />
            <CustomerCard brand={BRANDS.sindri} />
            <CustomerCard brand={BRANDS.forethought} />
            <CustomerCard brand={BRANDS.interactiveThings} />
          </Column>

          <Column>
            <CustomerCard brand={BRANDS.doctolib} />
            <QuoteCard
              href="/customers/gitbook"
              brand={BRANDS.gitbook}
              author="Samy Pessé"
              authorRole="Co-founder & CTO"
              quote={
                <>
                  Argos has become a cornerstone of our testing process. Its
                  ability to catch visual issues early has saved us countless
                  hours of manual QA and protected the integrity of our product
                  for millions of users.
                </>
              }
            />
            <CustomerCard brand={BRANDS.qonto} />
            <CustomerCard brand={BRANDS.rho} />

            <QuoteCard
              href={BRANDS.rapidata.url}
              brand={BRANDS.rapidata}
              author="Jason Corkill"
              authorRole="Founder & CEO"
              quote={
                <>
                  Before Argos, we had constant problems with our rapidly
                  iterating UI breaking for random screen aspect ratios. With
                  Argos catch all of these before we ever ship!
                </>
              }
            />
            <CustomerCard brand={BRANDS.sivo} />
          </Column>
        </Container>
      </div>
      <CallToActionSection description="Discover why Argos is the preferred visual testing tool of QA & developers.">
        <ArgosEmblem className="mx-auto aspect-square size-24" />
      </CallToActionSection>
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
        "group block rounded-lg border shadow-sm outline-hidden transition duration-300",
        "hover:border-primary-hover hover:shadow-lg",
        "focus:border-primary-hover focus:shadow-lg",
      )}
      {...props}
    />
  );
}

type Brand = { src: string; alt: string; url: string };

function CardImage(props: { brand: Brand }) {
  return (
    <div className="flex items-center justify-center p-8">
      <Image
        priority
        height={64}
        className="dark:brightness-0 dark:invert"
        src={props.brand.src}
        alt={props.brand.alt}
      />
    </div>
  );
}

function CustomerCard(props: { brand: Brand }) {
  return (
    <CardLink href={props.brand.url} target="_blank">
      <CardImage brand={props.brand} />
    </CardLink>
  );
}

function QuoteCard(props: {
  href: string;
  brand: Brand;
  quote: React.ReactNode;
  author: string;
  authorRole: string;
}) {
  return (
    <CardLink href={props.href}>
      <CardImage brand={props.brand} />
      <div className="border-t p-8">
        <div className="text-lg">{props.quote}</div>
        <div className="mt-8 flex justify-between text-sm">
          <div>
            <div className="font-medium">{props.author}</div>
            <div className="text-low">{props.authorRole}</div>
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
    </CardLink>
  );
}
