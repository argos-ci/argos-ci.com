import { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { getMetadata } from "@/lib/metadata";

import { TrustedBy } from "../common/TrustedBy";
import {
  SectionHeader,
  SectionHeaderTexts,
} from "../home/common/SectionHeader";
import { SectionDescription, SectionTitle } from "../home/common/Typography";
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

export default function SecurityPage() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-60 md:py-24">
          <FullPageGrid height="h-200 md:h-60" />
          <Hero align="center" className="relative">
            <HeroHeading>Security</HeroHeading>
            <HeroDescription>
              Argos is committed to the security and privacy of our customers’
              data.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <section className="border-b px-4">
        <Container className="border-x">
          <div className="flex items-center justify-between p-8 md:justify-center md:gap-10 md:p-10">
            <NextLink href="/security/soc-2">
              <Image
                src={aicpa}
                alt="SOC 2 badge"
                className="size-18 md:size-32"
              />
            </NextLink>
            <NextLink href="/security/gdpr">
              <Image
                src={gdprCompliant}
                alt="GDPR Compliant logo"
                className="size-18 md:size-32"
              />
            </NextLink>
          </div>
        </Container>
      </section>
      <section className="border-b px-4">
        <Container noGutter className="border-x">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <SectionTitle>SOC 2 Compliant</SectionTitle>
              <SectionDescription>
                We partner with third-party firms to conduct regular audits.
                This isn’t a short-term growth play but a long-term security
                investment.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <NextLink href="/security/soc-2">See SOC 2 details</NextLink>
            </Button>
          </SectionHeader>
          <SecurityControls categories={SECURITY_CONTROL_CATEGORIES} />
        </Container>
      </section>
      <section className="border-b px-4">
        <Container noGutter className="border-x pb-16">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <SectionTitle>GDPR Compliant</SectionTitle>
              <SectionDescription>
                We have made it a priority to protect your data, organize
                evidence for compliance, and comply with the rights of the
                people living in the EU.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <NextLink href="/security/gdpr">See GDPR details</NextLink>
            </Button>
          </SectionHeader>
          <GDPRFeatures features={GDPR_FEATURES} />
        </Container>
      </section>
      <section className="border-b px-4">
        <Container noGutter className="border-x">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <SectionTitle>Responsible Disclosure</SectionTitle>
              <SectionDescription>
                We value the inputs from the community to help us detect
                vulnerabilities. If you believe you have found a security
                vulnerability, please follow the instructions to report it.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <NextLink href="https://github.com/argos-ci/argos/security/policy">
                Report vulnerability
              </NextLink>
            </Button>
          </SectionHeader>
        </Container>
      </section>
      <TrustedBy />
      <section className="px-4">
        <Container className="border-x py-12 md:py-18">
          <SectionTitle className="mx-auto mb-10 max-w-2xl">
            Frequently Asked Questions
          </SectionTitle>
          <FAQAccordion questions={SECURITY_QUESTIONS} />
        </Container>
      </section>
      <CallToActionSection />
    </>
  );
}
