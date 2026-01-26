import pivotLogo140x48Dark from "../140x48/pivot-dark.svg";
import pivotLogo140x48 from "../140x48/pivot.svg";
import pivotLogoAdjustedDark from "../adjusted/pivot-dark.svg";
import pivotLogoAdjusted from "../adjusted/pivot.svg";
import pivotEmblem from "../emblem/pivot.svg";
import alexandrePeltierAvatar from "../people/alexandre-peltier.jpg";
import estelleGiulyAvatar from "../people/estelle-giuly.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const pivot = {
  logo: {
    adjusted: { light: pivotLogoAdjusted, dark: pivotLogoAdjustedDark },
    "140x48": { light: pivotLogo140x48, dark: pivotLogo140x48Dark },
    emblem: pivotEmblem,
  },
  name: "Pivot",
  url: "https://pivotapp.ai",
  storyUrl: "/customers/pivot",
  about:
    "Pivot is a modern procurement platform helping fast growing companies manage purchasing workflows with speed and control.",
  industry: "Procurement, B2B SaaS",
  size: "50-100",
  founded: "2022",
  argosPlan: "Enterprise",
} satisfies CustomerCompany;

const estelleGiuly: CustomerUser = {
  avatar: estelleGiulyAvatar,
  name: "Estelle Giuly",
  title: "Co-founder and CTO of Pivot",
};

export const pivotQuote: CustomerQuote = {
  company: pivot,
  text: (
    <>
      We wanted <strong>confidence, not complexity</strong>. Visual testing with
      Argos gave us exactly that. We <strong>ship faster</strong> because we
      trust what we see.
    </>
  ),
  author: estelleGiuly,
};

const alexandrePeltier: CustomerUser = {
  avatar: alexandrePeltierAvatar,
  name: "Alexandre Peltier",
  title: "Tech lead at Pivot",
};

export const pivotAlexQuote: CustomerQuote = {
  company: pivot,
  text: (
    <>
      If Argos fails, it almost always means something visually changed. That
      signal is <strong>incredibly reliable</strong>.
    </>
  ),
  author: alexandrePeltier,
};
