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

import { Accordion } from "@/components/Accordion";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { H2 } from "@/components/H2";

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
    <div className="relative w-1/4 px-[3%] max-md:hidden">
      <div className="rounded-full border border-dashed border-violet-6 p-4">
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
    <Container
      className="relative my-20 flex items-center gap-4 text-center"
      asChild
    >
      <section>
        <HeroEmblem>
          <Emblem {...props} />
        </HeroEmblem>
        <div>
          <h1 className="mb-4 font-accent text-5xl md:text-6xl">
            {props.title}
          </h1>
          <p className="text-balance text-lg text-low">{props.description}</p>
        </div>
        <HeroEmblem>
          <ArgosEmblem className="aspect-square size-full" />
        </HeroEmblem>
      </section>
    </Container>
  );
}

export function TrySection(props: EmblemProps) {
  return (
    <CallToActionSection
      supercharge="your visual testing experience"
      description="Ready to switch to Argos? Get started for free today. No credit card required."
    >
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="size-14 rounded-full border border-dashed border-violet-6 p-2">
          <Emblem {...props} />
        </div>
        <ArrowRight className="text-low" />
        <div className="size-14 rounded-full border border-dashed border-violet-6 p-2">
          <ArgosEmblem className="aspect-square size-full" />
        </div>
      </div>
    </CallToActionSection>
  );
}

export function KeyFeaturesSection() {
  return (
    <section className="bg-primary-subtle">
      <Container className="py-16">
        <H2 className="mb-10">Argos key features</H2>
        <div>
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
    <Container className="my-20 overflow-auto" asChild>
      <section>{props.children}</section>
    </Container>
  );
}

export function PricingSection(props: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <Container className="my-20 md:my-28" asChild>
      <section>
        <H2 className="mb-10 text-center">{props.title}</H2>
        {props.children}
      </section>
    </Container>
  );
}

export function FAQSection(props: { children: React.ReactNode }) {
  return (
    <Container className="my-20 text-center md:my-28" asChild>
      <section>
        <H2>Frequently Asked Questions</H2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-4 w-full max-w-2xl text-left [&_strong]:font-semibold"
        >
          {props.children}
        </Accordion>
      </section>
    </Container>
  );
}
