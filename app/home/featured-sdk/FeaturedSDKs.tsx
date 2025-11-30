import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Grid } from "@/components/Grid";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

import { SectionHeader, SectionHeaderTexts } from "../common/SectionHeader";
import { SectionDescription, SectionTitle } from "../common/Typography";
import cypress from "./assets/cypress.svg";
import playwright from "./assets/playwright.svg";
import storybook from "./assets/storybook.svg";
import wdio from "./assets/wdio.svg";

export function FeaturedSDKs() {
  return (
    <section className="separator-b relative px-4">
      <Container
        noGutter
        className="relative flex flex-col border-x max-md:pb-12 md:flex-row"
      >
        <SectionHeader className="container-gutter max-w-sm flex-1 md:border-r">
          <SectionHeaderTexts>
            <SectionTitle>Add your first visual test in seconds</SectionTitle>
            <SectionDescription className="max-w-xl">
              Argos plugs into Playwright, Cypress, Storybook, Webdriver IO or
              any framework so you can add visual testing without changing your
              stack.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline">Explore all SDKs</Button>
        </SectionHeader>
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:flex-wrap md:items-start md:justify-center md:py-18">
          <SdkCard
            href="/docs/quickstart/playwright"
            image={playwright}
            title="Playwright"
            borderColor="text-(--red-6)"
            bgColor="bg-(--red-1)"
          />
          <SdkCard
            href="/docs/quickstart/storybook"
            image={storybook}
            title="Storybook"
            borderColor="text-(--plum-6)"
            bgColor="bg-(--plum-1)"
          />
          <SdkCard
            href="/docs/quickstart/cypress"
            image={cypress}
            title="Cypress"
            borderColor="text-(--green-6)"
            bgColor="bg-(--green-1)"
          />
          <SdkCard
            href="/docs/quickstart/webdriverio"
            image={wdio}
            title="WebdriverIO"
            borderColor="text-(--orange-6)"
            bgColor="bg-(--orange-1)"
          />
        </div>
      </Container>
    </section>
  );
}

function SdkCard(props: {
  href: string;
  image: ThemeImageProps["src"];
  title: string;
  borderColor: string;
  bgColor: string;
}) {
  const { href, image, title, borderColor, bgColor } = props;
  return (
    <a
      href={href}
      target="_blank"
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
            src={image}
            className="size-14 transition duration-200 group-hover:scale-125"
            alt=""
          />
        </div>
      </div>
      <div className="bg-app flex items-center justify-between gap-2 px-4 py-2">
        <h3 className="font-accent bg-app font-medium">{title}</h3>
        <div className="font-accent flex -translate-x-2 items-center gap-1 text-sm opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          Get started <ArrowRightIcon className="size-3" />
        </div>
      </div>
    </a>
  );
}
