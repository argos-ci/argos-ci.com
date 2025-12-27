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
import { Link } from "@/components/Link";
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
            <Link key={customer.name} href="/customers" className="contents">
              <ThemeImage
                src={customer.logo["140x48"]}
                alt={customer.name}
                aria-hidden
                className="max-md:nth-[n+7]:hidden max-sm:nth-[n+5]:hidden dark:brightness-0 dark:invert"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
