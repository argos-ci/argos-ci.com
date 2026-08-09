import type { NextRequest } from "next/server";

import { markdownHeaders } from "@/lib/agents";
import { getPageMarkdown } from "@/lib/markdown";

/**
 * Markdown representations of the site's pages ("Markdown for Agents").
 * Requests that prefer `Accept: text/markdown` are rewritten here by
 * proxy.ts; the /md/* URLs also work when fetched directly.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await context.params;
  const markdown = await getPageMarkdown(slug.join("/"));
  if (markdown === null) {
    const notFound =
      "# Not found\n\nThis page has no markdown representation.\n";
    return new Response(notFound, {
      status: 404,
      headers: markdownHeaders(notFound),
    });
  }
  return new Response(markdown, { headers: markdownHeaders(markdown) });
}
