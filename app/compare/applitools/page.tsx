import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { twc } from "react-twc";

import { Container, Section } from "@/components/Container";
import applitools from "@/images/brands/applitools-white.svg";

import { ArgosLogo } from "../../../components/ArgosLogo";
import { Button } from "../../../components/Button";
import { getMetadata } from "../../../lib/metadata";
import { PricingSlider } from "../../pricing/PricingSlider";
import {
  ADDITIONAL_SCREENSHOT_PRICE,
  PRO_PLAN_FLAT_PRICE,
  PRO_PLAN_SCREENSHOT_COUNT,
} from "../../pricing/page";
import { ApplitoolsFAQ } from "./ApplitoolsFAQ";
import { KeyFeatures } from "./KeyFeatures";
import { ProductComparisonTable } from "./ProductComparisonTable";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos, the alternative to Applitools",
  description:
    "Explore a detailed comparison of Argos and Applitools, focusing on features, performance, and ease of use in visual testing.",
  pathname: "/",
});

const SectionTitle = twc.h2`mb-6 font-accent text-4xl`;

const HeroIllustration = () => (
  <div className="relative flex h-48 sm:h-60">
    <div className="relative flex-1 bg-black">
      <Image
        src={applitools}
        alt="Applitools logo"
        fill
        className="px-5 sm:px-10 md:px-20"
      />
    </div>
    <div className="flex-1 place-content-center bg-primary-subtle">
      <ArgosLogo className="px-5 sm:px-10 md:px-20" />
    </div>
  </div>
);

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
          <HeroIllustration />
        </Section>

        <Section className="overflow-x-auto" $gutter>
          <ProductComparisonTable />
        </Section>

        <Section $gutter>
          <SectionTitle>Argos Price</SectionTitle>
          <PricingSlider
            proPlanFlatPrice={PRO_PLAN_FLAT_PRICE}
            proPlanScreenshotCount={PRO_PLAN_SCREENSHOT_COUNT}
            additionalScreenshotPrice={ADDITIONAL_SCREENSHOT_PRICE}
          />
        </Section>
      </Container>

      <section className="bg-primary-subtle">
        <Container className="pb-4 pt-10">
          <SectionTitle>Argos key features</SectionTitle>
          <KeyFeatures />
        </Container>
      </section>

      <Container className="flex flex-col gap-20 md:gap-24">
        <section className="text-center">
          <SectionTitle>Applitools / Argos FAQ</SectionTitle>
          <ApplitoolsFAQ />
        </section>

        <section>
          <SectionTitle>Ready to try?</SectionTitle>
          <p className="max-w-screen-sm">
            Finding the right visual testing tool can be challenging. We hope
            this guide makes the choice clearer. Argos is easy to try—set up
            your project in less than 10 minutes. No credit card required.
          </p>
          <div className="mt-4 flex gap-2">
            <Button>
              <Link href="https://app.argos-ci.com/signup">Sign up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://cal.com/jsfez">Request demo</Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
