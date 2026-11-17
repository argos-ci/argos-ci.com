import {
  amberDark,
  blueDark,
  greenDark,
  mauveDark,
  pinkDark,
  plumDark,
  tealDark,
  violetDark,
} from "@radix-ui/colors";

import {
  type IntegrationSlug,
  isIntegrationSlug,
} from "@/app/integrations/types";
import type { FeatureColor } from "@/components/feature-section/colors";
import { PILLARS } from "@/lib/pillars";

import type { OgIconName } from "./icons";

/**
 * The accent colors a social image can take: the site's `FeatureColor`s plus
 * a neutral one for legal pages.
 */
type OgColor = FeatureColor | "mauve";

export type Swatch = {
  /** The light end of the tile gradient. */
  light: string;
  /** The solid color. */
  solid: string;
  /** The dark end of the tile gradient. */
  deep: string;
  /** Accessible text on the dark background. */
  text: string;
  /** Icon color on the solid tile. */
  onSolid: string;
};

/**
 * A swatch from a Radix dark scale (the images are dark): steps 10, 9, 7 and
 * 11, with a white icon.
 */
function swatch(
  scale: Record<string, string>,
  color: OgColor,
  overrides?: Partial<Swatch>,
): Swatch {
  return {
    light: scale[`${color}10`]!,
    solid: scale[`${color}9`]!,
    deep: scale[`${color}7`]!,
    text: scale[`${color}11`]!,
    onSolid: "#ffffff",
    ...overrides,
  };
}

export const OG_PALETTE: Record<OgColor, Swatch> = {
  violet: swatch(violetDark, "violet"),
  blue: swatch(blueDark, "blue"),
  pink: swatch(pinkDark, "pink"),
  // Amber 9 is light: a darker gradient end and a dark icon.
  amber: swatch(amberDark, "amber", {
    deep: amberDark.amber8,
    onSolid: "#1f1300",
  }),
  teal: swatch(tealDark, "teal"),
  plum: swatch(plumDark, "plum"),
  green: swatch(greenDark, "green"),
  mauve: swatch(mauveDark, "mauve"),
};

/** What the tile on the right of the image shows. */
type OgVisual =
  | { type: "icon"; icon: OgIconName }
  | { type: "eye" }
  | { type: "brand"; brand: IntegrationSlug };

export type OgTheme = {
  /** The section label above the title. */
  eyebrow?: string;
  color: OgColor;
  visual: OgVisual;
};

const HOME: OgTheme = { color: "violet", visual: { type: "eye" } };
const LEGAL: OgTheme = {
  eyebrow: "Legal",
  color: "mauve",
  visual: { type: "icon", icon: "fileText" },
};

const violet = (eyebrow: string, icon: OgIconName): OgTheme => ({
  eyebrow,
  color: "violet",
  visual: { type: "icon", icon },
});

/**
 * Themes by first path segment. Product pages keep the color they own on the
 * site (the list in CLAUDE.md); company pages use the brand violet; legal
 * pages stay neutral. Pillars and integration pages are resolved in code.
 */
const SECTIONS: Record<string, OgTheme> = {
  "ai-agents": violet("For AI agents", "bot"),
  "media-sharing": {
    eyebrow: "Media Sharing",
    color: "plum",
    visual: { type: "icon", icon: "imageUp" },
  },
  integrations: {
    eyebrow: "Integrations",
    color: "green",
    visual: { type: "icon", icon: "plug" },
  },
  compare: violet("Comparison", "compare"),
  pricing: violet("Pricing", "tag"),
  blog: violet("Blog", "feather"),
  changelog: violet("Changelog", "logs"),
  security: violet("Security", "shieldCheck"),
  about: violet("About", "users"),
  community: violet("Community", "messageCircle"),
  customers: violet("Customers", "building"),
  contact: violet("Contact", "mail"),
  "oss-friends": violet("Open source", "heart"),
  privacy: LEGAL,
  terms: LEGAL,
  dpa: LEGAL,
};

/**
 * Picks the eyebrow, accent color and tile of a page's social image from its
 * path, so a page gets a fitting image without configuring one.
 * `tests/og-image.spec.ts` checks that every page in the sitemap has a theme.
 */
export function getOgTheme(pathname: string): OgTheme {
  const segments = pathname.split("/").filter(Boolean);
  const [section = "", slug] = segments;

  const pillar = PILLARS.find((candidate) => candidate.slug === section);
  if (pillar && segments.length === 1) {
    return {
      eyebrow: pillar.name,
      color: pillar.color,
      visual: { type: "icon", icon: pillar.slug },
    };
  }

  if (section === "integrations" && slug && isIntegrationSlug(slug)) {
    return {
      eyebrow: "Integration",
      color: "green",
      visual: { type: "brand", brand: slug },
    };
  }

  // `hasOwn`, not a plain lookup: the path may be `/constructor`.
  return Object.hasOwn(SECTIONS, section) ? SECTIONS[section]! : HOME;
}
