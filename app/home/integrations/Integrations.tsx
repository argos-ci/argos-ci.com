import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

import integrationsDark from "./integrations-dark.svg";
import integrationsLight from "./integrations-light.svg";

export function Integrations() {
  return (
    <Container
      className="flex flex-col-reverse items-center pb-16 pt-0 md:flex-row md:py-20 md:pt-16"
      asChild
    >
      <section>
        <div className="flex-1">
          <H2 className="mb-8">Integrate Argos today.</H2>
          <p className="mb-8 text-xl">
            Argos provides SDK integrations for test frameworks and CI/CD
            workflows. If you can capture screenshots, Argos is ready for you.
          </p>
          <div className="flex gap-4">
            <Button size="large" variant="primary" asChild>
              <a target="_blank" href="https://app.argos-ci.com/signup/">
                Start for free
              </a>
            </Button>
            <Button size="large" variant="outline" asChild>
              <a
                target="_blank"
                href="https://argos-ci.com/docs/getting-started"
              >
                Browse integrations
              </a>
            </Button>
          </div>
        </div>
        <div className="relative w-full flex-1 md:w-auto">
          <div className="flex aspect-square w-full">
            <Image
              src={integrationsLight.src}
              fill
              sizes="max-width: 768px 100vw, 544px"
              alt="Integrations like Playwright gravitating around Argos logo"
              className="dark:hidden"
            />
            <Image
              src={integrationsDark.src}
              fill
              sizes="max-width: 768px 100vw, 544px"
              alt="Integrations like Playwright gravitating around Argos logo"
              className="hidden dark:block"
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
