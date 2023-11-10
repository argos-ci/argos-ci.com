import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Video() {
  return (
    <Container className="my-8">
      <H2 className="mb-4 text-center">
        It's time to for a new Playwright experience.
      </H2>
      <p className="mb-6 text-center text-lg text-low">
        Discover how Argos helps you to debug your tests in one click
        <br />
        and scale Visual Testing to the next level.
      </p>
      <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden sm:rounded">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4EDu7otuJ9c?si=hFpaNJVI3ztOPW68"
          title="Argos Playwright Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </Container>
  );
}
