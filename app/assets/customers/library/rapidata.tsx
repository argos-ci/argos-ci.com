import rapidataLogo140x48Dark from "../140x48/rapidata-dark.svg";
import rapidataLogo140x48 from "../140x48/rapidata.svg";
import rapidataLogoAdjustedDark from "../adjusted/rapidata-dark.svg";
import rapidataLogoAdjusted from "../adjusted/rapidata.svg";
import jasonCorkillAvatar from "../people/jason-corkill.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const rapidata = {
  logo: {
    adjusted: { light: rapidataLogoAdjusted, dark: rapidataLogoAdjustedDark },
    "140x48": { light: rapidataLogo140x48, dark: rapidataLogo140x48Dark },
  },
  name: "Rapidata",
  url: "https://rapidata.ai/",
} satisfies CustomerCompany;

const jasonCorkill = {
  avatar: jasonCorkillAvatar,
  name: "Jason Corkill",
  title: "CEO of Rapidata",
} satisfies CustomerUser;

export const rapidataQuote = {
  company: rapidata,
  text: (
    <>
      Before Argos, our fast moving UI regularly broke on unexpected screen
      aspect ratios.{" "}
      <strong>Argos now catches these issues before anything ships.</strong>
    </>
  ),
  author: jasonCorkill,
} satisfies CustomerQuote;
