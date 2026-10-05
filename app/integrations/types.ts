import type { LucideIcon } from "lucide-react";

import type { Brand } from "@/app/assets/brands/types";
import type { FAQQuestion } from "@/components/FAQAccordion";
import type { BundledLanguage } from "@/lib/shiki";

/**
 * The integration pages' data model, shared by the HTML page
 * (`IntegrationPage.tsx`) and its markdown twin (`lib/markdown.ts`), so both
 * say the same thing.
 *
 * Copy is written once, as text with inline markdown: `code` and
 * [links](/path). The page renders it with `InlineMarkdown`, the twin uses it
 * as is.
 */
export const INTEGRATION_SLUGS = [
  "playwright",
  "storybook",
  "vitest",
  "cypress",
] as const;

export type IntegrationSlug = (typeof INTEGRATION_SLUGS)[number];

export function isIntegrationSlug(value: string): value is IntegrationSlug {
  return (INTEGRATION_SLUGS as readonly string[]).includes(value);
}

export type IntegrationStep = {
  title: string;
  description: string;
  /** Shown as the code block's title: a file name, or "Terminal". */
  filename: string;
  lang: BundledLanguage;
  code: string;
};

export type Integration = {
  slug: IntegrationSlug;
  brand: Brand;
  /** H1, e.g. "Visual testing for Playwright". */
  title: string;
  /** Full `<title>`, e.g. "Playwright Visual Regression Testing · Argos". */
  metaTitle: string;
  metaDescription: string;
  /** The answer in two or three sentences: hero, hub card, twin summary. */
  summary: string;
  /** A short line for the hub and navigation. */
  short: string;
  steps: IntegrationStep[];
  /** How Argos compares to what teams use without it. */
  alternative: {
    /** Section title, e.g. "What Argos adds over toHaveScreenshot()". */
    title: string;
    description: string;
    name: string;
    rows: { topic: string; alternative: string; argos: string }[];
    /** Where the facts about the alternative come from. */
    sources: { label: string; href: string }[];
    /** When those facts were checked (YYYY-MM-DD). */
    checkedAt: string;
  };
  features: {
    title: string;
    description: string;
    href: string;
    illustration: React.ReactNode;
  }[];
  smallFeatures: {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }[];
  quickstartHref: string;
  referenceHref: string;
  readNext: {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }[];
  questions: FAQQuestion[];
};
