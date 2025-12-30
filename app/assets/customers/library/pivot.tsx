import pivotLogo140x48Dark from "../140x48/pivot-dark.svg";
import pivotLogo140x48 from "../140x48/pivot.svg";
import pivotLogoAdjustedDark from "../adjusted/pivot-dark.svg";
import pivotLogoAdjusted from "../adjusted/pivot.svg";
import estelleGiulyAvatar from "../people/estelle-giuly.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

const pivot: CustomerCompany = {
  logo: {
    adjusted: { light: pivotLogoAdjusted, dark: pivotLogoAdjustedDark },
    "140x48": { light: pivotLogo140x48, dark: pivotLogo140x48Dark },
  },
  name: "Pivot",
};

const estelleGiuly: CustomerUser = {
  avatar: estelleGiulyAvatar,
  name: "Estelle Giuly",
  title: "CTO of Pivot",
};

export const pivotQuote: CustomerQuote = {
  company: pivot,
  text: (
    <>
      Argos has become a core part of our release process. It catches visual
      regressions we would have shipped to customers and gives our team
      confidence to deploy faster without sacrificing quality.
    </>
  ),
  author: estelleGiuly,
};
