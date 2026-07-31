import clsx from "clsx";
import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  vitest,
} from "@/app/assets/brands/library";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Grid } from "@/components/Grid";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { Tooltip } from "@/components/Tooltip";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { SECTION_FADE } from "@/components/section-fade";

import githubDark from "./assets/github-dark.svg";
import githubLight from "./assets/github-light.svg";
import gitlab from "./assets/gitlab.svg";
import msteams from "./assets/msteams.svg";
import slack from "./assets/slack.svg";

const SDKS = [
  {
    name: playwright.name,
    logo: playwright.logo,
    href: "/docs/quickstart/playwright-quickstart",
  },
  {
    name: storybook.name,
    logo: storybook.logo,
    href: "/docs/quickstart/storybook-quickstart",
  },
  {
    name: vitest.name,
    logo: vitest.logo,
    href: "/docs/quickstart/vitest-quickstart",
  },
  {
    name: cypress.name,
    logo: cypress.logo,
    href: "/docs/quickstart/cypress-quickstart",
  },
];

export function Stack() {
  return (
    <section
      className={clsx(
        "separator-b relative overflow-x-clip px-4",
        SECTION_FADE,
      )}
    >
      <Container noGutter className="border-x pb-4">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <SectionTitle>Fits the stack you already have</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Plug into Playwright, Storybook, Vitest, or Cypress in a few
              lines, then get every result where your team already works.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/docs/quickstart">Explore all SDKs</Link>
          </Button>
        </SectionHeader>
        <div className="divide-y border-t">
          <StackRow title="Add your first snapshot in seconds">
            <ul className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-5">
              {SDKS.map((item) => (
                <li key={item.name} className="contents">
                  <Link
                    href={item.href}
                    className="bg-app flex items-center gap-3 rounded-lg border-[0.5px] px-3 py-2.5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow"
                  >
                    <ThemeImage
                      src={item.logo}
                      alt=""
                      className="size-6 shrink-0"
                    />
                    <span className="font-accent truncate text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="contents">
                <Link
                  href="/docs/quickstart/any-test-framework"
                  className="text-low hover:text-default flex items-center justify-center rounded-lg border-[0.5px] border-dashed px-3 py-2.5 text-center transition duration-200"
                >
                  <span className="font-accent text-sm font-medium">
                    …and many more
                  </span>
                </Link>
              </li>
            </ul>
          </StackRow>
          <StackRow title="Get results in">
            <IntegrationsCanvas />
          </StackRow>
        </div>
      </Container>
    </section>
  );
}

function StackRow(props: { title: string; children: React.ReactNode }) {
  const { title, children } = props;
  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
      <div className="text-low shrink-0 text-xs font-medium md:w-48">
        {title}
      </div>
      {children}
    </div>
  );
}

function IntegrationsCanvas() {
  return (
    <div className="relative h-60 w-full [--grid-size:40px] md:-mr-30 md:h-52 md:flex-1 md:[--grid-size:50px]">
      <div className="absolute inset-0 mask-[linear-gradient(transparent,black_20%,black_80%,transparent),linear-gradient(90deg,transparent,black_15%,black_85%,transparent)] mask-intersect text-(--border-color-default)">
        <Grid x={-1} y={-1} size={40} className="md:hidden" />
        <Grid x={-1} y={-1} size={50} className="hidden md:block" />
      </div>
      <IntegrationTile
        className="[--x:1] [--y:1] md:[--x:1] md:[--y:1]"
        image={{ light: githubLight, dark: githubDark }}
        title="GitHub"
        href="/docs/learn/integrations/github-integration"
      />
      <IntegrationTile
        className="[--x:5] [--y:1] md:[--x:6] md:[--y:0]"
        image={gitlab}
        title="GitLab"
        href="/docs/learn/integrations/gitlab-integration"
      />
      <IntegrationTile
        className="[--x:1] [--y:4] md:[--x:11] md:[--y:2]"
        image={slack}
        title="Slack"
        href="/docs/learn/integrations/slack-integration"
      />
      <IntegrationTile
        className="[--x:5] [--y:4] md:[--x:17] md:[--y:1]"
        image={msteams}
        title="Microsoft Teams"
        href="/docs/learn/integrations/microsoft-teams-integration"
      />
    </div>
  );
}

function IntegrationTile(props: {
  image: ThemeImageProps["src"];
  title: string;
  className: string;
  href: string;
}) {
  const { image, href, title, className } = props;
  return (
    <Tooltip
      content={`Explore ${title} integration`}
      delayDuration={0}
      side="bottom"
    >
      <Link
        className={clsx(
          "bg-app absolute size-[calc(var(--grid-size)*2+1px)] rounded-lg border shadow",
          "top-[calc(var(--grid-size)*var(--y)-1px)] left-[calc(var(--grid-size)*var(--x)-1px)]",
          "transition duration-150 hover:scale-110 hover:shadow-lg",
          className,
        )}
        href={href}
      >
        <ThemeImage src={image} alt={title} className="size-full" />
      </Link>
    </Tooltip>
  );
}
