import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function CallToActionSection(props: {
  children?: React.ReactNode;
  supercharge: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Container className="my-20 text-center" asChild>
      <section>
        {props.children}
        <h2 className="font-accent mx-auto mb-4 max-w-2xl text-4xl md:text-6xl md:leading-[1.15]">
          <span className="bg-linear-to-r from-(--pink-10) to-(--violet-10) bg-clip-text text-transparent">
            Supercharge
          </span>{" "}
          {props.supercharge}
        </h2>
        <p className="text-low mx-auto max-w-sm text-lg text-balance md:text-xl">
          {props.description}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="large" asChild>
            <a href="https://app.argos-ci.com/signup">Sign up</a>
          </Button>
          <Button variant="outline" size="large" asChild>
            <a href="https://cal.com/gregberge" target="_blank">
              Request demo
            </a>
          </Button>
        </div>
      </section>
    </Container>
  );
}
