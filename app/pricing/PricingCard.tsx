import clsx from "clsx";
import { CheckCircleIcon, CircleIcon } from "lucide-react";
import NextLink from "next/link";
import * as React from "react";
import { twc } from "react-twc";

import { Button, ButtonProps } from "@/components/Button";
import {
  LocalDollar,
  LocalPercentage,
  LocalString,
} from "@/components/IntlFormat";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
} from "@/lib/constants";

const PricingCardBody = twc.div`p-6 text-left text-low`;
const Title = twc.div`mb-2 text-xl font-semibold text-default`;
const Description = twc.div`my-2 h-12 last-of-type:mb-0`;
const Badges = twc.div`block h-8`;
const Badge = twc.div`text-(--violet-11) mb-10 w-fit rounded-sm border border-(--violet-6) px-2.5 py-0.5 text-xs font-medium text`;
const PriceBadge = twc.div`text-(--violet-11) ml-auto w-fit rounded-sm border border-dashed border-(--violet-6) px-2.5 py-0.5 text-xs`;
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
      <Icon className="size-4 shrink-0 text-(--violet-11)" />
      {children}
    </li>
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
      "border-border w-full flex-1 shrink-0 basis-80 rounded-xl border bg-(--violet-1)",
      emphasis ? "border-2 border-(--violet-6) pt-[calc(1rem-1px)]" : "md:mt-4",
    )}
  >
    {children}
  </div>
);

const Price = ({
  price,
  recurring,
  fixedPrice,
}: {
  price: number;
  recurring: boolean;
  fixedPrice: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1 pt-6">
      <Paragraph>{fixedPrice ? null : "Starting at"}</Paragraph>
      <div className="flex items-baseline">
        <span className="text-default text-3xl font-semibold tracking-tight">
          <LocalDollar value={price} />
        </span>
        {recurring && <span className="text-low ml-1 text-lg">/mo</span>}
      </div>
      <Paragraph>
        {fixedPrice ? "forever" : "Billed monthly based on usage"}
      </Paragraph>
    </div>
  );
};

const CTA = ({
  children,
  href,
  ...props
}: ButtonProps & {
  children: React.ReactNode;
  href: string;
}) => (
  <Button
    className="mt-10 mb-6 w-full justify-center"
    size="large"
    asChild
    {...props}
  >
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  </Button>
);

export function PricingCards() {
  return (
    <div className="grid w-full grid-cols-1 justify-center gap-6 md:grid-cols-3">
      <PricingCard>
        <PricingCardBody>
          <Badges />
          <Title>Hobby Plan</Title>
          <Description>For personal projects.</Description>
          <Price price={0} recurring={false} fixedPrice={true} />
          <CTA href="https://app.argos-ci.com/login" variant="outline">
            Start Hobby Plan
          </CTA>

          <Features>
            <FeaturesCaption />
            <Feature>
              Up to <LocalString value={ARGOS_HOBBY_SCREENSHOT_COUNT} />{" "}
              screenshots
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
          <Description>
            Unlimited screenshots and team collaboration.
          </Description>
          <Price
            price={ARGOS_PRO_FLAT_PRICE}
            recurring={true}
            fixedPrice={false}
          />
          <CTA href="https://app.argos-ci.com/signup?plan=pro">
            Start Free Trial
          </CTA>

          <Features>
            <FeaturesCaption>Everything in Hobby, plus:</FeaturesCaption>
            <Feature>
              Includes <LocalString value={ARGOS_PRO_FLAT_SCREENSHOT_COUNT} />{" "}
              screenshots
            </Feature>
            <Feature>
              <LocalDollar value={ARGOS_SCREENSHOT_PRICE} /> per extra
              screenshot
            </Feature>
            <Feature>Collaborative review</Feature>
            <Feature>Slack notifications</Feature>
            <Feature>Pro Support</Feature>
            <div className="mt-4 text-sm font-medium">Optional</div>
            <Feature optional>
              GitHub SSO
              <PriceBadge>
                <LocalDollar value={GITHUB_SSO_PRICE} /> /mo
              </PriceBadge>
            </Feature>
          </Features>
        </PricingCardBody>
      </PricingCard>

      <PricingCard>
        <PricingCardBody>
          <Badges />
          <Title>Enterprise</Title>
          <Description>Tailored solutions with premium features.</Description>
          <div className="text-default mt-12 mb-6 flex items-baseline pt-2 text-3xl font-semibold">
            Custom
          </div>
          <CTA href="mailto:contact@argos-ci.com" variant="outline">
            Contact Sales
          </CTA>

          <Features>
            <FeaturesCaption>Everything in Pro, plus:</FeaturesCaption>
            <Feature>Custom screenshot number</Feature>
            <Feature>SAML SSO</Feature>
            <Feature>Fine-grained access control</Feature>
            <Feature>Dedicated support</Feature>
            <Feature>
              <LocalPercentage value={0.9999} /> uptime SLA
            </Feature>
          </Features>
        </PricingCardBody>
      </PricingCard>
    </div>
  );
}
