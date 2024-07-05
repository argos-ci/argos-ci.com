import Image from "next/image";

import cozy from "@/images/brands/cozy.svg";
import doctolib from "@/images/brands/doctolib.svg";
import gitbook from "@/images/brands/gitbook.svg";
import handsontable from "@/images/brands/handsontable.svg";
import interactiveThings from "@/images/brands/interactive-things.svg";
import lemonde from "@/images/brands/lemonde.svg";
import meta from "@/images/brands/meta.svg";
import mui from "@/images/brands/mui.svg";
import pivot from "@/images/brands/pivot.svg";
import planable from "@/images/brands/planable.svg";
import rapidata from "@/images/brands/rapidata.svg";
import rho from "@/images/brands/rho.svg";
import sivo from "@/images/brands/sivo.svg";
import yotpo from "@/images/brands/yotpo.svg";

import { Container } from "./Container";

const brands = [
  { src: meta, alt: "Meta" },
  { src: mui, alt: "MUI" },
  { src: gitbook, alt: "GitBook" },
  { src: yotpo, alt: "Yotpo" },
  { src: cozy, alt: "Cozy" },
  { src: handsontable, alt: "Handsontable" },
  { src: interactiveThings, alt: "Interactive Things" },
  { src: lemonde, alt: "Le Monde" },
  { src: doctolib, alt: "Doctolib" },
  { src: planable, alt: "Planable" },
  { src: rapidata, alt: "Rapidata" },
  { src: rho, alt: "Rho" },
  { src: sivo, alt: "Sivo" },
  { src: pivot, alt: "Pivot" },
];

export const BrandTestimonials = ({ limit = Infinity }: { limit?: number }) => {
  return (
    <Container className="mx-auto mt-8 grid w-full max-w-screen-lg grid-cols-2 items-center justify-center gap-4 px-5 md:flex md:flex-wrap md:px-0 md:[&>*]:max-w-40">
      {brands
        .filter((_, i) => i < limit)
        .map((brand) => (
          <Image
            priority
            height={80}
            className="shrink-0 dark:brightness-0 dark:invert"
            key={brand.src}
            src={brand.src}
            alt={brand.alt}
          />
        ))}
    </Container>
  );
};
