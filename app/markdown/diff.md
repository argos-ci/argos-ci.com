# Argos Diff: every change, diffed. Pixels or any file.

> Deterministic pixel diffs for screenshots and text diffs for Markdown, JSON, YAML, HTML and ARIA snapshots, each compared to the baseline Argos picks from your Git history. Works with Playwright, Vitest, Storybook, Cypress, WebdriverIO and Puppeteer, or with any tool through the CLI. Every diff is structured data an agent can read.

Canonical: https://argos-ci.com/diff
Documentation: https://argos-ci.com/docs/learn/platform-fundamentals/how-argos-detects-visual-differences

**Diff** is the second of the four steps Argos follows on a pull request:
[deploy](https://argos-ci.com/deploy) it, diff what changed,
[review](https://argos-ci.com/review) it together, and
[stabilize](https://argos-ci.com/stabilize) the tests behind it. Argos
compares the snapshots your tests produce against their counterparts in the
baseline build and answers one question per pair: did it change, or not. No
AI, no probability, no guesswork.

A live, public example of a build with diffs:
https://app.argos-ci.com/argos-ci/snkr-shop/builds/11

## Screenshots: only the real changes

- **Deterministic capture.** Before a screenshot, the SDK waits for fonts,
  images and `aria-busy` elements to settle, hides carets and scrollbars,
  pauses animated GIFs on their first frame and pins sticky and fixed elements
  in place. All of it is on by default (`stabilize.waitForFonts`,
  `stabilize.hideCarets`, `stabilize.pauseGifs`, …) and can be turned off per
  screenshot.
- **A mask and a score, not a guess.** Each comparison runs in four stages:
  image normalization (resolution, color space, alpha), several diff passes at
  different thresholds, pixel clustering to separate noise from meaningful
  change, and a final diff mask plus a score. The engine is the open-source
  [odiff](https://github.com/dmtrKovalenko/odiff) library, and Argos's own
  [diff implementation](https://github.com/argos-ci/argos/blob/main/apps/backend/src/screenshot-diff/diff/image/index.ts)
  is public.
- **A threshold you set.** `threshold` runs from 0 to 1 (default 0.5): the
  higher, the less sensitive the comparison. Set it per screenshot in the SDK
  options, or per upload with `argos upload --threshold`.
- **Mask what you can't control.** `data-visual-test="transparent"` hides an
  element and keeps its space, `data-visual-test="blackout"` masks it,
  `data-visual-test="removed"` drops it from the layout. Use them for dates,
  avatars, ads or third-party widgets.
- **Open source, no black box.** Same input, same result; the exact pixels
  that changed are visible; approvals have a clear meaning. No model decides
  what counts as a change.

Documentation:
https://argos-ci.com/docs/learn/platform-fundamentals/how-argos-detects-visual-differences,
https://argos-ci.com/docs/sdks-reference/playwright,
https://argos-ci.com/docs/learn/reliability-and-flakiness/flaky-tests/argos-helpers

## Any file: not just screenshots

- **Text diffs for structured output.** Upload text files with the CLI and
  Argos matches each one to its baseline by name and diffs it as text:

  ```bash
  argos upload -f "**/*.{txt,json,yaml,yml,xml,html,md,css,js}" ./snapshots
  ```

  Supported content types: `text/plain`, `application/json`,
  `application/yaml`, `text/yaml`, `application/xml`, `text/xml`, `text/html`,
  `text/markdown`, `text/css`, `application/javascript`, `text/javascript`.
  Keep file names and paths stable so each file keeps its baseline.

- **ARIA snapshots, diffed like code.** With the Playwright SDK, pass
  `ariaSnapshot: true` to `argosScreenshot`, or call `argosAriaSnapshot`, to
  capture the page's accessibility tree next to the screenshot. A renamed
  heading or a lost landmark shows up as a text diff even when the pixels don't
  move. Each ARIA snapshot counts as one screenshot.
- **Snapshot any value from Vitest.** `argosSnapshot(value, { extension:
".json" })` serializes any value in a browser or Node test (strings verbatim,
  anything else with `@vitest/pretty-format`) and diffs it across builds. No
  browser needed.
- **Same build as your screenshots.** Pass both globs to one `argos upload`
  and images and text files land in the same build, review and check:
  `argos upload -f "**/*.{png,jpg,jpeg,webp,avif,gif}" "**/*.{txt,json,yaml,yml,xml,html,md,css,js}" ./snapshots`
- **One file, one screenshot.** Every snapshot stored for a build counts as one
  screenshot toward the plan, image or not. Each snapshot is limited to 50 MB;
  a build to 5,000 screenshots (use parallel mode beyond that).
- Non-image comparisons go through the CLI; the Vitest SDK covers
  `argosSnapshot`.

Documentation:
https://argos-ci.com/docs/learn/how-to-guides/visual-coverage/compare-non-image-files,
https://argos-ci.com/docs/sdks-reference/playwright#aria-snapshots,
https://argos-ci.com/docs/sdks-reference/vitest

## Storybook: every story, every mode, in your CI

- **Stories become snapshots.** Argos captures your stories in your own CI with
  Playwright, through Vitest (recommended) or the Storybook Test Runner. Each
  story is compared to its own baseline.
- **One story, every mode.** Declare `parameters.argos.modes` (theme,
  viewport, locale, or any Storybook global) at the project, component or
  story level and Argos captures one snapshot per mode name, each with its own
  baseline, without duplicating stories. Existing
  `parameters.chromatic.modes` are read too.
- **Captured in your CI with Vitest.** Screenshots are taken where your code
  runs, by the Vitest browser mode you already use, not in a third-party
  cloud.
- **Screenshots inside play functions.** The `play` function runs before the
  capture. With Vitest, call `argosScreenshot(ctx, name)` from
  `@argos-ci/storybook/vitest` inside it to capture intermediate states.
- **Fit to content.** Snapshots are cropped to the rendered component by
  default (`fitToContent: true`, 16px padding, 2x zoom). Set it to `false` to
  capture the whole page.
- **Vitest, Test Runner, or legacy Storybook.** Three quickstarts: Storybook +
  Vitest, Storybook + Test Runner, and Storybook before v8.

Documentation: https://argos-ci.com/docs/quickstart/storybook-quickstart,
https://argos-ci.com/docs/learn/how-to-guides/visual-coverage/storybook-story-modes,
https://argos-ci.com/docs/sdks-reference/storybook

## Any framework, any CI: your tests, your CI, one baseline

- **Screenshots stay in CI, not in Git.** The reporter uploads what your tests
  captured, straight from the CI job. No binary files committed, no baseline
  folder to maintain, no local run to refresh it.
- **Every snapshot carries its context.** URL, viewport, color scheme, media
  type, browser, test title and location, retries and retry index, tags: the
  SDKs attach it as a `.argos.json` metadata file. It shows on the build page
  and in the CLI's JSON output. Without an SDK, generate the metadata yourself
  and upload it with the CLI.
- **The right baseline, from Git.** Argos compares against the most recent
  complete, approved build with the same build name and mode whose commit is
  an ancestor of the merge base between your branch and its base branch. Builds
  on auto-approved branches such as `main` serve as baselines without a review;
  a build with an active rejection never does. `ARGOS_REFERENCE_BRANCH` and
  `ARGOS_REFERENCE_COMMIT` pin a different baseline.
- **Shards in, one build out.** Playwright shards join a single build
  automatically; Vitest shards do too once `ARGOS_PARALLEL_NONCE` is shared
  across them. Elsewhere, set `ARGOS_PARALLEL`,
  `ARGOS_PARALLEL_TOTAL`, `ARGOS_PARALLEL_INDEX` and a shared
  `ARGOS_PARALLEL_NONCE`, or use finalize mode (`ARGOS_PARALLEL_TOTAL=-1` +
  `argos finalize`) when the number of uploads isn't known upfront. One
  comparison, one status per commit.
- **Any framework via the CLI.** `argos upload ./screenshots` creates a build
  from any folder of images and reads the commit, branch and pull request from
  the CI environment. Official SDKs: Playwright, Vitest, Storybook, Cypress,
  WebdriverIO, Puppeteer.
- Every diff lands on the pull request as a check; see
  [Argos Review](https://argos-ci.com/review).

Documentation: https://argos-ci.com/docs/quickstart,
https://argos-ci.com/docs/sdks-reference/screenshot-metadata,
https://argos-ci.com/docs/learn/platform-fundamentals/baseline-build,
https://argos-ci.com/docs/learn/how-to-guides/ci-pipelines/parallel-testing-sharding

## For AI agents

Every diff is structured data: status, score, diff mask URL, baseline and
current files, and the metadata the SDK attached. An agent uploads from the
CLI, reads the build back as JSON, and uses the diff as evidence before it
approves anything.

```bash
argos upload ./screenshots
argos upload ./snapshots \
  -f "**/*.{txt,json,yaml,yml,xml,html,md,css,js}"
argos build get <build>
argos build snapshots <build> --needs-review --json
```

- **CLI.** `build get` and `build snapshots` are read-only and work with the
  project token CI already has; `--needs-review --json` returns only the diffs
  awaiting a decision. A `<build>` is a build number (with
  `--project owner/project`) or a full Argos build URL.
- **MCP.** The Argos MCP server at https://mcp.argos-ci.com lets Claude Code,
  Cursor, VS Code with Copilot, Codex CLI or Windsurf list builds and inspect
  their screenshot diffs with the `projects:read` scope. Project tokens are not
  accepted by MCP; authenticate with OAuth or a personal access token.
- **Skills.** `npx skills add https://argos-ci.com` installs `argos-pr-review`,
  which finds the build, inspects snapshots as evidence and summarizes the
  changes, and `argos-cli`, which teaches the commands, flags and token rules.
- **REST API.** The same data is available at https://api.argos-ci.com/v2
  (OpenAPI at https://api.argos-ci.com/v2/openapi.yaml). See
  https://argos-ci.com/docs/api-reference

Documentation:
https://argos-ci.com/docs/sdks-reference/argos-command-line-interface-cli,
https://argos-ci.com/docs/agents/mcp-server,
https://argos-ci.com/docs/agents/agent-skills,
https://argos-ci.com/ai-agents

## Related

- [Argos Deploy](https://argos-ci.com/deploy): free preview URLs for your
  Storybook or static site on every PR.
- [Argos Review](https://argos-ci.com/review): one place for humans and agents
  to approve what changed.
- [Argos Stabilize](https://argos-ci.com/stabilize): kill flakes and debug
  failures with full per-test history.
- [Argos for AI agents](https://argos-ci.com/ai-agents): MCP server, CLI,
  skills and REST API.
