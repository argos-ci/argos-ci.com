import { x } from "@xstyled/styled-components";
import { PageContainer } from "./PageContainer";
import { ArgosLogo } from "./ArgosLogo";
import { Link } from "./Link";

const FooterSections = (props) => (
  <x.div
    display="flex"
    justifyContent="space-between"
    flexWrap="wrap"
    rowGap={10}
    columnGap={2}
    {...props}
  />
);

const FooterSection = ({ children, ...props }) => (
  <x.div
    display="flex"
    flexDirection="column"
    gap={2}
    flexGrow={1}
    flexBasis="140px"
    {...props}
  >
    {children}
  </x.div>
);

const FooterSectionTitle = ({ children, ...props }) => (
  <x.div mb={1} fontWeight="semibold" color="text-title" {...props}>
    {children}
  </x.div>
);

const FooterLink = ({ children, ...props }) => (
  <div>
    <Link color={{ _: "text-emphasis", hover: "text-primary" }} {...props}>
      {children}
    </Link>
  </div>
);

export const AppFooter = (props) => (
  <x.footer
    borderTop={1}
    borderTopColor="border"
    backgroundColor="alternate-bg"
    my={10}
    pt={{ _: 10, sm: 20 }}
    pb={16}
    lineHeight="24px"
    fontSize="14px"
    {...props}
  >
    <PageContainer>
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
    </PageContainer>
  </x.footer>
);
