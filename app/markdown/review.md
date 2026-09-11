# Argos Review: one place for humans and agents to approve what changed

> Baseline and changes side by side, comments pinned to the exact pixel, approve or reject with a keystroke. Every reviewer's verdict counts on its own, including the agent reviewing from the CLI, and the result lands on the pull request as a check.

Canonical: https://argos-ci.com/review
Documentation: https://argos-ci.com/docs/learn/review-workflow/review-a-build

**Review** is the third of Argos' four steps for a pull request: deploy it,
diff what changed, review it together, and stabilize the tests behind it. The
build page is where a team, and the agents working with it, decide what to do
with the changes a build detected.

## Review diffs at full speed

- The build page shows each snapshot's **baseline** next to its **changes**
  and highlights the visual diff. **Split view** (the default), **single view**
  switching between baseline and changes, a **changes overlay** whose color and
  opacity you pick from the toolbar, a highlighter that flashes the changed
  regions, and fit-or-expand with zoom and pan kept in sync between the panes.
- Keyboard shortcuts: `↑` / `↓` previous or next snapshot, `←` / `→` show only
  the baseline or the changes, `S` side-by-side, `D` overlay, `H` highlight,
  `J` / `K` previous or next change, `Space` fit to screen, `Y` / `N` accept or
  reject a change, `I` ignore a flaky change, `C` comment tool, `↵` review
  popover, `?` the full list.
- Submit a review as **Comment**, **Reject**, or **Approve**, with an optional
  Markdown summary (required for a Comment review). A progress chip such as
  `2 / 3 reviewed` tracks how many changes you have reviewed. Every review stays
  in the build's history.
- Reference a screenshot from either pane: copy a direct link, copy an embed as
  Markdown, or download the screenshot, its diff mask, or the composed changes.

## Every reviewer's verdict counts

- Request one or more project members as reviewers. Each reviewer's verdict is
  tracked individually (**Approved**, **Rejected**, **Commented**,
  **Pending**, or **Dismissed**), and a new review never overwrites someone
  else's.
- Only each reviewer's latest review counts, dismissed reviews are ignored, and
  two rules decide the build: **one rejection blocks** (the build is rejected
  even if others approved); **otherwise, one approval passes**. Comment reviews
  and pending requests do not affect the outcome. To unblock a rejected build,
  the rejecting reviewer submits a new review or an administrator dismisses the
  rejection.
- A review submitted from the CLI or the API is attributed to the token's
  user, so an agent's verdict appears under the person who ran it.
- Comments pin to a point on a screenshot or to a line range in a text snapshot
  (Markdown, JSON, and other non-image files). They are written in Markdown
  with `/` slash commands and @mentions; reply in threads, react with emoji,
  resolve and reopen.
- Draft reviews: comments gather into a pending review only you can see until
  you submit, then everyone is notified at once. Hold Alt to post a single
  comment immediately. In-progress comments are saved locally.
- Real time: comments, reactions, resolutions, and decisions update live.
  Presence dots show who is on the build; user cards show role and local time.
  Notifications arrive as one digest per build, with a subscribe toggle in the
  Activity section.
- Who can review: team Owners and Members, or Contributors holding the Project
  Reviewer or Project Administrator role (Enterprise). Dismissing another
  person's review requires an administrator-level role.

## The verdict lands on your pull request

- GitHub commit statuses, posted on the pull request's head commit: `argos`
  (default), `argos/<build-name>` (named build), `argos/<project-name>` and
  `argos/<project-name>/<build-name>` (several projects on one repository), and
  `argos/summary`, the summary check combining all builds on a commit. Use
  these exact names as required status checks in branch protection.
- Summary check options: add it only when a commit has more than one build
  (default), always, or never. It never replaces the individual statuses.
- One pull request comment, edited in place on every update: each build's
  status, an Inspect link, and a **Details** column such as `2 added` or
  `4 changed, 3 ignored`; deployments made with Argos are listed with their
  preview URLs. The comment can be disabled in the project settings.
