import clsx from "clsx";
import { ArrowRightCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import type { ComponentPropsWithRef } from "react";
import { twc } from "react-twc";

import { Customers } from "@/app/home/Customers";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getMetadata } from "@/lib/metadata";

import aicpa from "./aicpa.png";
import gdprCompliant from "./gdpr-compliant.png";
import { GDPRFeatures, GDPR_FEATURES } from "./gdpr-features";
import {
  SECURITY_CONTROL_CATEGORIES,
  SecurityControls,
} from "./security-controls";
import { SECURITY_QUESTIONS } from "./security-faq";

export const metadata: Metadata = getMetadata({
  title: "Security",
  description:
    "Argos is committed to the security and privacy of our customers' data",
  pathname: "/security",
});

const Section = twc.div`my-20 md:my-40`;
const H1 = twc.div`font-accent mb-4 text-5xl md:text-6xl`;
const H2 = twc.div`font-accent mb-4 md:mb-10 mt-16 text-4xl md:text-5xl`;
const H3 = twc.div`font-accent mb-4 md:mt-16 md:mb-8 text-3xl md:text-4xl`;
const SubTitle = twc.p`text-low mx-auto max-w-2xl text-lg`;

function Link(props: ComponentPropsWithRef<typeof NextLink>) {
  const { className, children, ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={clsx(
        "group mt-6 mb-16 inline-flex items-center justify-center gap-2 underline underline-offset-4 hover:no-underline",
        className,
      )}
    >
      {children}
      <ArrowRightCircle className="mt-0.5 size-4 transition group-hover:translate-x-0.5" />
    </NextLink>
  );
}

export default function SecurityPage() {
  return (
    <Container className="my-20 text-center text-balance">
      <H1>Security</H1>
      <SubTitle>
        Argos is committed to the security and privacy of our customers' data.
      </SubTitle>
      <div className="mt-8 flex items-center justify-center gap-8">
        <NextLink href="/security/soc-2">
          <Image
            src={aicpa.src}
            width={136}
            height={136}
            alt="SOC 2 badge"
            quality={95}
          />
        </NextLink>
        <NextLink href="/security/gdpr">
          <Image
            src={gdprCompliant.src}
            width={150}
            height={150}
            alt="GDPR Compliant logo"
            quality={95}
          />
        </NextLink>
      </div>

      <Section>
        <H2>SOC 2 Compliant</H2>
        <SubTitle>
          We partner with third-party firms to conduct regular audits. This
          isn't a short-term growth play but a long-term security investment.
        </SubTitle>
        <Link href="/security/soc-2">See SOC 2 details</Link>
        <H3>Security Controls</H3>
        <SecurityControls categories={SECURITY_CONTROL_CATEGORIES} />
      </Section>

      <Section>
        <H2>GDPR Compliant</H2>
        <SubTitle>
          We have made it a priority to protect your data, organize evidence for
          compliance, and comply with the rights of the people living in the EU.
        </SubTitle>
        <Link href="/security/gdpr">See GDPR details</Link>
        <GDPRFeatures features={GDPR_FEATURES} />
      </Section>

      <Section>
        <H2>Responsible Disclosure</H2>
        <p>
          We value the inputs from the community to help us detect
          vulnerabilities. If you believe you have found a security
          vulnerability, please follow the instructions to report it.
        </p>
        <Link href="https://github.com/argos-ci/argos/security/policy">
          Report vulnerability
        </Link>
      </Section>

      <Customers />

      <Section>
        <section>
          <H2 className="mb-12 text-center">Security FAQ</H2>
          <FAQAccordion questions={SECURITY_QUESTIONS} />
        </section>
      </Section>
    </Container>
  );
}
