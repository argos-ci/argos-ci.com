import { Metadata } from "next";

import { getMarkdownPath } from "./markdown-pages";
import { type OgImageParams, getOgImageUrl } from "./og-image";

export const defaultTitle =
  "Argos · Deploy, diff, review and stabilize every pull request";

export const defaultDescription =
  "Free preview URLs for your Storybook or static site on every PR, diffs of any file (not just pixels), one place for humans and AI agents to approve what changed, and per-test history to kill flakes.";

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
