import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function DemoVideo() {
  return (
    <Container className="my-8">
      <H2 className="mb-4 text-center">
        Watch Argos in action with Playwright
      </H2>
      <p className="text-low mb-6 text-center text-lg">
        Explore how Argos can help you supercharge your visual testing
        experience.
      </p>
      <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden sm:rounded-sm">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QiJk2ZViN7c?si=hFpaNJVI3ztOPW68"
          title="Argos Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          data-visual-test="blackout"
        />
      </div>
    </Container>
  );
}
