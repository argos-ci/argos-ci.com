"use client";

import clsx from "clsx";
import {
  BracesIcon,
  ImageUpIcon,
  InboxIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useInViewport } from "@/components/useInViewport";

import {
  AgentTerminal,
  Ref,
  type TerminalLine,
  Verdict,
} from "./AgentTerminal";

type Step = {
  key: string;
  icon: typeof BracesIcon;
  title: string;
  text: string;
  lines: TerminalLine[];
};

/**
 * One instruction, four stages of the agent working on its own.
 *
 * The reader asks for a feature and never mentions Argos, a build, or a
 * review. Everything the agent does with Argos after that — pulling the diffs,
 * catching its own regression, putting a demo in front of the reviewer,
 * deciding the PR is ready — is its own initiative. That is the section title
 * argued by the content rather than asserted by it, and it is why the prompt
 * is identical on all four rows: moving between them, the ask holds still and
 * only the work advances.
 *
 * There is deliberately no command output anywhere. What convinces here is the
 * agent saying what it found and what it is about to do; a count of diffs and a
 * score only ever proved that a command exists. Every `tool` line names a call,
 * never its result, and no two rows repeat the same one — a step that re-ran
 * the previous step's command read as an agent that had forgotten it. The
 * second row has none at all, which is not an omission: see the note on it.
 *
 * MCP stays out of the illustration. It is real, and the first row's body says
 * so, but staging a flow around it would put the weight on the transport the
 * fewest readers use, instead of the one they already reach for.
 *
 * Two snapshots, not three: one the reader asked for and one the agent broke.
 * That is the smallest set the story needs — the intentional change is what
 * survives to the review queue, the regression is what the agent clears — and
 * every extra one had to be tracked across all four rows for no added meaning.
 * The demo is one media for the same reason: a single recording of the feature
 * working is the claim "show their work" needs, and a gallery is not.
 */
const PROMPT = "add a promo code field to the checkout";

const STEPS: Step[] = [
  {
    key: "read",
    icon: BracesIcon,
    title: "Agents see what you see",
    text: "Every diff in the Argos UI is also structured data, from the CLI and over MCP. No dashboard, no screenshots pasted into a prompt.",
    lines: [
      {
        kind: "assistant",
        text: (
          <>
            PR <Ref>#359</Ref> pushed. Waiting for CI…
          </>
        ),
      },
      // The build finishing is what the agent was waiting for; pulling the
      // diffs is the next thing it does, unprompted. Without this line the row
      // shows Argos notifying rather than the agent reading, which is the one
      // claim its title makes that Change Detection above does not.
      { kind: "tool", text: "argos build snapshots 517" },
      {
        kind: "assistant",
        // "I added" against a bare "the price tag" is what sorts them: one is
        // the feature, the other is not yet named as damage. The next row is
        // where it becomes a regression.
        text: "Argos flagged two changes: the promo field I added, and the price tag on mobile.",
      },
    ],
  },
  {
    key: "fix",
    icon: RefreshCwIcon,
    title: "Agents fix what they broke",
    text: "When Argos surfaces a change nobody asked for, the agent has what it needs to correct it and push again.",
    // The only row with no `tool` line, and deliberately so: this is where the
    // agent works on the code, not on Argos. The previous row already pulled
    // the diffs, so any Argos call here would either repeat it — reading as an
    // agent that had forgotten — or invent a second one to fill a slot the step
    // does not need.
    lines: [
      {
        kind: "assistant",
        // The attribution is the row. Without "the flex change I made", the
        // agent merely finds a regression — which is what Change Detection does
        // two sections above — instead of owning one, which is what the title
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
    text: "A screen recording, uploaded from the terminal, lands on the PR as an Argos comment. The reviewer sees the feature work without checking out the branch.",
    // Slotted into the CI wait the previous row opened: recording a demo is
    // what an agent can do while the pipeline runs, and it keeps this row from
    // claiming a verification the next row owns. The upload targets the PR the
    // first row already named — nothing new to track.
    lines: [
      {
        kind: "assistant",
        text: "While CI runs: recorded the promo flow for the reviewer.",
      },
      { kind: "tool", text: "argos media upload promo-flow.mp4 --pr 359" },
      {
        kind: "assistant",
        // Argos posting the comment — not the agent pasting a link — is the
        // claim: attaching a media to a PR and showing it there are one act.
        text: (
          <>
            The demo is on <Ref>#359</Ref> — Argos posted it as a comment.
          </>
        ),
      },
    ],
  },
  {
    key: "queue",
    icon: InboxIcon,
    title: "You only review what’s left",
    text: "The regressions an agent catches never reach you. What lands in your queue is the change that actually needs a human — with the proof beside it.",
    lines: [
      { kind: "tool", text: "argos build snapshots 518" },
      {
        kind: "assistant",
        text: "The regression is gone — on the latest build, the price tag is back on baseline.",
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
            detected — the demo shows it working. It’s waiting for your approval
            in Argos.
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
 * illustrating — the reader had to assume it stood for all of them, which made
 * it decoration. Selecting a row and watching the terminal answer is what turns
 * the two columns into one demonstration.
 *
 * The four panels are one story read top to bottom: build #517 has two
 * changes, the agent clears the one it caused, shows the one you asked for,
 * and #518 leaves you that one change with its demo. Four unrelated vignettes
 * would have demonstrated four commands; this demonstrates the loop.
 *
 * It advances on its own, like the feature carousels above it: a reader who
 * only scrolls still gets the whole story. The rail on the active row is the
 * countdown. Any deliberate selection — click or arrow key — hands control
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
