import type { StaticImageData } from "next/image";

import andrew from "./andrew.jpg";
import greg from "./greg.jpg";
import jeremy from "./jeremy.jpg";
import nina from "./nina.jpg";

export { greg, jeremy, andrew, nina };

export type Employee = {
  name: string;
  avatar: StaticImageData;
  title: string;
  github: string;
  x: string;
};

export const gregEmployee: Employee = {
  name: "Greg Bergé",
  avatar: greg,
  title: "Co-founder and CEO",
  github: "https://github.com/gregberge",
  x: "https://x.com/gregberge_",
};

export const jeremyEmployee: Employee = {
  name: "Jeremy Sfez",
  avatar: jeremy,
  title: "Co-founder and HOS",
  github: "https://github.com/sfez",
  x: "https://x.com/SfezJeremy",
};
