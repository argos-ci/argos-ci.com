import businessInsiderLogo140x48Dark from "../140x48/business-insider-dark.svg";
import businessInsiderLogo140x48 from "../140x48/business-insider.svg";
import businessInsiderLogoAdjusted from "../adjusted/business-insider.svg";
import type { CustomerCompany } from "../types";

export const businessInsider: CustomerCompany = {
  logo: {
    adjusted: businessInsiderLogoAdjusted,
    "140x48": {
      light: businessInsiderLogo140x48,
      dark: businessInsiderLogo140x48Dark,
    },
  },
  name: "Business Insider",
  url: "https://www.businessinsider.com",
};
