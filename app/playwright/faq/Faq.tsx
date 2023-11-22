import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Faq() {
  return (
    <Container className="mb-32 flex flex-col items-center gap-6 text-center">
      <H2>Frequently Asked Questions</H2>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl text-left"
      >
        <AccordionItem value="traces">
          <AccordionTrigger>
            What are the advantages over storing traces in GitHub Actions
            artefacts?
          </AccordionTrigger>
          <AccordionContent>
            Artefacts have to be downloaded, then unzipped, then you have to run
            a Playwright command to open it. With Argos, it is just a click
            away.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="difference">
          <AccordionTrigger>
            Why should I use Argos instead of Playwright Visual Testing?
          </AccordionTrigger>
          <AccordionContent>
            Argos Visual Testing has several advantages over Playwright visual
            testing:
            <ul className="mt-4 pl-6">
              <li className="list-disc">
                Argos runs on CI, no need to commit screeenshots to your
                repository.
              </li>
              <li className="list-disc">
                Argos streamlines team collaboration, others can review and
                validate changes.
              </li>
              <li className="list-disc">
                Argos offers a top-class UI to review and approve changes.
              </li>
              <li className="list-disc">
                Argos stabilizes your screenshots automatically.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="storage">
          <AccordionTrigger>
            How does Argos secures my screenshots and traces?
          </AccordionTrigger>
          <AccordionContent>
            Argos stores screenshots and trace on Amazon S3 privately. A signed
            valid for 30 minutes URL is generated for each screenshot and trace,
            and only the user that have access to the build can see it.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
