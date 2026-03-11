import attioLogo140x48Dark from "../140x48/attio-dark.svg";
import attioLogo140x48 from "../140x48/attio.svg";
import attioLogoAdjustedDark from "../adjusted/attio-dark.svg";
import attioLogoAdjusted from "../adjusted/attio.svg";
import type { CustomerCompany } from "../types";

export const attio: CustomerCompany = {
  logo: {
    adjusted: {
      light: attioLogoAdjusted,
      dark: attioLogoAdjustedDark,
    },
    "140x48": {
      light: attioLogo140x48,
      dark: attioLogo140x48Dark,
    },
  },
  name: "Attio",
  url: "https://attio.com",
};
