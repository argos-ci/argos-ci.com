import redisLogo140x48 from "../140x48/redis.svg";
import redisLogoAdjusted from "../adjusted/redis.svg";
import type { CustomerCompany } from "../types";

export const redis: CustomerCompany = {
  logo: {
    adjusted: redisLogoAdjusted,
    "140x48": redisLogo140x48,
  },
  name: "Redis",
  url: "https://redis.io",
};
