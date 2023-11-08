import { Container } from "@/components/Container";
import { Dolorean } from "@/components/dolorean/Dolorean";

export function Hero() {
  return (
    <Container className="py-20 text-center md:py-24" asChild>
      <section>
        <div className="relative mb-8 flex flex-col-reverse items-center gap-y-4 xl:flex-row xl:items-end">
          <h1 className="bg-hero-playwright-text-gradient dark:bg-hero-playwright-text-gradient-dark bg-clip-text font-accent text-[3.2rem] leading-[1.25] text-transparent md:text-[5rem]">
            Supercharge your Playwright Tests
          </h1>
          <Dolorean className="aspect-[296/130] w-[75%] shrink-0 animate-float xl:-ml-[10%] xl:h-[8rem] xl:w-auto" />
        </div>
        <p className="text-xl text-low md:text-2xl">
          Argos elevates your testing experience with{" "}
          <strong className="font-medium text">CI Debugging</strong> and{" "}
          <strong className="font-medium text">Enhanced Visual Testing</strong>.
        </p>
      </section>
    </Container>
  );
}
