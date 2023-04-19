/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/Button";
import { CardParagraph } from "@/components/Card";
import { CardTitle } from "@/components/Card";
import { Card, CardBody } from "@/components/Card";
import { Container } from "@/components/Container";
import { Head } from "@/components/Head";
import { Link } from "@/components/Link";
import { MagicTooltip } from "@/components/Tooltip";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import antDesign from "@/images/brands/ant-design.svg";
import doctolib from "@/images/brands/doctolib.svg";
import gitbook from "@/images/brands/gitbook.svg";
import mui from "@/images/brands/mui.svg";
import * as Ariakit from "@ariakit/react";

import { ReactNode } from "react";
import { Testimonials } from "@/components/Testimonials";

const HOBBY_PLAN_SCREENSHOT_COUNT = 5000;
const PRO_PLAN_SCREENSHOT_COUNT = 15000;

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const disclosure = Ariakit.useDisclosureStore();
  return (
    <div>
      <Ariakit.Disclosure
        store={disclosure}
        className="button flex gap-2 items-center justify-between font-semibold group py-3 w-full my-2"
      >
        {title}
        <ChevronDownIcon className="w-4 h-4 shrink-0 group-aria-expanded:rotate-180 transition" />
      </Ariakit.Disclosure>
      <Ariakit.DisclosureContent store={disclosure}>
        <div className="pb-5">{children}</div>
      </Ariakit.DisclosureContent>
    </div>
  );
};

const ExampleCostSection = ({
  totalDevelopers,
  totalPushes,
  screenshotCount,
}: {
  totalDevelopers: number;
  totalPushes: number;
  screenshotCount: number;
}) => {
  const dailyUsage = totalDevelopers * totalPushes * screenshotCount;
  const monthlyUsage = dailyUsage * 20;
  const price = 30 + (monthlyUsage - PRO_PLAN_SCREENSHOT_COUNT) / 500;

  return (
    <div>
      <p className="text-2xl  text-on antialiased">
        <span className="text-on-light">A team of </span>
        {totalDevelopers} developers
        <span className="text-on-light"> each pushing</span> 5 times daily{" "}
        <span className="text-on-light">
          on a <br />
          project with
        </span>{" "}
        200 screenshots
      </p>

      <div className="mt-8 grid grid-cols-[repeat(4,max-content)] gap-y-2 gap-x-2 text-right text-on-light justify-center text-lg">
        <div>Daily usage:</div>
        <div className="text-left">
          {totalDevelopers} x {totalPushes} x {screenshotCount}
        </div>
        <div>=</div>
        <div>{dailyUsage.toLocaleString()} screenshots</div>

        <div>Monthly usage: </div>
        <div className="text-left">
          {totalDevelopers} x {totalPushes} x {screenshotCount} x 20
        </div>
        <div>=</div>
        <div className="text-on">
          {monthlyUsage.toLocaleString()} screenshots
        </div>
      </div>

      <p className="mt-6 text-xl">
        Which costs me $30 + ({monthlyUsage.toLocaleString()} -{" "}
        {PRO_PLAN_SCREENSHOT_COUNT.toLocaleString()}) /500 =
        <span className="text-on"> ${price} per month</span>
      </p>
    </div>
  );
};

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

const Features = ({ children }: { children: ReactNode }) => (
  <ul className="my-6 flex flex-col gap-4">{children}</ul>
);

const Feature = ({ children }: { children: ReactNode }) => (
  <li className="flex gap-2">
    <CheckCircleIcon className="h-5 w-5 shrink-0 text-on" />
    <div className="leading-tight">{children}</div>
  </li>
);

const PricingCard = ({
  children,
  emphasis,
}: {
  children: ReactNode;
  emphasis?: boolean;
}) => (
  <Card
    className={clsx(
      "flex-1 shrink-0 basis-72",
      emphasis ? "border-2 border-slate-500 pt-4" : "mt-4"
    )}
  >
    {children}
  </Card>
);

const PricingCardBody = ({ children }: { children: ReactNode }) => (
  <CardBody className="p-8 text-left text-on-light antialiased">
    {children}
  </CardBody>
);

const Title = ({ children }: { children: ReactNode }) => (
  <CardTitle className="text-on">{children}</CardTitle>
);

const Description = ({ children }: { children: ReactNode }) => (
  <CardParagraph className="h-12">{children}</CardParagraph>
);

const Badges = ({ children }: { children?: ReactNode }) => (
  <div className="block h-8">{children}</div>
);

