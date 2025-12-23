import clsx from "clsx";

import {
  cloudflare,
  github,
  gitlab,
  vercel,
} from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { ThemeImage } from "@/components/ThemeImage";

type FlowPoint = { x: number; y: number };

const VIEWBOX = { width: 800, height: 360 };

const FLOW_POSITIONS = {
  argos: { x: 400, y: 200 },
  vercel: { x: 156, y: 96 },
  cloudflare: { x: 644, y: 96 },
  github: { x: 210, y: 310 },
  gitlab: { x: 590, y: 310 },
} satisfies Record<string, FlowPoint>;

function toPercent(point: FlowPoint) {
  return {
    left: `${(point.x / VIEWBOX.width) * 100}%`,
    top: `${(point.y / VIEWBOX.height) * 100}%`,
  };
}

export function DeploymentPreviewFlow() {
  return (
    <div className="relative isolate size-full">
      <FlowLines />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={toPercent(FLOW_POSITIONS.vercel)}
      >
        <FlowNode
          label="Vercel"
          detail="Deployment ready"
          logo={
            <ThemeImage
              alt=""
              src={vercel.logo}
              className="size-5"
              aria-hidden
            />
          }
          tone="dark"
        />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={toPercent(FLOW_POSITIONS.cloudflare)}
      >
        <FlowNode
          label="Cloudflare"
          detail="Edge deployed"
          logo={
            <ThemeImage
              alt=""
              src={cloudflare.logo}
              className="size-8"
              aria-hidden
            />
          }
          tone="amber"
        />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={toPercent(FLOW_POSITIONS.argos)}
      >
        <ArgosNode />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={toPercent(FLOW_POSITIONS.github)}
      >
        <FlowNode
          label="GitHub Checks"
          detail="Status reported"
          logo={<ThemeImage alt="" src={github.logo} className="size-5" />}
          tone="dark"
        />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={toPercent(FLOW_POSITIONS.gitlab)}
      >
        <FlowNode
          label="GitLab Pipeline"
          detail="Checks updated"
          logo={<ThemeImage alt="" src={gitlab.logo} className="size-5" />}
          tone="rose"
        />
      </div>
    </div>
  );
}

function FlowLines() {
  const { argos, vercel, cloudflare, github, gitlab } = FLOW_POSITIONS;

  const linePath = (end: FlowPoint, control1: FlowPoint, control2: FlowPoint) =>
    `M ${argos.x} ${argos.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`;

  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full"
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="line-blue" x1="0" x2="800" y1="0" y2="0">
          <stop stopColor="#4C6FFF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#0FB5FF" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="line-amber" x1="800" x2="0" y1="0" y2="0">
          <stop stopColor="#4F3422" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFC53D" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="line-neutral" x1="0" x2="0" y1="0" y2="360">
          <stop stopColor="#5B6073" stopOpacity="0.8" />
          <stop offset="1" stopColor="#9BA1B6" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d={linePath(
          vercel,
          { x: argos.x - 140, y: argos.y - 20 },
          { x: vercel.x + 30, y: vercel.y + 70 },
        )}
        stroke="url(#line-blue)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={linePath(
          cloudflare,
          { x: argos.x + 140, y: argos.y - 20 },
          { x: cloudflare.x - 30, y: cloudflare.y + 70 },
        )}
        stroke="url(#line-amber)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={linePath(
          github,
          { x: argos.x - 70, y: argos.y + 70 },
          { x: github.x + 60, y: github.y - 50 },
        )}
        stroke="url(#line-neutral)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={linePath(
          gitlab,
          { x: argos.x + 70, y: argos.y + 70 },
          { x: gitlab.x - 60, y: gitlab.y - 50 },
        )}
        stroke="url(#line-neutral)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={vercel.x} cy={vercel.y} r="4" fill="url(#line-blue)" />
      <circle
        cx={cloudflare.x}
        cy={cloudflare.y}
        r="4"
        fill="url(#line-amber)"
      />
      <circle cx={github.x} cy={github.y} r="4" fill="url(#line-neutral)" />
      <circle cx={gitlab.x} cy={gitlab.y} r="4" fill="url(#line-neutral)" />
    </svg>
  );
}

function FlowNode(props: {
  logo: React.ReactNode;
  label: string;
  detail: string;
  tone: "dark" | "blue" | "amber" | "rose";
}) {
  const { logo, label, detail, tone } = props;
  const toneClass = {
    dark: "border-(--neutral-8) bg-(--neutral-1) shadow-[0_10px_25px_-18px_rgba(40,40,40,0.6)]",
    blue: "border-(--primary-7) bg-(--primary-1) shadow-[0_10px_25px_-18px_rgba(80,62,255,0.7)]",
    amber:
      "border-(--amber-7) bg-(--amber-1) shadow-[0_10px_25px_-18px_rgba(255,159,10,0.45)]",
    rose: "border-(--danger-7) bg-(--danger-1) shadow-[0_10px_25px_-18px_rgba(220,38,38,0.35)]",
  }[tone];

  return (
    <div
      className={clsx(
        "bg-app rounded-xl border px-4 py-3 whitespace-nowrap",
        toneClass,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="bg-app grid size-10 shrink-0 place-items-center rounded-lg border text-lg">
          {logo}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{label}</div>
          <div className="text-low text-xs">{detail}</div>
        </div>
      </div>
    </div>
  );
}

function ArgosNode() {
  return (
    <div className="bg-app grid size-20 place-content-center rounded-full border border-(--primary-8)">
      <ArgosEmblem className="size-10 text-(--primary-11)" aria-hidden />
    </div>
  );
}
