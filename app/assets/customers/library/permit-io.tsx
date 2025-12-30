import permitIoLogo140x48Dark from "../140x48/permit-io-dark.svg";
import permitIoLogo140x48 from "../140x48/permit-io.svg";
import permitIoLogoAdjustedDark from "../adjusted/permit-io-dark.svg";
import permitIoLogoAdjusted from "../adjusted/permit-io.svg";
import orWeisAvatar from "../people/or-weis.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

const permitIo: CustomerCompany = {
  logo: {
    adjusted: { light: permitIoLogoAdjusted, dark: permitIoLogoAdjustedDark },
    "140x48": { light: permitIoLogo140x48, dark: permitIoLogo140x48Dark },
  },
  name: "Permit.io",
};

const orWeis: CustomerUser = {
  avatar: orWeisAvatar,
  name: "Or Weis",
  title: "CEO of Permit.io",
};

export const permitIoQuote: CustomerQuote = {
  company: permitIo,
  text: (
    <>
      When a Playwright test fails, Argos gives you the screenshot, the diff,
      and the trace in one place. Debugging starts where the failure happened.
    </>
  ),
  author: orWeis,
};
