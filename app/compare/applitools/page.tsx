import {
  BlocksIcon,
  BookOpenTextIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilRulerIcon,
  Users2Icon,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { twc } from "react-twc";

import { PricingSlider } from "@/app/common/PricingSlider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { ArgosLogo } from "@/components/ArgosLogo";
import { Button } from "@/components/Button";
import { Container, Section } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { ColoredLink } from "@/components/Link";
import applitools from "@/images/brands/applitools.svg";
import { getMetadata } from "@/lib/metadata";

import { ComparisonTable } from "./table";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Applitools",
  description:
    "Explore a detailed comparison of Argos and Applitools, focusing on features, performance, and ease of use in visual testing.",
  pathname: "/compare/applitools",
});

const SectionTitle = twc.h2`mb-6 font-accent text-4xl`;

export default function Page() {
  return (
    <main className="flex flex-col gap-20 pb-8 pt-16 md:gap-24">
      <Container className="flex flex-col gap-20 md:gap-24" noGutter>
        <Section className="flex flex-col gap-6" $gutter>
          <div className="text-xs font-semibold uppercase text-violet-11">
            Compare
          </div>
          <h1 className="font-accent text-5xl sm:text-6xl">
            Applitools vs Argos
          </h1>
          <p className="max-w-screen-md text-lg text-low">
            Applitools and Argos are two leading visual testing tools. This
            guide will help you understand their key features, pricing, and
            unique strengths, making it easier for you to choose the right tool
            for your needs.
          </p>
          <div className="relative mt-10 flex h-48 sm:h-60">
            <div className="relative flex-1 border-r border-dashed border-violet-6">
              <Image
                src={applitools}
                alt="Applitools logo"
                fill
                className="px-5 sm:px-10 md:px-20"
              />
            </div>
            <div className="flex-1 place-content-center">
              <ArgosLogo className="px-5 sm:px-10 md:px-20" />
            </div>
          </div>
        </Section>

        <Section className="overflow-x-auto" $gutter>
          <ComparisonTable />
        </Section>

        <Section $gutter>
          <SectionTitle>Argos Pricing</SectionTitle>
          <PricingSlider />
        </Section>
      </Container>

      <section className="bg-primary-subtle">
        <Container className="pb-4 pt-10">
          <SectionTitle>Argos key features</SectionTitle>
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
                    We{" "}
                    <ColoredLink href="https://x.com/argos_ci">
                      #buildInPublic
                    </ColoredLink>{" "}
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

      <Container className="flex flex-col gap-20 md:gap-24">
        <section className="text-center">
          <SectionTitle>Applitools vs Argos FAQ</SectionTitle>
          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-4 w-full max-w-2xl text-left"
          >
            <AccordionItem value="self-onboard">
              <AccordionTrigger>
                Can I start using Applitools by myself?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You can access a demo project in{" "}
                  <span className="font-semibold">Applitools</span>, but you
                  need to speak with a salesperson before installing it on your
                  project and receiving a price estimation.
                </p>
                <p>
                  <span className="font-semibold">Argos</span> is designed for
                  self-onboarding in just a few minutes. We offer support on the{" "}
                  <ColoredLink href="https://argos-ci.com/discord">
                    Argos Discord channel
                  </ColoredLink>{" "}
                  to assist with setup, as well as private calls to answer your
                  questions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="flaky-screenshot">
              <AccordionTrigger>
                Is Applitools visual testing flaky?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Flaky tests are a significant issue in visual testing, and
                  each product has its own way of addressing this problem.
                </p>
                <p>
                  <span className="font-semibold">Applitools</span>' AI
                  technology helps minimize false positives but comes at a high
                  cost and removes variations from each image of each build.
                </p>
                <p>
                  <span className="font-semibold">Argos</span> uses an algorithm
                  that waits for page stabilization before taking a screenshot.
                  This algorithm is open-source and embedded in every Argos
                  integration.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="language-agnostic">
              <AccordionTrigger>
                Why is Argos language agnostic?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-semibold">Applitools</span> provides
                  SDKs for several languages to enable its use.
                </p>
                <p>
                  <span className="font-semibold">Argos</span> relies on a bash
                  command to upload screenshots. As long as you can capture
                  screenshots of your website, you can use Argos.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ci-compatibility">
              <AccordionTrigger>
                Is Applitools compatible with my CI?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Both <span className="font-semibold">Applitools</span> and{" "}
                  <span className="font-semibold">Argos</span> are compatible
                  with most CI systems on the market.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fine-grain-access-control">
              <AccordionTrigger>
                Can I control team members' access?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Both <span className="font-semibold">Applitools</span> and{" "}
                  <span className="font-semibold">Argos</span> allow you to
                  control team members' access and permissions for each project.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing-transparency">
              <AccordionTrigger>
                Why isn't Applitools pricing public?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-semibold">Applitools</span> doesn't
                  disclose their pricing publicly, but it's known to be one of
                  the more expensive options on the market. You will need to
                  speak with a salesperson to get a price offer.
                </p>
                <p>
                  <span className="font-semibold">Argos</span> offers{" "}
                  <ColoredLink href="/pricing">
                    transparent and affordable pricing
                  </ColoredLink>
                  . Custom pricing can be arranged for specific features or
                  dedicated support requests.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="community-driven">
              <AccordionTrigger>
                What makes Argos community-driven?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-semibold">Argos</span> was founded by
                  passionate developers. We actively engage with our users to
                  discuss feature requests and understand their usage, ensuring
                  our product roadmap aligns with real-world needs.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <SectionTitle>Ready to try?</SectionTitle>
          <p className="max-w-screen-sm text-lg">
            Finding the right visual testing tool can be challenging. We hope
            this guide makes the choice clearer. Argos is easy to try—set up
            your project in less than 10 minutes. No credit card required.
          </p>
          <div className="mt-4 flex gap-4">
            <Button size="large">
              <Link href="https://app.argos-ci.com/signup">Sign up</Link>
            </Button>
            <Button variant="outline" size="large" asChild>
              <a href="https://cal.com/jsfez" target="_blank">
                Request demo
              </a>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
