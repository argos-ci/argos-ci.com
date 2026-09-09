# Argos for AI agents: MCP server, CLI, skills, and REST API

> Your agents use Argos end to end. Deploy a preview, read the diff, review the build, fix the flake: every pillar is reachable from the CLI, the MCP server and the REST API, with the permissions of the person running the agent.

Canonical: https://argos-ci.com/ai-agents
Documentation: https://argos-ci.com/docs/agents

Argos does four things for a pull request (diff, review, stabilize,
deploy), and an agent can take each of them with the same tools a human
uses: the `@argos-ci/cli` npm package, the remote MCP server at
https://mcp.argos-ci.com, and the REST API at https://api.argos-ci.com/v2.
Argos itself does not use AI to decide anything: comparisons are deterministic
pixel and text diffs, and agents use the resulting build data as review
evidence.

## One agent, four jobs

Each pillar page has a "For AI agents" section with the full set of commands.
The first command an agent reaches for on each:

- **Diff** (https://argos-ci.com/diff#agents): Any file, not just pixels:
  screenshots, Markdown, JSON, and more. The agent reads every diff as data
  (status, score, diff mask, baseline and current file):
  `argos build snapshots <build> --json`
- **Review** (https://argos-ci.com/review#agents): One place for humans and
  agents to approve what changed. The agent approves, rejects or comments,
  attributed to the person whose token it runs with:
  `argos review create <build> --event approve`
- **Stabilize** (https://argos-ci.com/stabilize#agents): Kill flakes and
  debug failures with full per-test history. The agent reads a test's
  flakiness and its recurring changes, then fixes the cause or ignores the
  change: `argos test changes <testId> --json`
- **Deploy** (https://argos-ci.com/deploy#agents): Free preview URLs for your
  Storybook or static site on every PR. The agent ships its own preview with
  the command your CI runs, and the URL lands on the pull request:
  `argos deploy ./storybook-static`

## MCP server

- Official remote MCP server: https://mcp.argos-ci.com (streamable HTTP
  transport, nothing to install or run locally).
- Setup: `claude mcp add --transport http argos https://mcp.argos-ci.com`
  (Claude Code), `codex mcp add argos --url https://mcp.argos-ci.com` (Codex
  CLI), or add `{ "mcpServers": { "argos": { "url": "https://mcp.argos-ci.com" } } }`
  to your client's MCP config (Cursor; Windsurf uses `serverUrl`). Claude.ai,
  Claude for desktop and VS Code with Copilot add it from their settings.
  Guide: https://argos-ci.com/docs/agents/mcp-server#setup
- Authentication: OAuth (the client opens a browser; you choose the
  organizations to share and the scopes to grant; revoke any time under
  Authorized applications) or a personal access token sent as
  `Authorization: Bearer <personal-access-token>`. Project tokens are not
  accepted by the MCP server.
- Scopes: `projects:read` (projects, builds, tests), `reviews:write` (reviews,
  review requests, ignoring changes), `comments:write` (comments, notification
  subscriptions), `projects:write` (project configuration, automation rules),
  `media:read` and `media:write` (shared media), `account:admin` (team
  administration).
- Tools are generated from the REST API: every operation a user can call is a
  tool with the same name, parameters and permissions. When the management
  API shipped, the server went from 37 to 71 tools with no client update
  (https://argos-ci.com/changelog/2026-08-10-management-api). Agents list
  builds and inspect diffs, approve or reject builds, request reviewers, read
  and post comments, investigate flaky tests and ignore their changes,
  configure projects and automation rules, administer a team, upload media,
  and read analytics and usage.
- Keep your client's approval prompts on for write actions, and prefer
  read-only scopes when the agent only inspects builds.

## CLI and agent skills

- Install the CLI: `npm i --save-dev @argos-ci/cli` (Node.js 22 or later). It
  runs wherever the agent has a terminal: locally, in CI, in a sandbox.
- Install every skill Argos publishes: `npx skills add https://argos-ci.com`.
  Skills work with assistants that support them, such as Claude Code, Codex
  and Cursor. Activate one in a prompt:
  `Use $argos-pr-review to review this pull request with its Argos build.`
- `argos-cli`: the CLI's commands, flags, authentication rules and output
  formats, flakiness commands included.
- `argos-pr-review`: a complete pull-request review: find the Argos build,
  inspect the snapshots that need review, summarize what changed, compare it
  with the pull request intent, then approve or request changes.
- `argos-upload`: when and how to share a screenshot or a screen recording by
  link, how to embed it so a pull request renders it, and how to read back the
  comments a human pinned on it.
- Tokens: uploads, deployments and read-only commands (`build get`,
  `build snapshots`, `test list`, `test get`, `test changes`, `change list`,
  `project get`, `project deployments`, `media list`) work with a project
  token. Anything attributed to a user (submitting or dismissing a review,
  requesting reviewers, posting comments, ignoring a change, configuring a
  project, administering a team) needs a personal access token; `argos login`
  stores one locally.
- Guides: https://argos-ci.com/docs/agents/agent-skills ·
  https://argos-ci.com/docs/learn/review-workflow/review-builds-with-ai-agents ·
  https://argos-ci.com/docs/learn/reliability-and-flakiness/fix-flaky-tests-with-ai-agents ·
  https://argos-ci.com/docs/sdks-reference/argos-command-line-interface-cli

## REST API and discovery

- REST API base URL: https://api.argos-ci.com/v2, bearer token in the
  `Authorization` header; a project token reads, a personal access token acts
  as a user. Reference: https://argos-ci.com/docs/api-reference
- OpenAPI 3.1 description: https://api.argos-ci.com/v2/openapi.yaml
- API catalog (RFC 9727): https://argos-ci.com/.well-known/api-catalog · MCP
  server card: https://argos-ci.com/.well-known/mcp/server-card.json · OAuth
  protected resource metadata:
  https://argos-ci.com/.well-known/oauth-protected-resource
- How agents register and authenticate: https://argos-ci.com/auth.md
- This site in Markdown: send `Accept: text/markdown` to a product page, or
  prefix its path with `/md` (for example https://argos-ci.com/md/review).
  Site map: https://argos-ci.com/llms.txt
- Documentation in Markdown: append `.md` to any docs URL (for example
  https://argos-ci.com/docs/agents/mcp-server.md); indexes at
  https://argos-ci.com/docs/llms.txt and https://argos-ci.com/docs/llms-full.txt;
  read-only docs MCP server at https://argos-ci.com/docs/~gitbook/mcp
- WebMCP: in a browser with WebMCP, every page of this site registers 12
  read-only tools on `document.modelContext`: get_argos_overview, get_pricing,
  estimate_monthly_cost, get_page, search_docs, get_docs_page, get_quickstart,
  compare_with, get_security_compliance, get_latest_changelog,
  get_service_status, get_mcp_connection_info.

## For AI agents

The commands from this page in one place:

```bash
# Install the CLI and every Argos skill
npm i --save-dev @argos-ci/cli
npx skills add https://argos-ci.com

# Connect an MCP client
claude mcp add --transport http argos https://mcp.argos-ci.com
codex mcp add argos --url https://mcp.argos-ci.com

# One command per pillar (each pillar page has the full set)
argos deploy ./storybook-static
argos build snapshots <build> --json
argos review create <build> --event approve   # personal access token
argos test changes <testId> --json

# REST API and machine-readable site
curl https://api.argos-ci.com/v2/projects/acme/app/tests/<testId>/changes -H "Authorization: Bearer $ARGOS_TOKEN"
curl https://api.argos-ci.com/v2/openapi.yaml
curl -H "Accept: text/markdown" https://argos-ci.com/review
curl https://argos-ci.com/llms.txt
```

## Related

- Diff (https://argos-ci.com/diff): Any file, not just pixels: screenshots,
  Markdown, JSON, and more.
- Review (https://argos-ci.com/review): One place for humans and agents to
  approve what changed.
- Stabilize (https://argos-ci.com/stabilize): Kill flakes and debug failures
  with full per-test history.
- Deploy (https://argos-ci.com/deploy): Free preview URLs for your Storybook
  or static site on every PR.
- Media sharing (https://argos-ci.com/media-sharing): screenshots and
  recordings uploaded from the CLI and posted on the pull request.
