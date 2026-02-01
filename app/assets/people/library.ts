import type { StaticImageData } from "next/image";

import andrewAvatar from "./andrew.jpg";
import gregAvatar from "./greg.jpg";
import jeremyAvatar from "./jeremy.jpg";
import ninaAvatar from "./nina.jpg";

export { andrewAvatar, ninaAvatar };

export type Employee = {
  name: string;
  avatar: StaticImageData;
  title: string;
  github: string;
  x: string;
};

export const gregEmployee: Employee = {
  name: "Greg Bergé",
  avatar: gregAvatar,
  title: "Co-founder and CEO",
  github: "https://github.com/gregberge",
  x: "https://x.com/gregberge_",
};

export const jeremyEmployee: Employee = {
  name: "Jeremy Sfez",
  avatar: jeremyAvatar,
  title: "Co-founder and HOS",
  github: "https://github.com/sfez",
  x: "https://x.com/SfezJeremy",
};
