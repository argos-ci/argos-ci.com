export interface OgImageParams {
  title: string;
  subtitle?: string;
}

/**
 * Generates a URL for dynamic OG image generation
 * @param params - Configuration for the OG image
 * @returns Complete URL for the OG image endpoint
 */
export function getOgImageUrl(props: OgImageParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://argos-ci.com";
  const endpoint = `${baseUrl}/api/og`;

  const title = props.title.trim();
  const subtitle = props.subtitle?.trim();

  const params = new URLSearchParams({ title });
  if (subtitle) {
    params.append("subtitle", subtitle);
  }

  return `${endpoint}?${params.toString()}`;
}
