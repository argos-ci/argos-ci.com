import metaLogo140x48Dark from "../140x48/meta-dark.svg";
import metaLogo140x48 from "../140x48/meta.svg";
import metaLogoAdjusted from "../adjusted/meta.svg";
import type { CustomerCompany } from "../types";

export const meta: CustomerCompany = {
  logo: {
    adjusted: metaLogoAdjusted,
    "140x48": { light: metaLogo140x48, dark: metaLogo140x48Dark },
  },
  name: "Meta",
};
