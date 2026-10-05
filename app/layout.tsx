import { GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { TooltipProvider } from "@/components/Tooltip";
import { WebMcp } from "@/components/WebMcp";
import { defaultDescription, defaultTitle } from "@/lib/metadata";
import { organizationJsonLd } from "@/lib/structured-data";

import "@/styles/globals.css";
import "@/styles/highlight-js-github-dark.min.css";

import { ClientProviders } from "./client-providers";
import { AppFooter } from "./footer";
import { GoogleAdsConversion, GoogleAdsScripts } from "./google-ads";
import { AppNavbar } from "./navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = defaultTitle;
const description = defaultDescription;

/**
 * WebMCP (components/WebMcp.tsx) is behind a Chrome origin trial until it
 * ships: without the token registered for argos-ci.com at
 * developer.chrome.com/origintrials, `document.modelContext` is undefined for
 * visitors and the tools never register. Set it in the Vercel environment.
 */
const webMcpOriginTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN;

export const metadata: Metadata = {
  metadataBase: new URL("https://argos-ci.com"),
  title: {
    template: "%s · Argos",
    default: title,
  },
  description,
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
        {/*
          Read the non-HttpOnly `argos_logged_in` hint cookie before first paint
          and flag `<html>` so CSS can pick the logged-in vs logged-out navbar
          without a hydration flash. Mirrors how next-themes sets the theme class.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(document.cookie.indexOf('argos_logged_in=1')>-1)document.documentElement.classList.add('argos-authed')}catch(e){}",
          }}
        />
        <PlausibleProvider src="https://plausible.io/js/pa-MUtv2DPAT8fCOLi_QqcGL.js" />
        <GoogleAdsScripts />
        {webMcpOriginTrialToken ? (
          <meta httpEquiv="origin-trial" content={webMcpOriginTrialToken} />
        ) : null}
      </head>
      <body>
        <JsonLd json={organizationJsonLd} />
        <WebMcp />
        <ClientProviders>
          <TooltipProvider>
            <div id="content">
              <AppNavbar />
              <main>{children}</main>
              <AppFooter />
            </div>
          </TooltipProvider>
        </ClientProviders>
        <GoogleAdsConversion />
      </body>
    </html>
  );
}
