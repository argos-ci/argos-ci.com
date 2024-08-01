import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Link } from "@/components/Link";

export function FAQ() {
  return (
    <>
      <AccordionItem value="flaky-tests">
        <AccordionTrigger>
          Handling flaky tests: snapshots vs. screenshots
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Percy</strong> re-render <strong>snapshots</strong> of your
            code on their servers, then compare the diffs. This approach can
            cause flaky tests that are hard to debug, especially with complex
            JavaScript renders.
          </p>
          <p>
            <strong>Argos</strong> provides several integration to capture
            stable <strong>screenshots</strong> locally. If one of them is
            unstable, you can easily refine your tests to avoid false positives.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="managing-baseline">
        <AccordionTrigger>
          How do Percy and Argos manage baselines?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Percy</strong> and <strong>Argos</strong> allow you to
            manage baselines relative to git pull requests for feature
            development or for planning comparisons, which is recommended for
            QA/SDET.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="parallelize-uploads">
        <AccordionTrigger>Can I parallelize uploads?</AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Percy</strong>: Yes, but it requires an additional fee.
          </p>
          <p>
            <strong>Argos</strong>: Yes, and it's included in the standard
            pricing.
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
          Why is Percy pricing higher than Argos?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Percy</strong>, as part of BrowserStack, includes additional
            services in its pricing. It also captures screenshots remotely on
            real devices and browsers, which ensures high accuracy but incurs
            higher operational costs.
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
