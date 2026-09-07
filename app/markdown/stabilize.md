# Stabilize: kill flakes and debug failures with full per-test history

> A flakiness score for every test computed from your auto-approved builds, the history of each recurring change, a one-click ignore scoped to a diff fingerprint so it never hides a new regression, and the Playwright trace and failure screenshots of every attempt, already in Argos for you or the agent fixing the test.

Canonical: https://argos-ci.com/stabilize
Documentation: https://argos-ci.com/docs/learn/reliability-and-flakiness/flaky-test-detection

**Stabilize** is the part of Argos that deals with tests that move on their
own. Argos uses deterministic pixel diffing and treats flakiness as technical
debt to fix, not noise to ignore: it measures how unstable each test is,
groups the changes it keeps producing, lets you silence exactly one of them
without lowering detection anywhere else, and keeps the evidence of every
failed attempt so the fix, by a person or an agent, starts from facts.

## Flakiness

- Only **auto-approved builds** count. A change on a pull request branch
  usually means someone changed the UI on purpose; a change on an
  auto-approved build means the test moved on its own.
- Every changed test in a build review carries a **flaky badge**. Hover it for
  the numbers, select it to open the test page.
- The **test page** gathers everything Argos knows about one test over a
  period you pick (24 hours, 3, 7, 30 or 90 days; 7 by default, kept in the
  URL): a **Flakiness** score from 0 to 100 (higher is worse) derived from
  **Stability** (share of builds where the test did not change) and
  **Consistency** (share of its changes that were one-offs), plus **Builds**
  and **Changes**, each broken down over time. **First change** and **Last
  change** link to the builds where the test first and last changed.
- A **change** is one exact visual difference, not one occurrence of it.
  Argos groups every diff that looks the same, so the list reads
  **Recurring — N×**, **One-off** or **Ignored**, ordered by how often each
  came back, with its occurrences out of the build count and when it was first
  and last seen.
- The **Tests dashboard** ranks a project's tests by flakiness score, flakiest
  first, filterable by build name and period. The **account-wide** dashboard
  does the same across every project you can access, with a Project column.

## Ignore changes

- From the build page or the test page, select **Ignore** next to a change,
  or press `I`. Argos stops asking about that exact change on future builds.
  No config file, no baseline to rewrite.
- Each change carries a **fingerprint**, a stable signature computed from the
  shape of its diff. An ignore is a **test-plus-fingerprint pair**: it absorbs
  pixel-level noise such as antialiasing but distinguishes genuinely different
  changes, so a new regression elsewhere in the same screenshot is still
  reported. The fingerprint is part of a change's identity in the API and CLI.
- **Auto-ignore**: in Project Settings → Flaky detection, Argos can ignore a
  change automatically once it has appeared a minimum number of times in
  auto-approved builds within the last 7 days. The default threshold is 3.
  Auto-ignored changes are attributed to the Argos bot and carry an **Auto**
  badge.
- The **Ignored** page lists every change a project currently ignores, with
  how many auto-approved builds have shown it since (the review noise the
  ignore absorbed) and when it was last seen. An ignore that went quiet is a
  blind spot: unignore it in one click and Argos asks for review again.
- The pull request comment counts ignored screenshots alongside the others,
  for example `4 changed, 3 ignored`. The whole ignore feature is a
  per-project toggle, on by default.

## Test debugging

- Add `@argos-ci/playwright/reporter` to your Playwright config and set
  `trace: "on-first-retry"` and `screenshot: "only-on-failure"` in `use`. The
  reporter uploads **failure screenshots** and **Playwright traces** with the
  build; you open the trace viewer from Argos instead of downloading CI
  artifacts.
- Every failed attempt uploads its screenshot, with `retries` and `retry` in
  its metadata. Failures that eventually passed on retry sit in their own
  **retried failures** section, so a flaky run can be inspected without
  cluttering the review.
- Each uploaded snapshot, traces included, is limited to **50 MB**.
- The **Cypress SDK** gives you visibility on test failures alongside its
  stabilization (fonts, images and `aria-busy` loaders settled before
  capture). Traces are a Playwright feature.
