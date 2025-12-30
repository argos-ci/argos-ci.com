import clsx from "clsx";
import { ArrowUpRightIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twc } from "react-twc";

import { ArgosLogo } from "./ArgosLogo";

export const Table = twc.table`w-full min-w-[50em]`;
export const Tr = twc.tr`border-b border-dashed border-(--violet-6) align-baseline md:[&>th]:whitespace-nowrap`;
export const Td = twc.td`p-4 text-center align-middle`;
export const Th = twc.th`p-3 md:p-6 text-left font-normal`;
export const ThMain = twc.div`font-semibold`;

export function ThSubLink(
  props: { children: React.ReactNode } & { href: string; target?: "_blank" },
) {
  const { children, ...linkProps } = props;
  const Component = props.target === "_blank" ? "a" : Link;
  return (
    <Component
      {...linkProps}
      className="group text-low text-sm transition hover:text-(--violet-10)"
    >
      {props.children}
      <ArrowUpRightIcon className="ml-1 inline size-[1em] align-[-10%] opacity-0 transition group-hover:opacity-100" />
    </Component>
  );
}

export const ThSub = twc.div`text-sm text-low`;

export const Check = twc(CircleCheckIcon)`inline-block text-(--violet-10)`;
export const X = twc(CircleXIcon)`inline-block text-low`;

export function THead(props: {
  title: string;
  logoSrc: string;
  logoSrcDark?: string;
}) {
  return (
    <thead>
      <Tr>
        <Th />
        <Th className="w-[40%] pb-6">
          <ArgosLogo className="mx-auto h-6 md:h-8" />
        </Th>
        <Th className="w-[40%] pb-6">
          <Image
            src={props.logoSrc}
            alt={props.title}
            className={clsx("h-6 md:h-8", props.logoSrcDark && "dark:hidden")}
          />
          {props.logoSrcDark && (
            <Image
              src={props.logoSrcDark}
              alt={props.title}
              className="hidden h-6 md:h-8 dark:block"
            />
          )}
        </Th>
      </Tr>
    </thead>
  );
}
