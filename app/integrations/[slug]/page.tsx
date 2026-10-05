import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetadata } from "@/lib/metadata";

import { IntegrationPage } from "../IntegrationPage";
import { INTEGRATIONS } from "../integrations";
import { INTEGRATION_SLUGS, isIntegrationSlug } from "../types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isIntegrationSlug(slug)) {
    return {};
  }
  const integration = INTEGRATIONS[slug];
  return getMetadata({
    title: integration.title,
    absoluteTitle: integration.metaTitle,
    subtitle: integration.short,
    description: integration.metaDescription,
    pathname: `/integrations/${slug}`,
  });
}

export default async function Page(props: Props) {
  const { slug } = await props.params;
  if (!isIntegrationSlug(slug)) {
    notFound();
  }
  return <IntegrationPage integration={INTEGRATIONS[slug]} />;
}
