import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

const questions: FAQQuestion[] = [
  {
    name: "How do Percy and Argos address flaky tests?",
    answer: (
      <>
        <p>
          Flaky tests are a significant issue in visual testing, and each
          product has its own way of addressing this problem.
        </p>
        <p>
          <strong>Percy</strong> re-render <strong>snapshots</strong> of your
          code on their servers, then compare the diffs. This approach can cause
          flaky tests that are hard to debug, especially with complex JavaScript
          renders.
        </p>
        <p>
          <strong>Argos</strong> provides several integration to capture stable{" "}
          <strong>screenshots</strong> locally. If one of them is unstable, you
          can easily refine your tests to avoid false positives.
        </p>
      </>
    ),
    textAnswer:
      "Flaky tests are a significant issue in visual testing, and each product has its own way of addressing this problem. Percy re-render snapshots of your code on their servers, then compare the diffs. This approach can cause flaky tests that are hard to debug, especially with complex JavaScript renders. Argos provides several integration to capture stable screenshots locally. If one of them is unstable, you can easily refine your tests to avoid false positives.",
  },
  {
    name: "How do Percy and Argos manage baselines?",
    answer: (
      <p>
        Both <strong>Percy</strong> and <strong>Argos</strong> allow you to
        manage baselines relative to git pull requests for feature development
        or for planning comparisons, which is recommended for QA/SDET.
      </p>
    ),
    textAnswer:
      "Both Percy and Argos allow you to manage baselines relative to git pull requests for feature development or for planning comparisons, which is recommended for QA/SDET.",
  },
  {
    name: "Can I parallelize uploads?",
    answer: (
      <>
        <p>
          <strong>Percy</strong>: Yes, but it requires an additional fee.
        </p>
        <p>
          <strong>Argos</strong>: Yes, and it’s included in the standard
          pricing.
        </p>
      </>
    ),
    textAnswer:
      "Percy: Yes, but it requires an additional fee. Argos: Yes, and it's included in the standard pricing.",
  },
  {
    name: "Are Percy and Argos compatible with my CI?",
    answer: (
      <p>
        Both <strong>Percy</strong> and <strong>Argos</strong> are compatible
        with most CI systems on the market.
      </p>
    ),
    textAnswer:
      "Both Percy and Argos are compatible with most CI systems on the market.",
  },
  {
    name: "Can I control team members' access?",
    answer: (
      <p>
        Both <strong>Percy</strong> and <strong>Argos</strong> allow you to
        control team members’ access and permissions for each project.
      </p>
    ),
    textAnswer:
      "Both Percy and Argos allow you to control team members' access and permissions for each project.",
  },
  {
    name: "Why is Percy pricing higher than Argos?",
    answer: (
      <>
        <p>
          <strong>Percy</strong>, as part of BrowserStack, includes additional
          services in its pricing. It also captures screenshots remotely on real
          devices and browsers, which ensures high accuracy but incurs higher
          operational costs.
        </p>
        <p>
          <strong>Argos</strong> offers{" "}
          <Link href="/pricing">transparent and affordable pricing</Link>,
          designed to be accessible for projects of all sizes. Custom pricing
          options are available for specific features or dedicated support
          requests.
        </p>
      </>
    ),
    textAnswer:
      "Percy, as part of BrowserStack, includes additional services in its pricing. It also captures screenshots remotely on real devices and browsers, which ensures high accuracy but incurs higher operational costs. Argos offers transparent and affordable pricing, designed to be accessible for projects of all sizes. Custom pricing options are available for specific features or dedicated support requests.",
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
