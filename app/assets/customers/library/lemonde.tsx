import lemondeLogo140x48 from "../140x48/le_monde.svg";
import lemondeLogoAdjusted from "../adjusted/le_monde.svg";
import paulLaleuAvatar from "../people/paul-laleu.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const lemonde: CustomerCompany = {
  logo: {
    adjusted: lemondeLogoAdjusted,
    "140x48": lemondeLogo140x48,
  },
  name: "Le Monde",
};

const paulLaleu: CustomerUser = {
  avatar: paulLaleuAvatar,
  name: "Paul Laleu",
  title: "CTO of Le Monde",
};

export const lemondeQuote: CustomerQuote = {
  company: lemonde,
  text: (
    <>
      Thanks to Argos, we can confidently deploy updates to Sirius without
      worrying about unexpected issues disrupting our editorial workflows.
    </>
  ),
  author: paulLaleu,
};
