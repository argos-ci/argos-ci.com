"use client";

import clsx from "clsx";
import {
  ClipboardCheckIcon,
  MessageSquareCodeIcon,
  PlugIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useId, useRef, useState } from "react";

import { AgentTerminal, type TerminalLine } from "./AgentTerminal";

type Step = {
  key: string;
  icon: typeof PlugIcon;
  title: string;
  text: string;
  badge: string;
  footer: string;
  lines: TerminalLine[];
};

/**
 * Ordered from mechanism to consequence, not strongest first.
 *
 * "Agents act on your review" used to open, and it asks the reader to accept
 * three things at once — that comments are pinned to pixels, that an agent can
 * reach them, and that it can act on them — right after a title that already
 * claimed the same thing. Two assertions of the payoff before anything made it
 * credible.
 *
 * MCP and the CLI are concrete and checkable, and they are what earns the last
 * two points. Once "the agent reads and writes through these" is established,
 * acting on the review is a consequence rather than a promise.
 *
 * Every command is real, checked against `origin/main` of argos-javascript and
 * the MCP page of the docs. Note the asymmetry on `--project`: `build snapshots`
 * authenticates as `project` and resolves the account from the token, while
 * `comment list` and `review create` authenticate as `user` — a personal access
 * token is not scoped to one project — so a bare build number is not enough for
 * them. It is not an oversight.
 */
const STEPS: Step[] = [
  {
    key: "mcp",
    icon: PlugIcon,
    title: "Agents connect over MCP",
    text: "Connect Claude, Cursor, or any MCP client to the Argos MCP server with OAuth — every review action, natively in your agent.",
    badge: "mcp.argos-ci.com",
    footer: "One remote server, no package to install",
    lines: [
      {
        kind: "prompt",
        text: "claude mcp add --transport http argos https://mcp.argos-ci.com",
      },
      { kind: "output", text: "→ Authenticating with OAuth…" },
      { kind: "status", text: "Connected, review tools available" },
    ],
  },
  {
    key: "cli",
    icon: ClipboardCheckIcon,
    title: "Agents review from the CLI",
    text: "Inspect a build, list what needs review, and submit a decision, or hit Copy prompt to hand an agent the full context.",
    badge: "@argos-ci/cli",
    footer: "Start a review from any build",
    lines: [
      { kind: "prompt", text: "argos build snapshots 482 --needs-review" },
      { kind: "output", text: "→ 3 snapshots need review · 1 flagged flaky" },
      { kind: "status", text: "Ready to inspect" },
    ],
  },
  {
    key: "comments",
    icon: MessageSquareCodeIcon,
    title: "Agents act on your review",
    text: "Ask your agent to pick up a build and it reads every comment, plus the screenshot each one is pinned to, then fixes exactly what you flagged.",
    badge: "@argos-ci/cli",
    footer: "Comments carry the pixels they point at",
    lines: [
      { kind: "prompt", text: "argos comment list 482 --project acme/web" },
      {
        kind: "output",
        text: "→ “Spacing is off under the CTA” · Checkout / mobile",
      },
      { kind: "status", text: "Agent has the image and the coordinates" },
    ],
  },
  {
    key: "iterate",
    icon: RefreshCwIcon,
    title: "Agents iterate and self-correct",
    text: "When Argos surfaces an unintended change, the agent has the context to fix its own mistake before you ever look.",
    badge: "@argos-ci/cli",
    footer: "Ship once the diff is the one you asked for",
    lines: [
      {
        kind: "prompt",
        text: "argos review create 482 --project acme/web --event approve",
      },
      { kind: "status", text: "Review submitted, safe to merge" },
    ],
  },
];

/**
 * The four points drive the terminal instead of sitting beside it.
 *
 * As a static list opposite a fixed panel, nothing said which row the panel was
 * illustrating — the reader had to assume it stood for all four, which made it
 * decoration. Selecting a row and watching the terminal answer is what turns the
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
          badge={current.badge}
          footer={current.footer}
        />
      </div>
    </div>
  );
}
