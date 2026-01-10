import planableLogo140x48Dark from "../140x48/planable-dark.svg";
import planableLogo140x48 from "../140x48/planable.svg";
import planableLogoAdjustedDark from "../adjusted/planable-dark.svg";
import planableLogoAdjusted from "../adjusted/planable.svg";
import type { CustomerCompany } from "../types";

export const planable: CustomerCompany = {
  logo: {
    adjusted: { light: planableLogoAdjusted, dark: planableLogoAdjustedDark },
    "140x48": { light: planableLogo140x48, dark: planableLogo140x48Dark },
  },
  name: "Planable",
  url: "https://planable.io/",
};
