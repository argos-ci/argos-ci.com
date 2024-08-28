import { ArrowUpRightIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

import cypress from "./logos/cypress.png";
import nextjs from "./logos/next-js.png";
import playwright from "./logos/playwright.png";
import remix from "./logos/remix.png";
import storybook from "./logos/storybook.png";
import webdriverio from "./logos/webdriverio.png";

function SdkCard(props: {
  href: string;
  imgSrc: StaticImageData;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      className="group flex flex-1 flex-col items-start rounded border p-4 transition duration-300 hover:border-violet-8 hover:bg-primary-subtle"
    >
      <Image
        src={props.imgSrc}
        alt={props.title}
        width={48}
        height={48}
        className="mb-8 origin-top-left transition duration-300 group-hover:scale-125"
      />
      <h3 className="mb-1 flex items-center gap-1 text-xl font-semibold">
        {props.title}
        <ArrowUpRightIcon className="text-low" strokeWidth={1} />
      </h3>
      <p className="flex-1">{props.description}</p>
    </a>
  );
}

export function FeaturedSDKs() {
  return (
    <Container asChild className="py-16 md:py-20">
      <section>
        <H2 className="mb-6">Setup visual testing in minutes.</H2>
        <p className="mb-12 text-lg text-low md:text-xl">
          Argos provides SDK integrations for test frameworks and CI/CD
          workflows. If you can capture screenshots, Argos is ready for you.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SdkCard
            href="/docs/quickstart/playwright"
            imgSrc={playwright}
            title="Playwright"
            description={
              <>
                Integrate Argos with Playwright to ensure seamless visual
                testing across all browsers.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/cypress"
            imgSrc={cypress}
            title="Cypress"
            description={
              <>
                Use Argos with Cypress to automatically detect regressions in
                your frontend applications across all browsers.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/webdriverio"
            imgSrc={webdriverio}
            title="WebdriverIO"
            description={
              <>
                Argos complements WebdriverIO for efficient cross-platform
                visual testing on both iOS and Android devices.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/storybook"
            imgSrc={storybook}
            title="Storybook"
            description={
              <>
                Leverage Argos with Storybook to visually test and catch UI
                regressions in isolated components.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/next-js"
            imgSrc={nextjs}
            title="Next.js"
            description={
              <>
                Integrate Argos with Next.js to ensure consistent visual
                rendering in server-side and client-side React applications.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/remix"
            imgSrc={remix}
            title="Remix"
            description={
              <>
                Pair Argos with Remix for robust visual testing, ensuring UI
                consistency in your full-stack React applications.
              </>
            }
          />
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="large" variant="outline" asChild>
            <a target="_blank" href="https://argos-ci.com/docs/getting-started">
              Browse all our integrations
            </a>
          </Button>
        </div>
      </section>
    </Container>
  );
}
