import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getPaginatedChangelogs } from "@/lib/changelog-api";
import { getMetadata } from "@/lib/metadata";

import { Changelogs } from "../../changelogs";

type Props = {
  params: { page: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = params.page;

  return getMetadata({
    title: `Changelog - Page ${page}`,
    description: "New updates and improvements to Argos.",
    pathname: `/changelog/${page}`,
  });
}

export default async function Page({ params }: Props) {
  const page = Number(params.page);
  if (Number.isNaN(page) || page < 1) {
    notFound();
  }
  if (page === 1) {
    redirect("/changelog");
  }
  const result = await getPaginatedChangelogs({ page });
  if (result.entries.length === 0) {
    notFound();
  }
  return (
    <Changelogs
      changelogs={result.entries}
      next={result.next}
      previous={result.previous}
    />
  );
}
