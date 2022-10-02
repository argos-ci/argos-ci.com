import { x } from "@xstyled/styled-components";
import { Container } from "@/components/Container";
import { ArgosLogo } from "@/components/ArgosLogo";
import {
  FooterSections,
  FooterSection,
  FooterSectionTitle,
  FooterLink,
} from "@/components/Footer";

export const AppFooter = (props) => (
  <x.footer
    borderTop={1}
    borderTopColor="footer-border"
    backgroundColor="alternate-bg"
    my={10}
    pt={{ _: 10, sm: 20 }}
    pb={16}
    lineHeight="24px"
    fontSize="14px"
    {...props}
  >
    <Container>
      <FooterSections>
        <FooterSection>
          <FooterSectionTitle>Getting Started</FooterSectionTitle>
          <FooterLink href="https://docs.argos-ci.com/getting-started">
            Installation
          </FooterLink>
          <FooterLink href="https://docs.argos-ci.com/usage">Usage</FooterLink>
          <FooterLink href="https://github.com/marketplace/argos-ci">
            View on GitHub Marketplace
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Community</FooterSectionTitle>
          <FooterLink href="https://github.com/argos-ci/argos">
            GitHub
          </FooterLink>
          <FooterLink href="https://discord.gg/pK79sv85Vg">Discord</FooterLink>
          <FooterLink href="https://twitter.com/argos_ci?s=20&t=lOyYmPfhjDeHIKiGdNMTMw">
            Twitter
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/security">Security</FooterLink>
        </FooterSection>
      </FooterSections>

      <x.hr mt={16} mb={10} borderBottom={1} borderColor="footer-border" />
      <ArgosLogo w="160px" />
    </Container>
  </x.footer>
);
