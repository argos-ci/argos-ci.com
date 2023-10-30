import { Container } from "@/components/Container";
import { H2 } from "../common/H2";
import Image from "next/image";
import integrationsDark from "./integrations-dark.png";
import integrationsLight from "./integrations-light.png";

export function Integrations() {
  return (
    <Container className="py-20 flex justify-between items-center" asChild>
      <section>
        <div>
          <H2 className="mb-8">Integrate Argos today.</H2>
          <p className="text-xl">
            Argos provides SDK integrations for test frameworks and CI/CD
            workflows. If you can capture screenshots, Argos is ready for you.
          </p>
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
