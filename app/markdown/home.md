# Argos — Review product changes in the age of AI

> Argos keeps product quality high while your team and your agents ship faster. See every change a PR makes, whether pixels, Markdown, or JSON, review it with confidence, and deploy every PR. Visual & snapshot testing for Playwright and Storybook.

Canonical: https://argos-ci.com/
Machine-readable map: https://argos-ci.com/llms.txt

Agents generate more changes than teams can review. Argos makes every change
obvious, then lets your team and your agents comment, approve, and ship.

## What Argos does

- **Visual testing** — Your CI uploads screenshots as "builds"; Argos diffs
  them against the approved baseline and flags every visual change on the pull
  request. First-class SDKs for Playwright and Storybook, plus a CLI that works
  with any screenshot folder.
- **Collaborative reviews** — Approve or reject changes from a purpose-built
  review UI, comment on specific changes, and keep GitHub/GitLab checks in
  sync. Keep your team on the same page.
- **Agent-ready** — Your agents check their own work: through the
  [Argos MCP server](https://argos-ci.com/docs/agents/mcp-server), agents read
  what their change did, fix what they broke, show their work, and only bring
  you what's left.
- **Media sharing** — Upload a standalone screenshot or screen recording from
  the CLI, SDK, API, or MCP and get a share link with ready-to-paste Markdown.
  Media staged on a branch lands on the pull request automatically, so agents
  can show their work ([media sharing](https://argos-ci.com/media-sharing)).
- **Deploy Storybook on every PR** — Argos hosts your Storybook builds so every
  pull request has a browsable component preview.
- **Flaky test management** — Argos detects unstable changes, lets you ignore
  them, and keeps flakiness from blocking reviews.
- **Test debugging** — Screenshots, DOM snapshots, and Playwright traces
  attached to every failure, so CI failures are diagnosed in seconds.
- **Cost** — Cut visual testing costs, not coverage: 5,000 free screenshots per
  month on Hobby, transparent per-screenshot pricing on Pro
  (see [pricing](https://argos-ci.com/pricing)).

## Integrations

GitHub, GitLab, Playwright, Storybook, Cypress, Puppeteer, WebdriverIO, and
any CI. Trusted by teams like MUI, Le Monde, Doctolib, and Interactive Things
([customers](https://argos-ci.com/customers)).

## For agents

- Docs: https://argos-ci.com/docs (markdown map: https://argos-ci.com/docs/llms.txt)
- REST API: https://api.argos-ci.com/v2 (OpenAPI: https://api.argos-ci.com/v2/openapi.yaml)
- MCP server: https://mcp.argos-ci.com
- How to authenticate: https://argos-ci.com/auth.md
- API catalog: https://argos-ci.com/.well-known/api-catalog

## Get started

1. Sign up at https://app.argos-ci.com/signup (GitHub, GitLab, or Google).
2. Install an SDK: `npm install @argos-ci/playwright` (or `@argos-ci/storybook`, `@argos-ci/cli`).
3. Upload screenshots from CI and review changes on every pull request.

Quickstart: https://argos-ci.com/docs/quickstart
