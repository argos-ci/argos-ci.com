export interface OgImageParams {
  title: string;
  subtitle?: string;
}

/**
 * Generates a URL for dynamic OG image generation
 * @param params - Configuration for the OG image
 * @returns Complete URL for the OG image endpoint
 */
export function getOgImageUrl(params: OgImageParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://argos-ci.com";
  const endpoint = `${baseUrl}/api/og`;

  const title = params.title.trim();
  const subtitle = params.subtitle?.trim();

  const searchParams = new URLSearchParams({ title });
  if (subtitle) {
    searchParams.append("subtitle", subtitle);
  }

  return `${endpoint}?${searchParams.toString()}`;
}
