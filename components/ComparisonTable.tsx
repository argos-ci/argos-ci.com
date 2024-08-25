import clsx from "clsx";
import { ArrowUpRightIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twc } from "react-twc";

import { ArgosLogo } from "./ArgosLogo";

export const Table = twc.table`w-full min-w-[50em]`;
export const Tr = twc.tr`border-b border-dashed border-violet-6 align-baseline md:[&>th]:whitespace-nowrap`;
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
      className="group text-sm text-low transition hover:text-violet-10"
    >
      {props.children}
      <ArrowUpRightIcon className="ml-1 inline size-[1em] align-[-10%] opacity-0 transition group-hover:opacity-100" />
    </Component>
  );
}

export const ThSub = twc.div`text-sm text-low`;

export const Check = twc(CircleCheckIcon)`inline-block text-violet-10`;
export const X = twc(CircleXIcon)`inline-block text-low`;

export function List(props: {
  list: string[];
  icon?: React.ReactNode;
  columns?: number;
}) {
  const { list, icon, columns = 1 } = props;
  return (
    <>
      <div className="sm:hidden">{list.join(", ")}</div>
      <ul
        className={clsx(
          "hidden sm:grid",
          {
            1: "sm:grid-cols-1",
            2: "sm:grid-cols-2",
          }[columns],
        )}
      >
        {list.map((item) => {
          if (icon) {
            return (
              <li key={item} className="flex items-center gap-1">
                {icon}
                {item}
              </li>
            );
          }
          return (
            <li key={item} className="list-inside list-disc text-sm">
              <span className="relative -left-1 text-base">{item}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

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
              className="hidden h-6 dark:block md:h-8"
            />
          )}
        </Th>
      </Tr>
    </thead>
  );
}
