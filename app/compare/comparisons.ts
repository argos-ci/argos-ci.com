import type { FAQQuestion } from "@/components/FAQAccordion";

import { comparison as applitools } from "./applitools/comparison";
import { APPLITOOLS_QUESTIONS } from "./applitools/faq";
import { comparison as backstopjs } from "./backstopjs/comparison";
import { BACKSTOPJS_QUESTIONS } from "./backstopjs/faq";
import { comparison as chromatic } from "./chromatic/comparison";
import { CHROMATIC_QUESTIONS } from "./chromatic/faq";
import type { CompareSlug, Comparison } from "./features";
import { comparison as happo } from "./happo/comparison";
import { HAPPO_QUESTIONS } from "./happo/faq";
import { comparison as lostPixel } from "./lost-pixel/comparison";
import { LOST_PIXEL_QUESTIONS } from "./lost-pixel/faq";
import { comparison as percy } from "./percy/comparison";
import { PERCY_QUESTIONS } from "./percy/faq";
import { comparison as playwright } from "./playwright/comparison";
import { PLAYWRIGHT_QUESTIONS } from "./playwright/faq";

/** Everything the markdown twin of a compare page needs, by slug. */
export const COMPARISONS: Record<
  CompareSlug,
  { comparison: Comparison; questions: FAQQuestion[] }
> = {
  applitools: { comparison: applitools, questions: APPLITOOLS_QUESTIONS },
  backstopjs: { comparison: backstopjs, questions: BACKSTOPJS_QUESTIONS },
  chromatic: { comparison: chromatic, questions: CHROMATIC_QUESTIONS },
  happo: { comparison: happo, questions: HAPPO_QUESTIONS },
  "lost-pixel": { comparison: lostPixel, questions: LOST_PIXEL_QUESTIONS },
  percy: { comparison: percy, questions: PERCY_QUESTIONS },
  playwright: { comparison: playwright, questions: PLAYWRIGHT_QUESTIONS },
};
