"use client";

import clsx from "clsx";
import { ImageUpIcon, InboxIcon, RefreshCwIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import {
  AgentTerminal,
  Ref,
  type TerminalLine,
  Verdict,
} from "@/components/AgentTerminal";
import type { FeatureColor } from "@/components/feature-section/colors";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { useInViewport } from "@/components/useInViewport";
import { getPillar, type PillarSlug } from "@/lib/pillars";

/**
 * The part of Argos a step exercises, shown as the same coloured indicator the
 * pillar sections above open with. Tagging the rows is what ties this section
 * to the four before it: the reader has just been told what Deploy, Diff,
 * Review and Stabilize are, and here sees an agent working each one.
 */
type Tag = { color: FeatureColor; label: string };

type Step = {
  key: string;
  icon: typeof ImageUpIcon;
  title: string;
  text: string;
  tags: Tag[];
  lines: TerminalLine[];
};

function pillarTag(slug: PillarSlug): Tag {
  const pillar = getPillar(slug);
  return { color: pillar.color, label: pillar.name };
}

/** Media sharing is not a pillar; it keeps its own colour, as on its page. */
const MEDIA_TAG: Tag = { color: "plum", label: "Media sharing" };

/**
 * One instruction, three stages of the agent working on its own.
 *
 * The reader asks for a feature and never mentions Argos, a build, or a
 * review. Everything the agent does with Argos after that (catching its own
 * regression, putting a demo in front of the reviewer, deciding the PR is
 * ready) is its own initiative. That is the section title
 * argued by the content rather than asserted by it, and it is why the prompt
 * is identical on all three rows: moving between them, the ask holds still and
 * only the work advances.
 *
 * There is deliberately no command output anywhere. What convinces here is the
 * agent saying what it found and what it is about to do; a count of diffs and a
 * score only ever proved that a command exists. Every `tool` line names a call,
 * never its result, and no two rows repeat the same one: a step that re-ran
 * the previous step's command read as an agent that had forgotten it. The
 * first row has none at all, which is not an omission: see the note on it.
 *
 * Each row is tagged with the pillar it exercises (Diff, Deploy with media
 * sharing, Review), so the section reads as the pillars above, worked by an
 * agent. Stabilize is not staged: this story has no flaky test in it, and
 * staging one would have added a row to a loop that is complete at three.
 *
 * MCP stays out of the illustration. It is real, but staging a flow around it
 * would put the weight on the transport the fewest readers use, instead of
 * the one they already reach for.
 *
 * Two snapshots, not three: one the reader asked for and one the agent broke.
 * That is the smallest set the story needs: the intentional change is what
 * survives to the review queue, the regression is what the agent clears, and
 * every extra one had to be tracked across all three rows for no added meaning.
 * The demo is one media for the same reason: a single recording of the feature
 * working is the claim "show their work" needs, and a gallery is not.
 */
const PROMPT = "add a promo code field to the checkout";

const STEPS: Step[] = [
  {
    key: "fix",
    icon: RefreshCwIcon,
    title: "Agents fix what they broke",
    text: "When Argos surfaces a change nobody asked for, the agent has what it needs to correct it and push again.",
    tags: [pillarTag("diff")],
    // The only row with no `tool` line, and deliberately so: this is where the
    // agent works on the code, not on Argos. The prompt above sets the scene
    // and the regression line names what Argos found; an Argos call here would
    // invent a step the row does not need.
    lines: [
      {
        kind: "assistant",
        // The attribution is the row. Without "the flex change I made", the
        // agent merely finds a regression (which is what the Diff section above
        // already does) instead of owning one, which is what the title
        // claims.
        text: (
          <>
            <Verdict>Regression found on the price tag</Verdict>: it overflows
            its card on mobile, from the flex change I made for the promo field.
            Fixing…
          </>
        ),
      },
      {
        kind: "assistant",
        text: (
          <>
            Commit <Ref>ff26ba0</Ref> pushed. Waiting for CI…
          </>
        ),
      },
    ],
  },
  {
    key: "show",
    icon: ImageUpIcon,
    title: "Agents show their work",
    text: "A preview deployment and a screen recording, both from the terminal, land on the PR. The reviewer sees the feature work without checking out the branch.",
    tags: [pillarTag("deploy"), MEDIA_TAG],
    // Slotted into the CI wait the previous row opened: deploying the
    // Storybook and recording a demo are what an agent can do while the
    // pipeline runs, and it keeps this row from claiming a verification the
    // next row owns. Both land on the PR, named here for the first time. The
    // deploy is the one row where two tool lines are right:
    // the preview and the recording are two proofs, and each is its own call.
    lines: [
      {
        kind: "assistant",
        text: "While CI runs: deployed the Storybook and recorded the promo flow for the reviewer.",
      },
      { kind: "tool", text: "argos deploy ./storybook-static" },
      { kind: "tool", text: "argos media upload promo-flow.mp4 --pr 359" },
      {
        kind: "assistant",
        // Argos posting on the PR, not the agent pasting links, is the
        // claim: deploying a preview or attaching a media and showing it
        // there are one act.
        text: (
          <>
            The preview URL and the demo are on <Ref>#359</Ref>. Argos posted
            both.
          </>
        ),
      },
    ],
  },
  {
    key: "queue",
    icon: InboxIcon,
    title: "You only review what’s left",
    text: "The regressions an agent catches never reach you. What lands in your queue is the change that actually needs a human, with the proof beside it.",
    tags: [pillarTag("review")],
    lines: [
      { kind: "tool", text: "argos build snapshots 518" },
      {
        kind: "assistant",
        text: "The regression is gone: on the latest build, the price tag is back on baseline.",
      },
      {
        kind: "assistant",
        // Naming what is left is the whole row. "The PR is ready for your
        // review" is a GitHub sentence: it says the branch is done, not that
        // exactly one snapshot reached you, which is the claim the title makes.
        // The demo gets a clause, not a sentence: it already had its row.
        text: (
          <>
            PR <Ref>#359</Ref> is ready. The promo field is the only change
            detected, and the demo shows it working. It’s waiting for your
            approval in Argos.
          </>
        ),
      },
    ],
  },
];

/** How long each step holds before the showcase advances on its own. */
const DURATION = 6000;

/**
 * The points drive the terminal instead of sitting beside it.
 *
 * As a static list opposite a fixed panel, nothing said which row the panel was
 * illustrating, so the reader had to assume it stood for all of them, which made
 * it decoration. Selecting a row and watching the terminal answer is what turns
 * the two columns into one demonstration.
 *
 * The three panels are one story read top to bottom: the agent clears the
 * regression it caused, shows the change you asked for, and build #518 leaves
 * you that one change with its demo. Three unrelated vignettes would have
 * demonstrated three commands; this demonstrates the loop.
 *
 * It advances on its own, like the feature carousels above it: a reader who
 * only scrolls still gets the whole story. The rail on the active row is the
 * countdown. Any deliberate selection (click or arrow key) hands control
 * over for good; auto-advance yanking the tab away from someone mid-read is
 * worse than never advancing again.
 */
export function AgentShowcase() {
  const [index, setIndex] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [start, setStart] = useState(() => Date.now());
  const { ref, inViewport } = useInViewport();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = STEPS[index];
  if (!current) {
    throw new Error(`Invalid index ${index}`);
  }

  useEffect(() => {
    if (isStopped || !inViewport) {
      return;
    }
    setStart(Date.now());
    const timeout = window.setTimeout(() => {
      setIndex((value) => (value + 1) % STEPS.length);
    }, DURATION);
    return () => window.clearTimeout(timeout);
  }, [isStopped, inViewport, index]);

  const select = (to: number) => {
    setIsStopped(true);
    setIndex((to + STEPS.length) % STEPS.length);
  };

  const move = (to: number) => {
    const next = (to + STEPS.length) % STEPS.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={ref} className="grid border-t md:grid-cols-2">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Agent capabilities"
        className="flex flex-col divide-y border-b md:border-r md:border-b-0"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(index + 1);
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index - 1);
          }
        }}
      >
        {STEPS.map((step, stepIndex) => {
          const isCurrent = stepIndex === index;
          return (
            <button
              key={step.key}
              type="button"
              role="tab"
              id={`${baseId}-tab-${step.key}`}
              aria-selected={isCurrent}
              aria-controls={`${baseId}-panel`}
              tabIndex={isCurrent ? 0 : -1}
              ref={(node) => {
                tabRefs.current[stepIndex] = node;
              }}
              onClick={() => select(stepIndex)}
              className={clsx(
                "relative flex cursor-pointer gap-4 p-6 text-left transition-colors duration-200 md:p-8",
                isCurrent ? "bg-(--violet-3)" : "hover:bg-(--violet-2)",
              )}
            >
              {/* The row the reader is on, drawn over the divider. While the
                  showcase drives itself the rail fills over the step's
                  duration; once the reader takes over it holds solid. */}
              {isCurrent && !isStopped ? (
                <Progress start={start} />
              ) : (
                <span
                  aria-hidden
                  className={clsx(
                    "absolute inset-y-0 left-0 w-0.5 bg-(--violet-9) transition-opacity duration-200",
                    isCurrent ? "opacity-100" : "opacity-0",
                  )}
                />
              )}
              <step.icon
                className={clsx(
                  "mt-0.5 size-5 shrink-0 transition-colors duration-200",
                  isCurrent ? "text-(--violet-11)" : "text-low",
                )}
                strokeWidth={1.5}
              />
              <div>
                <div className="mb-1.5 flex flex-wrap gap-x-3 gap-y-1">
                  {step.tags.map((tag) => (
                    <FeatureIndicator key={tag.label} color={tag.color}>
                      {tag.label}
                    </FeatureIndicator>
                  ))}
                </div>
                <h3 className="font-accent font-medium">{step.title}</h3>
                <p className="text-sm text-low">{step.text}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${current.key}`}
        className="relative flex cursor-default items-center justify-center p-6 md:p-10"
      >
        <AgentTerminal
          prompt={PROMPT}
          conversations={STEPS}
          activeKey={current.key}
        />
      </div>
    </div>
  );
}

/**
 * The auto-advance countdown, drawn in the same slot as the selection rail so
 * the two read as one element in two states. Same mechanics as the feature
 * carousels: a rAF loop scaling the rail from the top.
 */
function Progress(props: { start: number }) {
  const { start } = props;
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(() => {
        const elapsed = Date.now() - start;
        setValue(Math.min(100, Math.round((elapsed / DURATION) * 100) + 1));
        loop();
      });
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [start]);
  return (
    <span
      aria-hidden
      className="absolute inset-y-0 left-0 w-0.5 origin-top bg-(--violet-9)"
      style={{
        transform: `scaleY(${value}%)`,
      }}
    />
  );
}
