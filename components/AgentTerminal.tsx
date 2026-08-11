import clsx from "clsx";
import type { ReactNode } from "react";

import { ClaudeMark } from "@/components/ClaudeMark";

/**
 * The verdict in a turn, when there is one. Weight rather than color: violet
 * already means three things in this card — your input, the selected row, the
 * caret — and a fourth would stop it meaning any of them.
 */
export function Verdict(props: { children: ReactNode }) {
  return <strong className="font-semibold">{props.children}</strong>;
}

/**
 * An identifier the agent is referring to.
 *
 * Monospace was the first instinct — it is the convention for a name you could
 * paste somewhere — but a mono space is wider than the surrounding prose one,
 * so "PR #359" came out looking like a typo. The accent carries the same job
 * with no gap, and inside prose it reads as a reference rather than as the
 * chrome meanings violet has elsewhere in this card.
 */
export function Ref(props: { children: ReactNode }) {
  return <span className="text-(--violet-11)">{props.children}</span>;
}

/**
 * A conversation, not a command log.
 *
 * The panel used to print CLI output — a count of diffs, a build conclusion,
 * a score. None of that is what the reader needs to believe the section: the
 * claim is that an agent reads a build and acts on it, and the thing that
 * demonstrates it is the agent saying what it found and what it is going to do.
 * Raw output only proved that a command exists.
 *
 * The shape follows a real Claude session in a terminal: what you typed sits in
 * a filled band, the reply is plain prose under it with nothing marking it, and
 * the caret waiting for your next message closes the window. Nothing here
 * labels the speakers — the band already says which turn is yours.
 *
 * Only the typed things are monospaced: your line and the tool call. The
 * agent's prose is set in the page's own face, because that is how it reads in
 * the real client — as writing, not as output.
 *
 * `tool` names the call the agent made, never its result, so the reader can see
 * the Argos CLI is doing real work without the panel becoming a transcript.
 */
export type TerminalLine =
  | { kind: "tool"; text: string }
  // A node rather than a string, so a turn can carry a `Verdict` or a `Ref`
  // without the panel growing a markup dialect of its own.
  | { kind: "assistant"; text: ReactNode };

export function AgentTerminal(props: {
  /**
   * The one thing you asked for. It is the same across every step and sits
   * outside the swapped block on purpose: moving between rows must not
   * re-render it, so the reader sees a single instruction holding still while
   * the agent's work advances underneath.
   */
  prompt: string;
  /**
   * Every conversation, not just the visible one.
   *
   * They are stacked in a single grid cell with the inactive ones hidden, so
   * the card is always as tall as its longest step at whatever width it is
   * being read. A hand-tuned `min-height` did the same job only at the width it
   * was measured at: below ~900px the column narrows, the text wraps further,
   * and the card went back to growing and shrinking between tabs.
   */
  conversations: { key: string; lines: TerminalLine[] }[];
  activeKey: string;
  /**
   * Sizing and entrance, left to the caller — the panel owns how it looks, not
   * how big it is. The homepage centres it at a fixed width; the media sharing
   * flow stretches it to the height of the pull request card beside it. Passing
   * this replaces the default rather than adding to it, since every part of it
   * is something a caller may need to contradict.
   */
  className?: string;
}) {
  const { prompt, conversations, activeKey, className } = props;

  return (
    <div
      className={clsx(
        // A column, so a caller that stretches the panel grows the conversation
        // and leaves the caret sitting on the bottom edge.
        "flex flex-col overflow-hidden rounded-xl border-[0.5px] bg-app shadow-md/7 dark:border-(--neutral-7)",
        className ??
          "w-full max-w-md animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in",
      )}
    >
      {/* The agent is named once, here, instead of on every turn it takes. */}
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <ClaudeMark className="size-3.5 shrink-0" />
        <span className="text-xs font-medium text-low">Claude Code</span>
      </div>

      {/* The filled band is what marks the turn as yours — the device the real
          session uses, and the reason no name is needed. Monospaced, since this
          is the one line that was actually typed. */}
      <div className="mt-2 flex gap-2 bg-(--neutral-3) px-4 py-1.5 font-mono text-xxs">
        <span aria-hidden className="shrink-0 text-(--violet-11)">
          ›
        </span>
        <p className="text-default">{prompt}</p>
      </div>

      {/* Every step occupies the same grid cell. The hidden ones still take
          their space, so the cell is the height of the longest at any width,
          and `visibility: hidden` keeps them out of the accessibility tree.
          No horizontal padding: each line pads itself, so a full-bleed row
          stays possible. */}
      <div className="grid flex-1">
        {conversations.map((conversation) => {
          const isActive = conversation.key === activeKey;
          return (
            <div
              key={conversation.key}
              aria-hidden={!isActive}
              // Applying the fade class as a step becomes active is what
              // replays it — the node is only ever given the class on the
              // transition into view. `min-w-0`, or the grid track sizes
              // itself to the longest tool line and the whole cell slides out
              // of the card instead of that one line truncating.
              className={clsx(
                "col-start-1 row-start-1 min-w-0 space-y-2.5 pt-3 pb-6",
                isActive
                  ? "animate-fade-in animate-duration-300 fill-mode-both"
                  : "invisible",
              )}
            >
              {conversation.lines.map((line, index) => (
                <Line key={index} line={line} />
              ))}
            </div>
          );
        })}
      </div>

      {/* The caret waiting for your next message. It is the only live element
          left: in a finished exchange the cursor sits at the input, not in the
          middle of something the agent already said. */}
      <div className="flex items-center gap-2 border-t-[0.5px] px-4 py-2.5">
        <span aria-hidden className="font-mono text-xxs text-(--violet-11)">
          ›
        </span>
        <span
          aria-hidden
          className="inline-block h-3 w-1.5 animate-pulse bg-(--violet-9)"
        />
      </div>
    </div>
  );
}

function Line(props: { line: TerminalLine }) {
  const { line } = props;

  if (line.kind === "tool") {
    // Dimmed, and hung off the same edge as the prose: the agent reaching for
    // Argos, subordinate to the turn above it rather than a command the reader
    // is invited to run. The empty first cell matches the bullet's box, so the
    // indent stays right without a magic number. A command longer than the
    // panel truncates rather than wraps — the real client does the same, and a
    // command broken across lines stops reading as one call.
    return (
      <div className="flex gap-2 px-4">
        <span aria-hidden className="size-1.5 shrink-0" />
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-xxs text-low">
          {/* Drawn rather than typed. `⎿` is a box-drawing character, so its
              shape depends on whichever font resolves it — the same reason the
              answer bullet is a span and not a glyph. */}
          <span
            aria-hidden
            className="mb-0.5 size-1.5 shrink-0 rounded-bl-[1px] border-b border-l border-(--neutral-8)"
          />
          <span className="truncate">{line.text}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 px-4">
      {/* The disc the real client puts in front of every answer. Drawn rather
          than typed: a glyph would take its size from whichever font resolved,
          and this one has to line up with prose set in the page's face. */}
      <span
        aria-hidden
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(--violet-9)"
      />
      <p className="text-xs leading-relaxed text-default">{line.text}</p>
    </div>
  );
}
