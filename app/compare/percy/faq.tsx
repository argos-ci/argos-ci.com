import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
} from "@/lib/constants";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");
const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const PERCY_QUESTIONS: FAQQuestion[] = [
  faq(
    "Is Argos a good Percy alternative?",
    "For most teams, yes: the workflow is the same (screenshots from CI, a check on the pull request, changes approved in a web UI), with three differences. Argos diffs the screenshot your test took instead of a cloud re-render, it publishes its prices, and its code is open source. Percy stays the better fit if you already pay for BrowserStack and want cloud rendering across many browsers.",
  ),
  faq(
    "How does Percy capture screenshots, compared to Argos?",
    "Percy uploads a DOM snapshot of the page and re-renders it in BrowserStack's cloud for every browser and width you configure, with JavaScript disabled; each combination is a screenshot. Argos takes the screenshot in your test browser, after waiting for fonts, images and `aria-busy` to settle, so the diff shows exactly what the test displayed.",
  ),
  faq(
    "How much does Percy cost compared to Argos?",
    `Percy has a free plan with 5,000 screenshots a month. BrowserStack no longer publishes its paid prices: paid plans are quoted by sales. Argos publishes its prices: a free Hobby plan for personal projects with ${hobby} screenshots a month, and Pro at $${ARGOS_PRO_FLAT_PRICE}/month flat with ${included} screenshots included.`,
  ),
  faq(
    "Do I have to rewrite my tests to migrate from Percy?",
    "Mostly no. In Playwright, `percySnapshot(page, name)` becomes `argosScreenshot(page, name)`, and the widths from `.percy.yml` become viewports. The [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-percy) covers each SDK.",
  ),
  faq(
    "Can I parallelize uploads?",
    "On both. Percy groups parallel jobs into one build. Argos detects Playwright sharding on its own, and merges other parallel uploads (Vitest shards, CI matrix jobs) into a single build with a shared nonce; it is included in every plan.",
  ),
  faq(
    "Can AI agents work with Percy and Argos?",
    "Yes. The BrowserStack MCP server has Percy tools to run builds, fetch changes, and approve or reject them, and Percy offers an AI Visual Review Agent. Argos has its own [MCP server, CLI and REST API](/ai-agents), with JSON output, so an agent can inspect a build and submit a review.",
  ),
];

export function FAQ() {
  return <FAQAccordion questions={PERCY_QUESTIONS} />;
}
