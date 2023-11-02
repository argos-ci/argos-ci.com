import { Container } from "@/components/Container";

export const StaticPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <article
      className="prose mx-auto mb-24 mt-14 max-w-none"
      style={{ contain: "none" }}
    >
      <Container>{children}</Container>
    </article>
  );
};