- To reproduce a flake on purpose, run `playwright test --repeat-each 5`.

## Test comments

- The **Activity** section of a test page is the test's own conversation,
  separate from any build review. Comments are Markdown with `/` slash
  commands and @mentions; reply to start a thread, react, resolve and reopen.
- A comment on a test **posts immediately**: there is no pending review to
  batch it into. The feed opens with when Argos first saw the test.
- Use the bell in the Activity header to **follow** a test; commenting follows
  it for you. Leaving comments requires a role that can review.
- **Fix with AI**: the test page hands you a prompt to copy into Claude Code,
  Codex, Cursor or any coding agent working in your repository. It names the
  test, carries the flakiness Argos measured, and tells the agent how to pull
  the recurring changes and their screenshots before editing anything. The
  card expands on its own when the test looks flaky.
- The **stabilization playbook** documents the fixes for a human reader:
  waiting for loading with `aria-busy`, background images, pausing GIFs,
  freezing dates and times, text rendering flags, browser glitches and the
  `data-visual-test` helpers.

## For AI agents

Everything on the test page is readable from a terminal, so an agent can run
the same investigation: list the flakiest tests, read one test's metrics and
its recurring changes with their screenshots, find the non-determinism in the
repository and fix it, and ignore what cannot be made deterministic.

```bash
# Flakiest tests first: the backlog
argos test list --project acme/app --limit 20 --json

# One test: metrics, trend, first and last change
argos test get <testId> --json

# Its changes, most frequent first, with screenshots
argos test changes <testId> --json

# Silence what cannot be fixed (personal access token)
argos change ignore <changeId> --project acme/app

# Leave the findings where the team reads them
argos test comment create <testId> --project acme/app --body "Flaky since the carousel landed."
```

- **Tokens**: a project token is enough to read a test and its changes.
  Ignoring a change and posting comments act as a user and need a personal
  access token with review permission.
- **Skills**: `npx skills add https://argos-ci.com` installs the `argos-cli`
  skill, which covers the flakiness commands, flags and token rules.
- **MCP**: the `getTest` and `listTestChanges` tools of
  https://mcp.argos-ci.com return the same data. Reading needs the
  `projects:read` scope; ignoring a change needs `reviews:write`; commenting
  needs `comments:write`.
- **REST API**: `GET /projects/{owner}/{project}/tests/{testId}` and
  `GET /projects/{owner}/{project}/tests/{testId}/changes`.
- Review the agent's fix like any other change: a test that stops changing
  because it stopped asserting anything is worse than a flaky one. Argos keeps
  comparing deterministically either way, so a fix that does not work shows up
  as a change again on the next build.

## Related

- Deploy — free preview URLs for your Storybook or static site on every PR: https://argos-ci.com/deploy
- Diff — any file, not just pixels: screenshots, Markdown, JSON, and more: https://argos-ci.com/diff
- Review — one place for humans and agents to approve what changed: https://argos-ci.com/review
- Argos for AI agents: https://argos-ci.com/ai-agents

## Learn more

- [Flaky test detection](https://argos-ci.com/docs/learn/reliability-and-flakiness/flaky-test-detection)
- [Test page](https://argos-ci.com/docs/learn/reliability-and-flakiness/test-page)
- [Tests dashboard](https://argos-ci.com/docs/learn/reliability-and-flakiness/tests-dashboard)
- [Ignored changes](https://argos-ci.com/docs/learn/reliability-and-flakiness/ignored-changes)
- [Fix flaky tests with AI agents](https://argos-ci.com/docs/learn/reliability-and-flakiness/fix-flaky-tests-with-ai-agents)
- [Stabilize screenshots](https://argos-ci.com/docs/learn/reliability-and-flakiness/flaky-tests)
- [Playwright SDK: tests debugging](https://argos-ci.com/docs/sdks-reference/playwright#setup-tests-debugging)
- [CLI reference: inspecting builds and tests](https://argos-ci.com/docs/sdks-reference/argos-command-line-interface-cli#inspecting-builds-and-tests)
- [MCP server](https://argos-ci.com/docs/agents/mcp-server)
- [Agent skills](https://argos-ci.com/docs/agents/agent-skills)
