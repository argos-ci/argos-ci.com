/**
 * What a page puts on its social image (`app/api/og/route.tsx`). The eyebrow,
 * accent color and tile come from the page's path (`app/api/og/theme.ts`).
 */
export interface OgImageParams {
  /**
   * The headline on the image, when it should differ from the page title:
   * usually the page's hero heading. Aim for 45 characters or fewer.
   */
  ogTitle?: string;
  /**
   * One short line under the headline, 100 characters at most (longer text is
   * cut). Not the meta description: that is written for search results.
   */
  subtitle?: string;
}

/**
 * Bump when the image design changes: X, LinkedIn and Slack cache a preview
 * by its URL, so a new URL is the only way to make them fetch the new one.
 */
const OG_IMAGE_VERSION = "2";

export function getOgImageUrl(params: {
  title: string;
  subtitle?: string;
  pathname: string;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://argos-ci.com";
  const searchParams = new URLSearchParams({ title: params.title.trim() });
  const subtitle = params.subtitle?.trim();
  if (subtitle) {
    searchParams.set("subtitle", subtitle);
  }
  searchParams.set("path", params.pathname);
  searchParams.set("v", OG_IMAGE_VERSION);
  return `${baseUrl}/api/og?${searchParams.toString()}`;
}
