import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

const questions: FAQQuestion[] = [
  {
    name: "Can I start using Applitools by myself?",
    answer: (
      <>
        <p>
          You can access a demo project in <strong>Applitools</strong>, but you
          need to speak with a salesperson before installing it on your project
          and receiving a price estimation.
        </p>
        <p>
          <strong>Argos</strong> is designed for self-onboarding in just a few
          minutes. We offer support on the{" "}
          <Link href="https://argos-ci.com/discord">Argos Discord channel</Link>{" "}
          to assist with setup, as well as private calls to answer your
          questions.
        </p>
      </>
    ),
    textAnswer:
      "You can access a demo project in Applitools, but you need to speak with a salesperson before installing it on your project and receiving a price estimation. Argos is designed for self-onboarding in just a few minutes. We offer support on the Argos Discord channel to assist with setup, as well as private calls to answer your questions.",
  },
  {
    name: "How Applitools and Argos deal with flaky tests?",
    answer: (
      <>
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
      </>
    ),
    textAnswer:
      "Flaky tests are a significant issue in visual testing, and each product has its own way of addressing this problem. Applitools' AI technology helps minimize false positives but comes at a high cost and removes variations from each image of each build. Argos uses an algorithm that waits for page stabilization before taking a screenshot. This algorithm is open-source and embedded in every Argos integration.",
  },
  {
    name: "Can I use Applitools and Argos with any test framework?",
    answer: (
      <>
        <p>
          <strong>Applitools</strong> provides SDKs for several test frameworks
          to enable its use. Screenshots are captured remotely, that's why a SDK
          is needed.
        </p>
        <p>
          <strong>Argos</strong> also provides very advanced integration like
          the one for Playwright and Cypress. It also relies on a bash command
          to upload screenshots. As long as you can capture screenshots of your
          website, you can use Argos.
        </p>
      </>
    ),
    textAnswer:
      "Applitools provides SDKs for several test frameworks to enable its use. Screenshots are captured remotely, that's why a SDK is needed. Argos also provides very advanced integration like the one for Playwright and Cypress. It also relies on a bash command to upload screenshots. As long as you can capture screenshots of your website, you can use Argos.",
  },
  {
    name: "Are Applitools and Argos compatible with my CI?",
    answer: (
      <p>
        Both <strong>Applitools</strong> and <strong>Argos</strong> are
        compatible with most CI systems on the market.
      </p>
    ),
    textAnswer:
      "Both Applitools and Argos are compatible with most CI systems on the market.",
  },
  {
    name: "Can I control team members' access?",
    answer: (
      <p>
        Both <strong>Applitools</strong> and <strong>Argos</strong> allow you to
        control team members' access and permissions for each project.
      </p>
    ),
    textAnswer:
      "Both Applitools and Argos allow you to control team members' access and permissions for each project.",
  },
  {
    name: "Why isn't Applitools pricing public?",
    answer: (
      <>
        <p>
          <strong>Applitools</strong> doesn't disclose their pricing publicly,
          but it's known to be one of the more expensive options on the market.
          You will need to speak with a salesperson to get a price offer.
        </p>
        <p>
          <strong>Argos</strong> offers{" "}
          <Link href="/pricing">transparent and affordable pricing</Link>.
          Custom pricing can be arranged for specific features or dedicated
          support requests.
        </p>
      </>
    ),
    textAnswer:
      "Applitools doesn't disclose their pricing publicly, but it's known to be one of the more expensive options on the market. You will need to speak with a salesperson to get a price offer. Argos offers transparent and affordable pricing. Custom pricing can be arranged for specific features or dedicated support requests.",
  },
  {
    name: "What makes Argos community-driven?",
    answer: (
      <p>
        <strong>Argos</strong> was founded by passionate developers. We actively
        engage with our users to discuss feature requests and understand their
        usage, ensuring our product roadmap aligns with real-world needs.
      </p>
    ),
    textAnswer:
      "Argos was founded by passionate developers. We actively engage with our users to discuss feature requests and understand their usage, ensuring our product roadmap aligns with real-world needs.",
  },
];

export function FAQ() {
  return <FAQAccordion questions={questions} />;
}
