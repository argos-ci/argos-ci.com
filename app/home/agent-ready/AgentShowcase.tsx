"use client";

import clsx from "clsx";
import { BracesIcon, InboxIcon, RefreshCwIcon } from "lucide-react";
import { useId, useRef, useState } from "react";

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
 * One instruction, three stages of the agent working on its own.
 *
 * The reader asks for a feature and never mentions Argos, a build, or a
 * review. Everything the agent does with Argos after that — pulling the diffs,
 * catching its own regression, deciding the PR is ready — is its own
 * initiative. That is the section title argued by the content rather than
 * asserted by it, and it is why the prompt is identical on all three rows:
 * moving between them, the ask holds still and only the work advances.
 *
 * There is deliberately no command output anywhere. What convinces here is the
 * agent saying what it found and what it is about to do; a count of diffs and a
 * score only ever proved that a command exists. Every `tool` line names a call,
 * never its result, and no two rows repeat the same one — a step that re-ran
 * the previous step's command read as an agent that had forgotten it. The
 * middle row has none at all, which is not an omission: see the note on it.
 *
 * MCP stays out of the illustration. It is real, and the first row's body says
 * so, but staging a flow around it would put the weight on the transport the
 * fewest readers use, instead of the one they already reach for.
 *
 * Two snapshots, not three: one the reader asked for and one the agent broke.
 * That is the smallest set the story needs — the intentional change is what
 * survives to the review queue, the regression is what the agent clears — and
 * every extra one had to be tracked across all three rows for no added meaning.
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
    key: "queue",
    icon: InboxIcon,
    title: "You only review what’s left",
    text: "The regressions an agent catches never reach you. What lands in your queue is the change that actually needs a human.",
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
        text: (
          <>
            PR <Ref>#359</Ref> is ready. The promo field is the only change
            detected. It’s waiting for your approval in Argos.
          </>
        ),
      },
    ],
  },
];

/**
 * The points drive the terminal instead of sitting beside it.
 *
 * As a static list opposite a fixed panel, nothing said which row the panel was
 * illustrating — the reader had to assume it stood for all of them, which made
 * it decoration. Selecting a row and watching the terminal answer is what turns
 * the two columns into one demonstration.
 *
 * The three panels are one story read top to bottom: build #517 has two
 * changes, the agent clears the one it caused, and #518 leaves you the one you
 * asked for. Three unrelated vignettes would have demonstrated three commands;
 * this demonstrates the loop.
 */
export function AgentShowcase() {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = STEPS[index];
  if (!current) {
    throw new Error(`Invalid index ${index}`);
  }

  const move = (to: number) => {
    const next = (to + STEPS.length) % STEPS.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid border-t md:grid-cols-2">
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
              onClick={() => setIndex(stepIndex)}
              className={clsx(
                "relative flex cursor-pointer gap-4 p-6 text-left transition-colors duration-200 md:p-8",
                isCurrent ? "bg-(--violet-3)" : "hover:bg-(--violet-2)",
              )}
            >
              {/* The row the reader is on, drawn over the divider. */}
              <span
                aria-hidden
                className={clsx(
                  "absolute inset-y-0 left-0 w-0.5 bg-(--violet-9) transition-opacity duration-200",
                  isCurrent ? "opacity-100" : "opacity-0",
                )}
              />
              <step.icon
                className={clsx(
                  "mt-0.5 size-5 shrink-0 transition-colors duration-200",
                  isCurrent ? "text-(--violet-11)" : "text-low",
                )}
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-accent font-medium">{step.title}</h3>
                <p className="text-low text-sm">{step.text}</p>
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
