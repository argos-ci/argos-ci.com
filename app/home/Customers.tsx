import { BrandTestimonials } from "@/components/BrandTestimonials";
import { Container } from "@/components/Container";

export function Customers() {
  return (
    <div className="py-12 lg:py-16">
      <Container className="mb-8 text-center text-xl">
        Trusted by the best front-end teams
      </Container>
      <BrandTestimonials />
    </div>
  );
}
