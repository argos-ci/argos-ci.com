import muiLogo140x48 from "../140x48/mui.svg";
import muiLogoAdjusted from "../adjusted/mui.svg";
import olivierTassinariAvatar from "../people/olivier-tassinari.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const mui: CustomerCompany = {
  logo: {
    adjusted: muiLogoAdjusted,
    "140x48": muiLogo140x48,
  },
  name: "MUI",
};

const olivierTassinari: CustomerUser = {
  avatar: olivierTassinariAvatar,
  name: "Olivier Tassinari",
  title: "CEO of MUI",
};

export const muiQuote: CustomerQuote = {
  company: mui,
  text: (
    <>
      Argos gives us a stable visual baseline for MUI. It lets us refactor
      confidently, catch layout drifts early, and{" "}
      <strong>ship changes faster</strong> without adding noise to our workflow.
      It is the kind of tooling that{" "}
      <strong>scales with a component library as large as ours</strong>.
    </>
  ),
  author: olivierTassinari,
};
