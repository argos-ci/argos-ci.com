import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Video() {
  return (
    <Container className="my-8">
      <H2 className="mb-4 text-center">
        It's time for a new Playwright experience.
      </H2>
      <p className="mb-6 text-center text-lg text-low">
        Explore how Argos streamlines your test debugging with a single click
        <br />
        and upgrades Visual Testing to the next level.
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
          data-visual-test="blackout"
        />
      </div>
    </Container>
  );
}
