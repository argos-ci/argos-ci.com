import { Metadata } from "next";

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
      : "Argos — Visual Testing for developers",
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
