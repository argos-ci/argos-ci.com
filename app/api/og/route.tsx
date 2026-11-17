/* oxlint-disable nextjs/no-img-element -- Takumi draws plain <img> elements; next/image has no meaning here. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Renderer } from "@takumi-rs/core";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import type { NextRequest } from "next/server";
import { createElement } from "react";

import {
  INTEGRATION_SLUGS,
  type IntegrationSlug,
} from "@/app/integrations/types";
import { SITE_URL } from "@/lib/agents";
import { OG_IMAGE_SIZE } from "@/lib/og-image";

import { OG_ICONS } from "./icons";
import { OG_PALETTE, type OgTheme, type Swatch, getOgTheme } from "./theme";

/**
 * The social image of every page built with `getMetadata()`: 1200×630, on the
 * dark indigo of the code cards and social illustrations, so a link preview
 * and the post it sits in look like one brand. `lib/og-image.ts` builds the
 * URL; `theme.ts` picks the eyebrow, color and tile from the page's path.
 *
 * Rendered by Takumi (takumi.kane.tw), not `next/og`. Satori, behind
 * `next/og`, measures each word apart from its spaces, so it never applies
 * the kerning Geist sets between a letter and a space and word gaps come out
 * uneven; its `lineClamp` also breaks `textWrap: balance`. And on Node.js,
 * `next/og` rasterizes with sharp, whose SVG loader Next's image optimizer
 * blocks for the whole process, so images fail once a page has optimized one.
 * Takumi lays text out like Chromium and paints the PNG itself.
 *
 * The route calls Takumi's native renderer directly: the `takumi-js` wrapper
 * would also ship its 4 MB WebAssembly fallback, which never runs on Node.
 * The addon is listed in `serverExternalPackages`, and the files read here in
 * `outputFileTracingIncludes` (`next.config.ts`).
 */

const { width: WIDTH, height: HEIGHT } = OG_IMAGE_SIZE;
const BACKGROUND = "#0b0d2b";
const PADDING_X = 80;
const PADDING_Y = 68;
const TEXT_WIDTH = 690;
/** Center of the tile and its rings. */
const TILE_CENTER = { x: 985, y: HEIGHT / 2 };
const SITE_HOST = new URL(SITE_URL).host;

const ASSETS_DIR = join(process.cwd(), "app/api/og/assets");
const BRANDS_DIR = join(process.cwd(), "app/assets/brands");

/**
 * Framework logos for `/integrations/<slug>`, in `app/assets/brands/`. The
 * image is dark, so Cypress uses its dark-mode variant.
 */
const BRAND_LOGOS: Record<IntegrationSlug, string> = {
  playwright: "playwright.svg",
  storybook: "storybook.svg",
  vitest: "vitest.svg",
  cypress: "cypress-dark.svg",
};

type Assets = {
  renderer: Renderer;
  logo: string;
  eye: string;
  brands: Record<IntegrationSlug, string>;
};

let assetsPromise: Promise<Assets> | null = null;

const readSvg = async (path: string) => toDataUri(await readFile(path, "utf8"));

/**
 * Builds the renderer and reads the logos once per instance; retries after a
 * failure. Takumi ships Geist (Latin, weights 300 to 800) built in, so only
 * Geist Mono, for the URL, is registered.
 */
function loadAssets(): Promise<Assets> {
  assetsPromise ??= (async () => {
    const renderer = new Renderer();
    const [mono, logo, eye, ...brandLogos] = await Promise.all([
      readFile(join(ASSETS_DIR, "GeistMono-Medium.ttf")),
      readSvg(join(ASSETS_DIR, "argos-logo.svg")),
      readSvg(join(ASSETS_DIR, "argos-eye.svg")),
      ...INTEGRATION_SLUGS.map((slug) =>
        readSvg(join(BRANDS_DIR, BRAND_LOGOS[slug])),
      ),
    ]);
    await renderer.registerFont({
      name: "Geist Mono",
      data: mono,
      weight: 500,
    });
    const brands = Object.fromEntries(
      INTEGRATION_SLUGS.map((slug, index) => [slug, brandLogos[index]!]),
    ) as Record<IntegrationSlug, string>;
    return { renderer, logo, eye, brands };
  })().catch((error: unknown) => {
    assetsPromise = null;
    throw error;
  });
  return assetsPromise;
}

function toDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function rgba(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

/** Collapses whitespace and caps the length, so a query can't flood the image. */
function clean(value: string | null, max: number): string {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Big enough to read in a feed thumbnail, small enough to stay in 3 lines. */
function getTitleSize(title: string): number {
  if (title.length <= 18) return 88;
  if (title.length <= 30) return 76;
  if (title.length <= 44) return 66;
  if (title.length <= 60) return 58;
  return 52;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = clean(searchParams.get("title"), 200) || "Argos";
  const subtitle = clean(searchParams.get("subtitle"), 300);
  const rawPath = searchParams.get("path") ?? "/";
  const path = /^\/[\w\-/]*$/.test(rawPath) ? rawPath.slice(0, 80) : "/";
  const theme = getOgTheme(path);
  const swatch = OG_PALETTE[theme.color];
  const titleSize = getTitleSize(title);
  const url = `${SITE_HOST}${path === "/" ? "" : path}`;

  const assets = await loadAssets();
  const { node, css } = await fromJsx(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: BACKGROUND,
        fontFamily: "Geist",
        overflow: "hidden",
      }}
    >
      <Backdrop color={swatch.solid} />
      <Rings color={swatch.solid} />
      <Tile visual={theme.visual} swatch={swatch} assets={assets} />

      <div
        style={{
          position: "absolute",
          left: PADDING_X,
          top: PADDING_Y,
          bottom: PADDING_Y,
          width: TEXT_WIDTH,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img src={assets.logo} alt="" style={{ width: 213, height: 40 }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {theme.eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 26,
                fontSize: 26,
                fontWeight: 600,
                color: swatch.text,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: swatch.light,
                }}
              />
              {theme.eyebrow}
            </div>
          ) : null}
          <div
            style={{
              lineClamp: 3,
              textWrap: "balance",
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -0.02 * titleSize,
              color: "#f5f4ff",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                lineClamp: 2,
                textWrap: "balance",
                marginTop: 26,
                fontSize: 29,
                fontWeight: 400,
                lineHeight: 1.38,
                color: "rgba(222, 220, 255, 0.66)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 21,
            fontWeight: 500,
            color: "rgba(222, 220, 255, 0.5)",
          }}
        >
          {url}
        </div>
      </div>
    </div>,
  );
  const png = await assets.renderer.render(node, {
    width: WIDTH,
    height: HEIGHT,
    format: "png",
    css,
    // The dark, low-alpha glows band visibly once quantized to 8 bits.
    dithering: "ordered-bayer",
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      // A URL always renders the same image (`OG_IMAGE_VERSION` changes it
      // when the template or theme does), so let the CDN keep it. Next sends
      // `max-age=0` otherwise, and each crawler fetch renders the image again.
      // Vercel clears its CDN cache on deploy, so a design change still shows.
      "cache-control":
        "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}

/**
 * The indigo glow of the code cards, the accent glow behind the tile, and
 * the code cards' dot grid, fading out before it reaches the text.
 */
function Backdrop(props: { color: string }) {
  const { color } = props;
  const center = `${TILE_CENTER.x}px ${TILE_CENTER.y}px`;
  const fill = { position: "absolute", inset: 0 } as const;
  return (
    <>
      <div
        style={{
          ...fill,
          backgroundImage:
            "radial-gradient(circle 620px at 8% 110%, rgba(29, 43, 107, 0.7) 0%, rgba(29, 43, 107, 0.3) 45%, rgba(29, 43, 107, 0) 100%)",
        }}
      />
      <div
        style={{
          ...fill,
          backgroundImage: `radial-gradient(circle 420px at ${center}, ${rgba(color, 0.26)} 0%, ${rgba(color, 0.1)} 45%, ${rgba(color, 0)} 100%)`,
        }}
      />
      <div
        style={{
          ...fill,
          backgroundImage:
            "radial-gradient(circle, #8b83ff 1.5px, transparent 1.75px)",
          backgroundSize: "26px 26px",
          maskImage: `radial-gradient(circle 470px at ${center}, rgba(0, 0, 0, 0.5) 0%, transparent 100%)`,
        }}
      />
    </>
  );
}

/** Concentric rounded squares around the tile, fading out. */
function Rings(props: { color: string }) {
  const { color } = props;
  const rings = [
    { size: 320, alpha: 0.4 },
    { size: 460, alpha: 0.24 },
    { size: 620, alpha: 0.13 },
    { size: 800, alpha: 0.06 },
  ];
  return (
    <>
      {rings.map((ring) => (
        <div
          key={ring.size}
          style={{
            position: "absolute",
            left: TILE_CENTER.x - ring.size / 2,
            top: TILE_CENTER.y - ring.size / 2,
            width: ring.size,
            height: ring.size,
            borderRadius: ring.size * 0.26,
            border: `1.5px solid ${rgba(color, ring.alpha)}`,
          }}
        />
      ))}
    </>
  );
}

const TILE_SIZE = 216;

function Tile(props: {
  visual: OgTheme["visual"];
  swatch: Swatch;
  assets: Assets;
}) {
  const { visual, swatch, assets } = props;
  const position = {
    position: "absolute",
    left: TILE_CENTER.x - TILE_SIZE / 2,
    top: TILE_CENTER.y - TILE_SIZE / 2,
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;
  const glass = {
    ...position,
    backgroundImage: "linear-gradient(160deg, #242463 0%, #14153d 100%)",
    border: "1.5px solid rgba(186, 178, 255, 0.22)",
    boxShadow: `0 30px 90px ${rgba(swatch.solid, 0.45)}, inset 0 1.5px 0 rgba(255, 255, 255, 0.12)`,
  } as const;

  switch (visual.type) {
    case "eye":
      return (
        <div style={glass}>
          <img src={assets.eye} alt="" style={{ width: 150, height: 94 }} />
        </div>
      );
    case "brand":
      return (
        <>
          <div style={glass}>
            <img
              src={assets.brands[visual.brand]}
              alt=""
              style={{ width: 176, height: 176 }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: TILE_CENTER.x + TILE_SIZE / 2 - 64,
              top: TILE_CENTER.y + TILE_SIZE / 2 - 64,
              width: 104,
              height: 104,
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              boxShadow: `0 0 0 8px ${BACKGROUND}, 0 18px 40px rgba(0, 0, 0, 0.45)`,
            }}
          >
            <img src={assets.eye} alt="" style={{ width: 70, height: 44 }} />
          </div>
        </>
      );
    case "icon":
      return (
        <div
          style={{
            ...position,
            backgroundImage: `linear-gradient(155deg, ${swatch.light} 0%, ${swatch.solid} 45%, ${swatch.deep} 100%)`,
            border: "1.5px solid rgba(255, 255, 255, 0.18)",
            boxShadow: `0 30px 90px ${rgba(swatch.solid, 0.55)}, inset 0 2px 0 rgba(255, 255, 255, 0.28)`,
          }}
        >
          <svg
            width={108}
            height={108}
            viewBox="0 0 24 24"
            fill="none"
            color={swatch.onSolid}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {OG_ICONS[visual.icon].map(([tag, attrs], index) =>
              createElement(tag, { key: index, ...attrs }),
            )}
          </svg>
        </div>
      );
  }
}
