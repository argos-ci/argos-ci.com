import { Code } from "@/components/Code";
import { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const STABILIZE_QUESTIONS: FAQQuestion[] = [
  {
    name: "How does Argos know a test is flaky?",
    answer: (
      <>
        <p>
          Only auto-approved builds count. A change on a pull request branch
          usually means someone changed the UI on purpose; a change on an
          auto-approved build means the test moved on its own. Over a period you
          pick, from 24 hours to 90 days and 7 days by default, Argos measures
          the test&apos;s <strong>Stability</strong> (the share of builds where
          it did not change) and <strong>Consistency</strong> (the share of its
          changes that were one-offs), and derives a <strong>Flakiness</strong>{" "}
          score from 0 to 100. Higher is worse.
        </p>
        <p>
          The score shows as a badge next to every changed test in a build
          review, and the{" "}
          <Link href="/docs/learn/reliability-and-flakiness/tests-dashboard">
            Tests dashboard
          </Link>{" "}
          ranks a whole project, or your whole account, by it.
        </p>
      </>
    ),
    textAnswer:
      "Only auto-approved builds count: a change on a pull request branch usually means someone changed the UI on purpose, while a change on an auto-approved build means the test moved on its own. Over a period you pick (24 hours to 90 days, 7 days by default), Argos measures the test's Stability (the share of builds where it did not change) and Consistency (the share of its changes that were one-offs) and derives a Flakiness score from 0 to 100, higher is worse. The score shows as a badge next to every changed test in a build review, and the Tests dashboard ranks a whole project, or your whole account, by it.",
  },
  {
    name: "Does ignoring a change hide real regressions?",
    answer: (
      <>
        <p>
          No. Each change carries a <strong>fingerprint</strong>, a stable
          signature computed from the shape of its diff, and an ignore is a
          test-plus-fingerprint pair. The fingerprint absorbs pixel-level noise
          such as antialiasing but distinguishes genuinely different changes, so
          a new regression elsewhere in the same screenshot is still reported.
        </p>
        <p>
          The{" "}
          <Link href="/docs/learn/reliability-and-flakiness/ignored-changes">
            Ignored page
          </Link>{" "}
          lists every ignored change with how many builds it has absorbed since
          and when it was last seen. An ignore that went quiet is a blind spot:
          unignore it in one click and Argos asks for review again the next time
          the change appears.
        </p>
      </>
    ),
    textAnswer:
      "No. Each change carries a fingerprint, a stable signature computed from the shape of its diff, and an ignore is a test-plus-fingerprint pair. The fingerprint absorbs pixel-level noise such as antialiasing but distinguishes genuinely different changes, so a new regression elsewhere in the same screenshot is still reported. The Ignored page lists every ignored change with how many builds it has absorbed since and when it was last seen; unignore one in one click and Argos asks for review again the next time the change appears.",
  },
  {
    name: "Can Argos ignore flaky changes automatically?",
    answer: (
      <>
        <p>
          Yes, per project. In{" "}
          <strong>Project Settings → Flaky detection</strong>, turn on{" "}
          <strong>Auto-ignore flaky changes</strong> and set the minimum number
          of occurrences. A change counts as flaky once it has appeared that
          many times in auto-approved builds within the last 7 days; the default
          is 3. Auto-ignored changes are attributed to the Argos bot, carry an{" "}
          <strong>Auto</strong> badge on the Ignored page, and can be unignored
          like any other.
        </p>
        <p>
          The same settings page has a single toggle that turns the whole ignore
          feature off for a project: new builds then ignore nothing and the
          Ignore button disappears from reviews.
        </p>
      </>
    ),
    textAnswer:
      "Yes, per project. In Project Settings → Flaky detection, turn on Auto-ignore flaky changes and set the minimum number of occurrences. A change counts as flaky once it has appeared that many times in auto-approved builds within the last 7 days; the default is 3. Auto-ignored changes are attributed to the Argos bot, carry an Auto badge on the Ignored page, and can be unignored like any other. The same settings page has a single toggle that turns the whole ignore feature off for a project.",
  },
  {
    name: "How do I see a Playwright trace in Argos?",
    answer: (
      <>
        <p>
          Add <Code>@argos-ci/playwright/reporter</Code> to your Playwright
          config and set <Code>trace: &quot;on-first-retry&quot;</Code> and{" "}
          <Code>screenshot: &quot;only-on-failure&quot;</Code> in{" "}
          <Code>use</Code>. The reporter uploads failure screenshots and traces
          with the build, and you open the trace viewer from Argos, with no
          artifact to download. Each uploaded snapshot, traces included, is
          limited to 50 MB.
        </p>
        <p>
          Traces are a Playwright feature. The{" "}
          <Link href="/docs/sdks-reference/cypress">Cypress SDK</Link> gives you
          visibility on test failures alongside its stabilization.
        </p>
      </>
    ),
    textAnswer:
      'Add @argos-ci/playwright/reporter to your Playwright config and set trace: "on-first-retry" and screenshot: "only-on-failure" in use. The reporter uploads failure screenshots and traces with the build, and you open the trace viewer from Argos, with no artifact to download. Each uploaded snapshot, traces included, is limited to 50 MB. Traces are a Playwright feature; the Cypress SDK gives you visibility on test failures alongside its stabilization.',
  },
  {
    name: "Can an AI agent fix a flaky test?",
    answer: (
      <>
        <p>
          Yes. The test page has a <strong>Fix with AI</strong> card with a
          prompt to copy into Claude Code, Codex, Cursor or any agent working in
          your repository. It names the test, carries the flakiness Argos
          measured, and tells the agent to pull the recurring changes and their
          screenshots with <Code>argos test get</Code> and{" "}
          <Code>argos test changes</Code> (or the <Code>getTest</Code> and{" "}
          <Code>listTestChanges</Code> MCP tools, or the REST API) before
          editing anything.
        </p>
        <p>
          The agent then looks for the usual non-determinism, such as
          animations, dates, fonts, unordered data and loading states, and fixes
          the root cause; a change that genuinely cannot be made deterministic
          gets ignored instead. A project token is enough to read; ignoring
          needs a personal access token. Review its change like any other: a
          test that stops asserting is worse than a flaky one. See{" "}
          <Link href="/docs/learn/reliability-and-flakiness/fix-flaky-tests-with-ai-agents">
            Fix flaky tests with AI agents
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      "Yes. The test page has a Fix with AI card with a prompt to copy into Claude Code, Codex, Cursor or any agent working in your repository. It names the test, carries the flakiness Argos measured, and tells the agent to pull the recurring changes and their screenshots with `argos test get` and `argos test changes` (or the getTest and listTestChanges MCP tools, or the REST API) before editing anything. The agent then looks for the usual non-determinism (animations, dates, fonts, unordered data, loading states) and fixes the root cause; a change that genuinely cannot be made deterministic gets ignored instead. A project token is enough to read; ignoring needs a personal access token. Review its change like any other: a test that stops asserting is worse than a flaky one.",
  },
];
