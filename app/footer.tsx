import { ArgosLogo } from "@/components/ArgosLogo";
import { ColorModeSelector } from "@/components/ColorModeSelector";
import { Container } from "@/components/Container";
import {
  FooterLink,
  FooterSection,
  FooterSectionTitle,
  FooterSections,
} from "@/components/Footer";

export const AppFooter: React.FC = () => (
  <footer className="mb-10 mt-32 border-t pb-16 pt-10 text-sm leading-6 sm:pt-20">
    <Container>
      <FooterSections>
        <FooterSection>
          <FooterSectionTitle>Product</FooterSectionTitle>
          <FooterLink href="/docs/introduction">What is Argos?</FooterLink>
          <FooterLink href="/docs/review-changes">Review changes</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="https://github.com/orgs/argos-ci/projects/1">
            Roadmap
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Developers</FooterSectionTitle>
          <FooterLink href="/docs/installation">Installation</FooterLink>
          <FooterLink href="/docs/introduction">Documentation</FooterLink>
          <FooterLink href="/docs/upload-screenshots">Configure CI</FooterLink>
          <FooterLink href="https://github.com/argos-ci/argos/tree/main/examples">
            Examples
          </FooterLink>
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
          <FooterLink href="https://github.com/argos-ci/argos">
            GitHub
          </FooterLink>
          <FooterLink href="https://argos-ci.com/discord">Discord</FooterLink>
          <FooterLink href="https://twitter.com/argos_ci">Twitter</FooterLink>
          <FooterLink href="mailto:contact@argos-ci.com">Contact us</FooterLink>
        </FooterSection>
      </FooterSections>

      <hr className="mb-10 mt-16 border-0 border-b" />
      <div className="flex justify-between">
        <ArgosLogo width="160" />
        <ColorModeSelector />
      </div>
    </Container>
  </footer>
);
