import { ArgosLogo } from "@/components/ArgosLogo";

import { Button } from "@/components/Button";
import * as React from "react";
import { Navbar, NavbarLink } from "@/components/Navbar";
import NextLink from "next/link";

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
          <NavbarLink href="https://argos-ci.com/docs/">Docs</NavbarLink>
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
