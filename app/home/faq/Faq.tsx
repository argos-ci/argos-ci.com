import { Container } from "@/components/Container";
import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { H2 } from "@/components/H2";

const questions: FAQQuestion[] = [
  {
    name: "Why is visual testing important?",
    answer: (
      <p>
        Visual testing ensures that changes to your codebase don't break your
        app's UI.
      </p>
    ),
    textAnswer:
      "Visual testing ensures that changes to your codebase don't break your app's UI.",
  },
  {
    name: "How does Argos compare screenshots?",
    answer: (
      <p>
        Argos performs pixel-by-pixel screenshot comparisons to reveal subtle
        visual regressions.
      </p>
    ),
    textAnswer:
      "Argos performs pixel-by-pixel screenshot comparisons to reveal subtle visual regressions.",
  },
  {
    name: "Does Argos integrate with CI/CD pipelines?",
    answer: (
      <p>
        Yes, Argos supports all major CI/CD pipelines like GitHub Actions,
        GitLab CI, and more.
      </p>
    ),
    textAnswer:
      "Yes, Argos supports all major CI/CD pipelines like GitHub Actions, GitLab CI, and more.",
  },
  {
    name: "Is Argos free and open-source?",
    answer: (
      <p>
        Yes, Argos is an open-source visual testing platform with a free tier.
      </p>
    ),
    textAnswer:
      "Yes, Argos is an open-source visual testing platform with a free tier.",
  },
  {
    name: "What languages and frameworks does Argos support?",
    answer: (
      <p>
        Argos is framework-agnostic and supports any project that can produce
        screenshots.
      </p>
    ),
    textAnswer:
      "Argos is framework-agnostic and supports any project that can produce screenshots.",
  },
];

export function FAQ() {
  return (
    <Container className="py-16 md:py-20" asChild>
      <section>
        <H2 className="mb-12 text-center">About Argos</H2>
        <FAQAccordion questions={questions} />
      </section>
    </Container>
  );
}
