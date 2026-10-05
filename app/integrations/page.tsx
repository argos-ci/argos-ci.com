import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { getMetadata } from "@/lib/metadata";

import { InlineMarkdown } from "./inline-markdown";
import { INTEGRATIONS, OTHER_SDKS } from "./integrations";

export const metadata: Metadata = getMetadata({
  title: "Integrations",
  absoluteTitle:
    "Argos Integrations · Visual testing for Playwright, Storybook, Vitest and Cypress",
  description:
    "Argos adds visual regression testing to the tests you already run: Playwright, Storybook, Vitest, Cypress, Puppeteer, WebdriverIO, or any framework through the CLI.",
  pathname: "/integrations",
});

export default function Page() {
  return (
    <>
      <section className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:py-24">
          <FullPageGrid height="h-200 md:h-full" />
          <Hero align="center" className="relative">
            <HeroHeading>
              Visual testing for the tests you already run
            </HeroHeading>
            <HeroDescription>
              Argos plugs into Playwright, Storybook, Vitest and Cypress through
              open-source SDKs, and into any other framework through the CLI.
              Each one captures stable screenshots in your CI and sends them for
              review on the pull request.
            </HeroDescription>
          </Hero>
        </Container>
      </section>

      <section className="border-b px-4">
        <Container
          noGutter
          className="grid grid-cols-1 border-x max-md:divide-y md:grid-cols-2 md:divide-x"
        >
          {Object.values(INTEGRATIONS).map((integration) => (
            <article
              key={integration.slug}
              className="flex flex-col gap-3 container-gutter py-10 md:nth-[n+3]:border-t"
            >
              <div className="flex items-center gap-3">
                <ThemeImage
                  src={integration.brand.logo}
                  alt=""
                  className="size-8"
                />
                <h2 className="font-accent text-xl font-medium">
                  <Link href={`/integrations/${integration.slug}`}>
                    {integration.title}
                  </Link>
                </h2>
              </div>
              <p className="text-low">
                <InlineMarkdown>{integration.summary}</InlineMarkdown>
              </p>
              <Link
                href={`/integrations/${integration.slug}`}
                className="group mt-auto inline-flex items-center gap-1 text-sm font-medium text-(--primary-11)"
              >
                Set up {integration.brand.name}
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-b px-4">
        <Container className="border-x">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <SectionHeaderTexts>
              <SectionTitle>Other frameworks</SectionTitle>
              <SectionDescription>
                The same visual review, documented in the quickstarts.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container
          noGutter
          className="grid grid-cols-1 border-x border-t max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          {OTHER_SDKS.map((sdk) => (
            <Link
              key={sdk.href}
              href={sdk.href}
              className="group flex flex-col gap-1 container-gutter py-8 transition hover:bg-(--neutral-2)"
            >
              <span className="inline-flex items-center gap-1 font-accent font-medium">
                {sdk.name}
                <ArrowRightIcon className="size-4 text-low transition group-hover:translate-x-0.5" />
              </span>
              <span className="text-sm text-low">{sdk.description}</span>
            </Link>
          ))}
        </Container>
      </section>

      <CallToActionSection />
    </>
  );
}
