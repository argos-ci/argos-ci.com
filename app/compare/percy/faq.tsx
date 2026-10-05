import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
} from "@/lib/constants";

export const PERCY_QUESTIONS: FAQQuestion[] = [
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
          <strong>Percy</strong>: Yes, by grouping parallel jobs into one build.
        </p>
        <p>
          <strong>Argos</strong>: Yes, and it’s included in the standard
          pricing.
        </p>
      </>
    ),
    textAnswer:
      "Percy: Yes, by grouping parallel jobs into one build. Argos: Yes, and it's included in the standard pricing.",
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
    name: "How much does Percy cost compared to Argos?",
    answer: (
      <>
        <p>
          <strong>Percy</strong> has a free plan with 5,000 screenshots a month.
          BrowserStack no longer publishes its paid prices: paid plans are
          quoted by sales. Percy renders each snapshot in BrowserStack&apos;s
          cloud for every browser and width you configure, and each combination
          counts as a screenshot.
        </p>
        <p>
          <strong>Argos</strong> publishes{" "}
          <Link href="/pricing">its prices</Link>: a free Hobby plan for
          personal projects with{" "}
          {ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a
          month, and Pro at ${ARGOS_PRO_FLAT_PRICE}/month flat with{" "}
          {ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots
          included.
        </p>
      </>
    ),
    textAnswer: `Percy has a free plan with 5,000 screenshots a month. BrowserStack no longer publishes its paid prices: paid plans are quoted by sales. Percy renders each snapshot in BrowserStack's cloud for every browser and width you configure, and each combination counts as a screenshot. Argos publishes its prices: a free Hobby plan for personal projects with ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a month, and Pro at $${ARGOS_PRO_FLAT_PRICE}/month flat with ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots included.`,
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
  return <FAQAccordion questions={PERCY_QUESTIONS} />;
}
