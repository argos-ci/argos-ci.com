import noc0Logo140x48Dark from "../140x48/noc0-dark.svg";
import noc0Logo140x48 from "../140x48/noc0.svg";
import noc0LogoAdjustedDark from "../adjusted/noc0-dark.svg";
import noc0LogoAdjusted from "../adjusted/noc0.svg";
import josephTurianAvatar from "../people/joseph-turian.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

const noc0 = {
  logo: {
    adjusted: { light: noc0LogoAdjusted, dark: noc0LogoAdjustedDark },
    "140x48": { light: noc0Logo140x48, dark: noc0Logo140x48Dark },
  },
  name: "noc0",
  url: "https://noc0.dev",
} satisfies CustomerCompany;

const josephTurian: CustomerUser = {
  avatar: josephTurianAvatar,
  name: "Joseph Turian",
  title: "CEO & Co-founder of noc0",
};

export const noc0Quote: CustomerQuote = {
  company: noc0,
  text: (
    <>
      100% worth it for us. As reluctant webdevs, we finally{" "}
      <strong>ship changes with confidence</strong>.
    </>
  ),
  author: josephTurian,
};
