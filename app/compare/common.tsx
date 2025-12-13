import clsx from "clsx";
import {
  ArrowRight,
  BlocksIcon,
  BookOpenTextIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilRulerIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";

import {
  SectionHeader,
  SectionHeaderTexts,
} from "../home/common/SectionHeader";
import { SectionDescription, SectionTitle } from "../home/common/Typography";

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

export function KeyFeaturesSection() {
  return (
    <section className="border-b px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <SectionTitle>Why teams choose Argos</SectionTitle>
            <SectionDescription>
              Argos focuses on what makes visual testing effective at scale. A
              great UI, tight integrations, precise permissions, and support
              from people who actually build frontend tools.
            </SectionDescription>
          </SectionHeaderTexts>
        </SectionHeader>
        <div className="border-t">
          <FeatureRow>
            <Feature
              title="Well-crafted UI"
              icon={PencilRulerIcon}
              text="Crafted to satisfy exigent developers. Inspired by Figma, Linear, and Stripe."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Community driven"
              icon={Users2Icon}
              text="We are close to our users, that the roadmap is driven by their feedback."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Open source"
              icon={BookOpenTextIcon}
              text="Argos is open source, you can contribute to the project on GitHub."
            />
          </FeatureRow>
          <FeatureSeparator orientation="horizontal" />
          <FeatureRow>
            <Feature
              title="Integrate with your stack"
              icon={BlocksIcon}
              text="Argos integrate with your testing tool to capture stable screenshots."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Fine-grain access control"
              icon={LockKeyholeIcon}
              text="Control team members access and permissions for each project."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Dedicated support"
              icon={MessageSquareTextIcon}
              text="Get help from experimented developers to improve your tests."
            />
          </FeatureRow>
        </div>
      </Container>
    </section>
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
