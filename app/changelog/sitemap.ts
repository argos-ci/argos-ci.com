import { MetadataRoute } from "next";

import { getChangelogs } from "@/lib/changelog-api";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const changelogs = await getChangelogs();
  return changelogs.map((changelog) => ({
    url: `${BASE_URL}/changelogs/${changelog.slug}`,
    lastModified: changelog.date,
  }));
}
