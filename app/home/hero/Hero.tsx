import clsx from "clsx";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Grid } from "@/components/Grid";
import { ThemeImage } from "@/components/ThemeImage";

import { HomeSection } from "../common/HomeSection";
import appDark from "./assets/app-dark.png";
import appLight from "./assets/app-light.png";
import gradients from "./assets/gradients.svg";

export function Hero() {
  return (
    <HomeSection>
      <div className="relative px-4 sm:px-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 -mt-15 w-[1800px] -translate-x-1/2 bg-cover bg-top opacity-70"
          style={{
            backgroundImage: `url(${gradients.src})`,
          }}
        ></div>
        <div className="pointer-events-none absolute inset-0 -mt-15 border-x mask-[linear-gradient(transparent,black_40%),linear-gradient(90deg,transparent,black,transparent)]" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1800px] -translate-x-1/2 mask-[linear-gradient(transparent,black,transparent)] mask-intersect text-(--neutral-5)">
          <div className="absolute inset-x-[360px] inset-y-0">
            <Grid className="pointer-events-none absolute inset-[unset] top-0 right-full w-[360px] mask-[linear-gradient(90deg,transparent,black)]" />
            <Grid
              position="right"
              className="pointer-events-none absolute inset-[unset] top-0 left-full w-[360px] mask-[linear-gradient(270deg,transparent,black)]"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-px top-0 h-[500px] overflow-hidden mask-[linear-gradient(transparent,black,transparent),radial-gradient(80%_50%_at_50%_55%,rgba(0,0,0,0.2),black)] mask-intersect text-(--neutral-5)">
          <Grid className="w-max-content pointer-events-none absolute inset-[unset] inset-y-0 left-1/2 -translate-x-1/2" />
        </div>
        <div className="relative flex w-full flex-col items-center gap-10 py-16 text-center md:pt-20 md:pb-24">
          <Link
            href="#"
            className="bg-app hover:bg-subtle group mx-auto flex items-center rounded-full border text-xs font-medium shadow-xs transition hover:shadow-sm md:text-sm"
          >
            <span className="px-3 py-1.5">
              Introducing Official Storybook SDK
            </span>
            <span className="text-low inline-flex items-center gap-1 py-1.5 pr-3 md:border-l md:px-3">
              <span className="hidden md:inline">Read more </span>
              <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
            </span>
          </Link>
          <div className="flex max-w-2xl flex-col gap-5 text-balance">
            <h1 className="font-accent text-4xl font-medium md:text-5xl">
              Raise the quality bar for every release
            </h1>
            <p className="text-low text-base font-medium md:text-xl">
              Argos catches unexpected changes in your UI so your product stays
              polished at any scale.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="large">Start for free</Button>
            <Button size="large" variant="outline">
              Get a demo
            </Button>
          </div>
        </div>
        <div
          className={clsx(
            "relative mx-auto w-fit rounded-lg border border-(--primary-6) bg-(--primary-3) mask-[linear-gradient(black_70%,transparent)] p-1 md:rounded-t-3xl md:p-2.5",
          )}
        >
          <ThemeImage
            src={{ light: appLight, dark: appDark }}
            alt="Argos Build"
            className="w-full max-w-[880px] rounded md:rounded-t-[0.875rem]"
          />
        </div>
      </div>
    </HomeSection>
  );
}
