import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export function FAQ() {
  const questions: FAQQuestion[] = [
    {
      name: "What is the difference between BackstopJS and Argos?",
      answer: (
        <>
          <p>
            <strong>BackstopJS</strong> is a self-hosted tool: you describe
            scenarios in <code>backstop.json</code>, capture baselines to a local
            folder, and diff them on your machine or CI.
          </p>
          <p>
            <strong>Argos</strong> keeps the same idea, visit a page, screenshot
            it, diff it, but selects baselines from your Git history in the
            cloud, runs the comparison consistently across machines, and turns
            every change into a reviewable pull request check.
          </p>
        </>
      ),
      textAnswer:
        "BackstopJS is a self-hosted tool: you describe scenarios in backstop.json, capture baselines to a local folder, and diff them on your machine or CI. Argos keeps the same idea but selects baselines from your Git history in the cloud, runs the comparison consistently across machines, and turns every change into a reviewable pull request check.",
    },
    {
      name: "Do I have to rewrite my backstop.json scenarios?",
      answer: (
        <>
          <p>
            You translate them into a small Playwright test: scenario URLs and
            selectors become <strong>argosScreenshot()</strong> calls, and{" "}
            <code>viewports</code> become responsive viewports. The{" "}
            <Link href="/docs/learn/how-to-guides/migrate-to-argos/from-backstopjs">
              migration guide
            </Link>{" "}
            maps every BackstopJS concept to its Argos equivalent.
          </p>
        </>
      ),
      textAnswer:
        "You translate them into a small Playwright test: scenario URLs and selectors become argosScreenshot() calls, and viewports become responsive viewports. The migration guide maps every BackstopJS concept to its Argos equivalent.",
    },
    {
      name: "Where do baselines and approvals live?",
      answer: (
        <p>
          In the cloud. BackstopJS stores baselines in a local{" "}
          <code>bitmaps_reference/</code> folder and approves with{" "}
          <code>backstop approve</code> on one machine. Argos stores baselines
          from your Git history and lets your whole team review and approve
          changes on the pull request, with full history.
        </p>
      ),
      textAnswer:
        "In the cloud. BackstopJS stores baselines in a local bitmaps_reference/ folder and approves with backstop approve on one machine. Argos stores baselines from your Git history and lets your whole team review and approve changes on the pull request, with full history.",
    },
    {
      name: "Is Argos also open source?",
      answer: (
        <p>
          Yes. Like BackstopJS, Argos is open source. The difference is you no
          longer maintain the infrastructure: browsers, parallelization,
          storage, and pull request integration are handled for you.
        </p>
      ),
      textAnswer:
        "Yes. Like BackstopJS, Argos is open source. The difference is you no longer maintain the infrastructure: browsers, parallelization, storage, and pull request integration are handled for you.",
    },
  ];
  return <FAQAccordion questions={questions} />;
}
