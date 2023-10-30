"use client";
import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Burger } from "./Burger";
import { Container } from "./Container";

import clsx from "clsx";
import { useScrollListener } from "./useScrollListener";

export const NavbarLink = (props: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    className="block text transition no-underline hover:text-hover font-medium"
    {...props}
  />
);

type NavbarProps = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  actions: React.ReactNode;
};

export const Navbar = ({ primary, secondary, actions }: NavbarProps) => {
  const [scrolled, setScrolled] = React.useState(false);
  useScrollListener(() => {
    setScrolled(window.scrollY > 0);
  });
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      className={clsx(
        "sticky z-20 top-0 left-0 backdrop-blur-lg backdrop-saturate-100 py-3 text-sm border-b transition bg-app md:bg-transparent",
        scrolled ? "border-b-base" : "border-b-transparent",
      )}
    >
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Content
            onClick={(event) => {
              if ((event.target as HTMLElement).tagName === "A") {
                setOpen(false);
              }
            }}
            aria-label="Menu"
            className={clsx(
              "fixed bg-app inset-0 top-[calc(3.75rem-1px)] z-10 overflow-auto p-6 flex flex-col gap-3 md:hidden items-start",
              "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            )}
          >
            {secondary}
            <hr className="border-0 border-t w-full my-8" />
            <div className="flex items-center gap-4">{actions}</div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
        <Container className="flex items-center gap-6 justify-between md:justify-start">
          {primary}
          <div className="hidden md:flex flex-1 items-center gap-4">
            {secondary}
          </div>
          <div className="hidden md:flex items-center gap-4">{actions}</div>
          <DialogPrimitive.Trigger asChild>
            <Burger />
          </DialogPrimitive.Trigger>
        </Container>
      </DialogPrimitive.Root>
    </nav>
  );
};
