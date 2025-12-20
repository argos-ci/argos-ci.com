import clsx from "clsx";
import {
  Check,
  ChevronDown,
  Eye,
  Keyboard,
  PanelLeft,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export function FastApprovalFlow() {
  return (
    <div className="h-[460px] w-[860px]">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_18%_20%,rgba(124,92,255,0.16),rgba(124,92,255,0.02)_55%),radial-gradient(circle_at_82%_70%,rgba(46,229,157,0.12),rgba(46,229,157,0.02)_55%)] shadow-xs">
        <Ambient />

        <div className="relative h-full p-5">
          <AppWindow>
            <TopBar />
            <div className="grid h-[calc(100%-44px)] grid-cols-[220px_1fr]">
              <Sidebar />
              <Viewer />
            </div>

            <FinishReviewModal />
            <ShortcutsCallout />
          </AppWindow>
        </div>
      </div>
    </div>
  );
}

function AppWindow(props: { children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border bg-(--neutral-9)/5 shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-[6px]">
      {props.children}
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex h-[44px] items-center justify-between border-b bg-(--neutral-8)/10 px-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-xl border border-(--neutral-9)/15 bg-(--neutral-9)/8">
            <Eye className="h-4 w-4 opacity-80" />
          </span>
          <div className="text-xs font-semibold">
            Build <span className="text-low">66477</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-(--primary-6) bg-(--primary-9)/10 px-2.5 py-1 text-[11px] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-(--primary-9) shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"></span>
          <span>Changes detected</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-low inline-flex items-center gap-2 rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/6 px-2.5 py-1 text-[11px] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-(--grass-9)/75"></span>
          <span>1 / 3 reviewed</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-(--primary-6) bg-(--primary-9)/16 px-3 py-1.5 text-xs font-semibold">
          <span>Review changes</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="relative border-r bg-(--neutral-9)/3">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold">
          <PanelLeft className="h-4 w-4 opacity-70" />
          <span>Screenshots</span>
        </div>
        <div className="text-low rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/6 px-2 py-1 text-[11px] font-semibold">
          3
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="rounded-xl border border-(--neutral-9)/12 bg-(--neutral-9)/6 p-2">
          <div className="text-low flex items-center justify-between text-[11px] font-semibold">
            <span>Changed</span>
            <span>2 / 3</span>
          </div>

          <div className="mt-2 grid gap-2">
            <ThumbRow active title="chromium search empty" />
            <ThumbRow title="chromium editor popovers" />
            <ThumbRow title="chromium layout sidebar" />
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-(--neutral-9)/10 bg-(--neutral-9)/4 p-2">
          <div className="text-low flex items-center justify-between text-[11px] font-semibold">
            <span>Unchanged</span>
            <span>422</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.08),rgba(0,0,0,0))]" />
    </div>
  );
}

function ThumbRow(props: { title: string; active?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-lg border px-2 py-2",
        props.active
          ? "border-(--primary-6) bg-(--primary-9)/10 shadow-[0_0_0_4px_rgba(124,92,255,0.10)]"
          : "border-(--neutral-9)/12 bg-(--neutral-9)/6",
      )}
    >
      <div className="text-[11px] font-semibold">{props.title}</div>
      <div className="mt-2 h-[54px] overflow-hidden rounded-md border border-(--neutral-9)/10 bg-linear-to-b from-(--neutral-9)/10 to-transparent">
        <div className="p-2">
          <div className="h-2.5 w-[78%] rounded-full bg-(--neutral-9)/12" />
          <div className="mt-1.5 h-2.5 w-[52%] rounded-full bg-(--neutral-9)/10" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-7 rounded-md bg-(--neutral-9)/10" />
            <div className="h-7 rounded-md bg-(--neutral-9)/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Viewer() {
  return (
    <div className="relative bg-(--neutral-9)/2">
      <ViewerToolbar />

      <div className="relative h-[calc(100%-44px)] p-4">
        <div className="relative h-full overflow-hidden rounded-2xl border border-(--neutral-9)/12 bg-linear-to-b from-(--neutral-9)/10 to-transparent">
          <div className="absolute inset-x-0 top-0 h-10 border-b border-(--neutral-9)/10 bg-(--neutral-9)/6" />

          <div className="absolute top-[58px] left-6 h-3 w-[62%] rounded-full bg-(--neutral-9)/10" />
          <div className="absolute top-[80px] left-6 h-3 w-[48%] rounded-full bg-(--neutral-9)/9" />

          <div className="absolute top-[110px] right-6 left-6 grid grid-cols-[1fr_1fr] gap-4">
            <div className="h-[220px] rounded-2xl border border-(--neutral-9)/12 bg-(--neutral-9)/8" />
            <div className="h-[220px] rounded-2xl border border-(--neutral-9)/12 bg-(--neutral-9)/8" />
          </div>

          <DiffOverlay />

          <ActionRail />
        </div>
      </div>
    </div>
  );
}

