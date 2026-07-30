import clsx from "clsx";
import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  wdio,
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
    name: cypress.name,
    logo: cypress.logo,
    href: "/docs/quickstart/cypress-quickstart",
  },
  {
    name: wdio.name,
    logo: wdio.logo,
    href: "/docs/quickstart/webdriverio-quickstart",
  },
];

/**
 * Both halves answer the same objection — "how much work is this to adopt?" —
 * so the SDKs and the integrations share one compact section.
 *
 * The two rows are deliberately not built the same. Playwright, Cypress,
 * Storybook and WebdriverIO are not recognisable from their mark alone, so they
 * need a chip with their name written out. GitHub, GitLab, Slack and Teams are,
 * so they can be tiles on a grid — and that buys the page its one composition
 * that is not a row of boxes.
 */
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
              Plug into Playwright, Cypress, Storybook, or WebdriverIO in a few
              lines, then get every result where your team already works.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/docs/quickstart">Explore all SDKs</Link>
          </Button>
        </SectionHeader>
        {/* Stacked rather than split: three sections in a row already put text
            on the left and a visual on the right. */}
        <div className="divide-y border-t">
          <StackRow title="Run your tests with">
            <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
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
      <div className="text-low shrink-0 text-xs font-medium md:w-40">
        {title}
      </div>
      {children}
    </div>
  );
}

/**
 * Logo tiles pinned to a drawn grid, the way the integrations section used to
 * do it. The grid is masked to nothing at every edge so it reads as a plane the
 * tiles sit on rather than as a bordered box.
 *
 * Positions are grid coordinates, not a layout: the tiles are meant to look
 * placed, so they are offset from one another instead of aligned. Mobile gets
 * its own pair of coordinates because four tiles will not spread across 320px.
 */
function IntegrationsCanvas() {
  return (
    // `flex-1` only from `md`. Below that `StackRow` is a column, so `flex-1`
    // resolves against the vertical axis: `flex-basis: 0%` beat `h-60`, the box
    // collapsed to 0, and the tiles — being absolute — spilled out of the section
    // and ended up underneath the next one, unclickable.
    //
    // `-mr-30` lets the plane run past the right rail, which is the gesture this
    // section had before the merge and the one thing on the page that breaks the
    // frame. The section clips horizontally so the bleed can never open a scroll
    // bar at widths where the container is narrower than its max.
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
      {/* Sits on the rail, half outside it. */}
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
    // No type override on the content: the popup is `px-2 py-1 text-sm`, and
    // forcing `text-xs` inside it left the padding sized for a larger line than
    // the text it wrapped, which is what made it look loose.
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
