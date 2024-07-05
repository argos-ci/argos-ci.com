import NextLink from "next/link";
import { ComponentProps } from "react";

export const Link = ({
  children,
  href,
  ...props
}: ComponentProps<typeof NextLink>) => (
  <NextLink href={href} className="text underline" {...props}>
    {children}
  </NextLink>
);

export const BlueLink = ({
  children,
  href,
  ...props
}: ComponentProps<typeof NextLink>) => (
  <NextLink href={href} className="text-blue-10 hover:underline" {...props}>
    {children}
  </NextLink>
);
