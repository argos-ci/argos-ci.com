import clsx from "clsx";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { TooltipProvider } from "@/components/Tooltip";
import "@/styles/globals.css";
import "@/styles/highlight-js-github-dark.min.css";

import { ClientProviders } from "./client-providers";
import { AppFooter } from "./footer";
import { AppNavbar } from "./navbar";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://argos-ci.com"),
  title: "Argos — Visual Testing for developers",
  description:
    "Argos provides the developer tools to debug tests and detect visual regressions.",
  openGraph: {
    title: "Visual Testing for developers",
    description:
      "Argos provides the developer tools to debug tests and detect visual regressions.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@argos_ci",
    title: "Visual Testing for developers",
    description:
      "Argos provides the developer tools to debug tests and detect visual regressions.",
  },
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
      className={clsx(inter.variable, calSans.variable, "antialiased")}
      suppressHydrationWarning
    >
      <head>
        <PlausibleProvider domain="argos-ci.com" />
      </head>
      <body>
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
