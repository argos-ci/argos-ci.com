import {
  BlocksIcon,
  BookOpenTextIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilRulerIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";

import { Accordion } from "@/components/Accordion";
import { ArgosLogo } from "@/components/ArgosLogo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { H2 } from "@/components/H2";
import { Link } from "@/components/Link";

export function HeroSection(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  logoSrc: string;
  logoSrcDark: string;
  logoAlt: string;
}) {
  return (
    <Container className="my-20" asChild>
      <section>
        <div className="text-primary mb-4 text-lg font-medium text-violet-11">
          Compare
        </div>
        <h1 className="mb-8 font-accent text-5xl leading-tight md:text-7xl">
          {props.title}
        </h1>
        <p className="max-w-screen-md text-lg text-low">{props.description}</p>
        <div className="relative my-10 flex h-48 sm:h-60 md:my-20">
          <div className="relative flex-1 border-r border-dashed border-violet-6">
            <Image
              src={props.logoSrc}
              alt={props.logoAlt}
              fill
              className="px-5 dark:hidden sm:px-10 md:px-20"
            />
            <Image
              src={props.logoSrcDark}
              alt={props.logoAlt}
              fill
              className="hidden px-5 dark:block sm:px-10 md:px-20"
            />
          </div>
          <div className="flex-1 place-content-center">
            <ArgosLogo className="px-5 sm:px-10 md:px-20" />
          </div>
        </div>
      </section>
    </Container>
  );
}

export function TrySection() {
  return (
    <Container className="my-20" asChild>
      <section>
        <H2 className="mb-4">Ready to try?</H2>
        <p className="mb-4 max-w-screen-sm text-lg">
          Finding the right visual testing tool can be challenging. We hope this
          guide makes the choice clearer. Argos is easy to try—set up your
          project in less than 10 minutes. No credit card required.
        </p>
        <div className="flex gap-4">
          <Button size="large" asChild>
            <a href="https://app.argos-ci.com/signup">Sign up</a>
          </Button>
          <Button variant="outline" size="large" asChild>
            <a href="https://cal.com/jsfez" target="_blank">
              Request demo
            </a>
          </Button>
        </div>
      </section>
    </Container>
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
              text={
                <>
                  We <Link href="https://x.com/argos_ci">#buildInPublic</Link>{" "}
                  to improve state of the art and support impactful projects.
                </>
              }
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
