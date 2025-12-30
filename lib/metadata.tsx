import { Metadata } from "next";

import { type OgImageParams, getOgImageUrl } from "./og-image";

export const defaultTitle =
  "Argos · Visual Regression for Playwright & Storybook";

export const defaultDescription =
  "Argos helps product teams ship faster without sacrificing quality by catching visual regressions early with reliable visual testing for Storybook and Playwright.";

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
    title: title
      ? title
      : absoluteTitle
        ? { absolute: absoluteTitle }
        : defaultTitle,
    description,
    alternates: {
      canonical: url,
    },
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
