import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { trackDemoClick } from "@/app/google-ads";
import { trackSignupClick } from "@/app/google-ads";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import {
  HeroActions,
  Hero as HeroComponent,
  HeroDescription,
  HeroHeading,
} from "@/components/Hero";
import { getPaginatedChangelogs } from "@/lib/api/changelog";

import gradients from "./assets/gradients.svg";
import { PillarFlow } from "./PillarFlow";

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
        <div className="relative flex w-full flex-col items-center gap-10 py-16 text-center md:pt-20 md:pb-16">
          <LastChangelog />
          <HeroComponent align="center">
            <HeroHeading>
              Deploy, diff, review, stabilize — every pull request.
            </HeroHeading>
            <HeroDescription>
              Argos gives your team and your agents a live preview of every PR,
              a diff of everything that changed — pixels or any file — one place
              to approve it, and the per-test history to kill flakes.
            </HeroDescription>
            <HeroActions>
              <Button size="large" asChild>
                <Link
                  href="https://app.argos-ci.com/signup"
                  onClick={trackSignupClick}
                >
                  Start for free
                </Link>
              </Button>
              <Button size="large" variant="outline" asChild>
                <Link href="https://cal.com/gregberge" onClick={trackDemoClick}>
                  Get a demo
                </Link>
              </Button>
            </HeroActions>
          </HeroComponent>
        </div>
        <div className="relative flex flex-col items-center gap-6 pb-16 md:pb-20">
          <PillarFlow />
          <a
            href="https://app.argos-ci.com/argos-ci/snkr-shop/builds/11"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm font-medium text-low transition hover:text-default"
          >
            See it on a real pull request
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
          </a>
        </div>
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
      className="group mx-auto flex items-center rounded-full border bg-app text-xs font-medium shadow-xs transition hover:bg-(--neutral-3) hover:shadow-sm md:text-sm"
    >
      <span className="px-3 py-1.5">{first.homeTitle ?? first.title}</span>
      <span className="inline-flex items-center gap-1 py-1.5 pr-3 text-low md:border-l md:px-3">
        <span className="hidden md:inline">Read more </span>
        <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
      </span>
    </Link>
  );
}
