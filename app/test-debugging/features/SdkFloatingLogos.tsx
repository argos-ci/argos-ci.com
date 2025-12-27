import clsx from "clsx";
import type { HTMLAttributes } from "react";

import { cypress, playwright } from "@/app/assets/brands/library";
import { Chip } from "@/components/Chip";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

export function SdkFloatingLogosIllustration() {
  return (
    <div className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center">
      <LogoBubble
        label="Playwright"
        src={playwright.logo}
        className="animate-float motion-reduce:animate-none"
      />
      <LogoBubble
        label="Cypress"
        src={cypress.logo}
        className="animate-float motion-reduce:animate-none"
        style={{ animationDelay: "1000ms" }}
      />
    </div>
  );
}

function LogoBubble(
  props: {
    label: string;
    src: ThemeImageProps["src"];
  } & HTMLAttributes<HTMLDivElement>,
) {
  const { label, src, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "relative z-10 mx-3 flex flex-col items-center gap-3",
        className,
      )}
    >
      <div className="bg-app flex size-28 items-center justify-center rounded-full border border-(--neutral-5) shadow-lg backdrop-blur">
        <ThemeImage src={src} alt={label} className="size-14" />
      </div>
      <Chip className="pointer-events-none text-xs font-semibold select-none">
        {label}
      </Chip>
    </div>
  );
}
