import { SITE_URL } from "./agents";

/**
 * What a page puts on its social image (`app/api/og/route.tsx`). The eyebrow,
 * accent color and tile come from the page's path (`app/api/og/theme.ts`).
 */
export interface OgImageParams {
  /**
   * The headline on the image, when it should differ from the page title:
   * usually the page's hero heading. Aim for 45 characters or fewer, so it
   * fits in two lines.
   */
  ogTitle?: string;
  /**
   * One short line under the headline, about 100 characters, so it fits in
   * two lines (longer text is clamped). Not the meta description: that is
   * written for search results.
   */
  subtitle?: string;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Bump when the image changes for existing pages: the template, or a label,
 * color or icon in `app/api/og/theme.ts` or `icons.ts`. X, LinkedIn and Slack
 * cache a preview by its URL, so a new URL is the only way to make them fetch
 * the new one.
 */
const OG_IMAGE_VERSION = "2";

/** A page's social image, as `openGraph.images` and `twitter.images` take it. */
export function getOgImage(params: {
  title: string;
  subtitle?: string;
  pathname: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL;
  const title = params.title.trim();
  const searchParams = new URLSearchParams({ title });
  const subtitle = params.subtitle?.trim();
  if (subtitle) {
    searchParams.set("subtitle", subtitle);
  }
  searchParams.set("path", params.pathname);
  searchParams.set("v", OG_IMAGE_VERSION);
  return {
    url: `${baseUrl}/api/og?${searchParams.toString()}`,
    ...OG_IMAGE_SIZE,
    alt: title,
  };
}
