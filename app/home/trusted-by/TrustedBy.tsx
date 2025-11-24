import Image from "next/image";

import { HomeSection } from "../common/HomeSection";
import businessInsider from "./assets/business_insider.svg";
import clickhouse from "./assets/clickhouse.svg";
import doctolib from "./assets/doctolib.svg";
import gitbook from "./assets/gitbook.svg";
import leMonde from "./assets/le_monde.svg";
import mermaid from "./assets/mermaid.svg";
import meta from "./assets/meta.svg";
import mui from "./assets/mui.svg";
import qonto from "./assets/qonto.svg";
import yotpo from "./assets/yotpo.svg";

const customers = [
  {
    name: "Meta",
    image: meta,
  },

  {
    name: "Clickhouse",
    image: clickhouse,
  },
  {
    name: "GitBook",
    image: gitbook,
  },
  {
    name: "Yotpo",
    image: yotpo,
  },
  {
    name: "Qonto",
    image: qonto,
  },
  {
    name: "Doctolib",
    image: doctolib,
  },
  {
    name: "Le Monde",
    image: leMonde,
  },
  {
    name: "Business Insider",
    image: businessInsider,
  },
  {
    name: "MUI",
    image: mui,
  },
  {
    name: "Mermaid",
    image: mermaid,
  },
];

export function TrustedBy() {
  return (
    <HomeSection className="separator-b">
      <div className="relative grid grid-cols-2 content-center gap-6 border-x px-8 py-10 sm:grid-cols-3 md:grid-cols-5">
        {customers.map((customer) => (
          <Image
            key={customer.name}
            src={customer.image}
            alt={customer.name}
            className="max-md:nth-[n+7]:hidden max-sm:nth-[n+5]:hidden dark:brightness-0 dark:invert"
          />
        ))}
      </div>
    </HomeSection>
  );
}
