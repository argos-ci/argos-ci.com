import clsx from "clsx";
import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  vitest,
  wdio,
} from "@/app/assets/brands/library";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { Tooltip } from "@/components/Tooltip";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { SECTION_FADE } from "@/components/section-fade";

import { Button } from "../../../components/Button";
import githubDark from "./assets/github-dark.svg";
import githubLight from "./assets/github-light.svg";
import gitlab from "./assets/gitlab.svg";
import msteams from "./assets/msteams.svg";
import slack from "./assets/slack.svg";

type Tile = {
  name: string;
  image: ThemeImageProps["src"];
  href: string;
  tooltip: string;
};

const CHECKER_CELL = 60;
const CHECKER_COLS = Math.ceil(1600 / CHECKER_CELL);
const CHECKER_ROWS = 8;

function CheckerboardCell(props: {
  row: number;
  col: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { row, col, className, children } = props;
  return (
    <div
      className={className}
      style={{
        gridColumn: col,
        gridRow: row,
        width: CHECKER_CELL + 1,
        height: CHECKER_CELL + 1,
      }}
    >
      {children}
    </div>
  );
}

function LogoTile({ name, image, href, tooltip }: Tile) {
  return (
    <Tooltip content={tooltip} delayDuration={0} side="bottom">
      <Link
        href={href}
        className="bg-app border-hover relative grid size-full place-items-center rounded-lg border p-2.5 shadow-md transition duration-150 hover:z-10 hover:scale-110 hover:shadow-lg"
      >
        <ThemeImage src={image} alt={name} className="size-full" />
      </Link>
    </Tooltip>
  );
}

function GhostTile() {
  return (
    <div
      aria-hidden
      className="border-hover from-bg-app size-full rounded-lg border bg-linear-to-t to-(--neutral-3)"
    />
  );
}

function CheckerboardLines() {
  return (
    <div
      className="absolute top-0 -left-0.5 border bg-white"
      style={{
        width: CHECKER_COLS * CHECKER_CELL,
        height: CHECKER_ROWS * CHECKER_CELL,
        backgroundImage:
          "linear-gradient(to right, var(--border-color-default) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color-default) 1px, transparent 1px)",
        backgroundSize: `${CHECKER_CELL}px ${CHECKER_CELL}px`,
        backgroundOrigin: "border-box",
      }}
    />
  );
}

function CheckerboardTiles(props: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-0 -left-0.5 grid"
      style={{
        gridTemplateColumns: `repeat(${CHECKER_COLS}, ${CHECKER_CELL}px)`,
        gridAutoRows: `${CHECKER_CELL}px`,
      }}
    >
      {props.children}
    </div>
  );
}

export function Stack() {
  return (
    <section
      className={clsx(
        "separator-b relative overflow-x-clip overflow-y-hidden px-4",
        SECTION_FADE,
      )}
    >
      <Container className="border-x md:-mt-10 md:h-110 md:max-h-110" noGutter>
        <div className="relative flex flex-col md:block md:h-full">
          <SectionHeader
            className="container-gutter relative order-first md:absolute md:inset-y-0 md:left-0 md:z-10 md:order-0 md:h-full md:w-1/2 md:justify-center md:py-0"
            style={{
              background:
                "linear-gradient(to right, var(--background-color-app) 45%, transparent 95%)",
            }}
          >
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

          <div className="relative order-last h-100 overflow-x-visible overflow-y-hidden md:absolute md:inset-0 md:order-0 md:h-full md:overflow-visible">
            <CheckerboardLines />

            <CheckerboardTiles>
              {/* Mobile only: the viewport is too narrow to reach the col 14-18
                  cluster below, so a few brands get a second, low-column
                  placement here just to stay visible above the fold. */}
              <CheckerboardCell row={2} col={2} className="md:hidden">
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={2} col={5} className="md:hidden">
                <LogoTile
                  name="Slack"
                  image={slack}
                  href="/docs/learn/integrations/slack-integration"
                  tooltip="Explore Slack integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={3} className="md:hidden">
                <LogoTile
                  name={playwright.name}
                  image={playwright.logo}
                  href="/docs/quickstart/playwright-quickstart"
                  tooltip="Playwright quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={6} className="md:hidden">
                <LogoTile
                  name={storybook.name}
                  image={storybook.logo}
                  href="/docs/quickstart/storybook-quickstart"
                  tooltip="Storybook quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={2} className="md:hidden">
                <LogoTile
                  name="GitHub"
                  image={{ light: githubLight, dark: githubDark }}
                  href="/docs/learn/integrations/github-integration"
                  tooltip="Explore GitHub integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={6} col={5} className="md:hidden">
                <GhostTile />
              </CheckerboardCell>

              <CheckerboardCell row={2} col={10}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={2} col={13}>
                <LogoTile
                  name={playwright.name}
                  image={playwright.logo}
                  href="/docs/quickstart/playwright-quickstart"
                  tooltip="Playwright quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={2} col={17}>
                <LogoTile
                  name="GitHub"
                  image={{ light: githubLight, dark: githubDark }}
                  href="/docs/learn/integrations/github-integration"
                  tooltip="Explore GitHub integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={3} col={11}>
                <LogoTile
                  name={vitest.name}
                  image={vitest.logo}
                  href="/docs/quickstart/vitest-quickstart"
                  tooltip="Vitest quickstart"
                />
              </CheckerboardCell>

              <CheckerboardCell row={4} col={8}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={13}>
                <LogoTile
                  name="Microsoft Teams"
                  image={msteams}
                  href="/docs/learn/integrations/microsoft-teams-integration"
                  tooltip="Explore Microsoft Teams integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={15}>
                <LogoTile
                  name="GitLab"
                  image={gitlab}
                  href="/docs/learn/integrations/gitlab-integration"
                  tooltip="Explore GitLab integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={11}>
                <LogoTile
                  name={storybook.name}
                  image={storybook.logo}
                  href="/docs/quickstart/storybook-quickstart"
                  tooltip="Storybook quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={16}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={19}>
                <LogoTile
                  name={wdio.name}
                  image={wdio.logo}
                  href="/docs/quickstart/webdriverio-quickstart"
                  tooltip="WebdriverIO quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={6} col={12}>
                <LogoTile
                  name={cypress.name}
                  image={cypress.logo}
                  href="/docs/quickstart/cypress-quickstart"
                  tooltip="Cypress quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={6} col={15}>
                <LogoTile
                  name="Slack"
                  image={slack}
                  href="/docs/learn/integrations/slack-integration"
                  tooltip="Explore Slack integration"
                />
              </CheckerboardCell>

              <CheckerboardCell row={7} col={9}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={7} col={14}>
                <GhostTile />
              </CheckerboardCell>
            </CheckerboardTiles>
          </div>
        </div>
      </Container>
    </section>
  );
}
