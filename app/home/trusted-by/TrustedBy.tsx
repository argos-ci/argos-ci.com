// import businessInsider from "@/app/assets/customers/140x48/business-insider.svg";
// import clickhouse from "@/app/assets/customers/140x48/clickhouse.svg";
// import doctolib from "@/app/assets/customers/140x48/doctolib.svg";
// import gitbook from "@/app/assets/customers/140x48/gitbook.svg";
// import leMonde from "@/app/assets/customers/140x48/le-monde.svg";
// import mermaid from "@/app/assets/customers/140x48/mermaid.svg";
// import meta from "@/app/assets/customers/140x48/meta.svg";
// import mui from "@/app/assets/customers/140x48/mui.svg";
// import qonto from "@/app/assets/customers/140x48/qonto.svg";
// import yotpo from "@/app/assets/customers/140x48/yotpo.svg";
import { businessInsider } from "@/app/assets/customers/library/business-insider";
import { clickhouse } from "@/app/assets/customers/library/clickhouse";
import { doctolib } from "@/app/assets/customers/library/doctolib";
import { gitbook } from "@/app/assets/customers/library/gitbook";
import { leMonde } from "@/app/assets/customers/library/le-monde";
import { mermaid } from "@/app/assets/customers/library/mermaid";
import { meta } from "@/app/assets/customers/library/meta";
import { mui } from "@/app/assets/customers/library/mui";
import { qonto } from "@/app/assets/customers/library/qonto";
import { yotpo } from "@/app/assets/customers/library/yotpo";
import { Container } from "@/components/Container";
import { ThemeImage } from "@/components/ThemeImage";

const customers = [
  meta,
  clickhouse,
  gitbook,
  yotpo,
  qonto,
  doctolib,
  leMonde,
  businessInsider,
  mui,
  mermaid,
];

export function TrustedBy() {
  return (
    <section className="separator-b relative px-4">
      <Container className="border-x">
        <div className="relative grid grid-cols-2 content-center gap-6 px-8 py-10 sm:grid-cols-3 md:grid-cols-5">
          {customers.map((customer) => (
            <ThemeImage
              key={customer.name}
              src={customer.logo["140x48"]}
              alt={customer.name}
              className="max-md:nth-[n+7]:hidden max-sm:nth-[n+5]:hidden dark:brightness-0 dark:invert"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
