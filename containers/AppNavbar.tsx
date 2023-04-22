import { ArgosLogo } from "@/components/ArgosLogo";
import { Button } from "@/components/Button";
import React from "react";
import { Navbar, NavbarLink } from "@/components/Navbar";
import NextLink from "next/link";
import { Link } from "@/components/Link";

export const AppNavbar: React.FC = () => {
  return (
    <Navbar
      primary={
        <NextLink href="/">
          <ArgosLogo className="h-10 mt-1" />
        </NextLink>
      }
      secondary={
        <>
          <NavbarLink href="https://argos-ci.com/docs/">Docs</NavbarLink>
          <NavbarLink href="https://github.com/marketplace/argos-ci#pricing-and-setup">
            Pricing
          </NavbarLink>
          <NavbarLink href="/blog">Blog</NavbarLink>
          <NavbarLink href="/login">Login</NavbarLink>
          <Button className="mt-3 md:mt-0 -order-1 md:order-[0] mb-4 md:mb-0">
            {(buttonProps) => (
              <Link {...buttonProps} href="/signup">
                Sign Up
              </Link>
            )}
          </Button>
        </>
      }
    />
  );
};
