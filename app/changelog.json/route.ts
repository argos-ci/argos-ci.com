import { getChangelogFeed } from "@/lib/api/changelog";

export const dynamic = "force-static";

/**
 * What shipped lately, for machines: the monthly report of the Argos app lists
 * the entries published since the previous report from here.
 */
export async function GET() {
  const feed = await getChangelogFeed({ limit: 20 });
  return Response.json(feed, {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
