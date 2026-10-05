import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const HAPPO_QUESTIONS: FAQQuestion[] = [
  faq(
    "Is Argos a good Happo alternative?",
    "If your tests already run in one browser and you want the review on the pull request, yes: Argos takes the screenshot in your test, picks the baseline from your Git history and costs less per extra screenshot. If you need the same component rendered in Safari, iOS Safari and Edge on every run, Happo's cloud rendering is built for that.",
  ),
  faq(
    "How does Happo render screenshots?",
    "Happo's CLI uploads your suite, and Happo renders every snapshot in each target browser on its own servers. A snapshot is one component variant in one browser, so testing in three browsers counts three snapshots. Argos uses the screenshot your test took in CI.",
  ),
  faq(
    "How do Happo and Argos prices compare?",
    `As of October 2026, Happo Starter is $149/month for 50,000 snapshots (Chrome and Firefox), Growth $399/month for 150,000 (adds Safari) and Pro $749/month for 300,000 (adds iOS Safari and Edge), then $0.006 per snapshot. Argos Pro is $${ARGOS_PRO_FLAT_PRICE}/month for ${included} screenshots, then $${ARGOS_SCREENSHOT_PRICE} per screenshot, or $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook screenshots. Both have a free plan with 5,000 a month.`,
  ),
  faq(
    "Is Happo open source?",
    "Its `happo` client is MIT-licensed; the rendering service is commercial. Argos is open source end to end, the platform included.",
  ),
  faq(
    "How do I move from Happo to Argos?",
    "Capture your stories or pages with the Argos SDK for your framework instead of uploading them to Happo, then run your tests in CI with `ARGOS_TOKEN` set. Start from [Storybook](/integrations/storybook), [Playwright](/integrations/playwright) or [Cypress](/integrations/cypress).",
  ),
];

export function FAQ() {
  return <FAQAccordion questions={HAPPO_QUESTIONS} />;
}
