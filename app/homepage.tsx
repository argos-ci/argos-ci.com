import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { FeaturedSDKsSection } from "@/components/featured-sdk/FeaturedSDKs";
import { JsonLd } from "@/components/JsonLd";
import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";
import {
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

import { TrustedBy } from "./common/TrustedBy";
import { Agents } from "./home/agents/Agents";
import { Cost } from "./home/cost/Cost";
import { Customers } from "./home/customers/Customers";
import { Deploy } from "./home/deploy/Deploy";
import { Diff } from "./home/diff/Diff";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";
import { Review } from "./home/review/Review";
import { Stabilize } from "./home/stabilize/Stabilize";

export const metadata: Metadata = getMetadata({
  title: "Argos",
  subtitle: "Review the product, not just the code",
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
      <Diff />
      <Review />
      <Stabilize />
      <Deploy />
      <Agents />
      <Integrations />
      <FeaturedSDKsSection />
      <Cost />
      <Customers />
      <CallToActionSection />
      <JsonLd json={websiteJsonLd} />
      <JsonLd json={softwareApplicationJsonLd} />
    </>
  );
}
