"use client";

import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CloudIcon,
  LockIcon,
  ScanIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { playwright } from "@/app/assets/brands/library";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

export function ScreenshotsStayInCI() {
  return (
    <div className="relative isolate flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 px-3 py-5 md:gap-6 md:px-6">
      <PlaywrightNode />
      <SecureArrow />
      <StorageNode />
    </div>
  );
}

function PlaywrightNode() {
  return (
    <Card className="animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both relative flex min-w-56 flex-col gap-3 overflow-hidden p-4 max-sm:hidden">
      <div
        className="absolute top-6 -left-10 h-16 w-16 rounded-full bg-(--primary-3)/35 blur-3xl"
        aria-hidden
      />
      <div className="flex items-center gap-2">
        <div className="bg-app grid place-items-center rounded-xl border-[0.5px] border-(--neutral-6)/70 p-2 shadow-sm">
          <ThemeImage src={playwright.logo} alt="" className="size-6" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[12px] tracking-wide text-(--neutral-9) uppercase">
            CI job
          </span>
          <span className="text-sm font-semibold text-(--neutral-12)">
            Playwright Tests
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-(--primary-6)/60 bg-(--primary-2)/60 p-2 shadow-inner">
        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-(--neutral-12)">
          <MiniPill label="Test suite" />
          <MiniPill
            label="Screenshots"
            icon={<ScanIcon className="size-3" />}
          />
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-(--primary-6)/70 bg-(--primary-1)/70 px-2 py-1.5 text-[11px] text-(--primary-11)">
          <span
            className="h-1.5 w-1.5 rounded-full bg-(--primary-9)"
            aria-hidden
          />
          <span>Screenshots generated inside your run</span>
        </div>
      </div>
    </Card>
  );
}

function MiniPill(props: { label: string; icon?: ReactNode }) {
  const { label, icon } = props;
  return (
    <div className="bg-app flex items-center justify-between gap-2 rounded-lg border border-(--neutral-6)/70 px-2 py-1 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.5)]">
      <span className="text-(--neutral-11)">{label}</span>
      {icon}
    </div>
  );
}

function SecureArrow() {
  return (
    <div className="animate-fade-in animate-delay-500 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both relative flex items-center justify-center px-1 max-sm:hidden">
      <div className="relative h-px w-24 bg-linear-to-r from-(--primary-6)/30 via-(--primary-8) to-(--primary-6)/30">
        <div className="bg-app absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-(--primary-7) px-2 py-1 text-[10px] font-semibold tracking-wide text-(--primary-11) uppercase shadow-sm">
          <LockIcon className="size-3" aria-hidden />
          <span>TLS</span>
        </div>
      </div>
      <ArrowRightIcon className="ml-2 size-4 text-(--primary-10)" aria-hidden />
    </div>
  );
}

function StorageNode() {
  return (
    <Card className="animate-slide-up-fade animate-delay-250 motion-reduce:animate-fade-in animate-duration-500 fill-mode-both relative flex min-w-64 flex-col gap-3 overflow-hidden p-4">
      <div
        className="absolute -top-8 left-8 h-16 w-16 rounded-full bg-(--primary-3)/40 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 h-14 w-14 rounded-full bg-(--primary-4)/25 blur-2xl"
        aria-hidden
      />
      <div className="flex items-center justify-between">
        <Badge>
          <CloudIcon className="size-3" aria-hidden />
          Argos storage
        </Badge>
        <Chip variant="success" className="text-[11px]">
          <CheckCircle2Icon className="size-3" aria-hidden />
          Stored
        </Chip>
      </div>
      <div className="relative rounded-2xl border p-3 shadow-inner">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="aspect-4/3 rounded-lg border nth-[n+7]:max-sm:hidden"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
