import { Container } from "@/components/Container";
import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { H2 } from "@/components/H2";

const questions: FAQQuestion[] = [
  {
    name: "What are the advantages over storing traces in GitHub Actions artefacts?",
    answer: (
      <p>
        Artefacts have to be downloaded, then unzipped, then you have to run a
        Playwright command to open it. With Argos, it is just a click away.
      </p>
    ),
    textAnswer:
      "Artefacts have to be downloaded, then unzipped, then you have to run a Playwright command to open it. With Argos, it is just a click away.",
  },
  {
    name: "Why should I use Argos instead of Playwright Visual Testing?",
    answer: (
      <>
        Argos Visual Testing has several advantages over Playwright visual
        testing:
        <ul className="mt-4 pl-6">
          <li className="list-disc">
            Argos runs on CI, no need to commit screeenshots to your repository.
          </li>
          <li className="list-disc">
            Argos streamlines team collaboration, others can review and validate
            changes.
          </li>
          <li className="list-disc">
            Argos offers a top-class UI to review and approve changes.
          </li>
          <li className="list-disc">
            Argos stabilizes your screenshots automatically.
          </li>
        </ul>
      </>
    ),
    textAnswer:
      "Argos Visual Testing has several advantages over Playwright visual testing: Argos runs on CI with no need to commit screenshots to your repository, streamlines team collaboration for review and validation, offers a top-class UI to review and approve changes, and stabilizes your screenshots automatically.",
  },
  {
    name: "How does Argos secures my screenshots and traces?",
    answer: (
      <p>
        Argos stores screenshots and trace on Amazon S3 privately. A signed
        valid for 30 minutes URL is generated for each screenshot and trace, and
        only the user that have access to the build can see it.
      </p>
    ),
    textAnswer:
      "Argos stores screenshots and trace on Amazon S3 privately. A signed valid for 30 minutes URL is generated for each screenshot and trace, and only the user that have access to the build can see it.",
  },
];

export function Faq() {
  return (
    <Container className="mb-32 flex flex-col items-center gap-6 text-center">
      <H2>Frequently Asked Questions</H2>
      <FAQAccordion questions={questions} />
    </Container>
  );
}
