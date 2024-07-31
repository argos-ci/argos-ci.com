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
            <strong>Percy</strong> way is to upload snapshots your code and
            render them on their servers. This approach tend to create small
            variations, particularly noticeable when testing complex javascript
            renders.
          </p>
          <p>
            <strong>Argos</strong> work by comparing screenshots sent by the
            user. If a difference is detected you can easily improve your test
            to avoid false positives.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flaky-screenshot">
        <AccordionTrigger>Are Percy tests flaky?</AccordionTrigger>
        <AccordionContent>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Percy</strong> the snapshot approach tend to create more
            flaky tests are hard to debug.
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
          How Percy and Argos manage baselines?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Percy</strong> and <strong>Argos</strong> allow you to
            manage baselines relatively to git pull requests for feature
            development or to plan comparison workflows, Recommended for QA /
            SDET involve in testing.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="parallelize-uploads">
        <AccordionTrigger>Can I parallelize uploads?</AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Percy</strong> yes but you will pay an add-on for it.
          </p>
          <p>
            <strong>Argos</strong> yes and it's included in the price.
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
            <strong>Percy</strong>, is a part of BrowserStack. When you pay for
            Percy, you will get others services that come with it. Additionally,{" "}
            <strong>Percy</strong> captures screenshots remotely on real devices
            and browsers, ensuring high accuracy but also incurring higher
            operational costs.
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
