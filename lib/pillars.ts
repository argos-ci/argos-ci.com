import type { FeatureColor } from "@/components/feature-section/colors";

/**
 * The four pillars of Argos, in the order the site lists them: Diff, Review,
 * Stabilize, Deploy. That is the order visitors come for them (most arrive
 * looking for visual testing; Deploy is the newest and the least searched),
 * not the order a pull request goes through them, which the pillar pages
 * tell as deploy, diff, review, stabilize.
 *
 * Data only (no React, no icons), so the client navbar, the footer, the
 * homepage, `PillarLinks` and the static `llms.txt` route can all read the
 * same list. Icons live in `components/pillar-icons.ts`.
 */
export type PillarSlug = "deploy" | "diff" | "review" | "stabilize";

export type Pillar = {
  slug: PillarSlug;
  href: `/${PillarSlug}`;
  name: string;
  /** The pillar's promise, one sentence. */
  description: string;
  /** A shorter line for tight spots such as navbar cards. */
  short: string;
  color: FeatureColor;
};

export const PILLARS = [
  {
    slug: "diff",
    href: "/diff",
    name: "Diff",
    description:
      "Any file, not just pixels: screenshots, Markdown, JSON, and more.",
    short: "Every change, pixels or any file",
    color: "blue",
  },
  {
    slug: "review",
    href: "/review",
    name: "Review",
    description: "One place for humans and agents to approve what changed.",
    short: "Approve together, humans and agents",
    color: "pink",
  },
  {
    slug: "stabilize",
    href: "/stabilize",
    name: "Stabilize",
    description: "Kill flakes and debug failures with full per-test history.",
    short: "Flaky detection, traces, retries",
    color: "amber",
  },
  {
    slug: "deploy",
    href: "/deploy",
    name: "Deploy",
    description:
      "Free preview URLs for your Storybook or static site on every PR.",
    short: "Storybook & static builds on every PR",
    color: "teal",
  },
] as const satisfies readonly Pillar[];

export function getPillar(slug: PillarSlug): Pillar {
  const pillar = PILLARS.find((candidate) => candidate.slug === slug);
  if (!pillar) {
    throw new Error(`Unknown pillar: ${slug}`);
  }
  return pillar;
}
