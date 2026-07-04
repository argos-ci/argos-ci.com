import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export function FAQ() {
  const questions: FAQQuestion[] = [
    {
      name: "Does Argos replace Playwright?",
      answer: (
        <>
          <p>
            No. Argos runs on top of Playwright. You keep your Playwright tests
            and config, and swap <strong>toHaveScreenshot()</strong> for{" "}
            <strong>argosScreenshot()</strong>. Argos adds cloud baselines, a
            review UI, and pull request checks around the tests you already have.
          </p>
        </>
      ),
      textAnswer:
        "No. Argos runs on top of Playwright. You keep your Playwright tests and config, and swap toHaveScreenshot() for argosScreenshot(). Argos adds cloud baselines, a review UI, and pull request checks around the tests you already have.",
    },
    {
      name: "What happens to my committed PNG baselines?",
      answer: (
        <p>
          You delete them. With native snapshots, baselines live in{" "}
          <strong>*-snapshots/</strong> folders in Git. With Argos, baselines
          are selected from your Git history in the cloud, so there are no PNGs
          to commit, no merge conflicts, and no repo bloat.
        </p>
      ),
      textAnswer:
        "You delete them. With native snapshots, baselines live in *-snapshots/ folders in Git. With Argos, baselines are selected from your Git history in the cloud, so there are no PNGs to commit, no merge conflicts, and no repo bloat.",
    },
    {
      name: "How do I approve an intended visual change?",
      answer: (
        <p>
          In the Argos review UI, right on the pull request. A visual difference
          becomes a check you review and approve, instead of a failed test you
          fix by re-running with <strong>--update-snapshots</strong> and
          committing new images.
        </p>
      ),
      textAnswer:
        "In the Argos review UI, right on the pull request. A visual difference becomes a check you review and approve, instead of a failed test you fix by re-running with --update-snapshots and committing new images.",
    },
    {
      name: "Do I still get cross-browser and cross-platform consistency?",
      answer: (
        <>
          <p>
            Yes. Native snapshots are platform-specific (<code>-darwin</code> vs{" "}
            <code>-linux</code>), so teams run them only in Docker or CI to stay
            consistent. Argos renders and compares in the cloud the same way
            every run, so you are not fighting environment mismatches.
          </p>
          <p>
            Read the{" "}
            <Link href="/docs/learn/how-to-guides/migrate-to-argos/from-playwright-native-screenshots">
              migration guide
            </Link>{" "}
            for the step-by-step.
          </p>
        </>
      ),
      textAnswer:
        "Yes. Native snapshots are platform-specific (-darwin vs -linux), so teams run them only in Docker or CI to stay consistent. Argos renders and compares in the cloud the same way every run, so you are not fighting environment mismatches.",
    },
  ];
  return <FAQAccordion questions={questions} />;
}
