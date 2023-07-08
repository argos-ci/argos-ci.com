import { ArgosLogo } from "@/components/ArgosLogo";
import { Button } from "@/components/Button";
import React from "react";
import { Navbar, NavbarLink } from "@/components/Navbar";
import NextLink from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { GithubLogo } from "@/components/GithubLogo";

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
          <NavbarLink href="/blog">Blog</NavbarLink>
          <NavbarLink href="https://argos-ci.com/docs/">Docs</NavbarLink>
          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="https://github.com/argos-ci">
            <div className="flex gap-1 items-center">
              <GithubLogo className="w-4 h-4 shrink-0" />
              GitHub
            </div>
          </NavbarLink>
          <Button
            className="mt-3 md:mt-0 md:order-[0] mb-4 md:mb-0 self-start md:self-auto group/button flex items-center gap-1"
            asChild
          >
            <a href="https://app.argos-ci.com/login">
              Go to app
              <ArrowRightIcon className="h-3 w-3 shrink-0 transition-transform duration-150 ease-in-out group-hover/button:translate-x-0.5" />
            </a>
          </Button>
        </>
      }
    />
  );
};
