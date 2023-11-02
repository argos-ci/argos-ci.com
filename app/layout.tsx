import "@/styles/highlight-js-github-dark.min.css";
import "@/styles/globals.css";

import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AppNavbar } from "./navbar";
import { AppFooter } from "./footer";
import { Metadata } from "next";
import { TooltipProvider } from "@/components/Tooltip";
import clsx from "clsx";
import Script from "next/script";
import { ClientProviders } from "./client-providers";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Argos — Visual Testing for developers",
  description:
    "Argos provides the developer tools to debug tests and detects visual regressions.",
  twitter: {
    site: "@argos_ci",
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
        <Script>
          {`
          function updateColorModeClassName() {
            if (
              localStorage.theme === "dark" ||
              (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
          updateColorModeClassName();
          `.trim()}
        </Script>
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
