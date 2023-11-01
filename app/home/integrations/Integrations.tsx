import { Container } from "@/components/Container";
import { H2 } from "../common/H2";
import Image from "next/image";
import integrationsDark from "./integrations-dark.png";
import integrationsLight from "./integrations-light.png";
import { Button } from "@/components/Button";

export function Integrations() {
  return (
    <Container
      className="py-16 md:py-20 flex flex-col-reverse md:flex-row justify-between items-center"
      asChild
    >
      <section>
        <div>
          <H2 className="mb-8">Integrate Argos today.</H2>
          <p className="text-xl mb-8">
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
        <Image
          src={integrationsLight.src}
          width={433}
          height={500}
          alt=""
          className="dark:hidden"
        />
        <Image
          src={integrationsDark.src}
          width={433}
          height={500}
          alt=""
          className="hidden dark:block"
        />
      </section>
    </Container>
  );
}
