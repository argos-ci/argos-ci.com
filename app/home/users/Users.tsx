import { Tweet } from "react-tweet";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Users() {
  return (
    <Container asChild className="py-16 md:py-24">
      <section>
        <H2 className="mb-4 bg-gradient-to-r from-violet-11 to-crimson-11 bg-clip-text text-center text-transparent">
          Loved by more than 3K users
        </H2>
        <div className="space-y-6 py-8 sm:columns-2 sm:gap-6">
          <Tweet id="1724422233840287766" />
          <Tweet id="1724833402866778214" />
        </div>
      </section>
    </Container>
  );
}
