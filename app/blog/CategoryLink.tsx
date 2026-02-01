"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export function CategoryLink(props: {
  href: string;
  children: React.ReactNode;
}) {
  const { href, children } = props;
  const pathname = usePathname();

  return (
    <NextLink
      className="hover:bg-ui inline-flex shrink-0 items-center gap-1 rounded-md px-4 py-1.5 text-sm font-medium no-underline transition aria-[current=page]:bg-(--neutral-12) aria-[current=page]:text-(--neutral-1) md:text-base"
      href={href}
      aria-current={pathname === href ? "page" : undefined}
    >
      {children}
    </NextLink>
  );
}