export default function Pricing() {
  return (
    <div className="flex flex-col gap-[176px] md:gap-[240px]">
      <Head title="Argos - Pricing plans" />

      <Container className="mt-6 flex flex-col items-center gap-6 text-center mb-24">
        <h1 className="my-8 bg-clip-text text-4xl font-bold sm:text-6xl sm:leading-tight">
          Pricing plans
        </h1>

        <div className="flex flex-wrap gap-6">
          <PricingCard>
            <PricingCardBody>
              <Badges />
              <Title>Hobby</Title>
              <Description>
                Ideal for personal projects and individual use.
              </Description>
              <Price amount={0} recurring={false} fixedPrice={true} />
              <Button className="my-6 w-full text-on" variant="outline">
                {(buttonProps) => (
                  <Link {...buttonProps} href="/">
                    <div className="flex w-full justify-center text-base">
                      Subscribe to Hobby Plan
                    </div>
                  </Link>
                )}
              </Button>
              <Features>
                <Feature>Single-user access</Feature>
                <Feature>
                  {HOBBY_PLAN_SCREENSHOT_COUNT.toLocaleString()} screenshots per
                  month
                </Feature>
                <Feature>Personal GitHub repositories only</Feature>
                <Feature>Basic support</Feature>
              </Features>
            </PricingCardBody>
          </PricingCard>

          <PricingCard emphasis>
            <PricingCardBody>
              <Badges>
                <div className="mb-10 w-fit rounded border border-slate-500 px-2.5 py-0.5 text-xs  font-medium text-primary-400">
                  Most popular
                </div>
              </Badges>
              <Title>Pro</Title>
              <Description>Designed for team collaboration.</Description>
              <Price amount={30} recurring={true} fixedPrice={false} />
              <Button className="my-6 w-full text-on">
                {(buttonProps) => (
                  <Link {...buttonProps} href="/">
                    <div className="flex w-full justify-center  text-base">
                      Start a free trial
                    </div>
                  </Link>
                )}
              </Button>
              <Features>
                <Feature>Unlimited team members</Feature>
                <Feature>
                  {PRO_PLAN_SCREENSHOT_COUNT.toLocaleString()} screenshots{" "}
                  <span className="whitespace-nowrap ">
                    included
                    <MagicTooltip
                      tooltip="Then $1 per 500 screenshots"
                      timeout={0}
                    >
                      <CurrencyDollarIcon className="ml-1 inline-block h-4 w-4 text-on" />
                    </MagicTooltip>
                  </span>
                </Feature>
                <Feature>Access to organization GitHub repositories</Feature>
                <Feature>Team collaboration tools</Feature>
                <Feature>Priority support</Feature>
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
              <Button className="my-6 w-full text-on" variant="outline">
                {(buttonProps) => (
                  <Link {...buttonProps} href="/">
                    <div className="flex w-full justify-center text-base">
                      Contact Sales
                    </div>
                  </Link>
                )}
              </Button>
              <Features>
                <Feature>Unlimited users</Feature>
                <Feature>Custom screenshot allowance</Feature>
                <Feature>Access to organization GitHub repositories</Feature>
                <Feature>Custom data retention policies</Feature>
                <Feature>Dedicated account manager</Feature>
                <Feature>Premium support</Feature>
              </Features>
            </PricingCardBody>
          </PricingCard>
        </div>

        <div className="mt-20 w-full">
          <div className="uppercase tracking-[.25em] text-sm font-semibold mb-8">
            Trusted by the best frontend teams
          </div>
          <Testimonials>
            <Image
              className="testimonial"
              priority={true}
              src={antDesign}
              alt="Ant Design"
            />
            <Image
              className="testimonial"
              priority={true}
              src={mui}
              alt="MUI"
              style={{ marginTop: -5 }}
            />
            <Image
              className="testimonial"
              priority={true}
              src={doctolib}
              alt="Doctolib"
            />
            <Image
              className="testimonial"
              priority={true}
              src={gitbook}
              alt="GitBook"
            />
          </Testimonials>
        </div>

        <h2 className="text-3xl font-bold mt-20">How much does it cost?</h2>
        <ExampleCostSection
          totalDevelopers={5}
          totalPushes={3}
          screenshotCount={200}
        />

        <h2 className="text-4xl font-bold mt-24 mb-8">FAQs</h2>
        <div className="grid divide-y divide-border divider-border text-left border-y border-border antialiased w-[600px]">
          <Accordion title="What sets Argos apart from other visual testing tools?">
            Argos focuses on providing a user-friendly experience with
            simplicity at its core. Currently, our unique features include
            managing flaky tests, and we are working on offering
            zero-configuration visual testing.
          </Accordion>
          <Accordion title="Which Argos plan is right for me?">
            Our Hobby plan is ideal for personal GitHub repositories offering up
            to {HOBBY_PLAN_SCREENSHOT_COUNT.toLocaleString()} screenshots. Pro
            is required for teams collaboration, higher screenshot limits, or
            need to use Argos with GitHub organization repositories.
          </Accordion>
          <Accordion title="Can Argos be used for mobile app testing?">
            Yes, Argos can be used for mobile app testing. As long as you can
            send screenshots to Argos, it can be used to test your app.
          </Accordion>
          <Accordion title="Are my screenshots private?">
            Screenshots for open-source projects are public, while those for
            private repositories are restricted to team members. With the Pro
            plan, you can choose to restrict access to public repository
            screenshots to your team only.
          </Accordion>
          <Accordion title="How does Argos determine usage?">
            Usage is calculated based on the number of screenshots uploaded
            during successful builds. Screenshots uploaded during failed builds
            are not counted towards your usage.
          </Accordion>
          <Accordion title="What occurs if I surpass my screenshot limit?">
            <span className="font-semibold">Hobby plan:</span> you will be
            unable to upload new screenshots.
            <br />
            <span className="font-semibold">Pro plan:</span> you will be charged
            an additional $1 for every 500 screenshots beyond the limit.
          </Accordion>
          <Accordion title="How can I get support or provide feedback and feature requests?">
            For all plans, you can reach out to our customer support and provide
            feedback or request new features through our{" "}
            <Link
              href="https://discord.gg/pK79sv85Vg"
              className="text-primary-400"
            >
              Argos Discord channel
            </Link>
            . Additionally, you can submit feature requests and feedback by{" "}
            <Link
              href="https://github.com/argos-ci/argos/issues"
              className="text-primary-400"
            >
              creating a GitHub issue
            </Link>
            .
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
