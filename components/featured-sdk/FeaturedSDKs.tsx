import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  wdio,
} from "@/app/assets/brands/library";
import type { Brand } from "@/app/assets/brands/types";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Grid } from "@/components/Grid";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { SectionDescription, SectionTitle } from "@/components/Typography";

export function FeaturedSDKsSection() {
  return (
    <section className="separator-b relative px-4">
      <Container
        noGutter
        className="relative flex flex-col border-x max-md:pb-12 md:flex-row"
      >
        <SectionHeader className="container-gutter max-w-100 flex-1 md:border-r md:py-24!">
          <SectionHeaderTexts>
            <SectionTitle>Add your first visual test in seconds</SectionTitle>
            <SectionDescription className="max-w-xl">
              Argos plugs into Playwright, Cypress, Storybook, Webdriver IO or
              any framework so you can add visual testing without changing your
              stack.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/docs/getting-started">Explore all SDKs</Link>
          </Button>
        </SectionHeader>
        <ul className="flex flex-1 flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-center md:px-8 md:py-24">
          <SdkCard
            href="/docs/quickstart/playwright"
            sdk={playwright}
            borderColor="text-(--red-6)"
            bgColor="bg-(--red-1)"
          />
          <SdkCard
            href="/docs/quickstart/storybook"
            sdk={storybook}
            borderColor="text-(--plum-6)"
            bgColor="bg-(--plum-1)"
          />
          <SdkCard
            href="/docs/quickstart/cypress"
            sdk={cypress}
            borderColor="text-(--green-6)"
            bgColor="bg-(--green-1)"
          />
          <SdkCard
            href="/docs/quickstart/webdriverio"
            sdk={wdio}
            borderColor="text-(--orange-6)"
            bgColor="bg-(--orange-1)"
          />
        </ul>
      </Container>
    </section>
  );
}

function SdkCard(props: {
  href: string;
  sdk: Brand;
  borderColor: string;
  bgColor: string;
}) {
  const { href, sdk, borderColor, bgColor } = props;
  return (
    <li className="contents">
      <Link
        href={href}
        className={clsx(
          "group flex flex-col overflow-hidden border-y shadow-xs transition duration-200 hover:shadow md:border",
          bgColor,
        )}
      >
        <div
          className={clsx(
            "relative flex h-[140px] items-center justify-center border-b md:w-[279px]",
            borderColor,
          )}
        >
          <Grid
            size={70}
            strokeDasharray={2}
            className="absolute"
            x={-1}
            y={-1}
          />

          <div className="relative flex rounded-full">
            <svg className="absolute -inset-2 size-18">
              <circle
                cx={36}
                cy={36}
                r={36}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray={2}
              />
            </svg>
            <ThemeImage
              src={sdk.logo}
              className="size-14 transition duration-200 group-hover:scale-125"
              alt=""
            />
          </div>
        </div>
        <div className="bg-app flex items-center justify-between gap-2 px-4 py-2">
          <div className="font-accent bg-app font-medium">{sdk.name}</div>
          <div className="font-accent flex -translate-x-2 items-center gap-1 text-sm opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            Get started <ArrowRightIcon className="size-3" />
          </div>
        </div>
      </Link>
    </li>
  );
}
