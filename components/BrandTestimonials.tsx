import Image from "next/image";

import antDesign from "@/images/brands/ant-design.svg";
import doctolib from "@/images/brands/doctolib.svg";
import lemonde from "@/images/brands/lemonde.svg";
import meta from "@/images/brands/meta.svg";
import mui from "@/images/brands/mui.svg";

import { Container } from "./Container";

const Testimonials = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container className="hidden items-baseline justify-between lg:flex">
        {children}
      </Container>
      <div className="relative overflow-hidden lg:hidden">
        <div className="flex w-max animate-[slide_20s_linear_infinite] items-baseline gap-10 pr-10">
          {children}
          {children}
        </div>
      </div>
    </div>
  );
};

export const BrandTestimonials = () => {
  return (
    <Testimonials>
      <Image
        src={antDesign}
        alt="Ant Design"
        className="shrink-0 dark:brightness-0 dark:invert"
        style={{ paddingBottom: "8px" }}
      />
      <Image
        src={mui}
        alt="MUI"
        className="shrink-0 dark:brightness-0 dark:invert"
        style={{ paddingBottom: 0 }}
      />
      <Image
        src={doctolib}
        alt="Doctolib"
        className="shrink-0 dark:brightness-0 dark:invert"
        style={{ paddingBottom: "9px" }}
      />
      <Image
        src={lemonde}
        alt="Le Monde"
        className="shrink-0 dark:brightness-0 dark:invert"
        style={{ paddingBottom: "10px" }}
      />
      <Image
        src={meta}
        alt="Meta"
        height={28}
        width={139}
        className="shrink-0 dark:brightness-0 dark:invert"
        style={{ paddingBottom: "12px" }}
      />
    </Testimonials>
  );
};
