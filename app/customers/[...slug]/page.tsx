import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";
import { BreadcrumbList, NewsArticle } from "schema-dts";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { JsonLd } from "@/components/JsonLd";
import {
  getCustomerCaseBySlug,
  getCustomerCaseMdxSource,
  getCustomerCases,
} from "@/lib/api/customer-case";

type Params = { slug: string[] };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const customerCases = await getCustomerCases();
  return customerCases
    .filter((customerCase) => customerCase.slug !== "")
    .map((customerCase) => ({ slug: customerCase.slug.split("/") }));
}

async function getCustomerCaseFromParams(params: Params) {
  const slug = params.slug.join("/");
  return getCustomerCaseBySlug(slug);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const customerCase = await getCustomerCaseFromParams(await props.params);
  if (!customerCase) {
    notFound();
  }

  const images = [customerCase.image.src];

  const url = `https://argos-ci.com/customers/${customerCase.slug}`;

  return {
    title: {
      absolute: customerCase.title,
    },
    description: customerCase.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: customerCase.title,
      description: customerCase.description,
      images,
      type: "article",
      publishedTime: customerCase.date,
      modifiedTime: customerCase.updatedAt ?? customerCase.date,
      url,
      siteName: "Argos",
      locale: "en_US",
      authors: [customerCase.author],
    },
    twitter: {
      title: customerCase.title,
      description: customerCase.description,
      images,
      card: "summary_large_image",
      site: "@argos_ci",
    },
  };
}

export default async function Page(props: Props) {
  const customerCase = await getCustomerCaseFromParams(await props.params);
  if (!customerCase) {
    notFound();
  }
  const source = await getCustomerCaseMdxSource(customerCase);
  const jsonLdArticle: NewsArticle = {
    "@type": "NewsArticle",
    headline: customerCase.title,
    image: [customerCase.image.src],
    datePublished: customerCase.date,
    dateModified: customerCase.updatedAt ?? customerCase.date,
    author: [
      {
        "@type": "Person",
        name: customerCase.author,
      },
    ],
  };
  const jsonLdBreadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Customers",
        item: "https://argos-ci.com/customers",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: customerCase.title,
        item: `https://argos-ci.com/customers/${customerCase.slug}`,
      },
    ],
  };
  return (
    <>
      <article className="px-4">
        <header className="overflow-hidden border-b">
          <Container className="relative py-8 md:h-75 md:py-16">
            <FullPageGrid height="h-200 md:h-75" />
            <div className="relative">
              <div className="mb-4 text-sm md:mb-8">
                <ArrowLeftIcon
                  className="text-low mr-2 inline size-4"
                  strokeWidth={1}
                />
                <NextLink
                  href="/customers"
                  className="text-low font-normal no-underline hover:underline"
                >
                  All customers
                </NextLink>
              </div>
              <h1 className="font-accent mb-4 text-2xl font-bold text-balance md:text-4xl">
                {customerCase.title}
              </h1>
              <p className="text-low text-balance md:text-lg">
                {customerCase.description}
              </p>
            </div>
          </Container>
        </header>
        <Container className="relative mx-auto grid grid-cols-4 gap-5 border-x pt-4 pb-16 md:pt-10 md:pb-24 lg:gap-10">
          <div className="prose dark:prose-invert col-span-4 max-w-none md:col-span-3">
            <div
              className="not-prose rounded-lg"
              style={{
                aspectRatio: "2/1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={customerCase.image.src}
                blurDataURL={customerCase.image.blurDataURL}
                width={undefined}
                height={undefined}
                priority
                fill
                sizes="(max-width: 900px) 100vw, 832px"
                alt={customerCase.title}
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
            </div>
            {source}
            <JsonLd json={jsonLdArticle} />
            <JsonLd json={jsonLdBreadcrumbs} />
          </div>
          <div className="divide-base sticky top-20 col-span-1 hidden flex-col divide-y self-start md:flex">
            <div className="flex items-center gap-4 py-5">
              <Image
                src={customerCase.customer.logo}
                width={48}
                height={48}
                alt={customerCase.customer.name}
              />
              <div>
                <div className="font-medium">{customerCase.customer.name}</div>
                <div className="text-low text-sm">
                  <a
                    href={customerCase.customer.website}
                    target="_blank"
                    className="text-low hover:underline"
                  >
                    {simplifyUrl(customerCase.customer.website)}
                  </a>
                </div>
              </div>
            </div>
            <SideItem title="About">{customerCase.customer.about}</SideItem>
            <SideItem title="Industry">
              {customerCase.customer.industry}
            </SideItem>
            <SideItem title="Company Size">
              {customerCase.customer.companySize}
            </SideItem>
            <SideItem title="Founded">{customerCase.customer.founded}</SideItem>
            <SideItem title="Argos plan">
              <NextLink href="/pricing" className="hover:underline">
                {customerCase.customer.argosPlan}
                <ArrowUpRightIcon className="ml-1 inline size-4" />
              </NextLink>
            </SideItem>
          </div>
        </Container>
      </article>
      <CallToActionSection />
    </>
  );
}

function SideItem(props: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-2 py-5">
      <p className="font-medium">{props.title}</p>
      <p className="text-low text-sm">{props.children}</p>
    </div>
  );
}

function simplifyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
