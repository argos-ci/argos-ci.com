import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { Container } from "@/components/Container";
import { TEXT_COLORS } from "@/components/feature-section/colors";
import { PILLAR_ICONS } from "@/components/pillar-icons";
import { PILLARS, type PillarSlug } from "@/lib/pillars";

/**
 * What an agent does with each pillar, and the one command it reaches for
 * first. Every command is in the CLI reference; the pillar pages carry the
 * full set in their own "For AI agents" section, which is where each card
 * links.
 */
const AGENT_JOBS: Record<PillarSlug, { text: string; command: string }> = {
  deploy: {
    text: "The agent ships its own preview with the command your CI runs, and the URL lands on the pull request.",
    command: "argos deploy ./storybook-static",
  },
  diff: {
    text: "The agent reads every diff as data: status, score, diff mask, baseline and current file.",
    command: "argos build snapshots <build> --json",
  },
  review: {
    text: "The agent approves, rejects or comments, attributed to the person whose token it runs with.",
    command: "argos review create <build> --event approve",
  },
  stabilize: {
    text: "The agent reads a test's flakiness and its recurring changes, then fixes the cause or ignores the change.",
    command: "argos test changes <testId> --json",
  },
};

const DELAYS = [
  undefined,
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
];

/**
 * The four pillars as an agent sees them: a two-by-two grid of cards, each a
 * link to the pillar's agents section. The icon carries the pillar's colour,
 * the `$` the violet of the agents thread, so the card reads as "this pillar,
 * from an agent's terminal".
 */
export function PillarAgentGrid() {
  return (
    <Container
      noGutter
      className="relative grid grid-cols-1 border-x border-b md:grid-cols-2"
    >
      {PILLARS.map((pillar, index) => {
        const Icon = PILLAR_ICONS[pillar.slug];
        const job = AGENT_JOBS[pillar.slug];
        return (
          <Link
            key={pillar.slug}
            href={`${pillar.href}#agents`}
            className={clsx(
              "group flex flex-col gap-4 p-8 text-sm transition-colors hover:bg-(--neutral-2) lg:px-9 lg:py-10",
              "animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
              DELAYS[index],
              "max-md:not-first:border-t md:even:border-l md:nth-[n+3]:border-t",
            )}
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Icon className={clsx("size-4", TEXT_COLORS[pillar.color])} />
                <h3 className="font-semibold">{pillar.name}</h3>
              </div>
              <p className="font-[450] text-low">{pillar.description}</p>
              <p className="mt-1 font-[450]">{job.text}</p>
            </div>
            <div className="flex gap-2 rounded-lg border-[0.5px] bg-(--neutral-2) px-3 py-2 font-mono text-xxs transition-colors group-hover:bg-app">
              <span aria-hidden className="shrink-0 text-(--violet-11)">
                $
              </span>
              {/* A command may wrap on a narrow screen, but only between
                  words: a flag split at its hyphen reads as a different flag. */}
              <code className="min-w-0">
                {job.command.split(" ").map((token, tokenIndex) => (
                  <Fragment key={tokenIndex}>
                    {tokenIndex > 0 ? " " : null}
                    <span className="whitespace-nowrap">{token}</span>
                  </Fragment>
                ))}
              </code>
            </div>
            <span
              className={clsx(
                "mt-auto inline-flex items-center font-medium",
                TEXT_COLORS[pillar.color],
              )}
            >
              {pillar.name} for agents
              <ChevronRightIcon className="-mt-px ml-0.5 size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </Container>
  );
}
