import gradients from "@/app/home/hero/assets/gradients.svg";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

import { ArgosEmblem } from "./ArgosEmblem";
import { Grid } from "./Grid";

export function CallToActionSection(props: {
  children?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const {
    children = <ArgosEmblem className="mx-auto aspect-square size-24" />,
    description = (
      <>
        One source of truth for UI changes. Review, approve, and ships faster.
      </>
    ),
  } = props;
  return (
    <section className="[--glow-color:var(--primary-11)]">
      <div className="relative h-28 bg-linear-to-b from-black from-72% to-(--glow-color)">
        <Grid
          size={5}
          className="absolute inset-y-0 -left-[10vw] w-[120vw] mask-[linear-gradient(black,transparent)] text-(--primary-1) opacity-4 dark:opacity-5"
        />
      </div>
      <div className="px-4">
        <Container className="relative flex flex-col items-center justify-center border-x py-20 pt-16 text-center md:pb-28">
          <Container className="absolute top-1 -mt-13 flex scale-y-108 blur-[16px]">
            <svg
              viewBox="0 0 64 48"
              className="z-10 w-16 flex-none fill-(--glow-color)"
              aria-hidden="true"
            >
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
            </svg>
            <div className="-mx-px flex-auto bg-(--glow-color)"></div>
            <svg
              viewBox="0 0 64 48"
              className="z-10 w-16 flex-none fill-(--glow-color)"
              aria-hidden="true"
            >
              <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
            </svg>
          </Container>
          <Container className="absolute top-1 -mt-12 flex">
            <svg
              viewBox="0 0 64 48"
              className="z-10 w-16 flex-none fill-(--neutral-1)"
              aria-hidden="true"
            >
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
            </svg>
            <div className="bg-app -mx-px flex-auto"></div>
            <svg
              viewBox="0 0 64 48"
              className="z-10 w-16 flex-none fill-(--neutral-1)"
              aria-hidden="true"
            >
              <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
            </svg>
          </Container>
          <div className="bg-app pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 w-[1800px] -translate-x-1/2 mask-[linear-gradient(transparent_20%,black)] bg-cover bg-top opacity-70"
            style={{
              backgroundImage: `url(${gradients.src})`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 mask-[linear-gradient(transparent,black,transparent)] text-(--neutral-5) opacity-70">
            <Grid x={-1} y={-1} />
          </div>
          <div className="relative px-2">
            {children ? <div className="mb-4">{children}</div> : null}
            <h2 className="font-accent mx-auto mb-4 max-w-2xl text-4xl font-bold text-balance md:text-5xl">
              <span className="bg-linear-to-r from-(--pink-10) to-(--violet-10) bg-clip-text text-balance text-transparent">
                Supercharge
              </span>{" "}
              your product quality
            </h2>
            <p className="text-low mx-auto max-w-sm text-lg font-medium text-balance">
              {description}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild>
                <a href="https://app.argos-ci.com/signup">Sign up</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://cal.com/gregberge" target="_blank">
                  Request demo
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
