import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  getChangelogFiles,
  getChangelogPagesCount,
  getPaginatedChangelogs,
} from "@/lib/api/changelog";
import { getMetadata } from "@/lib/metadata";

import { Changelogs } from "../../changelogs";

type Params = { page: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const files = await getChangelogFiles();
  const pageCount = getChangelogPagesCount(files.length);
  return Array.from({ length: pageCount - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = params.page;

  return getMetadata({
    title: `Changelog - Page ${page}`,
    description: "New updates and improvements to Argos.",
    pathname: `/changelog/page/${page}`,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
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
