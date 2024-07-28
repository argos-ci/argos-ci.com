import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Link } from "@/components/Link";

export function FAQ() {
  return (
    <>
      <AccordionItem value="self-onboard">
        <AccordionTrigger>
          Can I start using Applitools by myself?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            You can access a demo project in <strong>Applitools</strong>, but
            you need to speak with a salesperson before installing it on your
            project and receiving a price estimation.
          </p>
          <p>
            <strong>Argos</strong> is designed for self-onboarding in just a few
            minutes. We offer support on the{" "}
            <Link href="https://argos-ci.com/discord">
              Argos Discord channel
            </Link>{" "}
            to assist with setup, as well as private calls to answer your
            questions.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="flaky-screenshot">
        <AccordionTrigger>
          How Applitools and Argos deal with flaky tests?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Applitools</strong>' AI technology helps minimize false
            positives but comes at a high cost and removes variations from each
            image of each build.
          </p>
          <p>
            <strong>Argos</strong> uses an algorithm that waits for page
            stabilization before taking a screenshot. This algorithm is
            open-source and embedded in every Argos integration.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="language-agnostic">
        <AccordionTrigger>
          Can I use Applitools and Argos with any test framework?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Applitools</strong> provides SDKs for several test
            frameworks to enable its use. Screenshots are captured remotely,
            that's why a SDK is needed.
          </p>
          <p>
            <strong>Argos</strong> also provides very advanced integration like
            the one for Playwright and Cypress. It also relies on a bash command
            to upload screenshots. As long as you can capture screenshots of
            your website, you can use Argos.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ci-compatibility">
        <AccordionTrigger>
          Are Applitools and Argos compatible with my CI?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Applitools</strong> and <strong>Argos</strong> are
            compatible with most CI systems on the market.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="fine-grain-access-control">
        <AccordionTrigger>Can I control team members' access?</AccordionTrigger>
        <AccordionContent>
          <p>
            Both <strong>Applitools</strong> and <strong>Argos</strong> allow
            you to control team members' access and permissions for each
            project.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pricing-transparency">
        <AccordionTrigger>
          Why isn't Applitools pricing public?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            <strong>Applitools</strong> doesn't disclose their pricing publicly,
            but it's known to be one of the more expensive options on the
            market. You will need to speak with a salesperson to get a price
            offer.
          </p>
          <p>
            <strong>Argos</strong> offers{" "}
            <Link href="/pricing">transparent and affordable pricing</Link>.
            Custom pricing can be arranged for specific features or dedicated
            support requests.
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
