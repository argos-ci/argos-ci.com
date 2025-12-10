import clsx from "clsx";
import {
  BellIcon,
  BugPlayIcon,
  GaugeIcon,
  GitGraphIcon,
  HandFistIcon,
  HeadsetIcon,
  HeartHandshakeIcon,
  ImagePlusIcon,
  ImagesIcon,
  LockKeyholeIcon,
  type LucideIcon,
  ScanEyeIcon,
  SlidersHorizontalIcon,
  UserCheckIcon,
} from "lucide-react";
import NextLink from "next/link";
import * as React from "react";
import { twc } from "react-twc";

import { Button, ButtonProps } from "@/components/Button";
import { Container } from "@/components/Container";
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
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
} from "@/lib/constants";

const PricingCardBody = twc.div`p-6 text-left text-low`;
const Title = twc.h3`text-xl font-semibold text-default font-accent`;
const Description = twc.div`my-2 md:h-12 last-of-type:mb-0`;
const PriceBadge = twc.div`text-(--violet-11) ml-auto w-fit rounded-sm border border-dashed border-(--violet-6) px-2.5 py-0.5 text-xs`;
const Paragraph = twc.p`block text-sm md:min-h-5`;

const Features = twc.ul`mt-4 mb-6 flex flex-col gap-4`;
const FeaturesCaption = twc(Paragraph)``;

function Feature(props: {
  children: React.ReactNode;
  icon: LucideIcon;
  className?: string;
}) {
  const { icon: Icon, className, children } = props;
  return (
    <li className={clsx("flex items-start gap-2 leading-tight", className)}>
      <Icon className="mt-0.5 size-4 shrink-0 text-(--violet-11)" />
      {children}
    </li>
  );
}

function PricingCard(props: { children: React.ReactNode; emphasis?: boolean }) {
  const { children, emphasis } = props;
  return (
    <div
      className={clsx(
        "flex-1 shrink-0",
        emphasis && "bg-linear-to-b from-(--primary-2)",
      )}
    >
      {children}
    </div>
  );
}

function Price(props: {
  price: number;
  recurring: boolean;
  fixedPrice: boolean;
}) {
  const { price, recurring, fixedPrice } = props;
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
}

function CTA(
  props: ButtonProps & {
    children: React.ReactNode;
    href: string;
  },
) {
  const { children, href, ...rest } = props;
  return (
    <Button
      className="mt-10 mb-6 w-full justify-center"
      size="large"
      asChild
      {...rest}
    >
      <NextLink href={href} passHref>
        {children}
      </NextLink>
    </Button>
  );
}

export function PricingCards() {
  return (
    <Container
      noGutter
      className="grid grid-cols-1 justify-center border-x border-t max-md:*:not-last:border-b md:grid-cols-3 md:*:not-last:border-r"
    >
      <PricingCard>
        <PricingCardBody>
          <Title>Hobby Plan</Title>
          <Description>For personal projects.</Description>
          <Price price={0} recurring={false} fixedPrice={true} />
          <CTA href="https://app.argos-ci.com/login" variant="outline">
            Start Hobby Plan
          </CTA>

          <Features>
            <FeaturesCaption />
            <Feature icon={ImagesIcon}>
              Up to <LocalString value={ARGOS_HOBBY_SCREENSHOT_COUNT} />{" "}
              screenshots
            </Feature>
            <Feature icon={BugPlayIcon}>Unlimited Playwright Traces</Feature>
            <Feature icon={ScanEyeIcon}>Visual changes detection</Feature>
            <Feature icon={GitGraphIcon}>GitHub & GitLab integration</Feature>
            <Feature icon={HandFistIcon}>Community Support</Feature>
          </Features>
        </PricingCardBody>
      </PricingCard>

      <PricingCard emphasis>
        <PricingCardBody>
          <div className="flex items-center gap-2">
            <Title>Pro Plan</Title>
            <div className="rounded-full border border-(--primary-6) px-2.5 py-0.5 text-xs font-medium text-(--violet-11)">
              Popular
            </div>
          </div>
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
            <Feature icon={ImagesIcon}>
              Includes <LocalString value={ARGOS_PRO_FLAT_SCREENSHOT_COUNT} />{" "}
              screenshots
            </Feature>
            <Feature icon={ImagePlusIcon}>
              Extra screenshots <LocalDollar value={ARGOS_SCREENSHOT_PRICE} />
              <br />
              for Storybook{" "}
              <LocalDollar value={ARGOS_STORYBOOK_SCREENSHOT_PRICE} />
            </Feature>
            <Feature icon={HeartHandshakeIcon}>Collaborative review</Feature>
            <Feature icon={BellIcon}>Slack notifications</Feature>
            <Feature icon={HeadsetIcon}>Pro Support</Feature>
            <div className="mt-4 text-sm font-medium">Optional</div>
            <Feature icon={LockKeyholeIcon}>
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
          <Title>Enterprise</Title>
          <Description>Tailored solutions with premium features.</Description>
          <div className="text-default my-6 flex items-baseline pt-2 text-3xl font-semibold md:mt-12">
            Custom
          </div>
          <CTA href="mailto:contact@argos-ci.com" variant="outline">
            Contact Sales
          </CTA>

          <Features>
            <FeaturesCaption>Everything in Pro, plus:</FeaturesCaption>
            <Feature icon={ImagesIcon}>Custom screenshot number</Feature>
            <Feature icon={LockKeyholeIcon}>SAML SSO</Feature>
            <Feature icon={SlidersHorizontalIcon}>
              Fine-grained access control
            </Feature>
            <Feature icon={UserCheckIcon}>Dedicated support</Feature>
            <Feature icon={GaugeIcon}>
              <LocalPercentage value={0.9999} /> uptime SLA
            </Feature>
          </Features>
        </PricingCardBody>
      </PricingCard>
    </Container>
  );
}
