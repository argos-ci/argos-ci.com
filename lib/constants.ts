export const ARGOS_HOBBY_SCREENSHOT_COUNT = 5_000;
export const ARGOS_PRO_FLAT_PRICE = 100;
export const ARGOS_PRO_FLAT_SCREENSHOT_COUNT = 35_000;
export const ARGOS_SCREENSHOT_PRICE = 0.004;
export const ARGOS_STORYBOOK_SCREENSHOT_PRICE = 0.0015;
export const GITHUB_SSO_PRICE = 50;
export const SAML_SSO_PRICE = 200;

/**
 * Standalone media uploads are billed on the screenshot meter rather than on a
 * meter of their own, so they land on the invoice line accounts already read. A
 * video costs more than an image because it costs more to store and to serve.
 */
export const ARGOS_MEDIA_IMAGE_UNITS = 1;
export const ARGOS_MEDIA_VIDEO_UNITS = 25;

/** Largest single media upload, in megabytes. */
export const ARGOS_MEDIA_HOBBY_MAX_MB = 50;
export const ARGOS_MEDIA_PRO_MAX_MB = 500;

/** How long an uploaded media is kept, in days, counted from the upload. */
export const ARGOS_MEDIA_HOBBY_RETENTION_DAYS = 30;
export const ARGOS_MEDIA_PRO_RETENTION_DAYS = 365;
