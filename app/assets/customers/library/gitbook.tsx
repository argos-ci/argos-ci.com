import gitbookLogo140x48Dark from "../140x48/gitbook-dark.svg";
import gitbookLogo140x48 from "../140x48/gitbook.svg";
import gitbookLogoAdjustedDark from "../adjusted/gitbook-dark.svg";
import gitbookLogoAdjusted from "../adjusted/gitbook.svg";
import samyPesseAvatar from "../people/samy-pesse.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const gitbook: CustomerCompany = {
  logo: {
    adjusted: { light: gitbookLogoAdjusted, dark: gitbookLogoAdjustedDark },
    "140x48": { light: gitbookLogo140x48, dark: gitbookLogo140x48Dark },
  },
  name: "GitBook",
  url: "https://gitbook.com",
  storyUrl: "/customers/gitbook",
};

const samyPesse: CustomerUser = {
  avatar: samyPesseAvatar,
  name: "Samy Pessé",
  title: "CTO of GitBook",
};

export const gitbookQuote: CustomerQuote = {
  company: gitbook,
  text: (
    <>
      Argos has become a cornerstone of our testing process. Its ability to
      catch visual issues early has{" "}
      <strong>saved us countless hours of manual QA</strong> and protected the
      integrity of our product for millions of users.
    </>
  ),
  author: samyPesse,
};
