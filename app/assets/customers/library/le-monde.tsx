import leMondeLogo140x48Dark from "../140x48/le-monde-dark.svg";
import leMondeLogo140x48 from "../140x48/le-monde.svg";
import leMondeLogoAdjusted from "../adjusted/le-monde.svg";
import paulLaleuAvatar from "../people/paul-laleu.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const leMonde: CustomerCompany = {
  logo: {
    adjusted: leMondeLogoAdjusted,
    "140x48": { light: leMondeLogo140x48, dark: leMondeLogo140x48Dark },
  },
  name: "Le Monde",
};

const paulLaleu: CustomerUser = {
  avatar: paulLaleuAvatar,
  name: "Paul Laleu",
  title: "CTO of Le Monde",
};

export const leMondeQuote: CustomerQuote = {
  company: leMonde,
  text: (
    <>
      Thanks to Argos, we can <strong>confidently deploy updates</strong> to
      Sirius without worrying about unexpected issues disrupting our editorial
      workflows.
    </>
  ),
  author: paulLaleu,
};
