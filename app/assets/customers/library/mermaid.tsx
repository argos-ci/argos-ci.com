import mermaidLogo140x48 from "../140x48/mermaid.svg";
import mermaidLogoAdjusted from "../adjusted/mermaid.svg";
import mermaidEmblem from "../emblem/mermaid.svg";
import sidharthVinodAvatar from "../people/sidharth-vinod.jpg";
import type { CustomerCompany, CustomerQuote, CustomerUser } from "../types";

export const mermaid = {
  logo: {
    adjusted: mermaidLogoAdjusted,
    "140x48": mermaidLogo140x48,
    emblem: mermaidEmblem,
  },
  name: "Mermaid",
  url: "https://mermaid.js.org",
  storyUrl: "/customers/mermaid",
  about:
    "Mermaid is a JavaScript based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically.",
  industry: "Developer Tools, Open Source",
  size: "< 10",
  founded: "2014",
  argosPlan: "Enterprise",
} satisfies CustomerCompany;

const sidharthVinod: CustomerUser = {
  avatar: sidharthVinodAvatar,
  name: "Sidharth Vinod",
  title: "Engineer at Mermaid",
};

export const mermaidQuote: CustomerQuote = {
  company: mermaid,
  text: (
    <>
      Argos has been a game-changer for us.{" "}
      <strong>
        It catches even the smallest visual changes in our diagram rendering
      </strong>
      , giving us peace of mind before every release. The{" "}
      <strong>seamless integration with our CI pipeline</strong> makes it an
      essential part of our development process.
    </>
  ),
  author: sidharthVinod,
};
