import leMondeLogo140x48Dark from "../140x48/le-monde-dark.svg";
import leMondeLogo140x48 from "../140x48/le-monde.svg";
import leMondeLogoAdjustedDark from "../adjusted/le-monde-dark.svg";
import leMondeLogoAdjusted from "../adjusted/le-monde.svg";
import leMondeEmblem from "../emblem/le-monde.svg";
import mariusBaronAvatar from "../people/marius-baron.jpg";
import paulLaleuAvatar from "../people/paul-laleu.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const leMonde = {
  logo: {
    adjusted: { light: leMondeLogoAdjusted, dark: leMondeLogoAdjustedDark },
    "140x48": { light: leMondeLogo140x48, dark: leMondeLogo140x48Dark },
    emblem: leMondeEmblem,
  },
  name: "Le Monde",
  url: "https://www.lemonde.fr",
  storyUrl: "/customers/lemonde",
  about:
    "Le Monde is one of the largest and most influential newspapers in France, known for its independent journalism and wide-ranging coverage of national and international news.",
  industry: "Media & Publishing",
  size: "1,000-5,000",
  founded: "1944",
  argosPlan: "Enterprise",
} satisfies CustomerCompany;

const paulLaleu = {
  avatar: paulLaleuAvatar,
  name: "Paul Laleu",
  title: "CTO of Le Monde",
} satisfies CustomerUser;

const mariusBaron = {
  avatar: mariusBaronAvatar,
  name: "Marius Baron",
  title: "Lead developer at Le Monde",
} satisfies CustomerUser;

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

export const leMondeMariusQuote: CustomerQuote = {
  company: leMonde,
  text: (
    <>
      Argos has become a <strong>reliable part of our CI pipeline</strong>. By
      catching visual changes early, it helps keep our CMS{" "}
      <strong>stable</strong> and lets journalists focus on their work{" "}
      <strong>without disruption</strong>.
    </>
  ),
  author: mariusBaron,
};
