import { Container } from "@/components/Container";

export const StaticPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <article
      className="prose dark:prose-invert mx-auto mt-14 mb-24 max-w-none"
      style={{ contain: "none" }}
    >
      <Container>{children}</Container>
    </article>
  );
};
