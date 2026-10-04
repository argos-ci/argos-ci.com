import { ChevronDownIcon } from "lucide-react";
import { FAQPage } from "schema-dts";

import { JsonLd } from "./JsonLd";

export type FAQQuestion = {
  name: string;
  answer: React.ReactElement;
  textAnswer: string;
};

/**
 * Native `<details>` rather than a JS accordion: a closed answer still ships in
 * the HTML, so crawlers and LLM fetchers that don't run JavaScript read it
 * (Radix only renders an item's content while it is open). The shared `name`
 * keeps one answer open at a time; the open/close animation lives in
 * `styles/globals.css`.
 */
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
      <div className="mx-auto w-full max-w-2xl text-left text-wrap [&_strong]:font-semibold">
        {props.questions.map((question) => {
          return (
            <details
              key={question.name}
              name="faq"
              className="group not-last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-4 text-left font-medium text-low transition group-open:text-default hover:text-default [&::-webkit-details-marker]:hidden">
                <h3>{question.name}</h3>
                <ChevronDownIcon
                  aria-hidden
                  className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="pt-0 pb-4 [&>p+p]:mt-4">{question.answer}</div>
            </details>
          );
        })}
      </div>
      <JsonLd json={jsonLd} />
    </>
  );
}
