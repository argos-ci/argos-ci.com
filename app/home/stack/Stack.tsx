import clsx from "clsx";
import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  vitest,
  wdio,
} from "@/app/assets/brands/library";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
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

type Tile = {
  name: string;
  image: ThemeImageProps["src"];
  href: string;
  tooltip: string;
};

const CHECKER_CELL = 60;
const CHECKER_COLS = Math.ceil(1600 / CHECKER_CELL);
const CHECKER_ROWS = 8;

/**
 * Two placements per cell rather than two sets of cells: a 390px viewport only
 * reaches five columns, so everything needs a second, narrow position. Cells
 * without one are decoration and simply do not render below `md`.
 */
function CheckerboardCell(props: {
  row: number;
  col: number;
  mobileRow?: number;
  mobileCol?: number;
  children: React.ReactNode;
}) {
  const { row, col, mobileRow, mobileCol, children } = props;
  const onMobile = mobileRow !== undefined && mobileCol !== undefined;
  return (
    <div
      className={clsx(
        onMobile
          ? "col-start-[var(--m-col)] row-start-[var(--m-row)]"
          : "hidden md:block",
        "md:col-start-[var(--col)] md:row-start-[var(--row)]",
      )}
      style={
        {
          "--col": col,
          "--row": row,
          ...(onMobile ? { "--m-col": mobileCol, "--m-row": mobileRow } : null),
          width: CHECKER_CELL + 1,
          height: CHECKER_CELL + 1,
        } as React.CSSProperties
      }
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
      className="border-hover from-app size-full rounded-lg border bg-linear-to-t to-(--neutral-3)"
    />
  );
}

function CheckerboardLines() {
  return (
    <div
      className="bg-app absolute top-0 -left-7.5 border md:-left-0.5"
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
      className="absolute top-0 -left-7.5 grid md:-left-0.5"
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

          {/* Plain `overflow-hidden` below `md`: pairing overflow-x-visible with
              overflow-y-hidden makes the browser compute the x axis to `auto`,
              which turned this into a 1618px scroller with nothing in it past
              the fifth column. Seven rows of tiles, plus one to breathe on. */}
          <div className="relative order-last h-120 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_60px)] md:absolute md:inset-0 md:order-0 md:h-full md:overflow-visible md:mask-none">
            <CheckerboardLines />

            <CheckerboardTiles>
              <CheckerboardCell row={2} col={10} mobileRow={1} mobileCol={4}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={2} col={13} mobileRow={2} mobileCol={2}>
                <LogoTile
                  name={playwright.name}
                  image={playwright.logo}
                  href="/docs/quickstart/playwright-quickstart"
                  tooltip="Playwright quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={2} col={17} mobileRow={6} mobileCol={6}>
                <LogoTile
                  name="GitHub"
                  image={{ light: githubLight, dark: githubDark }}
                  href="/docs/learn/integrations/github-integration"
                  tooltip="Explore GitHub integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={3} col={11} mobileRow={3} mobileCol={3}>
                <LogoTile
                  name={vitest.name}
                  image={vitest.logo}
                  href="/docs/quickstart/vitest-quickstart"
                  tooltip="Vitest quickstart"
                />
              </CheckerboardCell>

              <CheckerboardCell row={4} col={8} mobileRow={5} mobileCol={7}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={13} mobileRow={7} mobileCol={3}>
                <LogoTile
                  name="Microsoft Teams"
                  image={msteams}
                  href="/docs/learn/integrations/microsoft-teams-integration"
                  tooltip="Explore Microsoft Teams integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={4} col={15} mobileRow={3} mobileCol={6}>
                <LogoTile
                  name="GitLab"
                  image={gitlab}
                  href="/docs/learn/integrations/gitlab-integration"
                  tooltip="Explore GitLab integration"
                />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={11} mobileRow={2} mobileCol={5}>
                <LogoTile
                  name={storybook.name}
                  image={storybook.logo}
                  href="/docs/quickstart/storybook-quickstart"
                  tooltip="Storybook quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={16} mobileRow={7} mobileCol={6}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={5} col={19} mobileRow={5} mobileCol={4}>
                <LogoTile
                  name={wdio.name}
                  image={wdio.logo}
                  href="/docs/quickstart/webdriverio-quickstart"
                  tooltip="WebdriverIO quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={6} col={12} mobileRow={4} mobileCol={5}>
                <LogoTile
                  name={cypress.name}
                  image={cypress.logo}
                  href="/docs/quickstart/cypress-quickstart"
                  tooltip="Cypress quickstart"
                />
              </CheckerboardCell>
              <CheckerboardCell row={6} col={15} mobileRow={6} mobileCol={2}>
                <LogoTile
                  name="Slack"
                  image={slack}
                  href="/docs/learn/integrations/slack-integration"
                  tooltip="Explore Slack integration"
                />
              </CheckerboardCell>

              <CheckerboardCell row={7} col={9} mobileRow={4} mobileCol={3}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={7} col={14} mobileRow={6} mobileCol={5}>
                <GhostTile />
              </CheckerboardCell>
              <CheckerboardCell row={8} col={20} mobileRow={8} mobileCol={5}>
                <GhostTile />
              </CheckerboardCell>
            </CheckerboardTiles>
          </div>
        </div>
      </Container>
    </section>
  );
}
