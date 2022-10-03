import NextLink from "next/link";
import { ArgosLogo } from "@/components/ArgosLogo";
import { x } from "@xstyled/styled-components";
import { Button } from "@/components/Button";
import React from "react";
import { Navbar, NavbarSecondary, NavbarLink } from "../components/Navbar";
import { Link } from "@/components/Link";

export function AppNavbar() {
  return (
    <Navbar>
      <Link cursor="pointer" href="/">
        <x.svg as={ArgosLogo} h={10} mt={1} />
      </Link>
      <NavbarSecondary>
        <NavbarLink href="https://github.com/marketplace/argos-ci#pricing-and-setup">
          Pricing
        </NavbarLink>
        <NavbarLink href="https://docs.argos-ci.com/">Docs</NavbarLink>
        <NavbarLink href="https://github.com/login/oauth/authorize?scope=user:email&client_id=Iv1.d1a5403395ac817e">
          Login
        </NavbarLink>

        <NextLink href="https://docs.argos-ci.com/" passHref>
          <Button mt={{ _: 3, md: 0 }} as="a">
            Get Started
          </Button>
        </NextLink>
      </NavbarSecondary>
    </Navbar>
  );
}
