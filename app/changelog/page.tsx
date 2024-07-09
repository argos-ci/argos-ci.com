import { Metadata } from "next";

import { getPaginatedChangelogs } from "@/lib/changelog-api";
import { getMetadata } from "@/lib/metadata";

import { Changelogs } from "./changelogs";

export const metadata: Metadata = getMetadata({
  title: "Changelog",
  description: "New updates and improvements to Argos.",
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
