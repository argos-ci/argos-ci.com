import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
} from "@/lib/constants";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");
const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const APPLITOOLS_QUESTIONS: FAQQuestion[] = [
  faq(
    "Is Argos a good Applitools alternative?",
    "For product teams that want visual review on every pull request, yes: Argos captures screenshots in your CI browser, diffs them deterministically and puts the review on the pull request, at a published monthly price. Applitools is the better fit for very large suites across many browsers and devices, where its Visual AI and enterprise plans earn their cost.",
  ),
  faq(
    "How does Visual AI compare with Argos's pixel diffing?",
    "Applitools' Visual AI decides which differences matter, with match levels (Strict, Layout, Content, Exact) set per checkpoint or region. Argos compares pixels with the open-source odiff engine and a `threshold` from 0 to 1 that you set, after stabilizing the page before capture. Same input, same result, and you can see exactly which pixels changed.",
  ),
  faq(
    "How much does Applitools cost compared to Argos?",
    `Applitools publishes one price: Starter at $667 a month, paid annually, for 100,000 component checkpoints or 1,000 page checkpoints. Professional and Enterprise plans are quoted by sales. Argos publishes all of its prices: a free Hobby plan for personal projects with ${hobby} screenshots a month, and Pro at $${ARGOS_PRO_FLAT_PRICE}/month flat with ${included} screenshots included, billed monthly. Custom plans are available for large volumes.`,
  ),
  faq(
    "Where are screenshots captured?",
    "Applitools' SDKs either upload screenshots taken locally (the Classic runner) or send DOM snapshots that Applitools renders in its cloud (the Ultrafast Grid). Argos always uses the screenshot your test took, in your CI browser.",
  ),
  faq(
    "Can AI agents use Applitools and Argos?",
    "Both have an MCP server. The Applitools Eyes MCP server sets up Eyes, adds checkpoints and fetches results, for Playwright in JavaScript and TypeScript. Argos has an [MCP server, a CLI and a REST API](/ai-agents) with JSON output, for any SDK, so an agent can inspect a build and submit a review.",
  ),
  faq(
    "How do I migrate from Applitools to Argos?",
    "Replace the Eyes checkpoints in your tests with `argosScreenshot()` calls from the Argos SDK for your framework, and set `ARGOS_TOKEN` in CI. The [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-applitools) maps the concepts step by step.",
  ),
];

export function FAQ() {
  return <FAQAccordion questions={APPLITOOLS_QUESTIONS} />;
}
