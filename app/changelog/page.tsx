import { Metadata } from "next";

import {
  CHANGELOG_METADATA,
  getPaginatedChangelogs,
} from "@/lib/api/changelog";
import { getMetadata } from "@/lib/metadata";

import { Changelogs } from "./changelogs";

export const metadata: Metadata = getMetadata({
  title: "Changelog",
  ...CHANGELOG_METADATA,
  pathname: "/changelog",
});

export default async function Page() {
  const result = await getPaginatedChangelogs({ page: 1 });
  return (
    <Changelogs
      changelogs={result.entries}
      next={result.next}
      previous={result.previous}
    />
  );
}
