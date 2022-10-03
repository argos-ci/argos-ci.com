import styled, { css, up, x } from "@xstyled/styled-components";
import { Dialog, useDialogState } from "ariakit/dialog";
import { Burger } from "./Burger";
import { Container } from "./Container";
import { Link } from "./Link";

import type { DialogState } from "ariakit/dialog";

export const Nav = styled.nav`
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2000;
  backdrop-filter: saturate(180%) blur(5px);
  padding: 3 0;
  font-size: sm;

  ${up(
    "md",
    css`
      background-color: transparent;
    `
  )};
`;

export const NavbarSecondary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <x.div
    display={{ _: "none", md: "flex" }}
    flex={1}
    alignItems="center"
    justifyContent="flex-end"
    gap={8}
  >
    {children}
  </x.div>
);

export const NavbarLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = (props) => (
  <Link
    display="block"
    color={{ _: "darker", hover: "on-light", focus: "on-light" }}
    outline="none"
    py={3}
    {...props}
  />
);

const MobileMenuContainer = styled(Container)`
  position: fixed;
  background-color: lighter;
  top: 92px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  overflow: auto;

  display: flex;
  flex-direction: column;

  &:focus {
    outline: none;
  }

  ${up(
    "md",
    css`
      display: none;
    `
  )}
`;

interface MobileMenuProps {
  children: React.ReactNode;
  dialog: DialogState;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ children, dialog }) => {
  return (
    <Dialog
      onClick={(event) => {
        if ((event.target as HTMLElement).tagName === "A") {
          dialog.hide();
        }
      }}
      aria-label="Menu"
      state={dialog}
    >
      <MobileMenuContainer>{children}</MobileMenuContainer>
    </Dialog>
  );
};

interface NavbarProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ primary, secondary }) => {
  const dialog = useDialogState();

  return (
    <Nav>
      <MobileMenu dialog={dialog}>{secondary}</MobileMenu>

      <Container
        display="flex"
        alignItems="center"
        justifyContent={{ _: "space-between", md: "flex-start" }}
      >
        {primary}
        <NavbarSecondary>{secondary}</NavbarSecondary>
        <Burger
          aria-label="Toggle menu"
          onClick={() => {
            dialog.toggle();
          }}
          aria-expanded={dialog.open}
        />
      </Container>
    </Nav>
  );
};
