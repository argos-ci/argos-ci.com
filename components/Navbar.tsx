"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

import { Burger } from "./Burger";
import { useIsScrolled } from "./useIsScrolled";

export function NavbarLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="hover:bg-ui block rounded-md px-4 py-1.5 font-medium no-underline transition"
      {...props}
    />
  );
}

type NavbarProps = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  actions: React.ReactNode;
};

export function Navbar(props: NavbarProps) {
  const { primary, secondary, actions } = props;
  const scrolled = useIsScrolled();
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      className={clsx(
        "sticky top-0 left-0 z-20 border-b py-3 text-sm transition",
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
            className={clsx(
              "bg-app fixed inset-0 top-[calc(3.75rem-1px)] z-10 flex flex-col items-start gap-3 overflow-auto p-6 md:hidden",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
            )}
          >
            <VisuallyHidden>
              <DialogPrimitive.Title>Menu</DialogPrimitive.Title>
              <DialogPrimitive.Description>
                Navigation of Argos
              </DialogPrimitive.Description>
            </VisuallyHidden>
            {secondary}
            <hr className="my-8 w-full border-0 border-t" />
            <div className="flex items-center gap-4">{actions}</div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
        <div className="max-w-max-content container mx-auto flex items-center justify-between gap-14 px-3 md:justify-start md:px-7">
          <div className="flex-1">{primary}</div>
          <div className="hidden md:flex md:items-center">{secondary}</div>
          <div className="hidden md:flex md:items-center md:gap-2">
            {actions}
          </div>
          <DialogPrimitive.Trigger asChild>
            <Burger />
          </DialogPrimitive.Trigger>
        </div>
      </DialogPrimitive.Root>
    </nav>
  );
}
