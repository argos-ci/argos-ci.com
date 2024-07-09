import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { getAllChangelogs, getChangelogEntryBySlug } from "@/lib/changelog-api";

import { Changelogs } from "../changelogs";

type Props = {
  params: { slug: string[] };
};

export async function generateStaticParams() {
  const changelogs = await getAllChangelogs();
  return changelogs
    .filter((changelog) => changelog.slug !== "")
    .map((changelog) => ({
      slug: changelog.slug.split("/"),
    }));
}

async function getChangelogFromParams(params: Props["params"]) {
  const slug = params.slug.join("/");
  return getChangelogEntryBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log(params);
  const changelog = await getChangelogFromParams(params);
  if (!changelog) {
    notFound();
  }

  const url = `https://argos-ci.com/changelog/${changelog.slug}`;
  const title = `${changelog.title} — Changelog`;
  return {
    title: {
      absolute: title,
    },
    description: changelog.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: changelog.description,
      type: "article",
      publishedTime: changelog.date,
      modifiedTime: changelog.date,
      url,
      siteName: "Argos",
      locale: "en_US",
    },
    twitter: {
      title,
      description: changelog.description,
      card: "summary_large_image",
      site: "@argos_ci",
    },
  };
}

export default async function Page({ params }: Props) {
  const changelog = await getChangelogFromParams(params);
  if (!changelog) {
    notFound();
  }
  return <Changelogs changelogs={[changelog]} single />;
}
