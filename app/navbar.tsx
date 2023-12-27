import NextLink from "next/link";
import * as React from "react";

import { ArgosLogo } from "@/components/ArgosLogo";
import { Button } from "@/components/Button";
import { Navbar, NavbarLink } from "@/components/Navbar";

export const AppNavbar: React.FC = () => {
  return (
    <Navbar
      primary={
        <NextLink href="/">
          <ArgosLogo className="h-6" />
        </NextLink>
      }
      secondary={
        <>
          <NavbarLink href="/playwright">Playwright + Argos</NavbarLink>
          <NavbarLink href="https://argos-ci.com/docs/getting-started">
            Docs
          </NavbarLink>
          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="/blog">Blog</NavbarLink>
        </>
      }
      actions={
        <>
          <Button variant="outline" asChild>
            <a href="https://app.argos-ci.com/login">Login</a>
          </Button>
          <Button>
            <a href="https://app.argos-ci.com/signup">Sign up</a>
          </Button>
        </>
      }
    />
  );
};
