import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
} from "@/lib/constants";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");

export const LOST_PIXEL_QUESTIONS: FAQQuestion[] = [
  faq(
    "Is Lost Pixel shutting down?",
    "Yes. On April 22, 2026, the team announced that it is joining Figma and sunsetting Lost Pixel, and the GitHub repository is now archived, so there will be no new releases. The announcement gives no shutdown date for the hosted Lost Pixel Platform.",
  ),
  faq(
    "What is the closest Lost Pixel alternative?",
    "Argos is the closest match: open source (MIT) like Lost Pixel, with Storybook and page screenshots covered, baselines from your Git history instead of committed images, and the review on the pull request. If you only use Storybook and don't need open source, Chromatic is the other common choice; see [Lost Pixel alternatives](/blog/lost-pixel-alternatives).",
  ),
  faq(
    "How do I migrate from Lost Pixel to Argos?",
    "Replace each shot mode of `lostpixel.config.ts` with its Argos equivalent: `@argos-ci/storybook` for `storybookShots`, a Playwright test with `@argos-ci/playwright` for `pageShots`, `ladleShots` and `histoireShots`, and `argos upload` for `customShots`. Then delete `.lostpixel/` and the Lost Pixel GitHub Action. The [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-lost-pixel) has the code for each.",
  ),
  faq(
    "Can I keep my Ladle or Histoire stories?",
    "Yes. A short Playwright test visits each story and captures it with `argosScreenshot()`; the migration guide includes the test for both.",
  ),
  faq(
    "What happens to my .lostpixel/baseline images?",
    "You delete them. The first Argos build on your default branch becomes the baseline, and from then on Argos picks baselines from your Git history.",
  ),
  faq(
    "How much does Argos cost?",
    `Argos is free for personal projects up to ${hobby} screenshots a month, and Pro is $${ARGOS_PRO_FLAT_PRICE} a month for teams. Argos also sponsors selected non-commercial open-source projects, case by case: see the [open source program](/docs/learn/billing-and-subscription/open-source).`,
  ),
];

export function FAQ() {
  return <FAQAccordion questions={LOST_PIXEL_QUESTIONS} />;
}
