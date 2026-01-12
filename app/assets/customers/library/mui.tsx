import muiLogo140x48Dark from "../140x48/mui-dark.svg";
import muiLogo140x48 from "../140x48/mui.svg";
import muiLogoAdjustedDark from "../adjusted/mui-dark.svg";
import muiLogoAdjusted from "../adjusted/mui.svg";
import muiEmblem from "../emblem/mui.svg";
import olivierTassinariAvatar from "../people/olivier-tassinari.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const mui = {
  logo: {
    adjusted: { light: muiLogoAdjusted, dark: muiLogoAdjustedDark },
    "140x48": { light: muiLogo140x48, dark: muiLogo140x48Dark },
    emblem: muiEmblem,
  },
  name: "MUI",
  url: "https://mui.com",
  storyUrl: "/customers/mui",
  about:
    "MUI is the most popular React UI component library, powering products used by millions of developers worldwide.",
  industry: "Developer Tools, Open Source",
  size: "50-100",
  founded: "2014",
  argosPlan: "Enterprise",
} satisfies CustomerCompany;

const olivierTassinari = {
  avatar: olivierTassinariAvatar,
  name: "Olivier Tassinari",
  title: "CEO of MUI",
} satisfies CustomerUser;

export const muiQuote: CustomerQuote = {
  company: mui,
  text: (
    <>
      Argos gives a stable visual baseline for the MUI and Base UI component
      ecosystem. It lets us refactor confidently, catch layout drifts early, and{" "}
      <strong>ship changes faster</strong> without adding noise to our workflow.
      It is the kind of tooling that{" "}
      <strong>scales with a component library as large as ours</strong>.
    </>
  ),
  author: olivierTassinari,
};
