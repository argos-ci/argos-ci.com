import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Link } from "@/components/Link";

export function FAQ() {
  return (
    <>
      <AccordionItem value="flaky-screenshot">
        <AccordionTrigger>
          How Percy and Argos deal with flaky tests?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Percy</strong> technology helps minimize false positives but
            comes at a high cost and removes variations from each image of each
            build.
          </p>
          <p>
            <strong>Argos</strong> uses an algorithm that waits for page
            stabilization before taking a screenshot. This algorithm is
            open-source and embedded in every Argos integration.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ci-compatibility">
        <AccordionTrigger>
          Are Percy and Argos compatible with my CI?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Percy</strong> and <strong>Argos</strong> are
            compatible with most CI systems on the market.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="fine-grain-access-control">
        <AccordionTrigger>Can I control team members' access?</AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Percy</strong> and <strong>Argos</strong> allow you to
            control team members' access and permissions for each project.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pricing-transparency">
        <AccordionTrigger>
          Why is Percy pricing higher compared to Argos?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Percy</strong>, as part of BrowserStack, is geared towards
            enterprise-level solutions. With a large team and multiple products,
            their pricing structure reflects the comprehensive support and
            extensive resources they offer, which may not be cost-effective for
            smaller projects.
          </p>
          <p>
            Additionally, <strong>Percy</strong> captures screenshots remotely
            on real devices and browsers, ensuring high accuracy but also
            incurring higher operational costs compared to local screenshot
            solutions like <strong>Argos</strong>.
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
