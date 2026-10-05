import type {
  Organization,
  Person,
  SoftwareApplication,
  WebSite,
} from "schema-dts";

import {
  type Employee,
  gregEmployee,
  jeremyEmployee,
} from "@/app/assets/people/library";

import { SITE_URL } from "./agents";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "./constants";
import { argosDefinition, argosPillarsSentence } from "./metadata";

/**
 * schema.org JSON-LD shared across pages. Each entity has a stable `@id`, so
 * a page can point to the Organization (rendered on every page by the root
 * layout) instead of repeating it, and search engines merge them into one
 * entity. JSON-LD only restates what the visible page says: assistants don't
 * read facts that exist only here.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** A reference to the Organization, for `publisher` and similar fields. */
export const organizationRef = { "@id": ORGANIZATION_ID } as const;

/** Make a site path (or a `/_next/static` asset) an absolute URL. */
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}

/** A team member, with their personal site as `url` when they have one. */
export function getPersonJsonLd(employee: Employee, url?: string): Person {
  return {
    "@type": "Person",
    name: employee.name,
    jobTitle: employee.title,
    image: absoluteUrl(employee.avatar.src),
    url: url ?? employee.github,
    sameAs: [employee.github, employee.x],
  };
}

export const organizationJsonLd: Organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  name: "Argos",
  // "Argos" alone collides with the UK retailer and Argo CD.
  alternateName: ["Argos CI", "argos-ci"],
  legalName: "Argos by Smooth Code",
  description: `${argosDefinition} ${argosPillarsSentence}`,
  email: "contact@argos-ci.com",
  contactPoint: { "@type": "ContactPoint", email: "contact@argos-ci.com" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 boulevard Sebastopol",
    addressLocality: "Paris",
    addressCountry: "FR",
    addressRegion: "FR",
    postalCode: "75004",
  },
  foundingDate: "2016-12-15",
  founder: [
    getPersonJsonLd(gregEmployee, "https://gregberge.com"),
    getPersonJsonLd(jeremyEmployee),
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 0,
    maxValue: 10,
  },
  sameAs: [
    "https://github.com/argos-ci",
    "https://github.com/argos-ci/argos",
    "https://www.npmjs.com/org/argos-ci",
    "https://x.com/argos_ci",
    "https://www.linkedin.com/company/argos-testing",
  ],
};

export const websiteJsonLd: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Argos",
  alternateName: "Argos CI",
  inLanguage: "en",
  publisher: organizationRef,
};

/** Argos the product, with the plans from `lib/constants.ts`. */
export const softwareApplicationJsonLd: SoftwareApplication = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Argos",
  alternateName: "Argos CI",
  url: SITE_URL,
  description: argosDefinition,
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Visual regression testing",
  operatingSystem: "Web",
  license: "https://github.com/argos-ci/argos/blob/main/LICENSE",
  publisher: organizationRef,
  featureList: [
    "Visual regression testing for Playwright, Storybook, Vitest, Cypress, Puppeteer and WebdriverIO",
    "Snapshot testing for Markdown, JSON, YAML, HTML and ARIA snapshots",
    "Collaborative review of visual changes on every pull request",
    "Flaky test detection and Playwright trace debugging",
    "Preview deployments for Storybook and static sites",
    "MCP server, CLI and REST API for AI agents",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Hobby",
      price: 0,
      priceCurrency: "USD",
      description: `Free for personal projects, up to ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a month.`,
      url: `${SITE_URL}/pricing`,
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: ARGOS_PRO_FLAT_PRICE,
      priceCurrency: "USD",
      description: `${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a month included, then $${ARGOS_SCREENSHOT_PRICE} per screenshot ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} per Storybook screenshot).`,
      url: `${SITE_URL}/pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: ARGOS_PRO_FLAT_PRICE,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  ],
};
