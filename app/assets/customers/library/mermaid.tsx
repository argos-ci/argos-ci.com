import mermaidLogo140x48 from "../140x48/mermaid.svg";
import mermaidLogoAdjusted from "../adjusted/mermaid.svg";
import sidharthVinodAvatar from "../people/sidharth-vinod.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const mermaid: CustomerCompany = {
  logo: {
    adjusted: mermaidLogoAdjusted,
    "140x48": mermaidLogo140x48,
  },
  name: "Mermaid",
};

const sidharthVinod: CustomerUser = {
  avatar: sidharthVinodAvatar,
  name: "Sidharth Vinod",
  title: "Engineer at Mermaid",
};

export const mermaidQuote: CustomerQuote = {
  company: mermaid,
  text: (
    <>
      Argos has been a game-changer for us. It catches even the smallest visual
      changes in our diagram rendering, giving us peace of mind before every
      release. The seamless integration with our CI pipeline makes it an
      essential part of our development process.
    </>
  ),
  author: sidharthVinod,
};
