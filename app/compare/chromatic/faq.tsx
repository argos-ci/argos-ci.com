import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Link } from "@/components/Link";

export function FAQ() {
  return (
    <>
      <AccordionItem value="main-difference">
        <AccordionTrigger>
          Main difference: snapshot vs screenshot
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Chromatic</strong> uses snapshots generated from Storybook
            stories and renders them in cloud browsers. This method ensures
            consistency but can sometimes result in minor variations, especially
            with dynamic content.
          </p>
          <p>
            <strong>Argos</strong> works by comparing screenshots sent by the
            user. If a difference is detected, you can easily update your test
            to avoid false positives.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flaky-screenshot">
        <AccordionTrigger>Are Chromatic tests flaky?</AccordionTrigger>
        <AccordionContent>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Chromatic</strong> mitigates flakiness by running tests in a
            standardized browser environment and using TurboSnap to minimize
            unnecessary snapshots.
          </p>
          <p>
            <strong>Argos</strong> uses an algorithm that waits for page
            stabilization before taking a screenshot. This algorithm is
            open-source and embedded in every Argos integration.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="managing-baseline">
        <AccordionTrigger>
          How do Chromatic and Argos manage baselines?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Chromatic</strong> and <strong>Argos</strong> allow you
            to manage baselines relative to git pull requests for feature
            development or to plan comparison workflows, recommended for QA /
            SDET involved in testing.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="parallelize-uploads">
        <AccordionTrigger>Can I parallelize uploads?</AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Chromatic</strong> supports parallelized tests by default,
            but additional configurations may be needed for optimized
            performance.
          </p>
          <p>
            <strong>Argos</strong> also supports parallel uploads, and it's
            included in the standard pricing.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ci-compatibility">
        <AccordionTrigger>
          Are Chromatic and Argos compatible with my CI?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Chromatic</strong> and <strong>Argos</strong> are
            compatible with most CI systems on the market.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="fine-grain-access-control">
        <AccordionTrigger>Can I control team members' access?</AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Chromatic</strong> and <strong>Argos</strong> allow you
            to control team members' access and permissions for each project.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pricing-transparency">
        <AccordionTrigger>
          Why is Chromatic pricing higher than Argos?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Chromatic</strong> provides extensive integration with
            Storybook, Playwright, and Cypress, and offers features like
            TurboSnap, responsive viewport testing, and broad browser coverage,
            which can contribute to higher operational costs.
          </p>
          <p>
            <strong>Argos</strong> offers{" "}
            <Link href="/pricing">transparent and affordable pricing</Link>,
            designed to be accessible for projects of all sizes. Custom pricing
            options are available for specific features or dedicated support
            requests.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="community-driven">
        <AccordionTrigger>What makes Argos community-driven?</AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Argos</strong> was founded by passionate developers. We
            actively engage with our users to discuss feature requests and
            understand their usage, ensuring our product roadmap aligns with
            real-world needs.
          </p>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
