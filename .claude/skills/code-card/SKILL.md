---
name: code-card
description: Render a syntax-highlighted code card on the Argos brand background with scripts/code-card.mjs. Use whenever a social post, changelog, or slide needs a snippet shown as an image — never paste a raw terminal screenshot or use a third-party service.
---

# Code cards

When a snippet is the point of a post, it ships as a rendered card: a macOS-style
window on the Argos indigo gradient, syntax highlighted in the brand palette.
Every card comes from `scripts/code-card.mjs`, so a set rendered months apart
still looks like one system.

This replaces SyntaxShot and similar services — they cap free renders per month
and their themes don't match the brand.

## Inputs

- **Script**: `scripts/code-card.mjs`. Uses `@playwright/test`, already a dependency — no install, no API key, no network.
- **Output**: 1400×880 at `deviceScaleFactor: 2` → 2800×1760 PNG. 16:10 survives feed cropping on X, LinkedIn and Bluesky.
- **Destination**: write to a scratch directory. These are social assets — do **not** commit them unless the image is also used on the site.

## Steps

### One card

```bash
node scripts/code-card.mjs --code /tmp/snippet.sh --out /tmp/card.png
```

The window title defaults to the snippet's filename. Override with `--title`.

### A batch (preferred — keeps a set consistent and re-renderable)

Write a spec, then render it in one pass:

```json
{
  "cards": [
    {
      "name": "POV1",
      "title": "assertion.ts",
      "code": "expect(button).toHaveClass('primary');"
    },
    { "name": "AG1", "codeFile": "snippets/setup.sh" }
  ]
}
```

```bash
node scripts/code-card.mjs --spec /tmp/cards.json --out-dir /tmp/cards
```

Each card writes to `<out-dir>/<name>.png`. Use `code` for short snippets and
`codeFile` (resolved relative to the spec) for anything long. Keep the spec
alongside the work — re-rendering the whole set after a style change is then one
command, which is the whole point.

### Always review the result

Read the PNG back before shipping it. Check: the card is centred with real
margin, nothing clipped on the right, highlighting landed on the right tokens,
and it's legible at feed thumbnail size.

## Writing the snippet

- **Verify every command against the source before rendering.** A wrong flag in
  an image is worse than in text — it gets screenshotted and quoted. The CLI
  lives in `argos-javascript/packages/cli/src`; MCP tools in
  `argos/apps/backend/src/mcp`. Two real examples that shipped wrong:
  `argos build review --conclusion approve` (no such subcommand — it is
  `argos review create <build> --event approve`) and `argos upload --files <glob>`
  (`upload` takes a required `<directory>` argument first).
- **Keep it to 6 lines or fewer.** The font is deliberately large so the card
  reads in a feed; long snippets shrink into unreadability.
- **Lead with a `#` or `//` comment** stating the point, when the code alone
  doesn't carry it. Comments render dimmed and italic, so they read as narration.
- **Break long commands** with a trailing `\` and two-space continuation indent.
- Match the snippet to the post copy. If the post shortened an identifier, the
  card should too.

## What gets highlighted

The tokenizer handles single, double and backtick strings, `#` and `//`
comments, `--flags`, `<placeholders>`, URLs, numbers, and `$skill` references.
It colors the first word of a line when it's a known command (`argos`, `npx`,
`claude`, `codex`, …) and the second when it's a known subcommand (`build`,
`review`, `comment`, `deploy`, …). JS/TS keywords like `await` and `expect` are
also colored.

Adding a new command or subcommand means adding it to the `COMMANDS` /
`SUBCOMMANDS` sets at the top of the script — otherwise it renders as plain
text, which is a safe fallback rather than a bug.

## Choosing between a code card and an illustration

- **Code card** — the snippet _is_ the message: a command, a config, an API shape.
- **Concept illustration** — the idea is abstract (a workflow, a tradeoff, scale).
  Use `gpt-image-2` with a no-text prompt; see the `changelog-image` skill for
  the house style, and never let the model render letterforms.

A post should carry one or the other, never a code card of prose.
