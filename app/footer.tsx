import NextLink from "next/link";
import { Suspense } from "react";
import { twc } from "react-twc";

import { ArgosLogo } from "@/components/ArgosLogo";
import { ColorModeSelector } from "@/components/ColorModeSelector";
import { Container } from "@/components/Container";
import { StatusWidget } from "@/components/StatusWidget";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { GdprLogo } from "@/components/icons/GdprLogo";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Soc2Logo } from "@/components/icons/Soc2Logo";
import { XIcon } from "@/components/icons/XIcon";

const FooterSection = twc.div`my-2 flex flex-1 grow basis-36 flex-col gap-2 whitespace-nowrap`;
const FooterSectionTitle = twc.div`mb-1 font-medium`;
const FooterIconLink = twc.a`text-(--neutral-10) transition hover:text-default`;
const FooterIconNextLink = twc(
  NextLink,
)`text-(--neutral-10) transition hover:text-default`;

function FooterLink(props: { children: React.ReactNode; href: string }) {
  return (
    <div>
      <NextLink
        className="text-low hover:text-default no-underline transition"
        href={props.href}
      >
        {props.children}
      </NextLink>
    </div>
  );
}

export const AppFooter: React.FC = () => (
  <footer className="border-t pt-10 pb-10 text-sm leading-6">
    <Container className="flex flex-col gap-8">
      <div className="flex gap-8 max-sm:flex-col">
        <FooterSection className="flex-1 justify-between">
          <div className="flex flex-col gap-4">
            <ArgosLogo width="128" />
            <div className="text-low flex items-center gap-3">
              <FooterIconNextLink href="/security/soc-2">
                <Soc2Logo className="h-7 w-auto" />
              </FooterIconNextLink>
              <FooterIconNextLink href="/security/gdpr">
                <GdprLogo className="h-8 w-auto" />
              </FooterIconNextLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FooterIconLink href="https://github.com/argos-ci/argos">
              <GitHubIcon className="size-5" />
            </FooterIconLink>
            <FooterIconLink
              href="https://twitter.com/argos_ci"
              className="text-low hover:text-default transition"
            >
              <XIcon className="size-5" />
            </FooterIconLink>
            <FooterIconLink href="https://argos-ci.com/discord">
              <DiscordIcon className="size-5" />
            </FooterIconLink>
          </div>
        </FooterSection>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-4">
          <FooterSection>
            <FooterSectionTitle>Product</FooterSectionTitle>
            <FooterLink href="/visual-testing">Visual Testing</FooterLink>
            <FooterLink href="/flaky-management">Flaky Management</FooterLink>
            <FooterLink href="/test-debugging">Test Debugging</FooterLink>
            <FooterLink href="https://github.com/orgs/argos-ci/projects/1">
              Roadmap
            </FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Resources</FooterSectionTitle>
            <FooterLink href="/docs">Docs</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/oss-friends">OSS Friends</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Company</FooterSectionTitle>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterSectionTitle>Compare</FooterSectionTitle>
            <FooterLink href="/compare/percy">Percy</FooterLink>
            <FooterLink href="/compare/applitools">Applitools</FooterLink>
            <FooterLink href="/compare/chromatic">Chromatic</FooterLink>
          </FooterSection>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Suspense
          fallback={
            <div aria-busy className="text-low text-sm">
              Loading...
            </div>
          }
        >
          <StatusWidget className="text-sm" />
        </Suspense>
        <ColorModeSelector />
      </div>
    </Container>
  </footer>
);
