import clsx from "clsx";
import { ArrowUpRightIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

import cypressDark from "./logos/dark/cypress.png";
import nextjsDark from "./logos/dark/next-js.png";
import playwrightDark from "./logos/dark/playwright.png";
import reactRouterDark from "./logos/dark/react-router.png";
import storybookDark from "./logos/dark/storybook.png";
import webdriverioDark from "./logos/dark/webdriverio.png";
import cypressLight from "./logos/light/cypress.png";
import nextjsLight from "./logos/light/next-js.png";
import playwrightLight from "./logos/light/playwright.png";
import reactRouterLight from "./logos/light/react-router.png";
import storybookLight from "./logos/light/storybook.png";
import webdriverioLight from "./logos/light/webdriverio.png";

function SdkCard(props: {
  href: string;
  lightImgSrc: StaticImageData;
  darkImgSrc: StaticImageData;
  title: string;
  description: React.ReactNode;
}) {
  const imgProps = {
    alt: props.title,
    width: 140,
    height: 140,
    className:
      "mb-5 size-12 origin-top-left transition duration-300 group-hover:scale-125",
  };
  return (
    <a
      href={props.href}
      target="_blank"
      className="group hover:bg-primary-subtle flex flex-1 flex-col items-start rounded-sm border p-4 transition duration-300 hover:border-(--violet-8)"
    >
      <Image
        {...imgProps}
        src={props.lightImgSrc}
        className={clsx(imgProps.className, "dark:hidden")}
      />
      <Image
        {...imgProps}
        src={props.darkImgSrc}
        className={clsx(imgProps.className, "hidden dark:block")}
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
        <p className="text-low mb-12 text-lg md:text-xl">
          Argos provides SDK integrations for test frameworks and CI/CD
          workflows. If you can capture screenshots, Argos is ready for you.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SdkCard
            href="/docs/quickstart/playwright"
            lightImgSrc={playwrightLight}
            darkImgSrc={playwrightDark}
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
            lightImgSrc={cypressLight}
            darkImgSrc={cypressDark}
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
            lightImgSrc={webdriverioLight}
            darkImgSrc={webdriverioDark}
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
            lightImgSrc={storybookLight}
            darkImgSrc={storybookDark}
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
            lightImgSrc={nextjsLight}
            darkImgSrc={nextjsDark}
            title="Next.js"
            description={
              <>
                Integrate Argos with Next.js to ensure consistent visual
                rendering in server-side and client-side React applications.
              </>
            }
          />
          <SdkCard
            href="/docs/quickstart/react-router"
            lightImgSrc={reactRouterLight}
            darkImgSrc={reactRouterDark}
            title="React Router (Remix)"
            description={
              <>
                Pair Argos with React Router for robust visual testing, ensuring
                UI consistency in your full-stack React applications.
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
