import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

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
    <Container className="py-16 md:py-20" asChild>
      <section>
        <div className="text-primary mb-4 text-lg font-medium text-violet-11">
          {surtitle}
        </div>
        <H2 className="mb-12">{title}</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:flex-row">
          {children}
        </div>
      </section>
    </Container>
  );
}
