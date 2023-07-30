import { Container } from "@/components/Container";

export const StaticPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <article
      className="prose prose-invert mx-auto max-w-none mt-14 mb-24"
      style={{ contain: "none" }}
    >
      <Container>{children}</Container>
    </article>
  );
};
