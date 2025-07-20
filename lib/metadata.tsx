import { Metadata } from "next";

export const defaultTitle =
  "Visual Testing for Web Apps with Playwright & Storybook • Argos";
export const defaultDescription =
  "Catch UI bugs before production. Argos is a fast, open-source visual testing platform for Playwright, Storybook, and Cypress, built for modern CI workflows.";

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
