import {
  chrome,
  edge,
  firefox,
  safari,
  vitest,
} from "@/app/assets/brands/library";
import type { Brand } from "@/app/assets/brands/types";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { ThemeImage } from "@/components/ThemeImage";

type BrowserOrbit = {
  brand: Brand;
  className: string;
};

const BROWSERS: BrowserOrbit[] = [
  { brand: chrome, className: "top-4 left-[18%]" },
  { brand: firefox, className: "top-10 right-[14%]" },
  { brand: safari, className: "bottom-6 left-[22%]" },
  { brand: edge, className: "bottom-12 right-[18%]" },
];

export function BrowserCoverage() {
  return (
    <Card
      className="relative z-10 w-full max-w-80 bg-[linear-gradient(180deg,var(--neutral-1),var(--neutral-2))]"
      shadow="shadow-lg"
    >
      <div className="flex items-center gap-3 border-b border-(--primary-6)/60 px-4 py-3">
        <span className="grid size-12 place-items-center rounded-xl border border-(--primary-6)/60 bg-(--primary-2)/70 shadow-[0_14px_36px_-18px_rgba(80,62,255,0.85)]">
          <ThemeImage src={vitest.logo} alt="" className="size-6" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-(--neutral-12)">
            Vitest run
          </div>
          <div className="text-low text-xs">Storybook screenshots in CI</div>
        </div>
      </div>
      <div className="space-y-2 px-4 py-3">
        {BROWSERS.map((browser) => (
          <BrowserRow key={browser.brand.name} brand={browser.brand} />
        ))}
      </div>
    </Card>
  );
}

function BrowserRow(props: { brand: Brand }) {
  const { brand } = props;
  return (
    <div className="flex items-center justify-between rounded-lg border border-(--neutral-6)/60 bg-white/90 px-3 py-2 shadow-xs">
      <div className="flex items-center gap-2">
        <ThemeImage
          src={brand.logo}
          className="size-6"
          alt={`${brand.name} logo`}
        />
        <span className="text-sm font-semibold">{brand.name}</span>
      </div>
      <Chip variant="success" className="px-2 py-[2px] text-[11px]">
        Screenshot saved
      </Chip>
    </div>
  );
}
