# Argos: catch every visual change before it ships

> Argos is visual and snapshot testing for Playwright, Storybook and Vitest. It does four things for every pull request: a diff of everything that changed (pixels or any file), one place for humans and agents to approve it, the per-test history to kill flakes, and a free preview URL for your Storybook or static site. Everything is reachable from the CLI, the MCP server and the REST API, so AI agents use it end to end.

Canonical: https://argos-ci.com/
Machine-readable map: https://argos-ci.com/llms.txt

Agents generate more changes than teams can review. Argos makes every change
obvious, gives your team and your agents one place to approve it, and keeps
the tests behind it trustworthy.

## What Argos does

### 1. Diff: any file, not just pixels

- Deterministic pixel diffing with the open-source odiff engine (not AI), with
  capture defaults that wait for fonts and images, hide carets and scrollbars
  and pause GIFs, so a diff is a real change.
- Text diffs for Markdown, JSON, YAML, XML, HTML, CSS, JavaScript and plain
  text uploaded with the CLI or snapshotted from Vitest, and ARIA snapshots
  from Playwright, diffed line by line.
- SDKs for Playwright, Storybook, Vitest, Cypress, Puppeteer and WebdriverIO,
  or the CLI for any screenshot folder. Baselines come from your Git history.
- Learn more: https://argos-ci.com/diff

### 2. Review: one place for humans and agents to approve what changed

- Side-by-side or overlay views, keyboard shortcuts (`Y`/`N` to accept or
  reject), comments pinned to the exact pixel or text line, threads with
  mentions, reactions and resolve, all in real time.
- Request several reviewers and track each verdict: one rejection blocks,
  otherwise one approval passes. Agents review too, from the CLI
  (`argos review create`), the MCP server or the REST API, with a personal
  access token so every verdict is attributed to a user.
- The result lands on the pull request as a check you can require and one
  comment kept current; Automations post to Slack, Microsoft Teams or Discord.
- Learn more: https://argos-ci.com/review

### 3. Stabilize: kill flakes and debug failures with full per-test history

- A flakiness score (0–100) and a flaky badge for every test, computed from
  your auto-approved builds, with the history of each recurring change and
  project and account-wide tests dashboards.
- Ignore a change once: Argos recognizes the same diff by its fingerprint and
  stays quiet, while new diffs still surface. Recurring flakes can be ignored
  automatically.
- Failure screenshots and Playwright traces upload with the build, every
  attempt kept, so you or your agent can debug from Argos.
- Learn more: https://argos-ci.com/stabilize

### 4. Deploy: free preview URLs for your Storybook or static site on every PR

- `argos deploy ./storybook-static` uploads any static build (Storybook, Vite,
  Next.js export, plain HTML) to an immutable preview URL. Each branch also
  gets a URL that follows its latest build, and production gets
  `<slug>.argos-ci.live` or your own custom domain (one CNAME, automatic TLS).
- Standard protection keeps previews behind Argos sign-in and production
  public; Team plans can lock every deployment.
- The URL lands in the Argos pull request comment next to the visual build,
  with an `argos-deploy/<project>` status you can require in branch
  protection. Deployments never expire and don't count toward the screenshot
  quota.
- Learn more: https://argos-ci.com/deploy

## Built for AI agents

- Every pillar is reachable from the CLI (`@argos-ci/cli`), the
  [MCP server](https://argos-ci.com/docs/agents/mcp-server) at
  https://mcp.argos-ci.com (OAuth or personal access token) and the REST API
  at https://api.argos-ci.com/v2.
- `npx skills add https://argos-ci.com` installs the argos-cli,
  argos-pr-review and argos-upload skills for Claude Code, Codex, Cursor and
  other skill-compatible agents.
- Agents show their work: `argos media upload` puts a screenshot or a
  recording on the pull request
  ([media sharing](https://argos-ci.com/media-sharing)).
- Learn more: https://argos-ci.com/ai-agents

## Integrations and SDKs

GitHub, GitLab, Slack, Microsoft Teams and Discord. SDKs for Playwright,
Storybook, Cypress, Vitest, WebdriverIO and Puppeteer, plus a CLI for any
framework. Trusted by teams like Meta, ClickHouse, GitBook, Attio, Qonto,
Doctolib, Le Monde, Redis, MUI and Mermaid
([customers](https://argos-ci.com/customers)).

## Pricing

Cut visual testing costs, not coverage: 5,000 free screenshots per month on
Hobby (Storybook and static deployments included), transparent per-screenshot
pricing on Pro (see [pricing](https://argos-ci.com/pricing)).

## For agents

- Docs: https://argos-ci.com/docs (markdown map: https://argos-ci.com/docs/llms.txt)
- REST API: https://api.argos-ci.com/v2 (OpenAPI: https://api.argos-ci.com/v2/openapi.yaml)
- MCP server: https://mcp.argos-ci.com
- How to authenticate: https://argos-ci.com/auth.md
- API catalog: https://argos-ci.com/.well-known/api-catalog
- Every page on this site as markdown: send `Accept: text/markdown`, or read `/md/<path>` (e.g. https://argos-ci.com/md/deploy)

## Get started

1. Sign up at https://app.argos-ci.com/signup (GitHub, GitLab, or Google).
2. Install an SDK: `npm install @argos-ci/playwright` (or `@argos-ci/storybook`, `@argos-ci/vitest`, `@argos-ci/cli`).
3. Upload screenshots from CI, deploy your Storybook, and review changes on every pull request.

Quickstart: https://argos-ci.com/docs/quickstart
