import { Code } from "@/components/Code";
import type { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const REVIEW_QUESTIONS: FAQQuestion[] = [
  {
    name: "How is a build's status decided when several people review it?",
    answer: (
      <>
        <p>
          Only each reviewer&apos;s latest review counts, and dismissed reviews
          are ignored. Two rules follow. <strong>One rejection blocks:</strong>{" "}
          if any reviewer&apos;s latest review is a rejection, the build is
          rejected even when others approved.{" "}
          <strong>Otherwise, one approval passes:</strong> with no active
          rejection, a single approval marks the build approved.
        </p>
        <p>
          Comment reviews and pending requests never change the outcome. To
          unblock a rejected build, the reviewer who rejected submits a new
          review, or an administrator dismisses the rejection.
        </p>
      </>
    ),
    textAnswer:
      "Only each reviewer's latest review counts, and dismissed reviews are ignored. One rejection blocks: if any reviewer's latest review is a rejection, the build is rejected even when others approved. Otherwise, one approval passes: with no active rejection, a single approval marks the build approved. Comment reviews and pending requests never change the outcome. To unblock a rejected build, the reviewer who rejected submits a new review, or an administrator dismisses the rejection.",
  },
  {
    name: "Can an AI agent approve or reject a build?",
    answer: (
      <>
        <p>
          Yes. A review is attributed to an Argos user and checked against that
          user&apos;s project permissions, so the agent needs a{" "}
          <strong>personal access token</strong>, or a local CLI session opened
          with <Code>argos login</Code>. A project token is enough to read a
          build with <Code>argos build get</Code> and{" "}
          <Code>argos build snapshots</Code>, but it cannot decide anything. The
          verdict then appears under that user, beside the rest of the team.
        </p>
        <p>
          Install the skills with{" "}
          <Code>npx skills add https://argos-ci.com</Code> and ask your agent to
          use <Code>$argos-pr-review</Code>; over MCP, grant the{" "}
          <Code>reviews:write</Code> scope. Argos still performs the
          deterministic comparison: agents use build data as review evidence and
          do not replace your team&apos;s ownership of review decisions. See{" "}
          <Link href="/docs/learn/review-workflow/review-builds-with-ai-agents">
            Review builds with AI agents
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      "Yes. A review is attributed to an Argos user and checked against that user's project permissions, so the agent needs a personal access token, or a local CLI session opened with `argos login`. A project token is enough to read a build with `argos build get` and `argos build snapshots`, but it cannot decide anything. The verdict then appears under that user, beside the rest of the team. Install the skills with `npx skills add https://argos-ci.com` and ask your agent to use $argos-pr-review; over MCP, grant the reviews:write scope. Argos still performs the deterministic comparison: agents use build data as review evidence and do not replace your team's ownership of review decisions. See <a href=\"/docs/learn/review-workflow/review-builds-with-ai-agents\">Review builds with AI agents</a>.",
  },
  {
    name: "What does Argos post on my pull request?",
    answer: (
      <>
        <p>
          On GitHub, a commit status per build, named <Code>argos</Code>,{" "}
          <Code>argos/&lt;build-name&gt;</Code> for a named build, and{" "}
          <Code>argos/summary</Code> when a commit carries several builds. Use
          those exact names as required status checks in branch protection.
        </p>
        <p>
          Argos also keeps one comment on the pull request, edited in place on
          every update: each build&apos;s status, an Inspect link, and a Details
          column such as <Code>4 changed, 3 ignored</Code>, plus your
          deployments with their preview URLs, whether Argos hosts them or
          Vercel, Netlify or Cloudflare does. You can turn the comment off in
          the project settings. On GitLab, Argos posts commit statuses on merge
          requests and no comment.
        </p>
      </>
    ),
    textAnswer:
      "On GitHub, a commit status per build, named `argos`, `argos/<build-name>` for a named build, and `argos/summary` when a commit carries several builds. Use those exact names as required status checks in branch protection. Argos also keeps one comment on the pull request, edited in place on every update: each build's status, an Inspect link, and a Details column such as `4 changed, 3 ignored`, plus your deployments with their preview URLs, whether Argos hosts them or Vercel, Netlify or Cloudflare does. You can turn the comment off in the project settings. On GitLab, Argos posts commit statuses on merge requests and no comment.",
  },
  {
    name: "Does Argos support stacked pull requests?",
    answer: (
      <>
        <p>
          Yes, natively, on GitHub. When a pull request targets the branch of
          another open pull request, Argos compares it with that pull
          request&apos;s build, even before anyone approves it, so each build
          shows only the changes of its own pull request.
        </p>
        <p>
          On the build page, a <strong>stacked</strong> button next to the pull
          request lists the whole stack with the status of each pull
          request&apos;s latest build, and opens any of them. There is nothing
          to configure: stack by hand or with a tool like Graphite. See{" "}
          <Link href="/docs/learn/review-workflow/stacked-pull-requests">
            stacked pull requests
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'Yes, natively, on GitHub. When a pull request targets the branch of another open pull request, Argos compares it with that pull request\'s build, even before anyone approves it, so each build shows only the changes of its own pull request. On the build page, a "stacked" button next to the pull request lists the whole stack with the status of each pull request\'s latest build, and opens any of them. There is nothing to configure: stack by hand or with a tool like Graphite. See <a href="/docs/learn/review-workflow/stacked-pull-requests">stacked pull requests</a>.',
  },
  {
    name: "Can Argos notify Slack, Microsoft Teams, or Discord?",
    answer: (
      <>
        <p>
          Yes, through <strong>Automations</strong>, a rule on a project:{" "}
          <em>when</em> a build completes or is reviewed, <em>if</em> it matches
          your conditions (build conclusion, type, mode, name, or branch),{" "}
          <em>then</em> post in a Slack, Microsoft Teams, or Discord channel.
          Rules are per project, and you can send a test notification before
          saving.
        </p>
        <p>
          To send events to your own systems, add a <strong>webhook</strong> in
          your account settings. Argos posts a signed request to your endpoint
          when a build completes or is reviewed, or when a deployment is created
          or ready. See{" "}
          <Link href="/docs/learn/review-workflow/automations">
            Automations
          </Link>
          , <Link href="/docs/learn/integrations/webhooks">webhooks</Link>, and
          the{" "}
          <Link href="/docs/api-reference/reference/integrations/webhooks">
            webhooks API reference
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'Yes, through Automations, a rule on a project: when a build completes or is reviewed, if it matches your conditions (build conclusion, type, mode, name, or branch), then post in a Slack, Microsoft Teams, or Discord channel. Rules are per project, and you can send a test notification before saving. To send events to your own systems, add a webhook in your account settings. Argos posts a signed request to your endpoint when a build completes or is reviewed, or when a deployment is created or ready. See <a href="/docs/learn/review-workflow/automations">Automations</a>, <a href="/docs/learn/integrations/webhooks">webhooks</a>, and the <a href="/docs/api-reference/reference/integrations/webhooks">webhooks API reference</a>.',
  },
  {
    name: "Who can review a build?",
    answer: (
      <>
        <p>
          Team <strong>Owners</strong> and <strong>Members</strong> can review
          every project in the team. On the Enterprise plan,{" "}
          <strong>Contributors</strong> can review the projects where they hold
          the <strong>Project Reviewer</strong> or{" "}
          <strong>Project Administrator</strong> role; Project Viewers have
          read-only access. The build must be in a reviewable state: changes
          detected, approved, or rejected.
        </p>
        <p>
          Dismissing someone else&apos;s review requires an administrator-level
          role. The same permissions apply whether the review comes from the
          build page, the CLI, the API, or the MCP server. See{" "}
          <Link href="/docs/learn/account-and-access/team-members-and-roles">
            Team members &amp; roles
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'Team Owners and Members can review every project in the team. On the Enterprise plan, Contributors can review the projects where they hold the Project Reviewer or Project Administrator role; Project Viewers have read-only access. The build must be in a reviewable state: changes detected, approved, or rejected. Dismissing someone else\'s review requires an administrator-level role. The same permissions apply whether the review comes from the build page, the CLI, the API, or the MCP server. See <a href="/docs/learn/account-and-access/team-members-and-roles">Team members & roles</a>.',
  },
];
