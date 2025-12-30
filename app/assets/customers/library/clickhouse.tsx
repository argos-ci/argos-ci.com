import clickhouseLogo140x48Dark from "../140x48/clickhouse-dark.svg";
import clickhouseLogo140x48 from "../140x48/clickhouse.svg";
import clickhouseLogoAdjusted from "../adjusted/clickhouse.svg";
import type { CustomerCompany } from "../types";

export const clickhouse: CustomerCompany = {
  logo: {
    adjusted: clickhouseLogoAdjusted,
    "140x48": { light: clickhouseLogo140x48, dark: clickhouseLogo140x48Dark },
  },
  name: "ClickHouse",
};