- GitLab: commit statuses on merge requests through a bot user, with baseline
  selection from your commit history. No comment on GitLab.
- Auto-approved branches (`main` by default, or any pattern you configure) are
  approved automatically so they can serve as baselines without a manual
  review. A build with an active rejection can never be a baseline.
- Automations: **when** a build event happens (Build Completed, Build
  Reviewed), **if** conditions match (build conclusion, type, mode, name,
  branch, combined with AND, each negatable), **then** post in a Slack,
  Microsoft Teams, or Discord channel. Rules are per project. Argos has no
  user-configurable outgoing webhooks.

## Agents show their work

GitHub has no API for attaching an image to a pull request. With Argos media
sharing, an agent uploads a screenshot or a screen recording from the terminal
(`argos media upload <file> --branch <branch>`), the file is staged on its
branch, and Argos posts it on the pull request the moment it opens, in one
managed comment. Details: https://argos-ci.com/media-sharing

## For AI agents

An agent reads a build with a project token and decides with a personal access
token; the review is attributed to that user and checked against their project
permissions. Argos still performs the deterministic comparison: agents use
build data as review evidence and do not replace your team's ownership of
review decisions.

```bash
npx skills add https://argos-ci.com

# Read: a project token is enough
argos build get <build>
argos build snapshots <build> --needs-review --json

# Decide: needs a personal access token
argos review create <build> --event approve \
  --body "Matches the PR intent."
argos comment list <build> --json
```

- **Skills**: `argos-pr-review` runs the whole workflow: find the build from
  the pull request, inspect the snapshots that need review, summarize the
  changes, approve or request changes. Prompt: `Use $argos-pr-review to review
this pull request with its Argos build.` The `argos-cli` skill covers the
  commands, flags, authentication, and output formats.
  https://argos-ci.com/docs/agents/agent-skills
- **CLI**: `argos review create <build> --event approve|reject|comment
[--body]`, `argos review list`, `argos review dismiss`, `argos review reviewer
list|add|remove`, `argos comment list|create|resolve|react …`. Read-only
  commands (`build get`, `build snapshots --needs-review`) accept a project
  token; everything attributed to a user needs a personal access token or
  `argos login`. https://argos-ci.com/docs/sdks-reference/argos-command-line-interface-cli#reviewing-and-commenting
- **MCP**: https://mcp.argos-ci.com exposes every review and comment operation
  as a tool. Scopes: `projects:read` to inspect builds, `reviews:write` for
  reviews and review requests, `comments:write` for comments. Project tokens
  are not accepted; authenticate with OAuth or a personal access token.
  https://argos-ci.com/docs/agents/mcp-server
- **REST API**: submit, list, and dismiss reviews; create, read, update, and
  delete comments and replies; add and remove reactions; resolve or reopen
  threads. https://argos-ci.com/docs/api-reference
- Guide: https://argos-ci.com/docs/learn/review-workflow/review-builds-with-ai-agents

## Related

- Deploy: free preview URLs for your Storybook or static site on every PR:
  https://argos-ci.com/deploy
- Diff: any file, not just pixels: screenshots, Markdown, JSON, and more:
  https://argos-ci.com/diff
- Stabilize: kill flakes and debug failures with full per-test history:
  https://argos-ci.com/stabilize
- Argos for AI agents: https://argos-ci.com/ai-agents
- Media sharing: https://argos-ci.com/media-sharing
- Pull request comments: https://argos-ci.com/docs/learn/review-workflow/pull-request-comments
- Summary checks: https://argos-ci.com/docs/learn/review-workflow/summary-checks
- Automations: https://argos-ci.com/docs/learn/review-workflow/automations
- GitHub integration: https://argos-ci.com/docs/learn/integrations/github-integration
- GitLab integration: https://argos-ci.com/docs/learn/integrations/gitlab-integration
- Team members & roles: https://argos-ci.com/docs/learn/account-and-access/team-members-and-roles
