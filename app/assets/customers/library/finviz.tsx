import finvizLogo140x48Dark from "../140x48/finviz-dark.svg";
import finvizLogo140x48 from "../140x48/finviz.svg";
import finvizLogoAdjustedDark from "../adjusted/finviz-dark.svg";
import finvizLogoAdjusted from "../adjusted/finviz.svg";
import finvizEmblem from "../emblem/finviz.svg";
import marosPistejAvatar from "../people/maros-pistej.jpg";
import vojtechGintnerAvatar from "../people/vojtech-gintner.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

const finviz = {
  logo: {
    adjusted: { light: finvizLogoAdjusted, dark: finvizLogoAdjustedDark },
    "140x48": { light: finvizLogo140x48, dark: finvizLogo140x48Dark },
    emblem: finvizEmblem,
  },
  name: "Finviz",
  url: "https://finviz.com",
  storyUrl: "/customers/finviz",
} satisfies CustomerCompany;

const vojtechGintner = {
  avatar: vojtechGintnerAvatar,
  name: "Vojtech Gintner",
  title: "Engineering manager at Finviz",
} satisfies CustomerUser;

const marosPistej: CustomerUser = {
  avatar: marosPistejAvatar,
  name: "Maros Pistej",
  title: "Software engineer at Finviz",
};

export const finvizGintnerQuote: CustomerQuote = {
  company: finviz,
  text: (
    <>
      We use Playwright for E2E, and{" "}
      <strong>Argos adds the missing layer of visual testing</strong>. On our
      charts, a single pixel difference can indicate a real bug. Argos gives us
      a <strong>clear signal we can trust before merging</strong>.
    </>
  ),
  author: vojtechGintner,
};

export const finvizMarosQuote: CustomerQuote = {
  company: finviz,
  text: (
    <>
      Combining Playwright E2E with{" "}
      <strong>Argos visual testing changed how we review chart changes</strong>.
      A green build now truly means our charts are correct on both desktop and
      mobile.
    </>
  ),
  author: marosPistej,
};
