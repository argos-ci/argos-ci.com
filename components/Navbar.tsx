"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

import { Burger } from "./Burger";
import { Container } from "./Container";
import { useScrollListener } from "./useScrollListener";

export const NavbarLink = (props: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    className="block font-medium text no-underline transition hover:text-hover"
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
        "sticky left-0 top-0 z-20 border-b py-3 text-sm transition",
        scrolled
          ? "border-b-base bg-app"
          : "border-b-transparent bg-transparent",
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
              "fixed inset-0 top-[calc(3.75rem-1px)] z-10 flex flex-col items-start gap-3 overflow-auto bg-app p-6 md:hidden",
              "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            )}
          >
            {secondary}
            <hr className="my-8 w-full border-0 border-t" />
            <div className="flex items-center gap-4">{actions}</div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
        <Container className="flex items-center justify-between gap-6 md:justify-start">
          {primary}
          <div className="hidden flex-1 items-center gap-6 md:flex">
            {secondary}
          </div>
          <div className="hidden items-center gap-4 md:flex">{actions}</div>
          <DialogPrimitive.Trigger asChild>
            <Burger />
          </DialogPrimitive.Trigger>
        </Container>
      </DialogPrimitive.Root>
    </nav>
  );
};
