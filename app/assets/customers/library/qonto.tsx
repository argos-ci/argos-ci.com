import qontoLogo140x48Dark from "../140x48/qonto-dark.svg";
import qontoLogo140x48 from "../140x48/qonto.svg";
import qontoLogoAdjusted from "../adjusted/qonto.svg";
import type { CustomerCompany } from "../types";

export const qonto: CustomerCompany = {
  logo: {
    adjusted: qontoLogoAdjusted,
    "140x48": { light: qontoLogo140x48, dark: qontoLogo140x48Dark },
  },
  name: "Qonto",
};