function ViewerToolbar() {
  return (
    <div className="flex h-[44px] items-center justify-between border-b bg-(--neutral-8)/8 px-4">
      <div className="flex items-center gap-2">
        <div className="text-low rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/6 px-2.5 py-1 text-[11px] font-semibold">
          Baseline
        </div>
        <div className="rounded-full border border-(--primary-6) bg-(--primary-9)/12 px-2.5 py-1 text-[11px] font-semibold">
          Changes
        </div>
        <div className="ml-2 h-2.5 w-[220px] rounded-full bg-(--neutral-9)/10" />
      </div>

      <div className="flex items-center gap-2">
        <div className="text-low inline-flex items-center gap-2 rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/6 px-2.5 py-1 text-[11px] font-semibold">
          <Keyboard className="h-3.5 w-3.5 opacity-70" />
          <span>Y / N</span>
        </div>

        <div className="inline-flex items-center gap-1">
          <div className="grid h-8 w-8 place-items-center rounded-xl border border-(--neutral-9)/15 bg-(--neutral-9)/6">
            <ThumbsDown className="h-4 w-4 opacity-70" />
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-xl border border-(--neutral-9)/15 bg-(--neutral-9)/6">
            <ThumbsUp className="h-4 w-4 opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute top-[176px] left-[84px] h-[22px] w-[110px] rotate-[-4deg] rounded-[10px] border border-(--red-9)/35 bg-(--red-9)/18 backdrop-blur-[2px]" />
      <div className="absolute top-[214px] right-[106px] h-[22px] w-[140px] rotate-[3deg] rounded-[10px] border border-(--red-9)/30 bg-(--red-9)/16 backdrop-blur-[2px]" />
      <div className="absolute right-[130px] bottom-[118px] h-[24px] w-[168px] rounded-[10px] border border-(--grass-9)/35 bg-(--grass-9)/16 backdrop-blur-[2px]" />
    </div>
  );
}

function ActionRail() {
  return (
    <div className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/8 px-2 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-[6px]">
      <ActionPill variant="reject" />
      <ActionPill variant="approve" />
    </div>
  );
}

function ActionPill(props: { variant: "approve" | "reject" }) {
  const isApprove = props.variant === "approve";
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
        isApprove
          ? "border-(--grass-9)/30 bg-(--grass-9)/14"
          : "border-(--red-9)/30 bg-(--red-9)/12",
      )}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full border border-(--neutral-9)/15 bg-(--neutral-9)/10">
        {isApprove ? (
          <ThumbsUp className="h-3.5 w-3.5 opacity-80" />
        ) : (
          <ThumbsDown className="h-3.5 w-3.5 opacity-80" />
        )}
      </span>
      <span>{isApprove ? "Approve" : "Reject"}</span>
      <span className="text-low rounded-md border border-(--neutral-9)/15 bg-(--neutral-9)/6 px-1.5 py-0.5 text-[10px] font-bold">
        {isApprove ? "Y" : "N"}
      </span>
    </div>
  );
}

function FinishReviewModal() {
  return (
    <div className="absolute top-16 left-12 w-[560px] overflow-hidden rounded-2xl border bg-(--neutral-1) shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
      <div className="p-6">
        <div className="text-[28px] font-semibold tracking-tight">
          Finish your review
        </div>
        <div className="mt-4 text-[18px] font-semibold">
          All changes have been marked as accepted.
        </div>
        <div className="text-low mt-1 text-[18px]">
          Approve the changes to submit your review.
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t bg-(--neutral-2)/70 px-6 py-4">
        <Button variant="ghost">
          <X className="h-4 w-4 opacity-70" />
          <span>Cancel</span>
        </Button>

        <Button variant="primary">
          <Check className="h-4 w-4 opacity-90" />
          <span>Approve changes</span>
        </Button>
      </div>
    </div>
  );
}

function ShortcutsCallout() {
  return (
    <div className="absolute top-[238px] right-8">
      <div className="rounded-2xl border border-(--red-9)/20 bg-(--neutral-1)/80 px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-[8px]">
        <div className="text-low flex items-center gap-2 text-xs font-semibold">
          <Keyboard className="h-4 w-4 opacity-70" />
          <span>Shortcuts</span>
        </div>

        <div className="mt-1.5 text-sm font-bold text-(--red-10)">
          Approve / Reject
        </div>
        <div className="mt-1 flex items-center gap-2 text-[12px] font-semibold">
          <kbd className="rounded-md border bg-(--neutral-9)/5 px-2 py-1 font-mono">
            Y
          </kbd>
          <span className="text-low">or</span>
          <kbd className="rounded-md border bg-(--neutral-9)/5 px-2 py-1 font-mono">
            N
          </kbd>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-1/2 -left-10 h-[2px] w-10 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(239,68,68,0.45))]"
        aria-hidden="true"
      />
    </div>
  );
}

function Button(
  props: ComponentPropsWithRef<"button"> & { variant: "primary" | "ghost" },
) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold shadow-xs",
        props.variant === "ghost" &&
          "border-(--neutral-9)/15 bg-(--neutral-9)/4",
        props.variant === "primary" &&
          "border-(--primary-6) bg-(--primary-9) text-white shadow-[0_0_0_6px_rgba(124,92,255,0.12)]",
        props.className,
      )}
    />
  );
}

function Ambient() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -top-28 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-(--primary-9)/20 blur-2xl" />
      <div className="absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-(--grass-9)/12 blur-2xl" />
      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-(--primary-9)/10 blur-3xl" />
    </div>
  );
}
