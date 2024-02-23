import { StatusWidget } from "@openstatus/react";
import NextLink from "next/link";
import { twc } from "react-twc";

import { ArgosLogo } from "@/components/ArgosLogo";
import { ColorModeSelector } from "@/components/ColorModeSelector";
import { Container } from "@/components/Container";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { XIcon } from "@/components/icons/XIcon";

const FooterSection = twc.div`my-2 flex flex-1 flex-grow basis-36 flex-col gap-2 whitespace-nowrap`;
const FooterSectionTitle = twc.div`mb-1 font-medium`;
const FooterIconLink = twc.a`text-low transition hover:text`;

function FooterLink(props: { children: React.ReactNode; href: string }) {
  return (
    <div>
      <NextLink
        className="text-low no-underline transition hover:text"
        href={props.href}
      >
        {props.children}
      </NextLink>
    </div>
  );
}

export const AppFooter: React.FC = () => (
  <footer className="mb-10 mt-32 border-t pb-10 pt-10 text-sm leading-6">
    <Container>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4 md:grid-cols-6">
        <FooterSection className="justify-between">
          <div className="flex flex-col gap-3">
            <ArgosLogo width="128" />
            <div className="whitespace-normal text-xs text-low">
              The Open Source visual testing alternative.
            </div>
            <StatusWidget slug="argos" />
          </div>
          <div className="flex items-center gap-3">
            <FooterIconLink href="https://github.com/argos-ci/argos">
              <GitHubIcon className="size-5" />
            </FooterIconLink>
            <FooterIconLink
              href="https://twitter.com/argos_ci"
              className="text-low transition hover:text"
            >
              <XIcon className="size-5" />
            </FooterIconLink>
            <FooterIconLink href="https://argos-ci.com/discord">
              <DiscordIcon className="size-5" />
            </FooterIconLink>
          </div>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Product</FooterSectionTitle>
          <FooterLink href="/docs/getting-started">Getting started</FooterLink>
          <FooterLink href="/docs/why-argos">Why Argos?</FooterLink>
          <FooterLink href="/playwright">Playright + Argos</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="https://github.com/orgs/argos-ci/projects/1">
            Roadmap
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Quickstart</FooterSectionTitle>
          <FooterLink href="/docs/quickstart/playwright">Playwright</FooterLink>
          <FooterLink href="/docs/quickstart/cypress">Cypress</FooterLink>
          <FooterLink href="/docs/quickstart/storybook">Storybook</FooterLink>
          <FooterLink href="/docs/quickstart/next-js">Next.js</FooterLink>
          <FooterLink href="/docs/quickstart/remix">Remix</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Company</FooterSectionTitle>
          <FooterLink href="/docs/about-us">About us</FooterLink>
          <FooterLink href="/security">Security</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Community</FooterSectionTitle>
          <FooterLink href="/oss-friends">OSS Friends</FooterLink>
          <FooterLink href="https://github.com/argos-ci/argos">
            GitHub
          </FooterLink>
          <FooterLink href="https://twitter.com/argos_ci">X.com</FooterLink>
          <FooterLink href="https://argos-ci.com/discord">Discord</FooterLink>
          <FooterLink href="mailto:contact@argos-ci.com">Contact us</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle>Preferences</FooterSectionTitle>
          <ColorModeSelector />
        </FooterSection>
      </div>
    </Container>
  </footer>
);
