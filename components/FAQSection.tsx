import { Container } from "./Container";
import { FAQAccordion, type FAQQuestion } from "./FAQAccordion";
import { SectionTitle } from "./Typography";

/**
 * The FAQ block of a product page: a title, the accordion, and the FAQPage
 * JSON-LD the accordion emits. The same `questions` feed the page's markdown
 * twin through `lib/markdown.ts`, so the answers are written once.
 */
export function FAQSection(props: {
  questions: FAQQuestion[];
  title?: React.ReactNode;
}) {
  const { questions, title = "Frequently asked questions" } = props;
  return (
    <section className="border-b px-4">
      <Container className="border-x py-12 md:py-18">
        <SectionTitle className="mx-auto mb-10 max-w-2xl">{title}</SectionTitle>
        <FAQAccordion questions={questions} />
      </Container>
    </section>
  );
}
