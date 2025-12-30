import { GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import { Organization } from "schema-dts";

import { JsonLd } from "@/components/JsonLd";
import { TooltipProvider } from "@/components/Tooltip";
import { defaultDescription, defaultTitle } from "@/lib/metadata";
import "@/styles/globals.css";
import "@/styles/highlight-js-github-dark.min.css";

import { ClientProviders } from "./client-providers";
import { AppFooter } from "./footer";
import { AppNavbar } from "./navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = defaultTitle;
const description = defaultDescription;

export const metadata: Metadata = {
  metadataBase: new URL("https://argos-ci.com"),
  title: {
    template: "%s · Argos",
    default: title,
  },
  description,
};

const jsonLdOrganization: Organization = {
  "@type": "Organization",
  url: "https://argos-ci.com",
  logo: "https://argos-ci.com/logo.png",
  name: "Argos",
  legalName: "Argos by Smooth Code",
  description:
    "Argos is an open-source visual testing tool that helps teams catch visual regressions in their web applications. Seamlessly integrate with your CI/CD pipeline, automate visual tests, and ensure a consistent user experience. Improve your app's quality with fast, reliable visual comparisons.",
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
  founder: {
    "@type": "Person",
    name: "Greg Bergé",
    familyName: "Bergé",
    givenName: "Greg",
    jobTitle: "CEO",
    url: "https://gregberge.com",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 0,
    maxValue: 10,
  },
  sameAs: [
    "https://github.com/argos-ci/argos",
    "https://x.com/argos-ci",
    "https://www.linkedin.com/company/argos-testing",
  ],
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        inter.variable,
        GeistSans.variable,
        GeistMono.variable,
        "antialiased",
      )}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-NLJR9K93" />
      <head>
        <PlausibleProvider domain="argos-ci.com" />
      </head>
      <body>
        <JsonLd json={jsonLdOrganization} />
        <ClientProviders>
          <TooltipProvider>
            <div id="content">
              <AppNavbar />
              <main>{children}</main>
              <AppFooter />
            </div>
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
