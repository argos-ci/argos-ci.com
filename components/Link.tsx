import NextLink from "next/link";
import { ComponentProps, forwardRef } from "react";

export const Link = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NextLink>
>(({ children, href, ...props }, ref) => (
  <NextLink
    href={href}
    className="transition no-underline text-white hover:text-on-light"
    ref={ref}
    passHref
    {...props}
  >
    {children}
  </NextLink>
));

export const TextLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NextLink>
>(({ children, href, ...props }, ref) => (
  <NextLink
    href={href}
    className="transition no-underline text-link hover:underline"
    ref={ref}
    passHref
    {...props}
  >
    {children}
  </NextLink>
));
