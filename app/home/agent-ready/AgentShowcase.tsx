"use client";

import clsx from "clsx";
import {
  MessageSquareCodeIcon,
  RefreshCwIcon,
  ScanEyeIcon,
} from "lucide-react";
import { useId, useRef, useState } from "react";

import { AgentTerminal, type TerminalLine } from "./AgentTerminal";

type Step = {
  key: string;
  icon: typeof ScanEyeIcon;
  title: string;
  text: string;
  footer: string;
  lines: TerminalLine[];
};

/**
 * Ordered by what each one asks of the reader, not by chronology.
 *
 * Reading the diff and self-correcting happen on any build with changes, with
 * nothing required of you. The feedback loop is the step where you weigh in, so
 * it comes last — the list escalates from "costs you nothing" to "costs you a
 * comment", and lands on the reader rather than on the machine.
 *
 * The subject shifts with it: "Agents" twice, then "Argos", and the third body
 * is the only one that says "your agent". That change of person is what marks
 * the change of level, more than the titles do.
 *
 * CLI and MCP used to be two rows of their own. They describe the transport,
 * which is a means, not a capability — they are now a clause inside the first
 * point, which is also what let the list come down to three.
 *
 * Every command is real, checked against `origin/main` of argos-javascript.
 * `build snapshots` and `build get` both authenticate as `project` and resolve
 * the account from the token, which is why a bare build number is enough and
 * neither carries `--project`.
 */
const STEPS: Step[] = [
  {
    key: "diff",
    icon: ScanEyeIcon,
    title: "Agents see their own changes",
    text: "The Argos CLI and MCP server let agents read exactly what their changes did to the UI, the Markdown, and the API output.",
    footer: "Screenshots, Markdown and API output",
    lines: [
      { kind: "prompt", text: "argos build snapshots 482 --needs-review" },
      {
        kind: "output",
        text: "→ 3 snapshots need review · 1 flagged flaky",
      },
      { kind: "status", text: "Diffs ready to read" },
    ],
  },
  {
    key: "iterate",
    icon: RefreshCwIcon,
    title: "Agents iterate and self-correct",
    text: "When Argos surfaces an unintended change, agents have the context to fix it before you ever look.",
    footer: "The next build is the proof",
    lines: [
      { kind: "prompt", text: "argos build get 483" },
      {
        kind: "output",
        text: "→ #483 · no changes detected · after the agent’s fix",
      },
      { kind: "status", text: "Nothing left to review" },
    ],
  },
  {
    key: "loop",
    icon: MessageSquareCodeIcon,
    title: "Argos becomes the feedback loop",
    text: "Pin a comment on what’s wrong and your agent picks it up with the screenshot it points to.",
    footer: "Comments carry the pixels they point at",
    // The only step that does not open on a command. This is the row where the
    // reader acts, and what the reader does is ask an agent — `argos comment
    // list` showed the agent's side of it, not theirs.
    //
    // The agent closes on a push, not on a build: it edits code and pushes a
    // branch. The Argos build that follows is CI's doing, and claiming the agent
    // produced one would be the wrong actor.
    lines: [
      { kind: "agent", text: "handle the comments on build 482" },
      { kind: "output", text: "→ 2 comments · 2 screenshots pulled over MCP" },
      { kind: "status", text: "Fixed and pushed to fix/checkout-spacing" },
    ],
  },
];

/**
 * The points drive the terminal instead of sitting beside it.
 *
 * As a static list opposite a fixed panel, nothing said which row the panel was
 * illustrating — the reader had to assume it stood for all of them, which made
 * it decoration. Selecting a row and watching the terminal answer is what turns the
 * two columns into one demonstration.
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
    <div className="grid border-y md:grid-cols-2">
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
          stateId={current.key}
          lines={current.lines}
          footer={current.footer}
        />
      </div>
    </div>
  );
}
