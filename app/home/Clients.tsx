import { BrandTestimonials } from "@/components/BrandTestimonials";
import { Container } from "@/components/Container";

export function Clients() {
  return (
    <div className="py-12 lg:py-16">
      <Container className="text-xl text-center mb-8">
        Trusted by the best front-end teams
      </Container>
      <BrandTestimonials />
    </div>
  );
}
