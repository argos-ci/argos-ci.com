import { Button } from "@/components/Button";
import { CardParagraph } from "@/components/Card";
import { CardTitle } from "@/components/Card";
import { Card, CardBody } from "@/components/Card";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

import * as React from "react";
import { ButtonProps } from "@/components/Button";
import { BrandTestimonials } from "@/components/BrandTestimonials";
import { Simulator } from "./Simulator";
import { Metadata } from "next";

const HOBBY_PLAN_SCREENSHOT_COUNT = 5000;
const PRO_PLAN_SCREENSHOT_COUNT = 15000;
const ADDITIONAL_SCREENSHOT_PRICE = 0.0025;

const Price = ({
  amount,
  recurring,
  fixedPrice,
}: {
  amount: number;
  recurring: boolean;
  fixedPrice: boolean;
}) => (
  <>
    <div className="mb-1 mt-6 block h-5 text-sm">
      {fixedPrice ? null : "Starting at"}
    </div>
    <div className="flex items-baseline">
      <span className="text-3xl font-semibold text-on">
        $<span className="tracking-tight">{amount}</span>
      </span>
      {recurring && <span className="ml-1 text-lg text-on-light">/mo</span>}
    </div>
    <div className="mt-1 block h-5 text-sm">
      {fixedPrice ? "forever" : "Billed monthly based on usage"}
    </div>
  </>
);

const Features = ({ children }: { children: React.ReactNode }) => (
  <ul className="my-6 flex flex-col gap-4">{children}</ul>
);

const Feature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2">
    <CheckCircleIcon className="h-5 w-5 shrink-0 text-on" />
    <div className="leading-tight">{children}</div>
  </li>
);

