import { ReactNode } from "react";
import { Container } from "./Container";
import clsx from "clsx";

export const PageCardContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Container
    className={clsx(
      className,
      "flex flex-col gap-4 items-center text-center antialiased pt-0 sm:pt-10 pb-20 min-h-[500px]"
    )}
  >
    {children}
  </Container>
);

export const PageCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      className,
      "rounded border border-slate-900 bg-gradient-to-br from-primary-950/30 via-slate-900/80 to-slate-900/40 max-w-[420px] flex flex-col gap-10"
    )}
  >
    {children}
  </div>
);

export const PageCardBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      className,
      "flex flex-col gap-10 antialiased px-4 sm:px-10"
    )}
  >
    {children}
  </div>
);

export const PageCardHeader = ({ children }: { children: ReactNode }) => (
  <div className="mt-10 px-4">{children}</div>
);

export const PageCardTitle = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl whitespace-nowrap">{children}</h1>
);

export const PageCardFooter = ({ children }: { children: ReactNode }) => (
  <div className="text-sm px-4 mt-10">
    <hr className="h-px bg-border border-0" />
    <div className="my-8">{children}</div>
  </div>
);
