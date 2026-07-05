import {
  FileCheckIcon,
  GavelIcon,
  LockKeyholeIcon,
  ScaleIcon,
} from "lucide-react";
import { Metadata } from "next";
import NextLink from "next/link";

import { Button } from "@/components/Button";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { GdprLogo } from "@/components/icons/GdprLogo";
import { Soc2Logo } from "@/components/icons/Soc2Logo";
import { getMetadata } from "@/lib/metadata";

import { TrustedBy } from "../common/TrustedBy";
import { GDPRFeatures, GDPR_FEATURES } from "./gdpr-features";
import {
  SECURITY_HIGHLIGHTS,
  SecurityHighlights,
} from "./security-controls";
import { SECURITY_QUESTIONS } from "./security-faq";

export const metadata: Metadata = getMetadata({
  title: "Security",
  description:
    "Argos is SOC 2 Type II compliant, GDPR compliant, and fully open source. Encrypted tokens, screenshots on secure S3, and security you can audit line by line.",
  pathname: "/security",
});

const GDPR_RIGHTS = [
  "Know how their data is used",
  "Access and correct their data",
  "Delete their data",
  "Limit or object to processing",
  "Data portability",
  "Protection from solely automated decisions",
];

export default function SecurityPage() {
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-60 md:py-24">
          <FullPageGrid height="h-200 md:h-60" />
          <Hero align="center" className="relative">
            <HeroHeading>Security you can audit</HeroHeading>
            <HeroDescription>
              SOC 2 Type II, GDPR compliant, and fully open source. We protect
              your data with strong controls, and let you verify every one of
              them.
            </HeroDescription>
          </Hero>
        </Container>
      </div>

      <section className="border-b px-4">
        <Container noGutter className="border-x">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <ComplianceBadge
              href="#soc-2"
              label="SOC 2 Type II"
              caption="Independently audited security controls"
              logo={<Soc2Logo className="h-12 w-auto" />}
            />
            <ComplianceBadge
              href="#gdpr"
              label="GDPR compliant"
              caption="Privacy and data protection for the EU"
              logo={<GdprLogo className="h-16 w-auto" />}
            />
          </div>
        </Container>
      </section>

      <section className="border-b px-4">
        <Container noGutter className="border-x">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <SectionTitle>How we keep your data safe</SectionTitle>
              <SectionDescription>
                The essentials, without the security-theater checklist. Every
                claim below is enforced in code you can read.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <SecurityHighlights highlights={SECURITY_HIGHLIGHTS} />
        </Container>
      </section>

      <section id="soc-2" className="scroll-mt-24 border-b px-4">
        <Container noGutter className="border-x">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <Chip icon={FileCheckIcon}>SOC 2 Type II</Chip>
              <SectionTitle>Independently audited, continuously</SectionTitle>
              <SectionDescription>
                SOC 2 is the AICPA framework for how organizations manage
                customer data across security, availability, processing
                integrity, confidentiality, and privacy. Type II verifies our
                controls work over time, not just on paper. This is a long-term
                security investment, not a short-term growth play.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <NextLink href="/trust-center">Request the report</NextLink>
            </Button>
          </SectionHeader>
          <div className="container-gutter grid grid-cols-1 gap-8 border-t pt-8 pb-12 text-left sm:grid-cols-3">
            <div>
              <div className="text-low text-sm">Framework</div>
              <div className="mt-1 font-medium">AICPA SOC 2 Type II</div>
            </div>
            <div>
              <div className="text-low text-sm">Auditor</div>
              <div className="mt-1 font-medium">
                <a
                  href="https://prescientassurance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Prescient Security
                </a>
              </div>
            </div>
            <div>
              <div className="text-low text-sm">Continuous monitoring</div>
              <div className="mt-1 font-medium">
                <a
                  href="https://vanta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Vanta
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="gdpr" className="scroll-mt-24 border-b px-4">
        <Container noGutter className="border-x pb-12">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <Chip icon={ScaleIcon}>GDPR</Chip>
              <SectionTitle>Privacy built into the product</SectionTitle>
              <SectionDescription>
                Many of our customers are based in Europe or serve European
                users. We align our operations with GDPR, from how we handle
                data to how we design our systems. Data is stored in the US, with
                Standard Contractual Clauses covering lawful EU transfers.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline" asChild>
              <NextLink href="/privacy">Read the privacy policy</NextLink>
            </Button>
          </SectionHeader>
          <div className="container-gutter mt-2 mb-12 border-t pt-8">
            <div className="text-low mb-4 text-sm font-medium">
              GDPR gives individuals the right to:
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-left sm:grid-cols-2">
              {GDPR_RIGHTS.map((right) => (
                <li key={right} className="flex items-start gap-2">
                  <GavelIcon
                    className="mt-0.5 size-4 shrink-0 text-(--violet-9)"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm">{right}</span>
                </li>
              ))}
            </ul>
          </div>
          <GDPRFeatures features={GDPR_FEATURES} />
        </Container>
      </section>

      <section className="border-b px-4">
        <Container noGutter className="border-x">
          <SectionHeader className="container-gutter">
            <SectionHeaderTexts>
              <Chip icon={LockKeyholeIcon}>Responsible disclosure</Chip>
              <SectionTitle>Found something? Tell us</SectionTitle>
              <SectionDescription>
                We value input from the community to help us detect
                vulnerabilities. If you believe you have found a security issue,
                please follow our disclosure policy to report it.
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

function ComplianceBadge(props: {
  href: string;
  label: string;
  caption: string;
  logo: React.ReactNode;
}) {
  return (
    <NextLink
      href={props.href}
      className="group hover:bg-subtle flex flex-col items-center gap-5 p-8 text-center transition md:p-12"
    >
      <div className="text-low group-hover:text-default flex h-16 items-center transition">
        {props.logo}
      </div>
      <div>
        <div className="font-medium">{props.label}</div>
        <div className="text-low mt-0.5 text-sm">{props.caption}</div>
      </div>
    </NextLink>
  );
}
