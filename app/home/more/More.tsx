import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/Container";
import {
  type FeatureColor,
  INDICATOR_BG_COLORS,
} from "@/components/feature-section/colors";

/**
 * The three capabilities that used to own a full section each — Deployments,
 * Flaky Management, Test Debugging.
 *
 * They are real, but they are not the story the hero tells: Change Detection,
 * Collaborative Reviews and AI Agents answer the hero clause by clause, and a
 * fourth, fifth and sixth full section pushed the proof and the pricing far
 * below the fold. Kept as one row so the depth still shows and the pages still
 * get their link from the homepage, without spending a screen each.
 */
const CAPABILITIES: {
  color: FeatureColor;
  title: string;
  text: string;
  href: string;
}[] = [
  {
    color: "teal",
    title: "Deployments",
    text: "Ship a live preview URL with every pull request. Storybook, Vite, or any static build, with no infra to maintain.",
    href: "/deployments",
  },
  {
    color: "amber",
    title: "Flaky Management",
    text: "Detect unstable tests, track instability across builds, and silence the noise automatically.",
    href: "/flaky-management",
  },
  {
    // Teal on its own page, but Deployments already holds teal in this row and
    // the two dashes were indistinguishable side by side. Safe to diverge: the
    // site treats these as local accents, not identity tokens — Collaborative
    // Reviews is blue on its page and pink on this one.
    color: "plum",
    title: "Test Debugging",
    text: "Playwright traces, failure screenshots and retries, so you see why a test failed and not just that it did.",
    href: "/test-debugging",
  },
];

export function More() {
  return (
    <section className="separator-b relative px-4">
      <Container noGutter className="border-x">
        {/* Deliberately below the weight of a `SectionHeader` + `SectionTitle`:
            this row is a tier under Change Detection, Collaborative Reviews and
            AI Agents, and sizing it like them would rebuild the fourth pillar
            the row exists to avoid. The product areas keep the page's own
            eyebrow vocabulary — coloured dash and name — one per card, since a
            single section-level eyebrow cannot name three of them. */}
        <div className="container-gutter flex flex-col gap-2 py-8 md:py-10">
          <h2 className="font-accent text-xl font-medium md:text-2xl">
            More from the same setup
          </h2>
          <p className="text-low max-w-2xl text-sm md:text-base">
            One integration, and Argos keeps going: preview deployments, flaky
            detection, and full debugging context on every build.
          </p>
        </div>
        <ul className="grid divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
          {CAPABILITIES.map((capability) => (
            <li key={capability.title}>
              <Link
                href={capability.href}
                className="group flex h-full flex-col gap-2 p-6 transition hover:bg-(--neutral-2) md:p-8"
              >
                <h3 className="font-accent flex items-center gap-2 font-medium">
                  <span
                    className={clsx(
                      "h-1.5 w-3 shrink-0 rounded",
                      INDICATOR_BG_COLORS[capability.color],
                    )}
                  />
                  {capability.title}
                </h3>
                <p className="text-low text-sm">{capability.text}</p>
                <span className="mt-auto pt-2 text-sm font-medium text-(--primary-11)">
                  Learn more
                  <ChevronRightIcon className="-mt-px ml-0.5 inline size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
