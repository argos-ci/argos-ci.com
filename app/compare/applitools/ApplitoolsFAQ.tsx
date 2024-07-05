import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { BlueLink, Link } from "@/components/Link";

export const ApplitoolsFAQ = () => (
  <Accordion
    type="single"
    collapsible
    className="mx-auto mt-4 w-full max-w-2xl text-left"
  >
    <AccordionItem value="self-onboard">
      <AccordionTrigger>
        Can I start using Applitools by myself?
      </AccordionTrigger>
      <AccordionContent>
        <p>
          You can access a demo project in{" "}
          <span className="font-semibold">Applitools</span>, but you need to
          speak with a salesperson before installing it on your project and
          receiving a price estimation.
        </p>
        <p>
          <span className="font-semibold">Argos</span> is designed for
          self-onboarding in just a few minutes. We offer support on the{" "}
          <BlueLink href="https://argos-ci.com/discord">
            Argos Discord channel
          </BlueLink>{" "}
          to assist with setup, as well as private calls to answer your
          questions.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="flaky-screenshot">
      <AccordionTrigger>Is Applitools visual testing flaky?</AccordionTrigger>
      <AccordionContent>
        <p>
          Flaky tests are a significant issue in visual testing, and each
          product has its own way of addressing this problem.
        </p>
        <p>
          <span className="font-semibold">Applitools</span>' AI technology helps
          minimize false positives but comes at a high cost and removes
          variations from each image of each build.
        </p>
        <p>
          <span className="font-semibold">Argos</span> uses an algorithm that
          waits for page stabilization before taking a screenshot. This
          algorithm is open-source and embedded in every Argos integration.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="language-agnostic">
      <AccordionTrigger>Why is Argos language agnostic?</AccordionTrigger>
      <AccordionContent>
        <p>
          <span className="font-semibold">Applitools</span> provides SDKs for
          several languages to enable its use.
        </p>
        <p>
          <span className="font-semibold">Argos</span> relies on a bash command
          to upload screenshots. As long as you can capture screenshots of your
          website, you can use Argos.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="ci-compatibility">
      <AccordionTrigger>Is Applitools compatible with my CI?</AccordionTrigger>
      <AccordionContent>
        <p>
          Both <span className="font-semibold">Applitools</span> and{" "}
          <span className="font-semibold">Argos</span> are compatible with most
          CI systems on the market.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="fine-grain-access-control">
      <AccordionTrigger>Can I control team members' access?</AccordionTrigger>
      <AccordionContent>
        <p>
          Both <span className="font-semibold">Applitools</span> and{" "}
          <span className="font-semibold">Argos</span> allow you to control team
          members' access and permissions for each project.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="pricing-transparency">
      <AccordionTrigger>Why isn't Applitools pricing public?</AccordionTrigger>
      <AccordionContent>
        <p>
          <span className="font-semibold">Applitools</span> doesn't disclose
          their pricing publicly, but it's known to be one of the more expensive
          options on the market. You will need to speak with a salesperson to
          get a price offer.
        </p>
        <p>
          <span className="font-semibold">Argos</span> offers{" "}
          <BlueLink href="/pricing">
            transparent and affordable pricing
          </BlueLink>
          . Custom pricing can be arranged for specific features or dedicated
          support requests.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="community-driven">
      <AccordionTrigger>What makes Argos community-driven?</AccordionTrigger>
      <AccordionContent>
        <p>
          <span className="font-semibold">Argos</span> was founded by passionate
          developers. We actively engage with our users to discuss feature
          requests and understand their usage, ensuring our product roadmap
          aligns with real-world needs.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
