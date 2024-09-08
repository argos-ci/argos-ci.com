import { MetadataRoute } from "next";

import { getCustomerCases } from "@/lib/api/customer-case";

const BASE_URL = "https://argos-ci.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const customerCases = await getCustomerCases();
  return customerCases.map((customerCase) => ({
    url: `${BASE_URL}/customers/${customerCase.slug}`,
    lastModified: customerCase.date,
  }));
}
