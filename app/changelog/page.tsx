import { Metadata } from "next";

import { getChangelogs } from "@/lib/changelog-api";
import { getMetadata } from "@/lib/metadata";

import { Changelogs } from "./changelogs";

export const metadata: Metadata = getMetadata({
  title: "Changelog",
  description: "New updates and improvements to Argos.",
  pathname: "/changelog",
});

export default async function Page() {
  const changelogs = await getChangelogs();
  return <Changelogs changelogs={changelogs} />;
}
