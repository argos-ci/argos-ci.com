import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { FeaturedSDKsSection } from "@/components/featured-sdk/FeaturedSDKs";
import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";

import { TrustedBy } from "./common/TrustedBy";
import { Cost } from "./home/cost/Cost";
import { Customers } from "./home/customers/Customers";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";

export const metadata: Metadata = getMetadata({
  title: "Argos",
  subtitle: "Deploy, diff, review, stabilize — every pull request",
  absoluteTitle: defaultTitle,
  description: defaultDescription,
  pathname: "/",
});

export default function Page() {
  return (
    <>
      <RedirectIfCookie />
      <Hero />
      <TrustedBy />
      <Integrations />
      <Cost />
      <FeaturedSDKsSection />
      <Customers />
      <CallToActionSection />
    </>
  );
}
