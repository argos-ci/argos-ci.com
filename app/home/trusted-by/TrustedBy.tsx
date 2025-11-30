import Image from "next/image";

import businessInsider from "@/app/assets/customers/140x48/business_insider.svg";
import clickhouse from "@/app/assets/customers/140x48/clickhouse.svg";
import doctolib from "@/app/assets/customers/140x48/doctolib.svg";
import gitbook from "@/app/assets/customers/140x48/gitbook.svg";
import leMonde from "@/app/assets/customers/140x48/le_monde.svg";
import mermaid from "@/app/assets/customers/140x48/mermaid.svg";
import meta from "@/app/assets/customers/140x48/meta.svg";
import mui from "@/app/assets/customers/140x48/mui.svg";
import qonto from "@/app/assets/customers/140x48/qonto.svg";
import yotpo from "@/app/assets/customers/140x48/yotpo.svg";
import { Container } from "@/components/Container";

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
    <section className="separator-b relative px-4">
      <Container className="border-x">
        <div className="relative grid grid-cols-2 content-center gap-6 px-8 py-10 sm:grid-cols-3 md:grid-cols-5">
          {customers.map((customer) => (
            <Image
              key={customer.name}
              src={customer.image}
              alt={customer.name}
              className="max-md:nth-[n+7]:hidden max-sm:nth-[n+5]:hidden dark:brightness-0 dark:invert"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
