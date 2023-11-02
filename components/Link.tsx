import NextLink from "next/link";
import { ComponentProps } from "react";

export const Link = ({
  children,
  href,
  ...props
}: ComponentProps<typeof NextLink>) => (
  <NextLink
    href={href}
    className="text-white no-underline transition hover:text-low"
    {...props}
  >
    {children}
  </NextLink>
);
