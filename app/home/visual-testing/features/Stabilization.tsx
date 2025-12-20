import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Stabilization() {
  return (
    <div className="grid w-full max-w-4xl gap-3.5 p-5 md:grid-cols-[1fr_220px_1fr]">
      <Card>
        <CardTitle variant="danger">Before</CardTitle>

        <Application>
          <div className="absolute top-[46px] left-6 h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>
          <div className="absolute top-[64px] right-7 h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>
          <div className="absolute top-[108px] left-[78px] h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>
          <div className="absolute top-[150px] right-11 h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>
          <div className="absolute top-[168px] left-11 h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>
          <div className="absolute top-[118px] right-[92px] h-[26px] w-[26px] rotate-[8deg] rounded-[10px] border border-(--red-9)/25 bg-(--red-9)/20"></div>

          <div className="absolute top-[54px] left-8 h-[18px] w-[88px] rounded-[10px] border border-(--red-9)/40 bg-(--red-9)/20 backdrop-blur-[2px]"></div>
          <div className="absolute top-[76px] left-[140px] h-[18px] w-[120px] rounded-[10px] border border-(--red-9)/40 bg-(--red-9)/20 backdrop-blur-[2px]"></div>
          <div className="absolute top-[100px] left-9 h-[18px] w-[150px] rounded-[10px] border border-(--red-9)/40 bg-(--red-9)/20 backdrop-blur-[2px]"></div>
          <div className="absolute top-[150px] left-[26px] h-[52px] w-[110px] rounded-[10px] border border-(--red-9)/40 bg-(--red-9)/20 backdrop-blur-[2px]"></div>
          <div className="absolute top-[152px] right-[26px] h-[52px] w-[90px] rounded-[10px] border border-(--red-9)/40 bg-(--red-9)/20 backdrop-blur-[2px]"></div>
        </Application>

        <div className="flex items-baseline gap-2 px-3 pb-4 text-xs">
          <span className="text-low tracking-wider uppercase">diffs</span>
          <strong className="text-base font-bold">12</strong>
          <span className="text-low">(mostly noise)</span>
        </div>
      </Card>

      <Card className="relative grid place-items-center px-3 py-5">
        <div className="grid place-items-center">
          <div
            className="grid h-[110px] w-[110px] place-items-center rounded-full border border-(--primary-6) bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,0.25),rgba(124,92,255,0.02)_60%)] shadow-[0_0_0_10px_rgba(124,92,255,0.08)]"
            aria-hidden="true"
          >
            <div className="relative h-14 w-14 rounded-2xl border border-(--neutral-9)/15 bg-(--neutral-9)/10">
              <div className="absolute inset-3 rounded-xl border border-dashed border-(--neutral-9)/25"></div>
              <div className="absolute inset-[18px] rounded-lg border border-dashed border-(--grass-9)/40"></div>
            </div>
          </div>

          <div className="mt-6 text-center font-sans">
            <div className="text-[13px] font-bold">Built in stabilization</div>
            <div className="text-low mt-1.5 text-xs font-medium">
              filters out noise
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
        >
          <span className="motion-safe:animate-flow absolute bottom-10 left-[-40px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))]"></span>
          <span className="motion-safe:animate-flow absolute bottom-10 left-[10px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))] opacity-75 motion-safe:[animation-delay:0.3s]"></span>
          <span className="motion-safe:animate-flow absolute bottom-10 left-[60px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))] opacity-55 motion-safe:[animation-delay:0.6s]"></span>
          <span className="motion-safe:animate-flow absolute top-10 left-[-40px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))]"></span>
          <span className="motion-safe:animate-flow absolute top-10 left-[10px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))] opacity-75 motion-safe:[animation-delay:0.3s]"></span>
          <span className="motion-safe:animate-flow absolute top-10 left-[60px] h-0.5 w-[140px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(124,92,255,0.45),rgba(46,229,157,0.35),rgba(255,255,255,0))] opacity-55 motion-safe:[animation-delay:0.6s]"></span>
        </div>
      </Card>

      <Card>
        <CardTitle variant="success">After</CardTitle>

        <Application>
          <div className="absolute top-[142px] left-[26px] h-[58px] w-[136px] rounded-[10px] border border-(--grass-9)/40 bg-(--grass-9)/15 backdrop-blur-[2px]"></div>
          <div className="absolute top-[54px] right-[26px] h-[18px] w-[120px] rounded-[10px] border border-(--grass-9)/40 bg-(--grass-9)/15 backdrop-blur-[2px]"></div>

          <div className="absolute right-4 bottom-4 inline-flex gap-1.5 rounded-full border border-(--grass-9)/25 bg-(--grass-9)/10 px-2.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--grass-9)/90"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-(--grass-9)/90"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-(--grass-9)/90"></span>
          </div>
        </Application>

        <div className="flex items-baseline gap-2 px-3 pb-4 text-xs">
          <span className="text-low tracking-wider uppercase">diffs</span>
          <strong className="text-base font-bold">2</strong>
          <span className="text-low">(signal)</span>
        </div>
      </Card>
    </div>
  );
}

function Card(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "bg-app overflow-hidden rounded-xl border shadow-xs",
        props.className,
      )}
    />
  );
}

function CardTitle(props: {
  variant: "success" | "danger";
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 pt-3 text-xs font-semibold">
      <span
        className={clsx(
          "h-2.5 w-2.5 rounded-full",
          {
            danger: "bg-(--red-9) shadow-[0_0_0_4px_--alpha(var(--red-9)/12%)]",
            success:
              "bg-(--grass-9) shadow-[0_0_0_4px_--alpha(var(--grass-9)/12%)]",
          }[props.variant],
        )}
        aria-hidden="true"
      />
      <span>{props.children}</span>
    </div>
  );
}

function Application(props: { children: React.ReactNode }) {
  return (
    <div className="relative m-3 h-55 overflow-hidden rounded-[14px] border-[0.5px] bg-linear-to-b from-(--neutral-9)/6 to-transparent">
      <div className="h-8.5 border-b-[0.5px] bg-(--neutral-8)/10"></div>

      <div className="absolute top-13 right-3.5 left-3.5 h-2.5 w-[72%] rounded-full bg-(--neutral-9)/10"></div>
      <div className="absolute top-18 right-3.5 left-3.5 h-2.5 w-[58%] rounded-full bg-(--neutral-9)/10"></div>
      <div className="absolute top-23 right-3.5 left-3.5 h-2.5 w-[66%] rounded-full bg-(--neutral-9)/10"></div>

      <div className="absolute top-32.5 right-3.5 left-3.5 flex gap-2.5">
        <div className="h-12 flex-1 rounded-xl border border-(--neutral-9)/10 bg-(--neutral-9)/10"></div>
        <div className="h-12 flex-1 rounded-xl border border-(--neutral-9)/10 bg-(--neutral-9)/10"></div>
        <div className="h-12 flex-1 rounded-xl border border-(--neutral-9)/10 bg-(--neutral-9)/10"></div>
      </div>

      {props.children}
    </div>
  );
}
