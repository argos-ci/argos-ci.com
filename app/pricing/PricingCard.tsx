import clsx from "clsx";
import { CheckCircleIcon, CircleIcon, InfoIcon } from "lucide-react";
import * as React from "react";
import { twc } from "react-twc";

import { Button, ButtonProps } from "@/components/Button";
import { Link } from "@/components/Link";
import { Tooltip } from "@/components/Tooltip";

import { dollarFormatter } from "./DollarFormatter";

const PricingCardBody = twc.div`p-8 text-left text-low`;
const Title = twc.div`mb-2 text-xl font-semibold text`;
const Description = twc.div`my-2 h-12 last-of-type:mb-0`;
const Badges = twc.div`block h-8`;
const Badge = twc.div`text-primary-300 mb-10 w-fit rounded border border-violet-6 px-2.5 py-0.5 text-xs font-medium text`;
const Paragraph = twc.p`block text-sm min-h-5`;

const Features = twc.ul`mt-4 mb-6 flex flex-col gap-4`;
const FeaturesCaption = twc(Paragraph)``;
const Feature = ({
  children,
  optional,
  className,
}: {
  children: React.ReactNode;
  optional?: boolean;
  className?: string;
}) => {
  const Icon = optional ? CircleIcon : CheckCircleIcon;
  return (
    <li className={clsx("flex items-center gap-2 leading-tight", className)}>
      <Icon className="size-4 shrink-0 text-violet-11" />
      {children}
    </li>
  );
};

const InfoTooltip = (props: { children: React.ReactNode }) => {
  return (
    <Tooltip content={props.children}>
      <InfoIcon className="-mt-[2px] ml-1 inline-block h-5 w-5 text" />
    </Tooltip>
  );
};

const PricingCard = ({
  children,
  emphasis,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) => (
  <div
    className={clsx(
      "border-border w-full flex-1 shrink-0 basis-80 rounded-xl border bg-violet-1",
      emphasis ? "border-2 border-violet-6 pt-4" : "md:mt-4",
    )}
  >
    {children}
  </div>
);

const Price = ({
  amount,
  recurring,
  fixedPrice,
}: {
  amount: number;
  recurring: boolean;
  fixedPrice: boolean;
}) => (
  <div className="flex flex-col gap-1 pt-6">
    <Paragraph>{fixedPrice ? null : "Starting at"}</Paragraph>
    <div className="flex items-baseline">
      <span className="text-3xl font-semibold text">
        <span className="tracking-tight">{dollarFormatter.format(amount)}</span>
      </span>
      {recurring && <span className="ml-1 text-lg text-low">/mo</span>}
    </div>
    <Paragraph>
      {fixedPrice ? "forever" : "Billed monthly based on usage"}
    </Paragraph>
  </div>
);

const CTA = ({
  children,
  href,
  ...props
}: ButtonProps & {
  children: React.ReactNode;
  href: string;
}) => (
  <Button
    className="mb-6 mt-10 w-full justify-center"
    size="large"
    asChild
    {...props}
  >
    <Link href={href} passHref>
      {children}
    </Link>
  </Button>
);

export const PricingCards = ({
  hobbyPlanScreenshotCount,
  proPlanFlatPrice,
  proPlanScreenshotCount,
  additionalScreenshotPrice,
  githubSSOPrice,
}: {
  hobbyPlanScreenshotCount: number;
  proPlanFlatPrice: number;
  proPlanScreenshotCount: number;
  additionalScreenshotPrice: number;
  githubSSOPrice: number;
}) => (
  <div className="grid w-full grid-cols-1 justify-center gap-6 md:grid-cols-3">
    <PricingCard>
      <PricingCardBody>
        <Badges />
        <Title>Hobby Plan</Title>
        <Description>For personal projects.</Description>
        <Price amount={0} recurring={false} fixedPrice={true} />
        <CTA href="https://app.argos-ci.com/login" variant="outline">
          Start Hobby Plan
        </CTA>

        <Features>
          <FeaturesCaption />
          <Feature>
            Up to {hobbyPlanScreenshotCount.toLocaleString()} screenshots
          </Feature>
          <Feature>Unlimited Playwright Traces</Feature>
          <Feature>Visual changes detection</Feature>
          <Feature>GitHub & GitLab integration</Feature>
          <Feature>Community Support</Feature>
        </Features>
      </PricingCardBody>
    </PricingCard>

    <PricingCard emphasis>
      <PricingCardBody>
        <Badges>
          <Badge>Most Popular</Badge>
        </Badges>
        <Title>Pro Plan</Title>
        <Description>Unlimited screenshots and team collaboration.</Description>
        <Price amount={proPlanFlatPrice} recurring={true} fixedPrice={false} />
        <CTA href="https://app.argos-ci.com/signup?plan=pro">
          Start Free Trial
        </CTA>

        <Features>
          <FeaturesCaption>Everything in Hobby, plus:</FeaturesCaption>
          <Feature>
            Includes {proPlanScreenshotCount.toLocaleString()} screenshots
          </Feature>
          <Feature>
            {dollarFormatter.format(additionalScreenshotPrice)} per extra
            screenshot
          </Feature>
          <Feature>Pro Support</Feature>
          <Feature>Collaborative review</Feature>
          <div className="mt-4 text-sm font-medium">Optional</div>
          <Feature optional>
            GitHub SSO
            <div className="text-primary-300 ml-auto w-fit rounded border border-dashed border-violet-6 px-2.5 py-0.5 text-xs">
              {dollarFormatter.format(githubSSOPrice)} /mo
            </div>
          </Feature>
        </Features>
      </PricingCardBody>
    </PricingCard>

    <PricingCard>
      <PricingCardBody>
        <Badges />
        <Title>Enterprise</Title>
        <Description>Tailored solutions with premium features.</Description>
        <div className="mb-6 mt-12 flex items-baseline pt-2 text-3xl font-semibold text">
          Custom
        </div>
        <CTA href="mailto:contact@argos-ci.com" variant="outline">
          Contact Sales
        </CTA>

        <Features>
          <FeaturesCaption>Everything in Pro, plus:</FeaturesCaption>
          <Feature>Custom amount of screenshots</Feature>
          <Feature>Dedicated Support</Feature>
          <Feature>GitHub SSO</Feature>
          <Feature>SAML authentication</Feature>
          <Feature>SLA for 99.99% Uptime</Feature>
        </Features>
      </PricingCardBody>
    </PricingCard>
  </div>
);
