import { Metadata } from "next";

import { getMarkdownPath } from "./markdown-pages";
import { type OgImageParams, getOgImage } from "./og-image";

export const defaultTitle =
  "Argos · Open-source visual testing for Playwright, Storybook & Vitest";

export const defaultDescription =
  "Open-source visual regression testing for Playwright, Storybook, Vitest and Cypress, and an alternative to Chromatic and Percy. Diff screenshots and any file, review with your team and AI agents, fix flaky tests.";

/**
 * What Argos is, in one sentence. Search engines and LLMs file a product under
 * the category words that come with its name, so every surface that introduces
 * Argos (Organization JSON-LD, About, llms.txt) says it the same way.
 * `app/markdown/home.md` and the GitHub README repeat it by hand.
 */
export const argosDefinition =
  "Argos is an open-source visual regression testing platform for Playwright, Storybook, Vitest and Cypress, and an alternative to Chromatic and Percy.";

/**
 * The homepage's social image: its hero heading (`app/home/hero/Hero.tsx`
 * reads it from here) and the one-line pitch. Also the fallback image of
 * pages that don't set one (`app/layout.tsx`).
 */
export const defaultOgImage = {
  ogTitle: "Review the product, not just the code.",
  subtitle:
    "Open-source visual regression testing for Playwright, Storybook, Vitest and Cypress.",
} satisfies OgImageParams;

/** What Argos does on every pull request: the four pillars in one sentence. */
export const argosPillarsSentence =
  "On every pull request, Argos diffs screenshots and any other file, gives humans and AI agents one place to review what changed, kills flaky tests, and deploys a preview of your Storybook or static site.";

/**
 * The `alternates` of a page: its canonical URL, plus the markdown
 * representation when it has one, so agents reading the HTML can find it
 * without knowing to send `Accept: text/markdown`. Pages that build their
 * metadata by hand use this too — every page should advertise it the same way.
 */
export function getAlternates(pathname: string): Metadata["alternates"] {
  const markdownPath = getMarkdownPath(pathname);
  return {
    canonical: `https://argos-ci.com${pathname}`,
    ...(markdownPath
      ? { types: { "text/markdown": `https://argos-ci.com${markdownPath}` } }
      : {}),
  };
}

export function getMetadata(
  props: {
    title: string;
    absoluteTitle?: string;
    description: string;
    pathname: string;
  } & OgImageParams,
): Metadata {
  const { title, ogTitle, subtitle, absoluteTitle, description, pathname } =
    props;
  const url = `https://argos-ci.com${pathname}`;
  const image = getOgImage({ title: ogTitle ?? title, subtitle, pathname });
  const config: Metadata = {
    title: absoluteTitle ? { absolute: absoluteTitle } : title || defaultTitle,
    description,
    alternates: getAlternates(pathname),
    openGraph: {
      title: absoluteTitle ?? `${title} · Argos`,
      description,
      url,
      siteName: "Argos",
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: "@argos_ci",
      title: absoluteTitle ?? `${title} · Argos`,
      description,
      images: [image],
    },
  };

  return config;
}
