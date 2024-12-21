import { Metadata } from "next";

export const defaultTitle = "Argos — The open source visual testing platform";
export const defaultDescription =
  "Argos is an open-source visual testing tool that helps teams catch visual regressions in their web applications. Seamlessly integrate with your CI/CD pipeline, automate visual tests, and ensure a consistent user experience. Improve your app's quality with fast, reliable visual comparisons.";

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
      title: absoluteTitle ?? `${title} | Argos`,
      description,
      url,
      siteName: "Argos",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@argos_ci",
      title: absoluteTitle ?? `${title} | Argos`,
      description,
    },
  };
}
