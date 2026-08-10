import { Metadata } from "next";

import { getMarkdownPath } from "./markdown-pages";
import { type OgImageParams, getOgImageUrl } from "./og-image";

export const defaultTitle = "Argos · Product quality for the age of AI agents";

export const defaultDescription =
  "Argos keeps product quality high while your team and your agents ship faster. See every change a PR makes, whether pixels, Markdown, or JSON, review it with confidence, and deploy every PR. Visual & snapshot testing for Playwright and Storybook.";

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
  const { title, subtitle, absoluteTitle, description, pathname } = props;
  const url = `https://argos-ci.com${pathname}`;
  const ogParams = {
    title,
    subtitle: subtitle ?? description,
  };
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
      images: [
        {
          url: getOgImageUrl(ogParams),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@argos_ci",
      title: absoluteTitle ?? `${title} · Argos`,
      description,
      images: [
        {
          url: getOgImageUrl(ogParams),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return config;
}
