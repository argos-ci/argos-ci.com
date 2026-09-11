import { Code } from "@/components/Code";
import type { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const DIFF_QUESTIONS: FAQQuestion[] = [
  {
    name: "Does Argos use AI to decide whether something changed?",
    answer: (
      <>
        <p>
          No. Argos compares each snapshot to its baseline with deterministic
          pixel diffing, built on the open-source{" "}
          <Link href="https://github.com/dmtrKovalenko/odiff">odiff</Link>{" "}
          library. Each comparison normalizes both images, runs several diff
          passes at different thresholds, clusters pixels to separate noise from
          real change, and outputs a diff mask and a score. Same input, same
          result, and the exact pixels that changed are visible. The{" "}
          <Link href="https://github.com/argos-ci/argos/blob/main/apps/backend/src/screenshot-diff/diff/image/index.ts">
            diff implementation
          </Link>{" "}
          is public too.
        </p>
        <p>
          Agents can read the result as evidence when they review a build, but
          no model decides what counts as a change.
        </p>
      </>
    ),
    textAnswer:
      "No. Argos compares each snapshot to its baseline with deterministic pixel diffing, built on the open-source odiff library. Each comparison normalizes both images, runs several diff passes at different thresholds, clusters pixels to separate noise from real change, and outputs a diff mask and a score. Same input, same result, and the exact pixels that changed are visible. The diff implementation is public too. Agents can read the result as evidence when they review a build, but no model decides what counts as a change.",
  },
  {
    name: "What can Argos diff besides screenshots?",
    answer: (
      <>
        <p>
          Text files, uploaded with the CLI:{" "}
          <Code>
            {
              'argos upload -f "**/*.{txt,json,yaml,yml,xml,html,md,css,js}" ./snapshots'
            }
          </Code>
          . Supported content types are plain text, JSON, YAML, XML, HTML,
          Markdown, CSS and JavaScript; each file is matched to its baseline by
          name and diffed as text. The Playwright SDK also captures{" "}
          <Link href="/docs/sdks-reference/playwright#aria-snapshots">
            ARIA snapshots
          </Link>{" "}
          of the accessibility tree, and the Vitest SDK snapshots any
          serializable value with <Code>argosSnapshot</Code>. Every snapshot in
          a build counts as one screenshot toward your plan.
        </p>
      </>
    ),
    textAnswer:
      'Text files, uploaded with the CLI: `argos upload -f "**/*.{txt,json,yaml,yml,xml,html,md,css,js}" ./snapshots`. Supported content types are plain text, JSON, YAML, XML, HTML, Markdown, CSS and JavaScript; each file is matched to its baseline by name and diffed as text. The Playwright SDK also captures <a href="/docs/sdks-reference/playwright#aria-snapshots">ARIA snapshots</a> of the accessibility tree, and the Vitest SDK snapshots any serializable value with `argosSnapshot`. Every snapshot in a build counts as one screenshot toward your plan.',
  },
  {
    name: "What is a snapshot compared against?",
    answer: (
      <>
        <p>
          The{" "}
          <Link href="/docs/learn/platform-fundamentals/baseline-build">
            baseline build
          </Link>
          : the most recent complete, approved build with the same build name
          and mode whose commit is an ancestor of the merge base between your
          branch and its base branch. For a pull request the base branch is the
          PR&apos;s; for a push it is the project&apos;s default baseline
          branch. Builds on auto-approved branches such as <Code>main</Code>{" "}
          serve as baselines without a manual review, and a build with an active
          rejection never does. Until a build exists on your baseline branch,
          pull request builds are orphans with nothing to compare against. Set{" "}
          <Code>ARGOS_REFERENCE_BRANCH</Code> or{" "}
          <Code>ARGOS_REFERENCE_COMMIT</Code> to pin a different baseline.
        </p>
      </>
    ),
    textAnswer:
      "The <a href=\"/docs/learn/platform-fundamentals/baseline-build\">baseline build</a>: the most recent complete, approved build with the same build name and mode whose commit is an ancestor of the merge base between your branch and its base branch. For a pull request the base branch is the PR's; for a push it is the project's default baseline branch. Builds on auto-approved branches such as `main` serve as baselines without a manual review, and a build with an active rejection never does. Until a build exists on your baseline branch, pull request builds are orphans with nothing to compare against. Set `ARGOS_REFERENCE_BRANCH` or `ARGOS_REFERENCE_COMMIT` to pin a different baseline.",
  },
  {
    name: "How do I keep diffs from flaking?",
    answer: (
      <>
        <p>
          Most flakes are removed before the capture: by default the SDKs wait
          for fonts, images and <Code>aria-busy</Code> elements, hide carets and
          scrollbars, pause animated GIFs on their first frame and pin sticky
          elements in place. For anything you can&apos;t control at the source,
          such as dates, avatars or ads, mark the element with{" "}
          <Code>data-visual-test=&quot;transparent&quot;</Code> or{" "}
          <Code>&quot;blackout&quot;</Code>, and raise <Code>threshold</Code> (0
          to 1, default 0.5) when a screenshot needs a looser comparison. When a
          change keeps recurring anyway,{" "}
          <Link href="/stabilize">Argos Stabilize</Link> scores the test&apos;s
          flakiness and lets you ignore that specific change without hiding new
          regressions.
        </p>
      </>
    ),
    textAnswer:
      'Most flakes are removed before the capture: by default the SDKs wait for fonts, images and `aria-busy` elements, hide carets and scrollbars, pause animated GIFs on their first frame and pin sticky elements in place. For anything you can\'t control at the source, such as dates, avatars or ads, mark the element with `data-visual-test="transparent"` or `"blackout"`, and raise `threshold` (0 to 1, default 0.5) when a screenshot needs a looser comparison. When a change keeps recurring anyway, <a href="/stabilize">Argos Stabilize</a> scores the test\'s flakiness and lets you ignore that specific change without hiding new regressions.',
  },
  {
    name: "Which test frameworks does Argos support?",
    answer: (
      <>
        <p>
          Official SDKs cover{" "}
          <Link href="/docs/quickstart/playwright-quickstart">Playwright</Link>,{" "}
          <Link href="/docs/quickstart/vitest-quickstart">Vitest</Link>,{" "}
          <Link href="/docs/quickstart/storybook-quickstart">Storybook</Link>{" "}
          (Vitest, Test Runner, or Storybook before v8),{" "}
          <Link href="/docs/quickstart/cypress-quickstart">Cypress</Link>,{" "}
          <Link href="/docs/quickstart/webdriverio-quickstart">
            WebdriverIO
          </Link>{" "}
          and{" "}
          <Link href="/docs/quickstart/puppeteer-quickstart">Puppeteer</Link>.
          Anything else that writes screenshots to a folder works through the
          CLI: <Code>argos upload ./screenshots</Code> creates the build and
          reads the commit, branch and pull request from your CI environment.
          Text-file diffs go through the CLI as well.
        </p>
      </>
    ),
    textAnswer:
      'Official SDKs cover <a href="/docs/quickstart/playwright-quickstart">Playwright</a>, <a href="/docs/quickstart/vitest-quickstart">Vitest</a>, <a href="/docs/quickstart/storybook-quickstart">Storybook</a> (Vitest, Test Runner, or Storybook before v8), <a href="/docs/quickstart/cypress-quickstart">Cypress</a>, <a href="/docs/quickstart/webdriverio-quickstart">WebdriverIO</a> and <a href="/docs/quickstart/puppeteer-quickstart">Puppeteer</a>. Anything else that writes screenshots to a folder works through the CLI: `argos upload ./screenshots` creates the build and reads the commit, branch and pull request from your CI environment. Text-file diffs go through the CLI as well.',
  },
];
