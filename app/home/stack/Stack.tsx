import Link from "next/link";

import {
  cypress,
  playwright,
  storybook,
  wdio,
} from "@/app/assets/brands/library";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";

import githubDark from "../integrations/assets/github-dark.svg";
import githubLight from "../integrations/assets/github-light.svg";
import gitlab from "../integrations/assets/gitlab.svg";
import msteams from "../integrations/assets/msteams.svg";
import slack from "../integrations/assets/slack.svg";

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

const INTEGRATIONS = [
  {
    name: "GitHub",
    logo: { light: githubLight, dark: githubDark },
    href: "/docs/learn/integrations/github-integration",
  },
  {
    name: "GitLab",
    logo: gitlab,
    href: "/docs/learn/integrations/gitlab-integration",
  },
  {
    name: "Slack",
    logo: slack,
    href: "/docs/learn/integrations/slack-integration",
  },
  {
    name: "Microsoft Teams",
    logo: msteams,
    href: "/docs/learn/integrations/microsoft-teams-integration",
  },
];

/**
 * Both halves answer the same objection — "how much work is this to adopt?" —
 * so the SDKs and the integrations share one compact section.
 */
export function Stack() {
  return (
    <section className="separator-b bg-ui relative px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color="teal">Stack</FeatureIndicator>
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
        <div className="grid border-t max-md:divide-y md:grid-cols-2 md:divide-x">
          <StackGroup title="Run your tests with" items={SDKS} />
          <StackGroup title="Get results in" items={INTEGRATIONS} />
        </div>
      </Container>
    </section>
  );
}

function StackGroup(props: {
  title: string;
  items: { name: string; logo: ThemeImageProps["src"]; href: string }[];
}) {
  const { title, items } = props;
  return (
    <div className="flex flex-col gap-4 p-6 md:p-8">
      <div className="text-low text-xs font-medium">{title}</div>
      <ul className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <li key={item.name} className="contents">
            <Link
              href={item.href}
              className="bg-app flex items-center gap-3 rounded-lg border-[0.5px] px-3 py-2.5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow"
            >
              <ThemeImage src={item.logo} alt="" className="size-6 shrink-0" />
              <span className="font-accent truncate text-sm font-medium">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
