import clsx from "clsx";
import Link from "next/link";

import { cypress, playwright } from "@/app/assets/brands/library";
import { Chip } from "@/components/Chip";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

export function SdkFloatingLogosIllustration() {
  return (
    <div className="relative mx-auto flex h-64 w-full max-w-md cursor-default items-center justify-center">
      <LogoBubble
        label="Playwright"
        src={playwright.logo}
        href="/docs/quickstart/playwright-quickstart"
        className="animate-float motion-reduce:animate-none"
      />
      <LogoBubble
        label="Cypress"
        src={cypress.logo}
        href="/docs/quickstart/cypress-quickstart"
        className="animate-float motion-reduce:animate-none"
        style={{ animationDelay: "1000ms" }}
      />
    </div>
  );
}

function LogoBubble(props: {
  label: string;
  src: ThemeImageProps["src"];
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { label, src, href, className, style } = props;
  return (
    <div className={clsx("relative z-10 mx-3", className)} style={style}>
      <Link
        href={href}
        className="group flex cursor-pointer flex-col items-center gap-3"
        aria-label={`${label} quickstart`}
      >
        <div className="bg-app flex size-28 items-center justify-center rounded-full border border-(--neutral-5) shadow-lg backdrop-blur transition duration-200 group-hover:-translate-y-1 group-hover:border-(--neutral-7) group-hover:shadow-xl">
          <ThemeImage src={src} alt={label} className="size-14" />
        </div>
        <Chip className="text-xs font-semibold select-none group-hover:text-default">
          {label}
        </Chip>
      </Link>
    </div>
  );
}
