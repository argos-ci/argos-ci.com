import { BrandTestimonials } from "@/components/BrandTestimonials";
import { Container } from "@/components/Container";

export function Customers({ limit }: { limit?: number }) {
  return (
    <div>
      <Container className="mb-8 text-center text-xl">
        Trusted by the best front-end teams
      </Container>
      <BrandTestimonials limit={limit} />
    </div>
  );
}
