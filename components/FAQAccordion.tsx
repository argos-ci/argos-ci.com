import { FAQPage } from "schema-dts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { JsonLd } from "./JsonLd";

export type FAQQuestion = {
  name: string;
  answer: React.ReactElement;
  textAnswer: string;
};

export async function FAQAccordion(props: { questions: FAQQuestion[] }) {
  const jsonLd: FAQPage = {
    "@type": "FAQPage",
    mainEntity: props.questions.map((question) => {
      return {
        "@type": "Question",
        name: question.name,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.textAnswer,
        },
      };
    }),
  };
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="mx-auto w-full max-w-2xl text-left text-wrap [&_strong]:font-semibold"
      >
        {props.questions.map((question) => {
          return (
            <AccordionItem key={question.name} value={question.name}>
              <AccordionTrigger>{question.name}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <JsonLd json={jsonLd} />
    </>
  );
}
