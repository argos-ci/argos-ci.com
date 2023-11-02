import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

import { H2 } from "../common/H2";
import integrationsDark from "./integrations-dark.png";
import integrationsLight from "./integrations-light.png";

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
              <a target="_blank" href="https://argos-ci.com/docs/">
                Get started
              </a>
            </Button>
            <Button size="large" variant="outline" asChild>
              <a
                target="_blank"
                href="https://argos-ci.com/docs/category/integration-guides"
              >
                Browse integrations
              </a>
            </Button>
          </div>
        </div>
        <div className="relative flex-1 self-stretch">
          <Image
            src={integrationsLight.src}
            width={433}
            height={500}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt=""
            className="dark:hidden"
          />
          <Image
            src={integrationsDark.src}
            width={433}
            height={500}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt=""
            className="hidden dark:block"
          />
        </div>
      </section>
    </Container>
  );
}
