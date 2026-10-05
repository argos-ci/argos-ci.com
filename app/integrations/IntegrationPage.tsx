import { BookOpenIcon, ListChecksIcon, TerminalIcon } from "lucide-react";
import Link from "next/link";
import type { BreadcrumbList } from "schema-dts";

import { TrustedBy } from "@/app/common/TrustedBy";
import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { CodeBlock } from "@/components/CodeBlock";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import {
  FeatureGrid,
  FeatureGridFeature,
  FeatureGridFeatureSmall,
} from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { PillarHero } from "@/components/PillarHero";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { Terminal } from "@/components/Terminal";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { formatCheckedAt } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/structured-data";

import { InlineMarkdown } from "./inline-markdown";
import type { Integration } from "./types";

/**
 * The page of one integration: the answer in the hero, the setup with real
 * code, what Argos adds over the usual alternative (sourced), the features,
 * the FAQ and where to go next. Everything comes from the data module, which
 * the markdown twin renders too.
 */
export function IntegrationPage(props: { integration: Integration }) {
  const { integration } = props;
  const name = integration.brand.name;
  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Integrations",
        item: absoluteUrl("/integrations"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absoluteUrl(`/integrations/${integration.slug}`),
      },
    ],
  };
  return (
    <>
      <PillarHero
        color="green"
        label={name}
        title={integration.title}
        description={
          <InlineMarkdown codeClassName="whitespace-nowrap">
            {integration.summary}
          </InlineMarkdown>
        }
      />
      <TrustedBy />

      <section id="setup" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <Chip icon={TerminalIcon}>Setup</Chip>
              <SectionHeaderTexts>
                <SectionTitle>Set up Argos with {name}</SectionTitle>
                <SectionDescription>
                  {integration.steps.length} steps, then every pull request gets
                  a visual check. The quickstart covers every option.
                </SectionDescription>
              </SectionHeaderTexts>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" asChild>
                  <Link href={integration.quickstartHref}>
                    {name} quickstart
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={integration.referenceHref}>SDK reference</Link>
                </Button>
              </div>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <Container noGutter className="divide-y border-x border-b">
            {integration.steps.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-6 container-gutter py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-12"
              >
                <div>
                  <div className="font-mono text-sm text-low">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-1 font-accent text-xl font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-low">
                    <InlineMarkdown>{step.description}</InlineMarkdown>
                  </p>
                </div>
                <Terminal title={step.filename} className="max-w-none">
                  <CodeBlock
                    code={step.code}
                    lang={step.lang}
                    className="text-xs [&_pre]:overflow-x-auto"
                  />
                </Terminal>
              </div>
            ))}
          </Container>
        </div>
      </section>

      <section id="alternative" className="scroll-mt-24 border-b px-4">
        <Container className="border-x">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={ListChecksIcon}>Compared</Chip>
            <SectionHeaderTexts>
              <SectionTitle>{integration.alternative.title}</SectionTitle>
              <SectionDescription>
                <InlineMarkdown>
                  {integration.alternative.description}
                </InlineMarkdown>
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
        </Container>
        <Container className="border-x border-t pt-4 pb-12">
          {/*
            A real table from md up. Below, each row stacks into a card and
            the column names come back as labels (data-label), so the Argos
            column never hides behind a horizontal scroll.
          */}
          <table className="w-full text-left text-sm">
            <thead className="max-md:sr-only">
              <tr>
                <th className="w-1/4 py-3 pr-4 font-medium text-low">
                  <span className="sr-only">Topic</span>
                </th>
                <th className="w-3/8 py-3 pr-4 font-medium">
                  {integration.alternative.name}
                </th>
                <th className="w-3/8 py-3 font-medium text-(--primary-11)">
                  Argos
                </th>
              </tr>
            </thead>
            <tbody>
              {integration.alternative.rows.map((row) => (
                <tr
                  key={row.topic}
                  className="border-t align-top max-md:block max-md:py-4"
                >
                  <th
                    scope="row"
                    className="py-3 pr-4 font-medium max-md:block max-md:py-0 max-md:pb-2"
                  >
                    {row.topic}
                  </th>
                  <td
                    data-label={integration.alternative.name}
                    className="py-3 pr-4 text-low max-md:block max-md:py-1 max-md:before:block max-md:before:text-xs max-md:before:font-medium max-md:before:content-[attr(data-label)]"
                  >
                    <InlineMarkdown>{row.alternative}</InlineMarkdown>
                  </td>
                  <td
                    data-label="Argos"
                    className="py-3 max-md:block max-md:py-1 max-md:before:block max-md:before:text-xs max-md:before:font-medium max-md:before:text-(--primary-11) max-md:before:content-[attr(data-label)]"
                  >
                    <InlineMarkdown>{row.argos}</InlineMarkdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-low">
            Sources:{" "}
            {integration.alternative.sources.map((source, index) => (
              <span key={source.href}>
                {index > 0 ? ", " : null}
                <a
                  href={source.href}
                  className="underline-offset-2 hover:underline"
                >
                  {source.label}
                </a>
              </span>
            ))}
            , checked {formatCheckedAt(integration.alternative.checkedAt)}.
          </p>
        </Container>
      </section>

      <section id="features" className="scroll-mt-24">
        <div className="border-b px-4">
          <Container className="border-x bg-linear-to-b from-transparent to-(--neutral-2)">
            <SectionHeader
              align="center"
              className="max-w-2xl container-gutter"
            >
              <SectionHeaderTexts>
                <SectionTitle>Why {name} teams use Argos</SectionTitle>
              </SectionHeaderTexts>
            </SectionHeader>
          </Container>
        </div>
        <div className="px-4">
          <FeatureGrid>
            {integration.features.map((feature) => (
              <FeatureGridFeature
                key={feature.title}
                title={feature.title}
                description={
                  <InlineMarkdown>{feature.description}</InlineMarkdown>
                }
                href={feature.href}
                illustration={feature.illustration}
              />
            ))}
          </FeatureGrid>
          <Container
            noGutter
            className="relative grid grid-cols-1 border-x border-b max-md:divide-y md:grid-cols-3 md:divide-x"
          >
            {integration.smallFeatures.map((feature) => (
              <FeatureGridFeatureSmall
                key={feature.title}
                title={feature.title}
                description={
                  <InlineMarkdown>{feature.description}</InlineMarkdown>
                }
                href={feature.href}
                icon={feature.icon}
              />
            ))}
          </Container>
          <Container className="h-12 border-x border-b" />
        </div>
      </section>

      <FAQSection
        questions={integration.questions}
        title={`${name} visual testing FAQ`}
      />

      <section className="border-b px-4">
        <Container className="border-x">
          <SectionHeader align="center" className="max-w-2xl container-gutter">
            <Chip icon={BookOpenIcon}>Keep reading</Chip>
          </SectionHeader>
        </Container>
        <Container
          noGutter
          className="relative grid grid-cols-1 border-x border-t max-md:divide-y md:grid-cols-3 md:divide-x"
        >
          {integration.readNext.map((item) => (
            <FeatureGridFeatureSmall
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </Container>
      </section>

      <CallToActionSection />
      <JsonLd json={breadcrumbs} />
    </>
  );
}
