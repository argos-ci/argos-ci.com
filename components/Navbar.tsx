"use client";

import { Dialog } from "@base-ui/react/dialog";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import * as React from "react";

import { useIsScrolled } from "./useIsScrolled";
import { useLiveRef } from "./useLiveRef";

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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Viewport>
            <MobileNavbarPopup
              actions={actions}
              secondary={secondary}
              onClose={() => setOpen(false)}
            />
          </Dialog.Viewport>
        </Dialog.Portal>
        <div className="max-w-max-content container mx-auto flex items-center justify-between gap-14 px-3 md:justify-start md:px-7">
          <div className="flex-1">{primary}</div>
          <div className="hidden md:flex md:items-center">{secondary}</div>
          <div className="hidden md:flex md:items-center md:gap-2">
            {actions}
          </div>
          <Dialog.Trigger
            className="burger-menu md:hidden"
            aria-label="Show navigation"
          >
            <span />
            <span />
            <span />
          </Dialog.Trigger>
        </div>
      </Dialog.Root>
    </nav>
  );
}

function MobileNavbarPopup(props: {
  secondary: React.ReactNode;
  actions: React.ReactNode;
  onClose: () => void;
}) {
  const { onClose, secondary, actions } = props;
  const pathname = usePathname();
  const [initialPathname] = React.useState(pathname);
  const onCloseRef = useLiveRef(onClose);
  React.useEffect(() => {
    if (pathname !== initialPathname) {
      onCloseRef.current();
    }
  }, [pathname, initialPathname, onCloseRef]);
  return (
    <Dialog.Popup
      onClick={(event) => {
        if ((event.target as HTMLElement).tagName === "A") {
          onClose();
        }
      }}
      className={clsx(
        "bg-app fixed inset-0 top-14.75 flex flex-col items-start gap-3 overflow-auto p-6 md:hidden",
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 duration-200",
      )}
    >
      <div className="sr-only">
        <Dialog.Title>Menu</Dialog.Title>
        <Dialog.Description>Navigation of Argos</Dialog.Description>
      </div>
      {secondary}
      <hr className="my-8 w-full border-0 border-t" />
      <div className="flex items-center gap-4">{actions}</div>
    </Dialog.Popup>
  );
}
