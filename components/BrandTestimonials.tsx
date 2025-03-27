import Image from "next/image";

import businessInsider from "@/images/brands/business-insider.svg";
import cozy from "@/images/brands/cozy.svg";
import defacto from "@/images/brands/defacto.svg";
import doctolib from "@/images/brands/doctolib.svg";
import forethought from "@/images/brands/forethought.svg";
import gitbook from "@/images/brands/gitbook.svg";
import handsontable from "@/images/brands/handsontable.svg";
import interactiveThings from "@/images/brands/interactive-things.svg";
import lemonde from "@/images/brands/lemonde.svg";
import mermaid from "@/images/brands/mermaid.svg";
import meta from "@/images/brands/meta.svg";
import mui from "@/images/brands/mui.svg";
import pivot from "@/images/brands/pivot.svg";
import planable from "@/images/brands/planable.svg";
import rapidata from "@/images/brands/rapidata.svg";
import redVentures from "@/images/brands/red-ventures.svg";
import rho from "@/images/brands/rho.svg";
import sindri from "@/images/brands/sindri.svg";
import sivo from "@/images/brands/sivo.svg";
import theEconomist from "@/images/brands/the-economist.svg";
import wiz from "@/images/brands/wiz.svg";
import yotpo from "@/images/brands/yotpo.svg";

import { Container } from "./Container";

export const BRANDS = {
  meta: { src: meta, alt: "Meta", url: "https://docusaurus.io" },
  mui: { src: mui, alt: "MUI", url: "https://mui.com" },
  gitbook: { src: gitbook, alt: "GitBook", url: "https://www.gitbook.com" },
  yotpo: { src: yotpo, alt: "Yotpo", url: "https://www.yotpo.com" },
  wiz: {
    src: wiz,
    alt: "Wiz",
    url: "https://www.wiz.io",
  },
  cozy: { src: cozy, alt: "Cozy", url: "https://cozy.io" },
  handsontable: {
    src: handsontable,
    alt: "Handsontable",
    url: "https://handsontable.com",
  },
  interactiveThings: {
    src: interactiveThings,
    alt: "Interactive Things",
    url: "https://interactivethings.com",
  },
  lemonde: { src: lemonde, alt: "Le Monde", url: "https://www.lemonde.fr" },
  doctolib: { src: doctolib, alt: "Doctolib", url: "https://www.doctolib.fr" },
  planable: { src: planable, alt: "Planable", url: "https://planable.io" },
  rapidata: { src: rapidata, alt: "Rapidata", url: "https://rapidata.ai" },
  rho: { src: rho, alt: "Rho", url: "https://rho.co" },
  sivo: { src: sivo, alt: "Sivo", url: "https://sivo.com" },
  pivot: { src: pivot, alt: "Pivot", url: "https://pivot.com" },
  mermaid: { src: mermaid, alt: "Mermaid", url: "https://mermaid.js.org" },
  sindri: { src: sindri, alt: "Sindri", url: "https://sindri.app" },
  businessInsider: {
    src: businessInsider,
    alt: "Business Insider",
    url: "https://www.businessinsider.com",
  },
  theEconomist: {
    src: theEconomist,
    alt: "The Economist",
    url: "https://www.economist.com",
  },
  defacto: {
    src: defacto,
    alt: "defacto",
    url: "https://www.getdefacto.com",
  },
  forethought: {
    src: forethought,
    alt: "Forethought",
    url: "https://forethought.ai",
  },
  redVentures: {
    src: redVentures,
    alt: "Red Ventures",
    url: "https://www.redventures.com/",
  },
};

const brands = [
  BRANDS.meta,
  BRANDS.wiz,
  BRANDS.mui,
  BRANDS.gitbook,
  BRANDS.yotpo,
  BRANDS.interactiveThings,
  BRANDS.lemonde,
  BRANDS.rho,
  BRANDS.businessInsider,
  BRANDS.theEconomist,
  BRANDS.cozy,
  BRANDS.doctolib,
  BRANDS.redVentures,
  BRANDS.handsontable,
  BRANDS.forethought,
  BRANDS.mermaid,
  BRANDS.defacto,
  BRANDS.pivot,
];

export function BrandTestimonials({ limit = Infinity }: { limit?: number }) {
  return (
    <Container className="mx-auto mt-8 grid w-full max-w-(--breakpoint-lg) grid-cols-2 items-center justify-center gap-4 px-5 md:flex md:flex-wrap md:px-0 md:*:max-w-40">
      {brands
        .filter((_, i) => i < limit)
        .map((brand, index) => (
          <Image
            key={index}
            priority
            height={80}
            className="shrink-0 dark:brightness-0 dark:invert"
            src={brand.src}
            alt={brand.alt}
          />
        ))}
    </Container>
  );
}
