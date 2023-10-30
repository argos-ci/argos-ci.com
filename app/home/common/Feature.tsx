import { Container } from "@/components/Container";
import { H2 } from "./H2";

export function Feature({
  surtitle,
  title,
  children,
}: {
  surtitle: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-20" asChild>
      <section>
        <div className="text-primary text-violet-11 font-medium text-lg mb-4">
          {surtitle}
        </div>
        <H2 className="mb-12">{title}</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row gap-6">
          {children}
        </div>
      </section>
    </Container>
  );
}
