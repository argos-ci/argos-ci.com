import React from "react";
import styled, { css, up, x } from "@xstyled/styled-components";
import { Dialog, useDialogState } from "ariakit/dialog";
import { Burger } from "./Burger";
import { Container } from "./Container";
import { Link } from "./Link";

export const Nav = styled.nav`
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2000;
  backdrop-filter: saturate(180%) blur(5px);
  padding: 12px 0;
  font-size: sm;

  ${up(
    "md",
    css`
      background-color: transparent;
    `
  )};
`;

export const NavbarSecondary = (props) => (
  <x.div
    display={{ _: "none", md: "flex" }}
    flex={1}
    alignItems="center"
    justifyContent="flex-end"
    gap={8}
    {...props}
  />
);

export const NavbarLink = (props) => (
  <Link
    passHref
    display="block"
    color={{ _: "darker", hover: "accent", focus: "accent" }}
    outline="none"
    py={3}
    {...props}
  />
);

const MobileMenuContainer = styled.div`
  position: fixed;
  background-color: lighter;
  top: 60;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  overflow: auto;

  display: flex;
  flex-direction: column;
  padding: 50px 60px 0 73px;

  &:focus {
    outline: none;
  }

  &[data-animated] {
    transition: 300ms ease-out;
    transition-property: opacity, transform;

    &[data-animating="true"] {
      opacity: 1;
      transform: translateY(0);

      &.hidden {
        opacity: 0;
        transform: translateX(-30vw);
      }
    }
  }

  ${up(
    "md",
    css`
      display: none;
    `
  )}
`;

function MobileMenu({ children, state, ...props }) {
  const handleClick = (event) => {
    if (event.target.tagName === "A") {
      state.hide();
    }
  };

  return (
    <Dialog
      onClick={handleClick}
      aria-label="Menu"
      data-animated={state.unstable_animated}
      data-animating={state.unstable_animating}
      state={state}
      {...props}
    >
      <MobileMenuContainer>{children}</MobileMenuContainer>
    </Dialog>
  );
}

export function Navbar({ children }) {
  const dialog = useDialogState({ unstable_animated: true, visible: false });
  const childrenArray = React.Children.toArray(children);
  const secondary = childrenArray.find(
    (child) => child.type === NavbarSecondary
  );

  return (
    <Nav>
      <MobileMenu state={dialog}>{secondary.props.children}</MobileMenu>

      <Container
        display="flex"
        alignItems="center"
        justifyContent={{ _: "space-between", md: "flex-start" }}
      >
        {children}
        <Burger
          aria-label="Toggle menu"
          onClick={dialog.toggle}
          open={dialog.open}
        />
      </Container>
    </Nav>
  );
}
