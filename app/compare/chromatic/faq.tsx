import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export function FAQ() {
  const questions: FAQQuestion[] = [
    {
      name: "What is the difference between a snapshot and a screenshot?",
      answer: (
        <>
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
        </>
      ),
      textAnswer:
        "Chromatic uses snapshots generated from Storybook stories and renders them in cloud browsers. This method ensures consistency but can sometimes result in minor variations, especially with dynamic content. Argos works by comparing screenshots sent by the user. If a difference is detected, you can easily update your test to avoid false positives.",
    },
    {
      name: "Are Chromatic tests flaky?",
      answer: (
        <>
          <p>
            Flaky tests are a significant issue in visual testing, and each
            product has its own way of addressing this problem.
          </p>
          <p>
            <strong>Chromatic</strong> uses a combination of techniques to
            minimize flakiness, including automatic retries and advanced
            algorithms to detect and ignore minor variations.
          </p>
          <p>
            <strong>Argos</strong> uses an algorithm that waits for page
            stabilization before taking a screenshot. This algorithm is
            open-source and embedded in every Argos integration.
          </p>
        </>
      ),
      textAnswer:
        "Flaky tests are a significant issue in visual testing, and each product has its own way of addressing this problem. Chromatic uses a combination of techniques to minimize flakiness, including automatic retries and advanced algorithms to detect and ignore minor variations. Argos uses an algorithm that waits for page stabilization before taking a screenshot. This algorithm is open-source and embedded in every Argos integration.",
    },
    {
      name: "How do Chromatic and Argos manage baselines?",
      answer: (
        <p>
          Both <strong>Chromatic</strong> and <strong>Argos</strong> allow you
          to manage baselines relative to git pull requests for feature
          development or to plan comparison workflows, recommended for QA / SDET
          involved in testing.
        </p>
      ),
      textAnswer:
        "Both Chromatic and Argos allow you to manage baselines relative to git pull requests for feature development or to plan comparison workflows, recommended for QA / SDET involved in testing.",
    },
    {
      name: "Can I parallelize uploads?",
      answer: (
        <>
          <p>
            <strong>Chromatic</strong> supports parallelized tests by default,
            but additional configurations may be needed for optimized
            performance.
          </p>
          <p>
            <strong>Argos</strong> also supports parallel uploads, and it's
            included in the standard pricing.
          </p>
        </>
      ),
      textAnswer:
        "Chromatic supports parallelized tests by default, but additional configurations may be needed for optimized performance. Argos also supports parallel uploads, and it's included in the standard pricing.",
    },
    {
      name: "Are Chromatic and Argos compatible with my CI?",
      answer: (
        <p>
          Both <strong>Chromatic</strong> and <strong>Argos</strong> are
          compatible with most CI systems on the market.
        </p>
      ),
      textAnswer:
        "Both Chromatic and Argos are compatible with most CI systems on the market.",
    },
    {
      name: "Can I control team members' access?",
      answer: (
        <p>
          Both <strong>Chromatic</strong> and <strong>Argos</strong> allow you
          to control team members' access and permissions for each project.
        </p>
      ),
      textAnswer:
        "Both Chromatic and Argos allow you to control team members' access and permissions for each project.",
    },
    {
      name: "Why is Chromatic pricing higher than Argos?",
      answer: (
        <>
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
        </>
      ),
      textAnswer:
        "Chromatic provides extensive integration with Storybook, Playwright, and Cypress, and offers features like TurboSnap, responsive viewport testing, and broad browser coverage, which can contribute to higher operational costs. Argos offers transparent and affordable pricing, designed to be accessible for projects of all sizes. Custom pricing options are available for specific features or dedicated support requests.",
    },
    {
      name: "What makes Argos community-driven?",
      answer: (
        <p>
          <strong>Argos</strong> was founded by passionate developers. We
          actively engage with our users to discuss feature requests and
          understand their usage, ensuring our product roadmap aligns with
          real-world needs.
        </p>
      ),
      textAnswer:
        "Argos was founded by passionate developers. We actively engage with our users to discuss feature requests and understand their usage, ensuring our product roadmap aligns with real-world needs.",
    },
  ];

  return <FAQAccordion questions={questions} />;
}
