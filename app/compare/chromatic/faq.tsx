import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const CHROMATIC_QUESTIONS: FAQQuestion[] = [
  faq(
    "Is Argos a good Chromatic alternative for Storybook?",
    "Yes. Argos captures every story through the Storybook Vitest addon (Storybook 9 and later) or the test runner (Storybook 8), compares each one with its baseline from your Git history, and puts the review on the pull request. It also deploys the built Storybook to a preview URL on every pull request. See [visual testing for Storybook](/integrations/storybook).",
  ),
  faq(
    "What's the difference between a Chromatic snapshot and an Argos screenshot?",
    "Where it's taken and how it's billed. Chromatic renders your stories in its cloud browsers, and every story, browser and viewport combination is a billed snapshot. Argos takes the screenshot in your CI browser during the test run and bills each uploaded file, with Storybook screenshots at a lower rate.",
  ),
  faq(
    "How do Chromatic and Argos prices compare?",
    `As of October 2026, Chromatic Starter is $179/month for 35,000 snapshots and Pro $399/month for 85,000, then $0.008 per snapshot; TurboSnap bills an unchanged story at a fifth of a snapshot. Argos Pro is $${ARGOS_PRO_FLAT_PRICE}/month for ${included} screenshots, then $${ARGOS_SCREENSHOT_PRICE} per screenshot, or $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} per Storybook screenshot. Both have a free plan with 5,000 a month; Argos's is for personal projects.`,
  ),
  faq(
    "Does Argos support story modes and play functions?",
    "Yes. Story modes capture each story in several themes or viewports, from the globals your stories already use, and `argosScreenshot(ctx, name)` captures extra states inside a play function, as many as you need. Chromatic takes one snapshot when the play function ends.",
  ),
  faq(
    "Can Argos replace Chromatic for Playwright and Cypress tests?",
    "Yes. Chromatic archives the DOM from your Playwright or Cypress tests and renders it in its cloud. Argos takes the screenshot inside the test with `argosScreenshot()`, so the diff shows what your test displayed. See [Playwright](/integrations/playwright) and [Cypress](/integrations/cypress).",
  ),
  faq(
    "Can I set a diff threshold per story?",
    "On both. Chromatic has `diffThreshold` per story, component or project. Argos has a `threshold` from 0 to 1 (default 0.5) per screenshot, and per upload with the CLI.",
  ),
  faq(
    "How do I migrate from Chromatic to Argos?",
    "Install the Argos Storybook SDK, add its Vitest plugin next to `storybookTest()`, and replace the Chromatic step in CI with a Vitest run and, if you want previews, `argos deploy`. The [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-chromatic) maps each Chromatic concept to Argos.",
  ),
];

export function FAQ() {
  return <FAQAccordion questions={CHROMATIC_QUESTIONS} />;
}
