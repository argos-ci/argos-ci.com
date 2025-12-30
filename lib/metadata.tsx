import { Metadata } from "next";

export const defaultTitle =
  "Argos · Visual Regression for Playwright & Storybook";

export const defaultDescription =
  "Prevent visual regressions without flaky tests. Argos uses deterministic pixel diffs to detect unintended UI changes in Playwright and Storybook, keeping CI fast and product quality high.";

export function getMetadata({
  title,
  absoluteTitle,
  description,
  pathname,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  pathname: string;
}): Metadata {
  const url = `https://argos-ci.com${pathname}`;
  return {
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
    },
    twitter: {
      card: "summary_large_image",
      site: "@argos_ci",
      title: absoluteTitle ?? `${title} · Argos`,
      description,
    },
  };
}
