import { Container } from "@/components/Container";
import { Dolorean } from "@/components/dolorean/Dolorean";

export function Hero() {
  return (
    <Container className="py-20 text-center md:py-24" asChild>
      <section>
        <div className="relative mb-8 flex flex-col-reverse items-center gap-y-4 xl:flex-row xl:items-end">
          <h1 className="font-accent bg-linear-(--gradient-playwright-text) bg-clip-text text-[3.2rem] leading-[1.25] text-transparent md:text-[5rem] dark:bg-linear-(--gradient-playwright-text-dark)">
            Supercharge your Playwright Tests
          </h1>
          <Dolorean className="animate-float aspect-296/130 w-[75%] shrink-0 xl:-ml-[10%] xl:h-[8rem] xl:w-auto" />
        </div>
        <p className="text-low text-xl md:text-2xl">
          Argos enhances your Playwright test suite with{" "}
          <strong className="text-default font-medium">
            powerful CI debugging
          </strong>
          ,{" "}
          <strong className="text-default font-medium">
            automated screenshot comparison
          </strong>{" "}
          and{" "}
          <strong className="text-default font-medium">
            scalable visual testing
          </strong>
          .
        </p>
      </section>
    </Container>
  );
}
