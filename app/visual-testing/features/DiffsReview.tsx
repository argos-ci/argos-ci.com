import clsx from "clsx";
import { EyeIcon, ThumbsUpIcon, Wand2Icon } from "lucide-react";
import type { ReactNode } from "react";

import { github } from "@/app/assets/brands/library";
import { andrew, nina } from "@/app/assets/people/library";
import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DotIndicator } from "@/components/DotIndicator";
import { ThemeImage } from "@/components/ThemeImage";
import { SmallTitle } from "@/components/Typography";

type SneakerVariant = "baseline" | "diff";

const CHANGED = [
  {
    name: "added-to-cart.png",
    meta: "Desktop · 1440px",
    active: true,
  },
  {
    name: "checkout vw-1280.png",
    meta: "Desktop · 1280px",
    active: false,
  },
  {
    name: "checkout vw-480.png",
    meta: "Mobile · 480px",
    active: false,
  },
];

const UNCHANGED = [
  { name: "home.png", meta: "Desktop · 1440px" },
  { name: "checkout.png", meta: "Desktop · 1280px" },
];

export function DiffsReview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl mask-b-from-70%">
      <Card className="relative overflow-hidden">
        <Header />
        <div className="flex">
          <Sidebar />
          <Workspace />
        </div>
      </Card>
    </div>
  );
}

function Header() {
  return (
    <div className="text-xxs flex flex-wrap items-center gap-3 border-b-[0.5px] px-4 py-3">
      <Badge>
        <DotIndicator variant="primary" />
        Build 98
      </Badge>
      <Chip variant="success" icon={ThumbsUpIcon}>
        Approved
      </Chip>
      <Badge>
        <ThemeImage alt="" src={github.logo} className="size-3" />
        PR #402 - Reduce image size
      </Badge>
      <div className="ml-auto flex items-center gap-3">
        <AvatarStack />
        <KeyboardHints />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-3 border-r-[0.5px] py-3">
      <div className="text-xxs flex items-center justify-between border-b-[0.5px] px-3 pb-3 font-semibold text-(--neutral-12) max-sm:hidden">
        <span className="flex items-center gap-2">
          <DotIndicator variant="primary" />
          Screenshots
        </span>
        <Badge className="bg-app px-2 py-1">3 changed</Badge>
      </div>

      <div className="space-y-4 px-3">
        <SidebarGroup
          title="Changed"
          count="3 / 3"
          tone="danger"
          items={CHANGED}
        />
        <SidebarGroup
          title="Unchanged"
          count="6"
          tone="neutral"
          items={UNCHANGED}
        />
      </div>
    </div>
  );
}

function SidebarGroup(props: {
  title: string;
  count: string;
  tone: "danger" | "neutral";
  items: Array<{ name: string; meta: string; active?: boolean }>;
}) {
  const { title, count, tone, items } = props;
  return (
    <div className="space-y-2">
      <div className="text-xxs flex items-center justify-between font-semibold text-(--neutral-11)">
        <span className="flex items-center gap-2">
          <DotIndicator variant={tone === "danger" ? "danger" : "neutral"} />
          {title}
        </span>
        <span className="text-low">{count}</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <SidebarRow
            key={item.name}
            name={item.name}
            meta={item.meta}
            active={item.active}
            tone={tone}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarRow(props: {
  name: string;
  meta: string;
  tone: "danger" | "neutral";
  active?: boolean;
}) {
  const { active, tone, name, meta } = props;
  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-xl border px-2 py-2 shadow-xs transition",
        active
          ? "border-(--primary-7)/70 bg-(--primary-2)/35 shadow-[0_10px_30px_-22px_rgba(124,92,255,0.45)]"
          : "bg-app border-(--neutral-6)/60 hover:border-(--primary-6)/60",
      )}
    >
      <MiniPreview variant={tone === "danger" ? "diff" : "baseline"} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-(--neutral-12)">
          <span className="truncate">{name}</span>
          {active ? (
            <DotIndicator
              variant="primary"
              className="shadow-[0_0_0_4px_rgba(124,92,255,0.15)]"
            />
          ) : null}
        </div>
        <div className="text-low text-xxs truncate">{meta}</div>
      </div>
      <Chip
        variant={tone === "danger" ? "danger" : "neutral"}
        className="text-xxxs px-2 py-[2px]"
      >
        {tone === "danger" ? "Update" : "Clean"}
      </Chip>
    </div>
  );
}

function Workspace() {
  return (
    <div className="relative flex-1 space-y-3 px-4 pt-4 pb-5">
      <Toolbar />
      <div className="grid grid-cols-2 gap-3">
        <DiffPanel label="Baseline · main" variant="baseline" />
        <DiffPanel label="Changes · reduce-detail-image-size" variant="diff" />
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="bg-app text-xxs flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2">
      <div className="flex items-center gap-2 font-semibold text-(--neutral-12)">
        <DotIndicator variant="primary" />
        added-to-cart.png
      </div>
      <Chip variant="primary" className="text-xxxs px-2 py-[2px]">
        Review changes
      </Chip>
      <Chip variant="neutral" className="text-xxxs px-2 py-[2px]">
        Smart zoom
      </Chip>
      <Chip
        variant="danger"
        className="text-xxxs flex items-center gap-1 px-2 py-[2px]"
      >
        <EyeIcon className="size-3" />
        Highlights
      </Chip>
      <Chip
        variant="pending"
        className="text-xxxs flex items-center gap-1 px-2 py-[2px]"
      >
        <Wand2Icon className="size-3" />
        Masks
      </Chip>
    </div>
  );
}

function DiffPanel(props: { label: string; variant: SneakerVariant }) {
  const { label, variant } = props;
  return (
    <div className="bg-app relative flex flex-col gap-3 overflow-hidden rounded-lg border p-3">
      <SmallTitle>{label}</SmallTitle>

      <div className="relative">
        <div className="relative overflow-hidden rounded-xl border">
          <div className="relative aspect-4/3 p-4">
            <ApplicationSVG withChanges={variant === "diff"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPreview(props: { variant: SneakerVariant }) {
  const { variant } = props;
  return (
    <div
      className={clsx(
        "grid aspect-4/3 w-16 place-items-center overflow-hidden rounded-lg border",
        variant === "diff"
          ? "border-(--danger-6)/60 bg-(--danger-2)/30"
          : "border-(--neutral-6)/60 bg-(--neutral-2)/60",
      )}
    >
      <div className="w-full p-1">
        <ApplicationSVG />
      </div>
    </div>
  );
}

function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      {[andrew, nina].map((src, index) => (
        <ThemeImage
          key={index}
          alt=""
          src={src}
          className="size-6 rounded-full border border-(--neutral-1) shadow-xs"
        />
      ))}
    </div>
  );
}

function KeyboardHints() {
  return (
    <div className="bg-app text-low text-xxxs hidden items-center gap-2 rounded-md border-[0.5px] px-2 py-1 font-medium md:flex">
      <Kbd>↓</Kbd>
      <Kbd>↑</Kbd>
      <span className="text-low">navigate</span>
      <Kbd>Y</Kbd>
      <Kbd>N</Kbd>
      <span className="text-low">approve / reject</span>
    </div>
  );
}

function Kbd(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <kbd className="bg-app tetx-ow text-xxs inline-flex min-w-6 items-center justify-center rounded border-[0.5px] border-b-2 px-1.5 font-mono font-bold">
      {children}
    </kbd>
  );
}
