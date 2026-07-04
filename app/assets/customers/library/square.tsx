import squareLogo140x48Dark from "../140x48/square-dark.svg";
import squareLogo140x48 from "../140x48/square.svg";
import squareLogoAdjusted from "../adjusted/square.svg";
import type { CustomerCompany } from "../types";

export const square: CustomerCompany = {
  logo: {
    adjusted: squareLogoAdjusted,
    "140x48": { light: squareLogo140x48, dark: squareLogo140x48Dark },
  },
  name: "Square",
  url: "https://squareup.com",
};
