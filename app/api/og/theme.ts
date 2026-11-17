import { PILLARS } from "@/lib/pillars";

import type { OgIconName } from "./icons";

/**
 * The accent colors a social image can take: the site's `FeatureColor`s plus
 * a neutral one for legal pages. Values are the Radix dark scales, since the
 * images are drawn on a dark background.
 */
export type OgColor =
  | "violet"
  | "blue"
  | "pink"
  | "amber"
  | "teal"
  | "plum"
  | "green"
  | "mauve";

type Swatch = {
  /** Step 10, the light end of the tile gradient. */
  light: string;
  /** Step 9, the solid color. */
  solid: string;
  /** Step 7, the dark end of the tile gradient. */
  deep: string;
  /** Step 11, accessible text on the dark background. */
  text: string;
  /** Icon color on the solid tile. */
  onSolid: string;
};

export const OG_PALETTE: Record<OgColor, Swatch> = {
  violet: {
    light: "#7d66d9",
    solid: "#6e56cf",
    deep: "#56468b",
    text: "#baa7ff",
    onSolid: "#ffffff",
  },
  blue: {
    light: "#3b9eff",
    solid: "#0090ff",
    deep: "#205d9e",
    text: "#70b8ff",
    onSolid: "#ffffff",
  },
  pink: {
    light: "#de51a8",
    solid: "#d6409f",
    deep: "#833869",
    text: "#ff8dcc",
    onSolid: "#ffffff",
  },
  amber: {
    light: "#ffd60a",
    solid: "#ffc53d",
    deep: "#8f6424",
    text: "#ffca16",
    onSolid: "#1f1300",
  },
  teal: {
    light: "#0eb39e",
    solid: "#12a594",
    deep: "#1c6961",
    text: "#0bd8b6",
    onSolid: "#ffffff",
  },
  plum: {
    light: "#b658c4",
    solid: "#ab4aba",
    deep: "#734079",
    text: "#e796f3",
    onSolid: "#ffffff",
  },
  green: {
    light: "#33b074",
    solid: "#30a46c",
    deep: "#28684a",
    text: "#3dd68c",
    onSolid: "#ffffff",
  },
  mauve: {
    light: "#7c7a85",
    solid: "#6f6d78",
    deep: "#49474e",
    text: "#b5b2bc",
    onSolid: "#ffffff",
  },
};

/** Frameworks with an `/integrations/<slug>` page and a logo for the tile. */
export type OgBrand = "playwright" | "storybook" | "vitest" | "cypress";

function isOgBrand(slug: string | undefined): slug is OgBrand {
  return (
    slug === "playwright" ||
    slug === "storybook" ||
    slug === "vitest" ||
    slug === "cypress"
  );
}

/** What the tile on the right of the image shows. */
export type OgVisual =
  | { type: "icon"; icon: OgIconName }
  | { type: "eye" }
  | { type: "brand"; brand: OgBrand };

export type OgTheme = {
  /** The section label above the title. */
  eyebrow?: string;
  color: OgColor;
  visual: OgVisual;
};

const icon = (name: OgIconName): OgVisual => ({ type: "icon", icon: name });

/**
 * Picks the eyebrow, accent color and tile of a page's social image from its
 * path, so a page gets a fitting image without configuring one. Product pages
 * keep the color they own on the site (`lib/pillars.ts` and the list in
 * CLAUDE.md); company pages use the brand violet; legal pages stay neutral.
 */
export function getOgTheme(pathname: string): OgTheme {
  const segments = pathname.split("/").filter(Boolean);
  const [section, slug] = segments;

  if (!section) {
    return { color: "violet", visual: { type: "eye" } };
  }

  const pillar = PILLARS.find((candidate) => candidate.slug === section);
  if (pillar && segments.length === 1) {
    return {
      eyebrow: pillar.name,
      color: pillar.color,
      visual: icon(pillar.slug),
    };
  }

  switch (section) {
    case "ai-agents":
      return { eyebrow: "For AI agents", color: "violet", visual: icon("bot") };
    case "media-sharing":
      return {
        eyebrow: "Media Sharing",
        color: "plum",
        visual: icon("imageUp"),
      };
    case "integrations":
      return isOgBrand(slug)
        ? {
            eyebrow: "Integration",
            color: "green",
            visual: { type: "brand", brand: slug },
          }
        : { eyebrow: "Integrations", color: "green", visual: icon("plug") };
    case "compare":
      return {
        eyebrow: "Comparison",
        color: "violet",
        visual: icon("compare"),
      };
    case "pricing":
      return { eyebrow: "Pricing", color: "violet", visual: icon("tag") };
    case "blog":
      return { eyebrow: "Blog", color: "violet", visual: icon("feather") };
    case "changelog":
      return { eyebrow: "Changelog", color: "violet", visual: icon("logs") };
    case "security":
      return {
        eyebrow: "Security",
        color: "violet",
        visual: icon("shieldCheck"),
      };
    case "about":
      return { eyebrow: "About", color: "violet", visual: icon("users") };
    case "community":
      return {
        eyebrow: "Community",
        color: "violet",
        visual: icon("messageCircle"),
      };
    case "customers":
      return {
        eyebrow: "Customers",
        color: "violet",
        visual: icon("building"),
      };
    case "contact":
      return { eyebrow: "Contact", color: "violet", visual: icon("mail") };
    case "oss-friends":
      return { eyebrow: "Open source", color: "violet", visual: icon("heart") };
    case "privacy":
    case "terms":
    case "dpa":
      return { eyebrow: "Legal", color: "mauve", visual: icon("fileText") };
    default:
      return { color: "violet", visual: { type: "eye" } };
  }
}