const PricingCard = ({
  children,
  emphasis,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) => (
  <Card
    className={clsx(
      "flex-1 shrink-0 basis-80 max-w-[340px] md:max-w-[300px]",
      emphasis ? "border-2 border-slate-500 pt-4" : "lg:mt-4"
    )}
  >
    {children}
  </Card>
);

const PricingCardBody = ({ children }: { children: React.ReactNode }) => (
  <CardBody className="p-8 text-left text-on-light antialiased">
    {children}
  </CardBody>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <CardTitle className="text-on">{children}</CardTitle>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <CardParagraph className="h-12">{children}</CardParagraph>
);

const Badges = ({ children }: { children?: React.ReactNode }) => (
  <div className="block h-8">{children}</div>
);

const CTA = ({
  children,
  href,
  ...props
}: ButtonProps & {
  children: React.ReactNode;
  href: string;
}) => (
  <Link href={href} passHref>
    <Button
      className="mt-10 mb-6 w-full justify-center"
      size="large"
      {...props}
    >
      {children}
    </Button>
  </Link>
);

export const metadata: Metadata = {
  title: "Argos Pricing Plans",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <Container className="mt-6 flex flex-col items-center gap-6 text-center">
        <h1 className="my-8 bg-clip-text text-4xl font-bold sm:text-6xl sm:leading-tight">
          Pricing plans
        </h1>

        <div className="flex flex-wrap gap-6 justify-center w-full">
          <PricingCard>
            <PricingCardBody>
              <Badges />
              <Title>Hobby</Title>
              <Description>For personal projects.</Description>
              <Price amount={0} recurring={false} fixedPrice={true} />
              <CTA href="https://app.argos-ci.com/login" variant="outline">
                Start Hobby Plan
              </CTA>
              <Features>
                <Feature>
                  Up to {HOBBY_PLAN_SCREENSHOT_COUNT.toLocaleString()}{" "}
                  screenshots
                </Feature>
                <Feature>Visual changes detection</Feature>
                <Feature>GitHub integration</Feature>
                <Feature>Community Support</Feature>
              </Features>
            </PricingCardBody>
          </PricingCard>

          <PricingCard emphasis>
            <PricingCardBody>
              <Badges>
                <div className="mb-10 w-fit rounded border border-slate-500 px-2.5 py-0.5 text-xs  font-medium text-primary-300">
                  Most popular
                </div>
              </Badges>
              <Title>Pro</Title>
              <Description>
                Unlimited screenshots and team collaboration.
              </Description>
              <Price amount={30} recurring={true} fixedPrice={false} />
              <CTA href="https://app.argos-ci.com/signup?plan=pro">
                Start Free Trial
              </CTA>
              <Features>
                <Feature>
                  {PRO_PLAN_SCREENSHOT_COUNT.toLocaleString()} screenshots{" "}
                  <span className="whitespace-nowrap">
                    included
                    <Tooltip
                      content={`Then $${ADDITIONAL_SCREENSHOT_PRICE} per screenshot after`}
                    >
                      <CurrencyDollarIcon className="ml-1 inline-block h-4 w-4 text-on" />
                    </Tooltip>
                  </span>
                </Feature>
                <Feature>Visual changes detection</Feature>
                <Feature>GitHub integration</Feature>
                <Feature>Pro Support</Feature>
                <Feature>Collaborating visual review</Feature>
              </Features>
            </PricingCardBody>
          </PricingCard>

          <PricingCard>
            <PricingCardBody>
              <Badges />
              <Title>Enterprise</Title>
              <Description>
                Tailored solutions with premium features.
              </Description>
              <div className="mb-6 mt-12 flex items-baseline text-3xl font-semibold text-on">
                Custom
              </div>
              <CTA href="mailto:contact@argos-ci.com" variant="outline">
                Contact Sales
              </CTA>
              <Features>
                <Feature>Custom amount of screenshots</Feature>
                <Feature>Visual changes detection</Feature>
                <Feature>GitHub integration</Feature>
                <Feature>Dedicated Support</Feature>
                <Feature>Collaborating visual review</Feature>
                <Feature>SLA for 99.99% Uptime</Feature>
              </Features>
            </PricingCardBody>
          </PricingCard>
        </div>
      </Container>

      <div className="bg-gradient-to-br from-slate-900/40 to-slate-900 py-16 mt-16 transform -rotate-3 -mx-20">
        <div className="transform rotate-3 mx-20 items-center flex flex-col px-4">
          <h2 className="text-3xl font-bold mb-8">Open source sponsoring</h2>
          <p className="text-on md:text-center text-lg">
            We ❤️ open the source community and we are happy to support it.
          </p>

          <Link
            href="https://docs.argos-ci.com/open-source"
            className="group/link mt-3 text-on-light hover:text-on transition-colors duration-150 ease-in-out"
          >
            Read more about our open source sponsoring program
            <ArrowRightIcon className="h-3 w-3 shrink-0 transition-transform duration-150 ease-in-out group-hover/link:translate-x-0.5 inline-block ml-2 -mt-0.5" />
          </Link>
        </div>
      </div>

      <Container className="flex flex-col items-center gap-6 text-center mb-24">
        <div className="mt-20 w-full">
          <div className="uppercase tracking-[.25em] text-sm font-semibold mb-8">
            Trusted by the best frontend teams
          </div>
          <BrandTestimonials />
        </div>

        <h2 className="text-3xl font-bold mt-20">How much does it cost?</h2>
        <Simulator />

        <h2 className="text-4xl font-bold mt-24 mb-8">FAQs</h2>
        <Accordion
          type="single"
          collapsible
          className="max-w-2xl w-full text-left"
        >
          <AccordionItem value="apart">
            <AccordionTrigger>
              What sets Argos apart from other visual testing tools?
            </AccordionTrigger>
            <AccordionContent>
              Argos focuses on providing a user-friendly experience with
              simplicity at its core. Currently, our unique features include
              managing flaky tests, and we are working on offering
              zero-configuration visual testing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="argos-plan">
            <AccordionTrigger>
              Which Argos plan is right for me?
            </AccordionTrigger>
            <AccordionContent>
              The Hobby plan is designed for personal GitHub repositories,
              providing up to {HOBBY_PLAN_SCREENSHOT_COUNT.toLocaleString()}{" "}
              screenshots. If you're seeking to collaborate as a team, need a
              higher screenshot limit, or wish to use Argos on a repository
              within a private GitHub organization, our Pro plan is the
              necessary choice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="mobile-testing">
            <AccordionTrigger>
              Can Argos be used for mobile app testing?
            </AccordionTrigger>
            <AccordionContent>
              Yes, Argos can be used for mobile app testing. As long as you can
              send screenshots to Argos, it can be used to test your app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="private">
            <AccordionTrigger>Are my screenshots private?</AccordionTrigger>
            <AccordionContent>
              Screenshots for open-source projects are public, while those for
              private repositories are restricted to team members. With the Pro
              plan, you can choose to restrict access to public repository
              screenshots to your team only.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="usage">
            <AccordionTrigger>How does Argos determine usage?</AccordionTrigger>
            <AccordionContent>
              Usage is calculated based on the number of screenshots uploaded
              during successful builds. Screenshots uploaded during failed
              builds are not counted towards your usage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="limit">
            <AccordionTrigger>
              What happens if I exceed the plan's screenshot limit?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Regular plans: </span> you
                  will not be able to upload any additional screenshots until
                  your billing period renews.
                </li>
                <li>
                  <span className="font-semibold">Usage-based plans:</span> you
                  will be charged for every additional screenshot.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="feedback">
            <AccordionTrigger>
              How can I get support or provide feedback and feature requests?
            </AccordionTrigger>
            <AccordionContent>
              For all plans, you can reach out to our customer support and
              provide feedback or request new features through our{" "}
              <Link
                href="https://argos-ci.com/discord"
                className="text-primary-300"
              >
                Argos Discord channel
              </Link>
              . Additionally, you can submit feature requests and feedback by{" "}
              <Link
                href="https://github.com/argos-ci/argos/issues"
                className="text-primary-300"
              >
                creating a GitHub issue
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </div>
  );
}