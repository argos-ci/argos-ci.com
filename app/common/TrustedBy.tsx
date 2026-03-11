import { attio } from "@/app/assets/customers/library/attio";
import { clickhouse } from "@/app/assets/customers/library/clickhouse";
import { doctolib } from "@/app/assets/customers/library/doctolib";
import { gitbook } from "@/app/assets/customers/library/gitbook";
import { leMonde } from "@/app/assets/customers/library/le-monde";
import { mermaid } from "@/app/assets/customers/library/mermaid";
import { meta } from "@/app/assets/customers/library/meta";
import { mui } from "@/app/assets/customers/library/mui";
import { qonto } from "@/app/assets/customers/library/qonto";
import { redis } from "@/app/assets/customers/library/redis";
import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import { ThemeImage } from "@/components/ThemeImage";

const customers = [
  meta,
  clickhouse,
  gitbook,
  attio,
  qonto,
  doctolib,
  leMonde,
  redis,
  mui,
  mermaid,
];

export function TrustedBy() {
  return (
    <section className="separator-b relative px-4">
      <Container className="border-x">
        <div className="relative grid grid-cols-2 content-center gap-6 px-8 py-10 sm:grid-cols-3 md:grid-cols-5">
          {customers.map((customer) => (
            <Link
              key={customer.name}
              aria-hidden
              href={customer.storyUrl ?? "/customers"}
              className="flex transition hover:scale-103"
            >
              <div className="relative">
                <ThemeImage
                  src={customer.logo["140x48"]}
                  alt={customer.name}
                  className="max-md:nth-[n+7]:hidden max-sm:nth-[n+5]:hidden dark:brightness-0 dark:invert"
                />
                {customer.storyUrl ? (
                  <div className="bg-primary-ui absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-lg px-1 text-[0.55rem] font-medium whitespace-nowrap text-(--primary-11) uppercase md:-bottom-1.5">
                    Case study
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
