import Image from "next/image";

import cozy from "@/images/brands/cozy.svg";
import doctolib from "@/images/brands/doctolib.svg";
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

import { Container } from "./Container";

const Testimonials = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container className="mx-auto mt-8 grid w-full max-w-screen-lg grid-cols-2 items-center px-5 md:grid-cols-6 md:px-0">
        {children}
      </Container>
      {/* <div className="relative overflow-hidden lg:hidden">
        <div className="flex w-max animate-[slide_20s_linear_infinite] items-baseline gap-10 pr-10">
          {children}
          {children}
        </div>
      </div> */}
    </div>
  );
};

export const BrandTestimonials = () => {
  return (
    <Container className="mx-auto mt-8 grid w-full max-w-screen-lg grid-cols-2 items-center gap-4 px-5 md:grid-cols-6 md:px-0">
      <Image
        src={meta}
        priority
        alt="Meta"
        height={80}
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={mui}
        priority
        height={80}
        alt="MUI"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={cozy}
        priority
        height={80}
        alt="Cozy"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={handsontable}
        priority
        height={80}
        alt="Handsontable"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={interactiveThings}
        priority
        height={80}
        alt="Interactive Things"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={lemonde}
        priority
        height={80}
        alt="Le Monde"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={doctolib}
        priority
        height={80}
        alt="Doctolib"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={planable}
        priority
        height={80}
        alt="Planable"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={rapidata}
        priority
        height={80}
        alt="Rapidata"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={rho}
        priority
        height={80}
        alt="Rho"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={sivo}
        priority
        height={80}
        alt="Sivo"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
      <Image
        src={pivot}
        priority
        height={80}
        alt="Pivot"
        className="shrink-0 dark:brightness-0 dark:invert"
      />
    </Container>
  );
};
