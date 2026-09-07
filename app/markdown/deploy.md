# Argos Deploy: free preview URLs for every pull request

> Run `argos deploy` on your Storybook or any static build and every pull request gets an immutable preview URL, a branch URL that follows it, and production on a domain you own. Nothing to host, a commit status you can require, and the same command for your AI agents.

Canonical: https://argos-ci.com/deploy
Documentation: https://argos-ci.com/docs/learn/deployments

**Deploy** is the first of the four Argos pillars: deploy the pull request,
diff what changed, review it together, stabilize the tests behind it. A
deployment is a static build served on a unique URL. When `argos deploy` runs
in CI, Argos uploads the build, generates the URL, and posts the status back
to the pull request. The Hobby plan includes Storybook and static deployments.

## One command, one live URL

- `argos deploy ./storybook-static` uploads the build and prints an immutable
  URL, for example `https://storybook-gdhgxamjo-acme.argos-ci.live`. The URL
  always points at that exact build.
- Any directory of static files works: Storybook, a Vite build, a Next.js
  export, a docs site, plain HTML.
- Near-instant re-deploys: the CLI computes a content hash for every file and
  uploads only the files Argos does not already have.
- Two environments. A deployment is a **preview** by default. It is
  **production** when its branch matches the project's production branch
  pattern (the repository's default branch unless changed in Settings →
  Deployments) or when `--prod` is passed. A new production deployment is
  promoted immediately; earlier builds stay reachable on their own URLs.
- Deployments never expire and cannot be overwritten. They do not count toward
  the screenshot quota. Individual deployments cannot be deleted; deleting the
  project removes them all.

## URLs and domains

- **Deployment URL** `https://<project>-<random>-<account>.argos-ci.live`:
  immutable, one per deployment.
- **Branch URL** `https://<project>-<branch>-<account>.argos-ci.live`, for
  example `https://storybook-feat-checkout-acme.argos-ci.live`: follows the
  latest deployment on that branch. Useful in pull request templates and
  review checklists.
- **Production domain** `https://<slug>.argos-ci.live`: serves the latest
  promoted production deployment. The slug defaults to the project name.
- **Custom domain**, for example `https://storybook.acme.com`: add it in
  Settings → Deployments → Domains, create a `CNAME` record pointing at
  `cname.argos-ci.live` (a root domain needs an `ALIAS` record), and Argos
  issues the TLS certificate. Statuses: DNS not configured → Issuing
  certificate → Active. Custom domains serve production deployments only, and
  once active the links Argos posts to GitHub use them. Included in paid plans;
  requires a team.
- **Access protection**, per project: Public; Standard (login required on
  preview URLs, production domain public; all plans); All deployments (login
  required everywhere; Team plans). Viewers must have access to the project.
- The Deployments tab lists every build across branches and commits with all
  of its URLs, and marks the deployment currently serving production.

## In your CI

```yaml
name: Deploy Storybook to Argos

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
      - run: npm ci
      - run: npm run build-storybook
      - run: npx --no-install argos deploy ./storybook-static
        env:
          ARGOS_TOKEN: ${{ secrets.ARGOS_TOKEN }}
```

- Pull request runs create preview deployments; pushes to `main` create
  production deployments.
- `deploy` and `upload` are independent. Run both on the same commit and Argos
  posts a single pull request comment listing the deployment URLs and the
  visual build results.
- Each deployment sets a commit status named `argos-deploy/<project>`: pending
  while the upload runs, success when the deployment is ready. It can be
  required in branch protection rules.
- Any CI provider: set `ARGOS_TOKEN` and run `argos deploy <directory>`. Argos
  detects the commit SHA, branch, and pull request number from the common CI
  environment variables.
- On GitHub Actions, OIDC (`id-token: write`) or tokenless authentication
  replaces the secret; tokenless is the fallback on pull requests from forks.

## For AI agents

```bash
npm i --save-dev @argos-ci/cli
argos deploy ./storybook-static
argos deploy ./storybook-static --prod
argos project deployments --project acme/storybook --json
argos project domain get --project acme/storybook
```

- The CLI: `argos deploy` uses the same authentication as `argos upload` (a
  project token, or OIDC and tokenless on GitHub Actions). `argos project
deployments --json` lists a project's deployments, most recent first.
- The MCP server at https://mcp.argos-ci.com exposes every REST API operation
  as a tool, including reading and updating a project's deployments and
  settings, within the OAuth scopes you grant.
- Agent skills: `npx skills add https://argos-ci.com` installs `argos-cli`,
  which teaches Claude Code, Codex, or Cursor the CLI commands, flags,
  authentication rules, and output formats.
- REST API reference: https://argos-ci.com/docs/api-reference

## Pricing

The Hobby plan includes Storybook and static deployments. The Pro plan adds
private deployment protection and custom domains. Deployments do not consume
screenshots. See https://argos-ci.com/pricing

## Learn more

- [Deployments overview](https://argos-ci.com/docs/learn/deployments)
- [Environments](https://argos-ci.com/docs/learn/deployments/environments)
- [URLs and domains](https://argos-ci.com/docs/learn/deployments/urls-and-domains)
- [Access protection](https://argos-ci.com/docs/learn/deployments/access-protection)
- [Use deployments in CI](https://argos-ci.com/docs/learn/deployments/use-deployments-in-ci)
- [Lifecycle and retention](https://argos-ci.com/docs/learn/deployments/retention)
- [GitHub Actions authentication](https://argos-ci.com/docs/learn/integrations/github-actions-authentication)
- [CLI reference](https://argos-ci.com/docs/sdks-reference/argos-command-line-interface-cli)

## Related

- Diff: https://argos-ci.com/diff — any file, not just pixels: screenshots,
  Markdown, JSON, and more.
- Review: https://argos-ci.com/review — one place for humans and agents to
  approve what changed.
- Stabilize: https://argos-ci.com/stabilize — kill flakes and debug failures
  with full per-test history.
- Argos for AI agents: https://argos-ci.com/ai-agents
