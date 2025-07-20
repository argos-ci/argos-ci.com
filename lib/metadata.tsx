import { Metadata } from "next";

export const defaultTitle =
  "Visual testing for web applications and components • Argos";
export const defaultDescription =
  "Visual testing for web apps and components. Argos runs automated screenshot comparisons in CI/CD to catch UI regressions from Storybook, Playwright, Cypress, and more.";

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
      title: absoluteTitle ?? `${title} • Argos`,
      description,
      url,
      siteName: "Argos",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@argos_ci",
      title: absoluteTitle ?? `${title} • Argos`,
      description,
    },
  };
}
