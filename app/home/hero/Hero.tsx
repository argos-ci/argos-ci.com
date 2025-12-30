import clsx from "clsx";
import { ArrowUpRightIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";

import { app } from "@/app/assets/product/library";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import {
  HeroActions,
  Hero as HeroComponent,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { ThemeImage } from "@/components/ThemeImage";
import { getPaginatedChangelogs } from "@/lib/api/changelog";

import gradients from "./assets/gradients.svg";

export function Hero() {
  return (
    <section className="px-4">
      <Container className="separator-b relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 -mt-15 w-450 -translate-x-1/2 bg-cover bg-top opacity-70"
          style={{
            backgroundImage: `url(${gradients.src})`,
          }}
        />
        <FullPageGrid radial height="h-125" />
        <div className="relative flex w-full flex-col items-center gap-10 py-16 text-center md:pt-20 md:pb-24">
          <LastChangelog />
          <HeroComponent align="center">
            <HeroHeading>Stop visual regressions, not releases.</HeroHeading>
            <HeroDescription>
              Argos detects unintended visual changes in your UI, helping teams
              maintain high product quality as they ship faster.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link href="https://app.argos-ci.com/signup">
                  Start for free
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge">Get a demo</Link>
              </Button>
            </HeroActions>
          </HeroComponent>
        </div>
        <a
          href="https://app.argos-ci.com/jsfez/snkr-shop-2/builds/98/96709653"
          target="_blank"
          className={clsx(
            "group relative mx-auto block w-fit",
            "transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-103",
          )}
        >
          <div
            className={clsx(
              "relative overflow-hidden border border-(--primary-6) bg-(--primary-3) mask-[linear-gradient(black_70%,transparent)] p-1 max-md:rounded-lg md:rounded-t-3xl md:p-2.5",
            )}
          >
            <div className="absolute inset-0 bg-(--neutral-a6) opacity-0 transition duration-300 ease-in-out hover:opacity-100 dark:bg-[rgba(0,0,0,0.3)]" />
            <ThemeImage
              src={app}
              alt=""
              aria-hidden
              className="w-full max-w-220 rounded md:rounded-t-[0.875rem]"
            />
          </div>
          <div
            className={clsx(
              "font-accent bg-app pointer-events-none absolute bottom-4 left-1/2 order-(--primary-6) flex -translate-x-1/2 items-center gap-1 rounded-lg border px-2 py-1 text-sm font-medium text-(--primary-11)",
              "transition ease-in-out",
              "scale-75 opacity-0",
              "group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100",
            )}
          >
            <PlayCircleIcon className="size-4" />
            View demo build
          </div>
        </a>
      </Container>
    </section>
  );
}

async function LastChangelog() {
  const result = await getPaginatedChangelogs({ page: 1 });
  const first = result.entries[0];
  if (!first) {
    return null;
  }
  return (
    <Link
      href="/changelog"
      className="bg-app group mx-auto flex items-center rounded-full border text-xs font-medium shadow-xs transition hover:bg-(--neutral-3) hover:shadow-sm md:text-sm"
    >
      <span className="px-3 py-1.5">{first.homeTitle ?? first.title}</span>
      <span className="text-low inline-flex items-center gap-1 py-1.5 pr-3 md:border-l md:px-3">
        <span className="hidden md:inline">Read more </span>
        <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
      </span>
    </Link>
  );
}
