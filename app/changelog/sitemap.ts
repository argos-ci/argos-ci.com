import { MetadataRoute } from "next";

import {
  getChangelogEntries,
  getChangelogFiles,
  getChangelogPagesCount,
} from "@/lib/api/changelog";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await getChangelogFiles();
  const changelogs = await getChangelogEntries(files);
  const pageCount = getChangelogPagesCount(changelogs.length);
  return [
    ...Array.from({ length: pageCount - 1 }, (_, i) => ({
      url: `${BASE_URL}/changelog/page/${i + 2}`,
    })),
    ...changelogs.map((changelog) => ({
      url: `${BASE_URL}/changelog/${changelog.slug}`,
      lastModified: changelog.date,
    })),
  ];
}
